import { useEffect,useState } from "react";

import { getLectures } from "../services/database";

export default function useLectures(courseId){

    const [lectures,setLectures]=useState([]);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        async function load(){

            const data=await getLectures(courseId);

            setLectures(data);

            setLoading(false);

        }

        load();

    },[courseId]);

    function bumpImageCount(lectureId){

        setLectures(current =>

            current.map(lecture =>

                lecture.id === lectureId

                    ? { ...lecture, images: (lecture.images ?? 0) + 1 }

                    : lecture

            )

        );

    }

    return{

        lectures,

        loading,

        bumpImageCount

    };

}