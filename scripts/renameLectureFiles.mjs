// Engångsskript: byter namn på de lokala originalföreläsnings-filerna
// (PDF/PPTX i "Psykolog Verktyg/Kurs N/.../Föreläsningar/") så de matchar
// de uppdaterade titlarna som nu ligger i admin-panelen.
//
//   node scripts/renameLectureFiles.mjs --dry-run   (visar plan, byter inget)
//   node scripts/renameLectureFiles.mjs             (byter namn på riktigt)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "Psykolog Verktyg");

const SUPABASE_URL = "https://jxhmuucbxxulvpdwgspk.supabase.co";
const SUPABASE_KEY = "sb_publishable_pNZSsnwsOImyElR45K5UTw_CiBgfd0y";

const DRY_RUN = process.argv.includes("--dry-run");

const COURSES = [
    { number: 1, id: 7, dir: "Kurs 1 - Introduktion Psykologi" },
    { number: 2, id: 15, dir: "Kurs 2 - Biologi" },
    { number: 3, id: 16, dir: "Kurs 3 - Experimentell psykologi" },
    { number: 4, id: 17, dir: "Kurs 4 - Kognitiva processer" },
    { number: 5, id: 20, dir: "Kurs 5 - Socialpsykologi" }
];

const EXCLUDE_DIR = /osäker|gamla versioner|dubletter/i;
const LECTURE_EXT = /\.(pdf|pptx)$/i;

function walk(dir) {

    let results = [];

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {

        if (entry.isDirectory()) {

            if (EXCLUDE_DIR.test(entry.name)) continue;

            results = results.concat(walk(path.join(dir, entry.name)));

        } else if (LECTURE_EXT.test(entry.name)) {

            results.push(path.join(dir, entry.name));

        }

    }

    return results;

}

function sanitizeFilename(name) {

    return name

        .normalize("NFD")

        .replace(/[̀-ͯ]/g, "")

        .replace(/[^a-zA-Z0-9._-]/g, "_");

}

function safeTitleForFilesystem(title) {

    return title

        .replace(/[<>:"/\\|?*]/g, "")

        .trim();

}

function uniqueTarget(dir, baseName, ext, taken) {

    let candidate = `${baseName}${ext}`;

    let n = 2;

    while (

        taken.has(candidate.toLowerCase()) ||

        fs.existsSync(path.join(dir, candidate))

    ) {

        candidate = `${baseName} (${n})${ext}`;

        n++;

    }

    taken.add(candidate.toLowerCase());

    return candidate;

}

async function main() {

    const res = await fetch(SUPABASE_URL + "/rest/v1/lectures?select=id,title,course_id,pdf_url&order=id", {

        headers: { apikey: SUPABASE_KEY, Authorization: "Bearer " + SUPABASE_KEY }

    });

    const lectures = await res.json();

    console.log(DRY_RUN ? "🔎 DRY RUN — byter inga filnamn\n" : "🚀 Byter filnamn på riktigt\n");

    let renamed = 0;

    let unmatched = 0;

    let alreadyCorrect = 0;

    for (const course of COURSES) {

        const courseDir = path.join(ROOT, course.dir);

        if (!fs.existsSync(courseDir)) continue;

        const localFiles = walk(courseDir);

        const bySanitized = new Map();

        for (const filePath of localFiles) {

            bySanitized.set(sanitizeFilename(path.basename(filePath)), filePath);

        }

        const taken = new Set();

        const courseLectures = lectures.filter(l => l.course_id === course.id && l.pdf_url);

        console.log(`\n=== Kurs ${course.number} (${course.dir}) — ${courseLectures.length} föreläsningar ===`);

        for (const lecture of courseLectures) {

            const objectName = decodeURIComponent(lecture.pdf_url.split("/").pop());

            const sanitizedOriginal = objectName.replace(/^\d+-/, "");

            const localPath = bySanitized.get(sanitizedOriginal);

            if (!localPath) {

                unmatched++;

                console.log(`  ⚠️  Hittar ingen lokal fil för: "${lecture.title}" (letade efter ${sanitizedOriginal})`);

                continue;

            }

            const dir = path.dirname(localPath);

            const ext = path.extname(localPath);

            const currentBase = path.basename(localPath, ext);

            const desiredBase = safeTitleForFilesystem(lecture.title);

            if (currentBase === desiredBase) {

                alreadyCorrect++;

                continue;

            }

            const targetName = uniqueTarget(dir, desiredBase, ext, taken);

            const targetPath = path.join(dir, targetName);

            console.log(`  📄 "${path.basename(localPath)}" → "${targetName}"`);

            if (!DRY_RUN) {

                fs.renameSync(localPath, targetPath);

            }

            renamed++;

        }

    }

    console.log(`\nKlart. ${renamed} filer ${DRY_RUN ? "skulle bytas" : "byttes"}, ${alreadyCorrect} redan korrekta, ${unmatched} kunde inte matchas.`);

}

main().catch(error => {

    console.error("Misslyckades:", error);

    process.exit(1);

});
