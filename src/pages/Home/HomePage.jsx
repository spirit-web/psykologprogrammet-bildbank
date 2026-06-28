import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/Search/SearchBar";
import Timeline from "../../components/Timeline/Timeline";
import CourseGrid from "../../components/Courses/CourseGrid";

import { useState } from "react";

function HomePage(){

    const [selectedTerm,setSelectedTerm]=useState(1);

    return(

        <>

            <Navbar/>

            <Hero/>

            <SearchBar/>

            <Timeline

                selectedTerm={selectedTerm}

                setSelectedTerm={setSelectedTerm}

            />

            <CourseGrid

                selectedTerm={selectedTerm}

            />

        </>

    )

}

export default HomePage;