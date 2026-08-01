import { useEffect, useState } from "react";

const STORAGE_KEY = "psykopedia_favorites";

function readStoredIds() {

    try {

        const raw = localStorage.getItem(STORAGE_KEY);

        return raw ? JSON.parse(raw) : [];

    } catch {

        return [];

    }

}

export default function useFavorites() {

    const [favoriteIds, setFavoriteIds] = useState(readStoredIds);

    useEffect(() => {

        localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));

    }, [favoriteIds]);

    function isFavorite(imageId) {

        return favoriteIds.includes(imageId);

    }

    function toggleFavorite(imageId) {

        setFavoriteIds(current =>

            current.includes(imageId)

                ? current.filter(id => id !== imageId)

                : [...current, imageId]

        );

    }

    return {

        favoriteIds,

        isFavorite,

        toggleFavorite

    };

}
