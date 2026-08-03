const SKIN_TONES = ["614335", "d08b5b", "ae5d29", "edb98a", "ffdbb4", "fd9841", "f8d25c"];

const HAIR_COLORS = ["a55728", "2c1b18", "b58143", "d6b370", "724133", "4a312c", "c93305", "e8e1e1"];

const NEUTRAL_TOPS = ["shortFlat", "shortRound", "shortWaved", "bob", "straight02"];

// Hand-picked traits per case so the avatar's expression/appearance matches
// that person's actual case narrative (mood/severity) rather than a random look.
const CASE_AVATARS = {

    "Emma, 23 år": { top: "straight02", hairColor: "4a312c", skinColor: "edb98a", mouth: "concerned", eyebrows: "sadConcernedNatural", eyes: "default" },
    "Johan, 35 år": { top: "shortWaved", facialHair: "beardLight", hairColor: "a55728", facialHairColor: "a55728", skinColor: "ffdbb4", mouth: "concerned", eyebrows: "sadConcernedNatural", eyes: "default" },
    "Fatima, 52 år": { top: "hijab", hairColor: "2c1b18", skinColor: "ae5d29", mouth: "sad", eyebrows: "sadConcernedNatural", eyes: "cry" },

    "Linus, 19 år": { top: "shaggy", hairColor: "d6b370", skinColor: "ffdbb4", mouth: "sad", eyebrows: "sadConcernedNatural", eyes: "default" },
    "Sofia, 42 år": { top: "bob", hairColor: "724133", skinColor: "edb98a", mouth: "sad", eyebrows: "sadConcernedNatural", eyes: "default" },
    "Henrik, 58 år": { top: "shortRound", facialHair: "beardMedium", hairColor: "e8e1e1", facialHairColor: "e8e1e1", skinColor: "ffdbb4", mouth: "sad", eyebrows: "sadConcernedNatural", eyes: "closed" },

    "Elias, 11 år": { top: "shortFlat", hairColor: "2c1b18", skinColor: "edb98a", mouth: "serious", eyebrows: "flatNatural", eyes: "default" },
    "Sara, 27 år": { top: "straight01", hairColor: "c93305", skinColor: "f8d25c", mouth: "concerned", eyebrows: "raisedExcitedNatural", eyes: "squint" },
    "Anton, 35 år": { top: "shortFlat", hairColor: "2c1b18", skinColor: "d08b5b", mouth: "default", eyebrows: "flatNatural", eyes: "default" },

    "Klara, 24 år": { top: "curly", hairColor: "b58143", skinColor: "ffdbb4", mouth: "smile", eyebrows: "defaultNatural", eyes: "default" },
    "Peter, 39 år": { top: "theCaesar", facialHair: "beardMedium", hairColor: "724133", facialHairColor: "724133", skinColor: "edb98a", mouth: "concerned", eyebrows: "sadConcernedNatural", eyes: "default" },
    "Lars, 61 år": { top: "shortRound", facialHair: "beardMajestic", hairColor: "e8e1e1", facialHairColor: "e8e1e1", skinColor: "ffdbb4", mouth: "sad", eyebrows: "sadConcernedNatural", eyes: "squint" },

    "Leo, 10 år": { top: "frizzle", hairColor: "a55728", skinColor: "d08b5b", mouth: "twinkle", eyebrows: "raisedExcitedNatural", eyes: "happy" },
    "Amanda, 31 år": { top: "curly", hairColor: "c93305", skinColor: "edb98a", mouth: "concerned", eyebrows: "upDownNatural", eyes: "default" },
    "Tomas, 45 år": { top: "shortWaved", hairColor: "2c1b18", skinColor: "ae5d29", mouth: "sad", eyebrows: "sadConcernedNatural", eyes: "default" },

    "Maja, 16 år": { top: "longButNotTooLong", hairColor: "d6b370", skinColor: "ffdbb4", mouth: "concerned", eyebrows: "sadConcernedNatural", eyes: "default" },
    "Erik, 25 år": { top: "shortCurly", hairColor: "4a312c", skinColor: "edb98a", mouth: "serious", eyebrows: "sadConcernedNatural", eyes: "default" },
    "Anna, 34 år": { top: "straightAndStrand", hairColor: "2c1b18", skinColor: "ffdbb4", mouth: "sad", eyebrows: "sadConcernedNatural", eyes: "squint" },

    "Elin, 17 år": { top: "bun", hairColor: "b58143", skinColor: "edb98a", mouth: "concerned", eyebrows: "upDownNatural", eyes: "default" },
    "Max, 29 år": { top: "shortFlat", hairColor: "2c1b18", skinColor: "d08b5b", mouth: "default", eyebrows: "defaultNatural", eyes: "default" },
    "Johanna, 41 år": { top: "curvy", hairColor: "c93305", skinColor: "ffdbb4", mouth: "sad", eyebrows: "angryNatural", eyes: "cry" },

    "Kevin, 15 år": { top: "shaggyMullet", hairColor: "2c1b18", skinColor: "f8d25c", mouth: "smile", eyebrows: "defaultNatural", eyes: "happy" },
    "Johanna, 28 år": { top: "straight02", hairColor: "724133", skinColor: "edb98a", mouth: "concerned", eyebrows: "sadConcernedNatural", eyes: "default" },
    "Mikael, 52 år": { top: "theCaesarAndSidePart", facialHair: "beardLight", hairColor: "e8e1e1", facialHairColor: "e8e1e1", skinColor: "ffdbb4", mouth: "sad", eyebrows: "sadConcernedNatural", eyes: "default", accessories: "wayfarers" },

    "Nora, 22 år": { top: "miaWallace", hairColor: "4a312c", skinColor: "edb98a", mouth: "default", eyebrows: "defaultNatural", eyes: "default" },
    "Daniel, 35 år": { top: "sides", hairColor: "2c1b18", skinColor: "d08b5b", mouth: "concerned", eyebrows: "sadConcernedNatural", eyes: "default" },
    "Fatima, 47 år": { top: "hijab", hairColor: "2c1b18", skinColor: "ae5d29", mouth: "sad", eyebrows: "sadConcernedNatural", eyes: "squint" }

};

