import { useEffect, useState } from "react";

import { supabase } from "../services/supabase";

export default function useCourseImages(courseId) {

    const [images, setImages] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function load() {

            setLoading(true);

            const { data, error } = await supabase

                .from("images")

                .select("*, lectures!inner(course_id)")

                .eq("lectures.course_id", courseId)

                .order("id");

            if (error) {

                console.error(error);

                setImages([]);

            } else {

                setImages(data);

            }

            setLoading(false);

        }

        if (courseId) {

            load();

        }

    }, [courseId]);

    return {

        images,

        loading

    };

}
