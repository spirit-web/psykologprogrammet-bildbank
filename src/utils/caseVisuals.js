export function getAvatarUrl(name) {

    const seed = encodeURIComponent((name || "case").trim());

    return `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&radius=50`;

}

const CATEGORY_COLORS = {

    "ADHD": { bg: "#FFF6D6", border: "#E0B400", label: "#8A6D00" },
    "Ångestsyndrom": { bg: "#FFFFFF", border: "#D9D9D9", label: "#555" },
    "Ätstörningar": { bg: "#E3F5E6", border: "#43A047", label: "#2E7D32" },
    "Autism": { bg: "#E3EEFC", border: "#1E88E5", label: "#1565C0" },
    "Borderline personlighetssyndrom / Emotionellt instabilt personlighetssyndrom": { bg: "#FBE4E4", border: "#E53935", label: "#C62828" },
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
