import { useEffect, useState } from "react";

import { getImages } from "../services/database";

export default function useImages(lectureId) {

    const [images, setImages] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadImages() {

            const data = await getImages(lectureId);

            setImages(data);

            setLoading(false);

        }

        if (lectureId) {

            loadImages();

        }

    }, [lectureId]);

    function addImage(image) {

        setImages(current => [...current, image]);

    }

    return {

        images,

        loading,

        addImage

    };

}