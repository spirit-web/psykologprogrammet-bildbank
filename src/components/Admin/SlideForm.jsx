import { useState } from "react";

import AdminSection from "./AdminSection";
import AdminInput from "./AdminInput";
import AdminButton from "./AdminButton.jsx";

import { createSlide } from "../../services/adminDatabase";

import useAdminData from "../../hooks/useAdminData";
import AdminSelect from "./AdminSelect";

function SlideForm({refresh}){

const [lectureId,setLectureId]=useState("");

const {

    lectures

}=useAdminData();

async function save(){

const result=

await createSlide({

lecture_id:Number(lectureId),

});

if(!result){

return;

}

setLectureId("");

refresh?.();

}

return(

<AdminSection title="📑 Ny slide">

<AdminSelect

label="Föreläsning"

value={lectureId}

onChange={e=>setLectureId(e.target.value)}

options={lectures}

labelField="title"

/>

<AdminButton

onClick={save}

>

💾 Spara slide

</AdminButton>

</AdminSection>

)

}

export default SlideForm;