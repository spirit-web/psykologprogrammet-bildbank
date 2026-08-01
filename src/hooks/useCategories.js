import { useEffect, useState } from "react";

import { getCategories } from "../services/database";

export default function useCategories(courseId) {

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadCategories() {

            const data = await getCategories(courseId);

            setCategories(data);

            setLoading(false);

        }

        if (courseId) {

            loadCategories();

        }

    }, [courseId]);

    return {

        categories,

        loading

    };

}