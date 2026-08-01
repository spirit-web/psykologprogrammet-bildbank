import { useEffect, useState } from "react";

import {

getAllTeachers,

deleteTeacher,

updateTeacher,

getTeacherCourseIds,

getTeacherPrimaryCourseId,

setTeacherCourses

} from "../../services/adminDatabase";

import { uploadFile } from "../../services/storage/storage";

function TeacherList({ teachers: teachersProp, courses=[] }){

const [teachers,setTeachers]=useState(teachersProp ?? []);

const [editing,setEditing]=useState(null);

const [editName,setEditName]=useState("");

const [editImage,setEditImage]=useState("");

const [editBio,setEditBio]=useState("");

const [editCourseIds,setEditCourseIds]=useState([]);

const [editPrimaryCourseId,setEditPrimaryCourseId]=useState(null);

const [editUploading,setEditUploading]=useState(false);

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

async function startEdit(teacher){

setEditing(teacher.id);

setEditName(teacher.name ?? "");

setEditImage(teacher.image_url ?? "");

setEditBio(teacher.bio ?? "");

setEditCourseIds(await getTeacherCourseIds(teacher.id));

setEditPrimaryCourseId(await getTeacherPrimaryCourseId(teacher.id));

}

async function handleEditPhoto(event){

const file = event.target.files[0];

if(!file) return;

setEditUploading(true);

const upload = await uploadFile({

bucket:"images",

folder:"teachers",

file

});

setEditUploading(false);

if(upload){

setEditImage(upload.publicUrl);

}

}

function toggleEditCourse(courseId){

setEditCourseIds(current=>{

const next = current.includes(courseId)

? current.filter(id=>id!==courseId)

: [...current, courseId];

if(!next.includes(courseId) && editPrimaryCourseId===courseId){

setEditPrimaryCourseId(null);

}

return next;

});

}

async function saveEdit(){

await updateTeacher(

editing,

{

name:editName,

image_url:editImage,

bio:editBio

}

);

await setTeacherCourses(editing, editCourseIds, editPrimaryCourseId);

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

type="file"

accept="image/*"

onChange={handleEditPhoto}

/>

{

editUploading &&

<p>Laddar upp bild...</p>

}

{

editImage &&

<img

src={editImage}

alt="Förhandsvisning"

style={{

width:60,

height:60,

borderRadius:"50%",

objectFit:"cover",

marginTop:10,

display:"block"

}}

/>

}

<br/>

<textarea

rows="5"

value={editBio}

onChange={e=>setEditBio(e.target.value)}

/>

<br/><br/>

<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:15}}>

{

courses.map(course=>(

<span

key={course.id}

style={{

display:"flex",

alignItems:"center",

gap:6,

background: editCourseIds.includes(course.id) ? "#214c9d" : "#eee",

color: editCourseIds.includes(course.id) ? "white" : "#333",

padding:"6px 12px",

borderRadius:20,

fontSize:13

}}

>

<label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer"}}>

<input

type="checkbox"

checked={editCourseIds.includes(course.id)}

onChange={()=>toggleEditCourse(course.id)}

style={{display:"none"}}

/>

{course.name}

</label>

{

editCourseIds.includes(course.id) &&

<button

type="button"

onClick={()=>setEditPrimaryCourseId(

editPrimaryCourseId===course.id ? null : course.id

)}

title="Markera som huvudlärare"

style={{

background:"none",

border:"none",

cursor:"pointer",

fontSize:14,

opacity: editPrimaryCourseId===course.id ? 1 : 0.4

}}

>

⭐

</button>

}

</span>

))

}

</div>

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