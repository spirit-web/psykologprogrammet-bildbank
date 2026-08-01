import { useEffect, useState } from "react";

import {

    getAllCourses

} from "../services/adminDatabase";

export default function useCourses() {

    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(true);

    async function loadCourses() {

        setLoading(true);

        const data = await getAllCourses();

        setCourses(data);

        setLoading(false);

    }

    useEffect(() => {

        loadCourses();

    }, []);

    return {

        courses,

        loading,

        reload: loadCourses

    };

}