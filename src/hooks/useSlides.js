import { useEffect, useState } from "react";

import { getSlides } from "../services/database";

export default function useSlides(lectureId) {

    const [slides, setSlides] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadSlides() {

            const data = await getSlides(lectureId);

            setSlides(data);

            setLoading(false);

        }

        if (lectureId) {

            loadSlides();

        }

    }, [lectureId]);

    return {

        slides,

        loading

    };

}