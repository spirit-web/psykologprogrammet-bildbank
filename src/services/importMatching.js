export function stripExtension(filename) {

    return filename.replace(/\.[^./]+$/, "");

}

/**
 * Original lecture files are named "<Föreläsningsnamn> - <bildens filnamn utan ändelse>.pdf".
 * Given a lecture filename and the known image basenames, find which image it points to
 * by checking which known image name the lecture filename ends with (after " - ").
 * Longest candidates are tried first so a more specific title wins over a shorter partial one.
 */
export function extractImageRef(lectureBasename, knownImageBasenames) {

    const lowerLecture = lectureBasename.toLowerCase().trim();

    const sorted = [...knownImageBasenames].sort(
        (a, b) => b.length - a.length
    );

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

/**
 * Everything before the matched image name (and its separating " - ") is the lecture title.
 * If no image matched, the whole filename is treated as the lecture title.
 */
export function deriveLectureTitle(lectureBasename, matchedImageBasename) {

    if (!matchedImageBasename) {

        return lectureBasename.trim();

    }

    const cutLength =
        lectureBasename.length - (matchedImageBasename.length + 3);

    if (cutLength <= 0) {

        return lectureBasename.trim();

    }

    return lectureBasename.slice(0, cutLength).trim();

}

export function sameTitle(a, b) {

    return (a ?? "").trim().toLowerCase() === (b ?? "").trim().toLowerCase();

}

/**
 * Gör om ett rått filnamn ("Kurs 2 - 11 - Autonoma nervsystemet - JA.png") till en
 * läsbar titel ("Autonoma nervsystemet") genom att strippa kursprefix och JA/Slide-suffix.
 */
export function cleanTitle(filename) {

    let title = stripExtension(filename);

    title = title.replace(/^Kurs\s*\d+\s*-\s*\d+(\.\d+)?\s*-?\s*/i, "");

    title = title.replace(/\s*-\s*JA$/i, "");

    title = title.replace(/\s*-\s*Slide$/i, "");

    title = title.replace(/[_-]/g, " ").replace(/\s+/g, " ").trim();

    return title || stripExtension(filename).trim();

}

/**
 * Groups lecture-side files (PDFs / slide images) by the lecture title they imply,
 * matching each one against the pool of image basenames from this import batch.
 *
 * Returns a Map<lectureTitle, { file, matchedImageBasename }[]>
 */
export function groupLectureFilesByTitle(lectureFiles, imageBasenames) {

    const groups = new Map();

    for (const file of lectureFiles) {

        const basename = stripExtension(file.name);

        const matchedImageBasename = extractImageRef(basename, imageBasenames);

        const title = deriveLectureTitle(basename, matchedImageBasename);

        const key = title.trim().toLowerCase();

        if (!groups.has(key)) {

            groups.set(key, { title, items: [] });

        }

        groups.get(key).items.push({ file, matchedImageBasename });

    }

    return groups;

}
