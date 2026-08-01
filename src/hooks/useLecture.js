import { useEffect, useState } from "react";

import { getLecture } from "../services/database";

export default function useLecture(id){

    const [lecture,setLecture]=useState(null);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        async function load(){

            const data=await getLecture(id);

            setLecture(data);

            setLoading(false);

        }

        load();

    },[id]);

    return{

        lecture,

        loading

    };

}