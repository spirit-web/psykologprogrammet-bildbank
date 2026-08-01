// Engångsskript: sätter lectures.featured = true för föreläsningar vars original-PDF
// låg under en "Extra viktiga föreläsningar"-mapp i källmaterialet. Körs med:
//   node scripts/markFeaturedLectures.mjs --dry-run
//   node scripts/markFeaturedLectures.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "Psykolog Verktyg");

const SUPABASE_URL = "https://jxhmuucbxxulvpdwgspk.supabase.co";
const SUPABASE_KEY = "sb_publishable_pNZSsnwsOImyElR45K5UTw_CiBgfd0y";

const DRY_RUN = process.argv.includes("--dry-run");

function stripExtension(filename) {

    return filename.replace(/\.[^./]+$/, "");

}

function extractImageRef(lectureBasename, knownImageBasenames) {

    const lowerLecture = lectureBasename.toLowerCase().trim();

    const sorted = [...knownImageBasenames].sort((a, b) => b.length - a.length);

    for (const imageBasename of sorted) {

        const lowerImage = imageBasename.toLowerCase().trim();

        if (lowerLecture === lowerImage) return imageBasename;

        if (lowerLecture.endsWith(" - " + lowerImage)) return imageBasename;

    }

    return null;

}

function deriveLectureTitle(lectureBasename, matchedImageBasename) {

    if (!matchedImageBasename) return lectureBasename.trim();

    const cutLength = lectureBasename.length - (matchedImageBasename.length + 3);

    if (cutLength <= 0) return lectureBasename.trim();

    return lectureBasename.slice(0, cutLength).trim();

}

function walk(dir) {

    let results = [];

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {

        if (entry.isDirectory()) {

            results = results.concat(walk(path.join(dir, entry.name)));

        } else {

            results.push(path.join(dir, entry.name));

        }

    }

    return results;

}

const COURSES = [
    { number: 1, dir: "Kurs 1 - Introduktion Psykologi" },
    { number: 2, dir: "Kurs 2 - Biologi" },
    { number: 3, dir: "Kurs 3 - Experimentell psykologi" },
    { number: 4, dir: "Kurs 4 - Kognitiva processer" },
    { number: 5, dir: "Kurs 5 - Socialpsykologi" }
];

async function sbFetch(pathname, options = {}) {

    const res = await fetch(SUPABASE_URL + pathname, {

        ...options,

        headers: {

            apikey: SUPABASE_KEY,

            Authorization: "Bearer " + SUPABASE_KEY,

            ...(options.body ? { "Content-Type": "application/json" } : {}),

            ...(options.headers || {})

        }

    });

    if (!res.ok) {

        throw new Error(`${options.method || "GET"} ${pathname} -> ${res.status}: ${await res.text()}`);

    }

    if (res.status === 204) return null;

    return res.json();

}

async function main() {

    const lectures = await sbFetch("/rest/v1/lectures?select=id,title");

    let totalMatched = 0;

    for (const course of COURSES) {

        const courseDir = path.join(ROOT, course.dir);

        if (!fs.existsSync(courseDir)) continue;

        const allFiles = walk(courseDir);

        const imageBasenames = allFiles

            .filter(f => /\.(png|jpe?g)$/i.test(f) && !/osäker|gamla versioner/i.test(f) && !/slide/i.test(f))

            .map(f => stripExtension(path.basename(f)));

        const featuredFiles = allFiles.filter(

            f => /extra viktiga/i.test(f) && !/dubletter/i.test(f) && /\.(pdf|pptx)$/i.test(f)

        );

        for (const filePath of featuredFiles) {

            const basename = stripExtension(path.basename(filePath));

            const matched = extractImageRef(basename, imageBasenames);

            const title = deriveLectureTitle(basename, matched);

            const lecture = lectures.find(

                l => l.title.trim().toLowerCase() === title.trim().toLowerCase()

            );

            if (!lecture) {

                console.log(`  ⚠️  Ingen föreläsning matchade: "${title}" (Kurs ${course.number})`);

                continue;

            }

            console.log(`  ⭐ Kurs ${course.number}: "${lecture.title}"`);

            totalMatched++;

            if (!DRY_RUN) {

                await sbFetch(`/rest/v1/lectures?id=eq.${lecture.id}`, {

                    method: "PATCH",

                    body: JSON.stringify({ featured: true })

                });

            }

        }

    }

    console.log(`\n${totalMatched} föreläsningar markerade som extra viktiga.`);

}

main().catch(error => {

    console.error("Misslyckades:", error);

    process.exit(1);

});
