import { useEffect,useState } from "react";

import {

    getAllCourses,

    getAllLectures,

    getAllTeachers,

    getAllCategories,

    getAllSlides

} from "../services/adminDatabase";

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

        setCategories(await getAllCategories());

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