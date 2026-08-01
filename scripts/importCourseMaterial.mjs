// Engångsskript: importerar bilder, originalslides och föreläsningar från
// "Psykolog Verktyg/" till Supabase. Körs manuellt med:
//   node scripts/importCourseMaterial.mjs --dry-run        (visar plan, skriver inget)
//   node scripts/importCourseMaterial.mjs                  (kör alla kurser på riktigt)
//   node scripts/importCourseMaterial.mjs --courses=3,4,5  (kör bara valda kursnummer)
//
// Återanvänder samma exakta matchningslogik som src/services/importMatching.js
// (kopierad hit eftersom detta körs i ren Node, utanför Vite).
//
// OBS: skriptet är INTE säkert att köra om för en kurs som redan importerats —
// det skulle skapa dubbletter av bilder/slides. Använd --courses för att bara
// köra de kurser som inte redan är klara.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "Psykolog Verktyg");

const SUPABASE_URL = "https://jxhmuucbxxulvpdwgspk.supabase.co";
const SUPABASE_KEY = "sb_publishable_pNZSsnwsOImyElR45K5UTw_CiBgfd0y";

const DRY_RUN = process.argv.includes("--dry-run");

const MAX_UPLOAD_BYTES = 45 * 1024 * 1024;

const coursesArg = process.argv.find(arg => arg.startsWith("--courses="));

const ONLY_COURSES = coursesArg

    ? coursesArg.replace("--courses=", "").split(",").map(Number)

    : null;

const ALL_COURSES = [
    { number: 1, id: 7, dir: "Kurs 1 - Introduktion Psykologi" },
    { number: 2, id: 15, dir: "Kurs 2 - Biologi" },
    { number: 3, id: 16, dir: "Kurs 3 - Experimentell psykologi" },
    { number: 4, id: 17, dir: "Kurs 4 - Kognitiva processer" },
    { number: 5, id: 20, dir: "Kurs 5 - Socialpsykologi" }
];

const COURSES = ONLY_COURSES

    ? ALL_COURSES.filter(course => ONLY_COURSES.includes(course.number))

    : ALL_COURSES;

const EXCLUDE_DIR = /osäker|gamla versioner|dubletter/i;
const IMAGE_EXT = /\.(png|jpe?g)$/i;
const LECTURE_EXT = /\.(pdf|pptx)$/i;

const MIME_BY_EXT = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".pdf": "application/pdf",
    ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation"
};

/* ---------- filesystem ---------- */

function walk(dir) {

    let results = [];

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {

        if (entry.isDirectory()) {

            if (EXCLUDE_DIR.test(entry.name)) {

                continue;

            }

            results = results.concat(walk(path.join(dir, entry.name)));

        } else {

            results.push(path.join(dir, entry.name));

        }

    }

    return results;

}

function classifyFiles(courseDir) {

    const allFiles = walk(courseDir);

    const mainImages = [];
    const slideImages = [];
    const lectureDocs = [];

    for (const filePath of allFiles) {

        const name = path.basename(filePath);

        if (LECTURE_EXT.test(name)) {

            lectureDocs.push(filePath);

        } else if (IMAGE_EXT.test(name)) {

            if (/slide/i.test(filePath)) {

                slideImages.push(filePath);

            } else {

                mainImages.push(filePath);

            }

        }

    }

    return { mainImages, slideImages, lectureDocs };

}

/* ---------- matching (samma regler som src/services/importMatching.js) ---------- */

function stripExtension(filename) {

    return filename.replace(/\.[^./]+$/, "");

}

function extractImageRef(lectureBasename, knownImageBasenames) {

    const lowerLecture = lectureBasename.toLowerCase().trim();

    const sorted = [...knownImageBasenames].sort((a, b) => b.length - a.length);

    for (const imageBasename of sorted) {

        const lowerImage = imageBasename.toLowerCase().trim();

        if (lowerLecture === lowerImage) {

            return imageBasename;

        }

        if (lowerLecture.endsWith(" - " + lowerImage)) {

            return imageBasename;

        }

    }

    return null;

}

