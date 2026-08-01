import { useEffect, useState } from "react";

import {

getAllTeachers,

deleteTeacher,

updateTeacher

} from "../../services/adminDatabase";

function TeacherList({ teachers: teachersProp }){

const [teachers,setTeachers]=useState(teachersProp ?? []);

const [editing,setEditing]=useState(null);

const [editName,setEditName]=useState("");

const [editTitle,setEditTitle]=useState("");

const [editEmail,setEditEmail]=useState("");

const [editImage,setEditImage]=useState("");

const [editBio,setEditBio]=useState("");

async function load(){

const data=

await getAllTeachers();

setTeachers(data);

}

useEffect(()=>{

load();

},[teachersProp]);

async function remove(id){

if(

!window.confirm(

"Ta bort läraren?"

)

){

return;

}

await deleteTeacher(id);

load();

}

function startEdit(teacher){

setEditing(teacher.id);

setEditName(teacher.name);

setEditTitle(teacher.title);

setEditEmail(teacher.email);

setEditImage(teacher.image_url);

setEditBio(teacher.bio);

}

async function saveEdit(){

await updateTeacher(

editing,

{

name:editName,

title:editTitle,

email:editEmail,

image_url:editImage,

bio:editBio

}

);

setEditing(null);

load();

}

return(

<div>

<h2>

👨‍🏫 Alla lärare

</h2>

{

teachers.map(teacher=>

<div

key={teacher.id}

style={{

border:"1px solid #ddd",

padding:"20px",

marginBottom:"15px",

borderRadius:"10px",

display:"flex",

justifyContent:"space-between",

alignItems:"center"

}}

>

<div>

{teacher.image_url && <img

src={teacher.image_url}

alt={teacher.name}

style={{

width:"70px",

height:"70px",

borderRadius:"50%",

objectFit:"cover",

marginBottom:"10px"

}}

/>}

<h3>

{teacher.name}

</h3>

<p>

{teacher.title}

</p>

</div>

{

editing===teacher.id && (

<div

style={{

padding:"20px",

background:"#fafafa",

borderRadius:"10px",

marginBottom:"25px"

}}

>

<input

value={editName}

onChange={e=>setEditName(e.target.value)}

placeholder="Namn"

/>

<br/><br/>

<input

value={editTitle}

onChange={e=>setEditTitle(e.target.value)}

placeholder="Titel"

/>

<br/><br/>

<input

value={editEmail}

onChange={e=>setEditEmail(e.target.value)}

placeholder="Email"

/>

<br/><br/>

<input

value={editImage}

onChange={e=>setEditImage(e.target.value)}

placeholder="Bild"

/>

<br/><br/>

<textarea

rows="5"

value={editBio}

onChange={e=>setEditBio(e.target.value)}

/>

<br/><br/>

<button

onClick={saveEdit}

>

💾 Spara

</button>

<button

onClick={()=>setEditing(null)}

style={{marginLeft:"15px"}}

>

Avbryt

</button>

</div>

)

}

<div>

<button

onClick={()=>startEdit(teacher)}

>

✏️

</button>

<button

onClick={()=>remove(teacher.id)}

>

🗑

</button>

</div>

</div>

)

}

</div>

)

}

export default TeacherList;