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

    return{

        lectures,

        loading

    };

}