function deriveLectureTitle(lectureBasename, matchedImageBasename) {

    if (!matchedImageBasename) {

        return lectureBasename.trim();

    }

    const cutLength = lectureBasename.length - (matchedImageBasename.length + 3);

    if (cutLength <= 0) {

        return lectureBasename.trim();

    }

    return lectureBasename.slice(0, cutLength).trim();

}

function extractCoursePrefix(basename) {

    const match = basename.match(/^Kurs\s*\d+\s*-\s*\d+(\.\d+)?/i);

    return match ? match[0].toLowerCase().replace(/\s+/g, " ").trim() : null;

}

function cleanTitle(basename) {

    let title = basename;

    title = title.replace(/^Kurs\s*\d+\s*-\s*\d+(\.\d+)?\s*-?\s*/i, "");

    title = title.replace(/\s*-\s*JA$/i, "");

    title = title.replace(/\s*-\s*Slide$/i, "");

    return title.trim() || basename.trim();

}

const THEME_STOPWORDS = /^kurs$/i;

// Många bildnamn är redan grupperade som "<Tema> <nummer> - ...", t.ex.
// "Rädsloinlärning 2 - JA", "Social Ångest 3.1 - ...", "Minne 7 Djup inkodning".
// Drar ut temat som kategori istället för att gissa en föreläsning.
function extractTheme(basename) {

    const match = basename.match(

        /^([A-ZÅÄÖ][A-Za-zÅÄÖåäö]*(?:\s[A-ZÅÄÖ][A-Za-zÅÄÖåäö]*)?)\s+\d/

    );

    if (!match) {

        return null;

    }

    const word = match[1].trim();

    if (THEME_STOPWORDS.test(word)) {

        return null;

    }

    return word;

}

/* ---------- supabase rest helpers ---------- */

function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}

async function fetchWithRetry(url, options, attempts = 4) {

    for (let attempt = 1; attempt <= attempts; attempt++) {

        try {

            return await fetch(url, options);

        } catch (error) {

            if (attempt === attempts) {

                throw error;

            }

            console.log(`  ↻ Nätverksfel (${error.message}), försöker igen (${attempt}/${attempts})...`);

            await sleep(attempt * 1500);

        }

    }

}

async function sbFetch(pathname, options = {}) {

    const res = await fetchWithRetry(SUPABASE_URL + pathname, {

        ...options,

        headers: {

            apikey: SUPABASE_KEY,

            Authorization: "Bearer " + SUPABASE_KEY,

            ...(options.body ? { "Content-Type": "application/json" } : {}),

            ...(options.headers || {})

        }

    });

    if (!res.ok) {

        const text = await res.text();

        throw new Error(`${options.method || "GET"} ${pathname} -> ${res.status}: ${text}`);

    }

    if (res.status === 204) {

        return null;

    }

    return res.json();

}

function sanitizeFilename(name) {

    return name

        .normalize("NFD")

        .replace(/[̀-ͯ]/g, "")

        .replace(/[^a-zA-Z0-9._-]/g, "_");

}

let uploadCounter = 0;

