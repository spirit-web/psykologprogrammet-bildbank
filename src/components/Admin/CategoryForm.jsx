import { useState } from "react";

import AdminSection from "./AdminSection";
import AdminInput from "./AdminInput";
import AdminSelect from "./AdminSelect";
import AdminButton from "./AdminButton.jsx";

import { createCategory } from "../../services/adminDatabase";
import useAdminData from "../../hooks/useAdminData";

const ICON_CHOICES = [

    "🧠", "📚", "❤️", "⭐", "😨", "😳", "🧩", "😴", "🔥", "🌸",

    "🛠️", "🕯️", "👥", "📖", "🌊", "🧬", "💡", "🎯", "🔑", "🧭"

];

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

            <label style={{ display: "block", fontWeight: 600, margin: "0 0 8px" }}>

                Ikon

            </label>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 15 }}>

                {

                    ICON_CHOICES.map(choice => (

                        <button

                            key={choice}

                            type="button"

                            onClick={() => setIcon(choice)}

                            style={{

                                fontSize: 22,

                                width: 44,

                                height: 44,

                                borderRadius: 10,

                                border: icon === choice ? "2px solid #214c9d" : "1px solid #ddd",

                                background: icon === choice ? "#eef3ff" : "white",

                                cursor: "pointer"

                            }}

                        >

                            {choice}

                        </button>

                    ))

                }

                <input

                    value={icon}

                    onChange={event => setIcon(event.target.value)}

                    placeholder="eller egen emoji"

                    style={{

                        width: 130,

                        padding: "0 12px",

                        borderRadius: 10,

                        border: "1px solid #ddd"

                    }}

                />

            </div>

            <AdminButton onClick={saveCategory}>

                💾 Spara kategori

            </AdminButton>

        </AdminSection>

    );

}

export default CategoryForm;
