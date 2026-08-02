import { useState } from "react";

import AdminSection from "./AdminSection";
import AdminInput from "./AdminInput";
import AdminSelect from "./AdminSelect";
import AdminButton from "./AdminButton.jsx";

import { createCategory } from "../../services/adminDatabase";
import useAdminData from "../../hooks/useAdminData";
import EmojiPicker from "./EmojiPicker";

function CategoryForm({ refresh }) {

    const { courses } = useAdminData();

    const [name, setName] = useState("");

    const [icon, setIcon] = useState("🧠");

    const [courseId, setCourseId] = useState("");

    async function saveCategory() {

        if (!name.trim()) {

            alert("Skriv in ett namn på kategorin.");

            return;

        }

        if (!courseId) {

            alert("Välj vilken kurs kategorin hör till.");

            return;

        }

        const success = await createCategory({

            name,

            icon,

            course_id: Number(courseId),

            sort_order: 1

        });

        if (success) {

            setName("");

            setIcon("🧠");

            setCourseId("");

            refresh?.();

        }

    }

    return (

        <AdminSection title="🧠 Ny kategori">

            <AdminInput

                placeholder="Kategorinamn"

                value={name}

                onChange={event => setName(event.target.value)}

            />

            <AdminSelect

                label="Kurs"

                value={courseId}

                onChange={event => setCourseId(event.target.value)}

                options={courses}

            />

            <EmojiPicker value={icon} onChange={setIcon} />

            <AdminButton onClick={saveCategory}>

                💾 Spara kategori

            </AdminButton>

        </AdminSection>

    );

}

export default CategoryForm;
