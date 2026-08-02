import { useState } from "react";

import AdminSection from "./AdminSection";
import AdminSelect from "./AdminSelect";

import { updateCategory } from "../../services/adminDatabase";
import EmojiPicker from "./EmojiPicker";

function CategoryList({

    categories = [],

    courses = [],

    onDelete,

    refresh

}) {

    const [editingId, setEditingId] = useState(null);

    const [editName, setEditName] = useState("");

    const [editIcon, setEditIcon] = useState("");

    const [editCourseId, setEditCourseId] = useState("");

    function startEdit(category) {

        setEditingId(category.id);

        setEditName(category.name ?? "");

        setEditIcon(category.icon ?? "");

        setEditCourseId(category.course_id ?? "");

    }

    async function saveEdit() {

        await updateCategory(editingId, {

            name: editName,

            icon: editIcon,

            course_id: editCourseId ? Number(editCourseId) : null

        });

        setEditingId(null);

        refresh?.();

    }

    return (

        <AdminSection title="🧠 Alla kategorier">

            {

                categories.length === 0 &&

                <p>Inga kategorier ännu.</p>

            }

            {

                categories.map(category => (

                    <div

                        key={category.id}

                        style={{

                            border: "1px solid #ddd",

                            borderRadius: 14,

                            padding: 20,

                            marginBottom: 15,

                            background: "#fff"

                        }}

                    >

                        <div

                            style={{

                                display: "flex",

                                justifyContent: "space-between",

                                alignItems: "center"

                            }}

                        >

                            <div>

                                <h3>

                                    {category.icon} {category.name}

                                </h3>

                                <p>

                                    📚 {category.courses?.name ?? "Ingen kurs kopplad"}

                                </p>

                            </div>

                            <div style={{ display: "flex", gap: 10 }}>

                                <button onClick={() => startEdit(category)}>

                                    ✏️

                                </button>

                                <button onClick={() => onDelete(category.id)}>

                                    🗑

                                </button>

                            </div>

                        </div>

                        {

                            editingId === category.id &&

                            <div

                                style={{

                                    marginTop: 15,

                                    padding: 15,

                                    background: "#fafafa",

                                    borderRadius: 10

                                }}

                            >

                                <input

                                    value={editName}

                                    onChange={e => setEditName(e.target.value)}

                                    placeholder="Namn"

                                    style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 8, border: "1px solid #ddd" }}

                                />

                                <EmojiPicker value={editIcon} onChange={setEditIcon} />

                                <AdminSelect

                                    label="Kurs"

                                    value={editCourseId}

                                    onChange={e => setEditCourseId(e.target.value)}

                                    options={courses}

                                />

                                <button onClick={saveEdit}>💾 Spara</button>

                                <button onClick={() => setEditingId(null)} style={{ marginLeft: 10 }}>Avbryt</button>

                            </div>

                        }

                    </div>

                ))

            }

        </AdminSection>

    );

}

export default CategoryList;
