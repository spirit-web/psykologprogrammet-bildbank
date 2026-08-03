import { useEffect,useState } from "react";

import {

    getAllCourses,

    getAllLectures,

    getAllTeachers,

    getAllSlides

} from "../services/adminDatabase";

import { getThemes } from "../services/themes";

function useAdminData(){

    const [courses,setCourses]=useState([]);

    const [lectures,setLectures]=useState([]);

    const [teachers,setTeachers]=useState([]);

    const [categories,setCategories]=useState([]);

    const [slides,setSlides]=useState([]);

    async function load(){

        setCourses(await getAllCourses());

        setLectures(await getAllLectures());

        setTeachers(await getAllTeachers());

        setCategories(await getThemes());

        setSlides(await getAllSlides());

    }

    useEffect(()=>{

        load();

    },[]);

    return{

        courses,

        lectures,

        teachers,

        categories,

        slides,

        refresh:load

    };

}

export default useAdminData;