import { useEffect, useState } from "react";

import { supabase } from "../services/supabase";

export default function useCourseSlides(courseId) {

    const [slides, setSlides] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function load() {

            setLoading(true);

            const { data, error } = await supabase

                .from("original_slides")

                .select("*, lectures!inner(course_id)")

                .eq("lectures.course_id", courseId)

                .order("id");

            if (error) {

                console.error(error);

                setSlides([]);

            } else {

                setSlides(data);

            }

            setLoading(false);

        }

        if (courseId) {

            load();

        }

    }, [courseId]);

    return {

        slides,

        loading

    };

}
