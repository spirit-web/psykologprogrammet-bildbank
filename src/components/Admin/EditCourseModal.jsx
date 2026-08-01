import { useState,useEffect } from "react";

import {

updateCourse

}

from "../../services/adminDatabase";

function EditCourseModal({

course,

onClose,

onSaved

}){

const [name,setName]=useState("");

const [teacher,setTeacher]=useState("");

const [credits,setCredits]=useState("");

const [description,setDescription]=useState("");

useEffect(()=>{

if(course){

setName(course.name);

setTeacher(course.teacher);

setCredits(course.credits);

setDescription(course.description);

}

},[course]);

async function save(){

await updateCourse(

course.id,

{

name,

teacher,

credits,

description

}

);

onSaved();

onClose();

}

if(!course) return null;

return(

<div

style={{

position:"fixed",

inset:0,

background:"rgba(0,0,0,.45)",

display:"flex",

justifyContent:"center",

alignItems:"center"

}}

>

<div

style={{

background:"white",

padding:"40px",

borderRadius:"18px",

width:"600px"

}}

>

<h2>

Redigera kurs

</h2>

<input

value={name}

onChange={e=>setName(e.target.value)}

/>

<br/><br/>

<input

value={teacher}

onChange={e=>setTeacher(e.target.value)}

/>

<br/><br/>

<input

value={credits}

onChange={e=>setCredits(e.target.value)}

/>

<br/><br/>

<textarea

rows="5"

value={description}

onChange={e=>

setDescription(e.target.value)

}

/>

<br/><br/>

<button

onClick={save}

>

Spara

</button>

<button

onClick={onClose}

>

Avbryt

</button>

</div>

</div>

)

}

export default EditCourseModal;