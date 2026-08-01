import { useState } from "react";

import AdminSection from "./AdminSection";
import AdminInput from "./AdminInput";
import AdminTextarea from "./AdminTextarea";
import AdminButton from "./AdminButton.jsx";

import { createCourse } from "../../services/adminDatabase";

import useAdminData from "../../hooks/useAdminData";

import AdminSelect from "./AdminSelect";

import FileUpload from "../FileUpload/FileUpload";

function CourseForm({ refresh }) {

    const [name, setName] = useState("");

    const [teacher, setTeacher] = useState("");
    const {teachers

    }=useAdminData();

    const [credits, setCredits] = useState("");

    const [termId, setTermId] = useState(1);

    const [cover, setCover] = useState("");

    async function save() {

        const result = await createCourse({

            name,

            teacher,

            credits: Number(credits),

            description,

            term_id: Number(termId),

            cover

        });

        if (!result) {

            return;

        }

        setName("");

        setTeacher("");

        setCredits("");

        setTermId(1);

        if (refresh) {

            refresh();

        }

    }

    return (

        <AdminSection

            title="➕ Ny kurs"

        >

            <AdminInput

                placeholder="Kursnamn"

                value={name}

                onChange={e =>

                    setName(e.target.value)

                }

            />

            <AdminSelect

            value={teacher}

            onChange={e=>

            setTeacher(e.target.value)

            }

            options={teachers}

            labelKey="name"

            />

            <AdminInput

                placeholder="Högskolepoäng"

                value={credits}

                onChange={e =>

                    setCredits(e.target.value)

                }

            />

            <AdminSelect

            label="Termin"

            value={termId}

            onChange={e=>setTermId(e.target.value)}

            options={[

            {id:1,name:"Termin 1"},

            {id:2,name:"Termin 2"},

            {id:3,name:"Termin 3"},

            {id:4,name:"Termin 4"},

            {id:5,name:"Termin 5"},

            {id:6,name:"Termin 6"},

            {id:7,name:"Termin 7"},

            {id:8,name:"Termin 8"},

            {id:9,name:"Termin 9"},

            {id:10,name:"Termin 10"}

            ]}

            />

            <FileUpload

                bucket="images"

                folder="covers"

                onUploaded={setCover}

            />

            <br />

            <AdminButton

                onClick={save}

            >

                💾 Spara kurs

            </AdminButton>

        </AdminSection>

    );

}

export default CourseForm;