import { useState } from "react";

import AdminSection from "./AdminSection";
import AdminInput from "./AdminInput";
import AdminTextarea from "./AdminTextarea";
import AdminButton from "./AdminButton.jsx";

import { createLecture } from "../../services/adminDatabase";

import useAdminData from "../../hooks/useAdminData";
import AdminSelect from "./AdminSelect";

function LectureForm({ refresh }) {

    const [title, setTitle] = useState("");

    const [courseId, setCourseId] = useState(1);
    const { courses } = useAdminData();

    const [teacher, setTeacher] = useState("");

    async function save() {

        const result = await createLecture({

            title,

            course_id: Number(courseId),

            teacher,

        });

        if (!result) {

            return;

        }

        setTitle("");

        setCourseId(1);

        setTeacher("");

        if (refresh) {

            refresh();

        }

    }

    return (

        <AdminSection

            title="🎓 Ny föreläsning"

        >

            <AdminInput

                placeholder="Titel"

                value={title}

                onChange={e=>setTitle(e.target.value)}

            />

            <AdminSelect
            label="Kurs"
            value={courseId}
            onChange={e=>setCourseId(e.target.value)}
            options={courses}
            />

            <AdminInput

                placeholder="Lärare"

                value={teacher}

                onChange={e=>setTeacher(e.target.value)}

            />

            <AdminButton

                onClick={save}

            >

                💾 Spara föreläsning

            </AdminButton>

        </AdminSection>

    );

}

export default LectureForm;