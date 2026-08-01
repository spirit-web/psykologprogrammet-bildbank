import { useEffect, useState } from "react";

import { getCourse } from "../services/database";

export default function useCourse(id){

    const [course,setCourse]=useState(null);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        async function loadCourse(){

            const data=await getCourse(id);

            setCourse(data);

            setLoading(false);

        }

        loadCourse();

    },[id]);

    return{

        course,

        loading

    };

}