import { useEffect,useState } from "react";

import { getLectures } from "../services/database";

export default function useLectures(courseId){

    const [lectures,setLectures]=useState([]);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        async function load(){

            setLoading(true);

            const data=await getLectures(courseId);

            setLectures(data);

            setLoading(false);

        }

        if(courseId){

            load();

        } else {

            setLectures([]);

            setLoading(false);

        }

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