async function uploadToStorage(bucket, folder, filePath) {

    uploadCounter++;

    const ext = path.extname(filePath).toLowerCase();

    const cleanName = sanitizeFilename(path.basename(filePath));

    const objectPath = `${folder}/${uploadCounter}-${cleanName}`;

    if (DRY_RUN) {

        const size = fs.statSync(filePath).size;

        if (size > MAX_UPLOAD_BYTES) {

            console.log(`  ⚠️  Skulle hoppas över (för stor, ${(size / 1024 / 1024).toFixed(1)} MB): ${path.basename(filePath)}`);

        }

        return `[dry-run]/${bucket}/${objectPath}`;

    }

    const size = fs.statSync(filePath).size;

    if (size > MAX_UPLOAD_BYTES) {

        console.log(`  ⚠️  Hoppar över (för stor, ${(size / 1024 / 1024).toFixed(1)} MB): ${path.basename(filePath)}`);

        return null;

    }

    const bytes = fs.readFileSync(filePath);

    const res = await fetchWithRetry(

        `${SUPABASE_URL}/storage/v1/object/${bucket}/${objectPath}`,

        {

            method: "POST",

            headers: {

                apikey: SUPABASE_KEY,

                Authorization: "Bearer " + SUPABASE_KEY,

                "Content-Type": MIME_BY_EXT[ext] || "application/octet-stream"

            },

            body: bytes

        }

    );

    if (!res.ok) {

        const text = await res.text();

        console.log(`  ⚠️  Uppladdning misslyckades, hoppar över: ${path.basename(filePath)} (${res.status}: ${text})`);

        return null;

    }

    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${objectPath}`;

}

/* ---------- import per course ---------- */

async function findOrCreateLecture(course, title, existingLectures) {

    const existing = existingLectures.find(

        lecture => lecture.title.trim().toLowerCase() === title.trim().toLowerCase()

    );

    if (existing) {

        return existing;

    }

    if (DRY_RUN) {

        const fake = { id: `NEW:${title}`, title, course_id: course.id, pdf_url: null };

        existingLectures.push(fake);

        return fake;

    }

    const [created] = await sbFetch("/rest/v1/lectures", {

        method: "POST",

        headers: { Prefer: "return=representation" },

        body: JSON.stringify({ title, course_id: course.id })

    });

    existingLectures.push(created);

    return created;

}

async function findOrCreateCategory(course, name, existingCategories) {

    const existing = existingCategories.find(

        category =>

            category.course_id === course.id &&

            category.name.trim().toLowerCase() === name.trim().toLowerCase()

    );

    if (existing) {

        return existing;

    }

    const sortOrder =

        existingCategories.filter(category => category.course_id === course.id).length + 1;

    if (DRY_RUN) {

        const fake = { id: `NEW:${name}`, name, course_id: course.id, sort_order: sortOrder };

        existingCategories.push(fake);

        return fake;

    }

    const [created] = await sbFetch("/rest/v1/categories", {

        method: "POST",

        headers: { Prefer: "return=representation" },

        body: JSON.stringify({ name, course_id: course.id, sort_order: sortOrder })

    });

    existingCategories.push(created);

    return created;

}

async function importCourse(course, existingLectures, existingCategories) {

    const courseDir = path.join(ROOT, course.dir);

    if (!fs.existsSync(courseDir)) {

        console.log(`⚠️  Hittar inte mapp: ${courseDir}`);

        return;

    }

    const { mainImages, slideImages, lectureDocs } = classifyFiles(courseDir);

    console.log(

        `\n=== Kurs ${course.number} (${course.dir}) ===\n` +
        `  ${mainImages.length} bilder, ${slideImages.length} färdiga slides, ${lectureDocs.length} originalföreläsningar`

    );

    const imageBasenames = mainImages.map(f => stripExtension(path.basename(f)));

    // 1. Gruppera originalföreläsningar (PDF/PPTX) per föreläsningstitel, matchade mot bildnamn
    const lectureGroups = new Map();

    for (const filePath of lectureDocs) {

        const basename = stripExtension(path.basename(filePath));

        const matched = extractImageRef(basename, imageBasenames);

        const title = deriveLectureTitle(basename, matched);

        const key = title.trim().toLowerCase();

        if (!lectureGroups.has(key)) {

            lectureGroups.set(key, { title, files: [] });

        }

        lectureGroups.get(key).files.push({ filePath, matched });

    }

    // imageBasename (lowercase) -> lectureId
    const lectureIdByImage = new Map();

    for (const { title, files } of lectureGroups.values()) {

        const lecture = await findOrCreateLecture(course, title, existingLectures);

        let pdfSet = !!lecture.pdf_url;

        for (const { filePath, matched } of files) {

            const ext = path.extname(filePath).toLowerCase();

            if (!pdfSet && (ext === ".pdf" || ext === ".pptx")) {

                const url = await uploadToStorage("slides", `kurs-${course.number}`, filePath);

                if (url) {

                    if (!DRY_RUN) {

                        await sbFetch(`/rest/v1/lectures?id=eq.${lecture.id}`, {

                            method: "PATCH",

                            body: JSON.stringify({ pdf_url: url })

                        });

                    }

                    lecture.pdf_url = url;

                    pdfSet = true;

                }

            }

            if (matched) {

                lectureIdByImage.set(matched.toLowerCase(), lecture.id);

            }

        }

    }

    // 2. Ladda upp huvudbilderna, koppla lecture_id och tema (category_id) om känt
    const imageIdByBasename = new Map();

    let linked = 0;

    let unlinked = 0;

    let themed = 0;

    for (const filePath of mainImages) {

        const basename = stripExtension(path.basename(filePath));

        const lectureId = lectureIdByImage.get(basename.toLowerCase()) ?? null;

        const theme = extractTheme(basename);

        let categoryId = null;

        if (theme) {

            const category = await findOrCreateCategory(course, theme, existingCategories);

            categoryId = category.id;

            themed++;

        }

        const url = await uploadToStorage("images", `kurs-${course.number}`, filePath);

        if (!url) {

            continue;

        }

        let created = { id: `NEW:${basename}` };

        if (!DRY_RUN) {

            [created] = await sbFetch("/rest/v1/images", {

                method: "POST",

                headers: { Prefer: "return=representation" },

                body: JSON.stringify({

                    title: cleanTitle(basename),

                    image_url: url,

                    lecture_id: lectureId,

                    category_id: categoryId,

                    slide_id: null,

                    description: ""

                })

            });

        }

        imageIdByBasename.set(basename.toLowerCase(), created.id);

        if (lectureId) {

            linked++;

        } else if (!theme) {

            unlinked++;

            console.log(`  ⚠️  Varken föreläsning eller tema hittat för bild: ${basename}`);

        }

    }

    // 3. Ladda upp färdiga slides, matcha mot huvudbild via "Kurs N - NN"-prefix, ärv lecture_id
    let slidesLinked = 0;

    let slidesUnlinked = 0;

    for (const filePath of slideImages) {

        const basename = stripExtension(path.basename(filePath));

        const prefix = extractCoursePrefix(basename);

        let matchedImageBasename = null;

        if (prefix) {

            matchedImageBasename = imageBasenames.find(

                img => extractCoursePrefix(img) === prefix

            );

        }

        const lectureId = matchedImageBasename

            ? lectureIdByImage.get(matchedImageBasename.toLowerCase()) ?? null

            : null;

        const url = await uploadToStorage("slides", `kurs-${course.number}`, filePath);

        if (!url) {

            continue;

        }

        let createdSlide = { id: `NEW:${basename}` };

        if (!DRY_RUN) {

            [createdSlide] = await sbFetch("/rest/v1/original_slides", {

                method: "POST",

                headers: { Prefer: "return=representation" },

                body: JSON.stringify({

                    title: cleanTitle(basename),

                    image_url: url,

                    lecture_id: lectureId,

                    page_number: null

                })

            });

        }

        if (matchedImageBasename) {

            const imageId = imageIdByBasename.get(matchedImageBasename.toLowerCase());

            if (imageId && !DRY_RUN) {

                await sbFetch(`/rest/v1/images?id=eq.${imageId}`, {

                    method: "PATCH",

                    body: JSON.stringify({ slide_id: createdSlide.id })

                });

            }

            slidesLinked++;

        } else {

            slidesUnlinked++;

            console.log(`  ⚠️  Ingen matchande bild för färdig slide: ${basename}`);

        }

    }

    console.log(

        `  ✅ Bilder: ${linked} föreläsningskopplade, ${themed} temakopplade, ${unlinked} helt okopplade. ` +
        `Slides: ${slidesLinked} kopplade, ${slidesUnlinked} okopplade. ` +
        `Föreläsningar: ${lectureGroups.size}.`

    );

}

async function main() {

    console.log(DRY_RUN ? "🔎 DRY RUN — inget skrivs till Supabase\n" : "🚀 Kör import mot Supabase\n");

    const existingLectures = await sbFetch("/rest/v1/lectures?select=id,title,course_id,pdf_url");

    const existingCategories = await sbFetch("/rest/v1/categories?select=id,name,course_id");

    for (const course of COURSES) {

        try {

            await importCourse(course, existingLectures, existingCategories);

        } catch (error) {

            console.log(`  ❌ Kurs ${course.number} avbröts: ${error.message}`);

        }

    }

    console.log("\nKlart.");

}

main().catch(error => {

    console.error("Import misslyckades:", error);

    process.exit(1);

});
