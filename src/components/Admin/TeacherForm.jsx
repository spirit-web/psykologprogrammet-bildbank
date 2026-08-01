import { useState } from "react";

import {

createTeacher

} from "../../services/adminDatabase";

function TeacherForm(){

const [name,setName]=useState("");

const [image,setImage]=useState("");

async function save(){

const success=

await createTeacher({

name,

});

if(success){

alert("Lärare sparad!");

setName("");

setTitle("");

setEmail("");

setImage("");

setBio("");

}

}

return(

<div>

<h2>

Ny lärare

</h2>

<input

placeholder="Namn"

value={name}

onChange={e=>setName(e.target.value)}

/>

<br/><br/>

<button

onClick={save}

>

Spara lärare

</button>

</div>

)

}

export default TeacherForm;