function hashString(str) {

    let hash = 0;

    for (let i = 0; i < str.length; i++) {

        hash = (hash * 31 + str.charCodeAt(i)) >>> 0;

    }

    return hash;

}

function pick(array, hash, salt) {

    return array[(hash + salt) % array.length];

}

// Cases added later (not in the curated list above) still get a deterministic,
// varied look derived from their name instead of a generic default avatar.
function fallbackTraits(name) {

    const hash = hashString(name);

    return {
        top: pick(NEUTRAL_TOPS, hash, 1),
        hairColor: pick(HAIR_COLORS, hash, 2),
        skinColor: pick(SKIN_TONES, hash, 3),
        mouth: "default",
        eyebrows: "defaultNatural",
        eyes: "default"
    };

}

export function getAvatarUrl(name) {

    const trimmed = (name || "case").trim();

    const traits = CASE_AVATARS[trimmed] || fallbackTraits(trimmed);

    const params = new URLSearchParams();

    params.set("seed", trimmed);
    params.set("radius", "50");
    params.append("top[]", traits.top);
    params.append("hairColor[]", traits.hairColor);
    params.append("skinColor[]", traits.skinColor);
    params.append("mouth[]", traits.mouth);
    params.append("eyebrows[]", traits.eyebrows);
    params.append("eyes[]", traits.eyes);

    // DiceBear rolls its own random chance for facial hair and accessories
    // unless we pin the probability explicitly - without this, avatars
    // could randomly end up with an unwanted beard or glasses.
    if (traits.facialHair) {

        params.append("facialHair[]", traits.facialHair);
        params.append("facialHairColor[]", traits.facialHairColor || traits.hairColor);
        params.set("facialHairProbability", "100");

    } else {

        params.set("facialHairProbability", "0");

    }

    if (traits.accessories) {

        params.append("accessories[]", traits.accessories);
        params.set("accessoriesProbability", "100");

    } else {

        params.set("accessoriesProbability", "0");

    }

    return `https://api.dicebear.com/9.x/avataaars/svg?${params.toString()}`;

}

const CATEGORY_COLORS = {

    "ADHD": { bg: "#FFF6D6", border: "#E0B400", label: "#8A6D00" },
    "Ångestsyndrom": { bg: "#FFFFFF", border: "#D9D9D9", label: "#555" },
    "Ätstörningar": { bg: "#E3F5E6", border: "#43A047", label: "#2E7D32" },
    "Autism": { bg: "#E3EEFC", border: "#1E88E5", label: "#1565C0" },
    "Borderline": { bg: "#FBE4E4", border: "#E53935", label: "#C62828" },
    "Depression": { bg: "#EDEDED", border: "#9E9E9E", label: "#616161" },
    "Missbruk/beroende": { bg: "#F1E3F7", border: "#9C27B0", label: "#7B1FA2" },
    "Spelberoende": { bg: "#EFE3DA", border: "#795548", label: "#5D4037" },
    "Tvångssyndrom": { bg: "#E2E2E2", border: "#212121", label: "#212121" }

};

const DEFAULT_COLOR = { bg: "#F4F4F4", border: "#999", label: "#555" };

export function getCategoryColor(category) {

    return CATEGORY_COLORS[category] || DEFAULT_COLOR;

}

export const CASE_CATEGORIES = Object.keys(CATEGORY_COLORS);
