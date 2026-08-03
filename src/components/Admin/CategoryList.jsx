import { useState } from "react";

import AdminSection from "./AdminSection";
import EmojiPicker from "./EmojiPicker";

import { updateTheme } from "../../services/themes";

function CategoryList({

    categories = [],

    onDelete,

    refresh

}) {

    const [editingId, setEditingId] = useState(null);

    const [editName, setEditName] = useState("");

    const [editIcon, setEditIcon] = useState("");

    function startEdit(category) {

        setEditingId(category.id);

        setEditName(category.name ?? "");

        setEditIcon(category.icon ?? "");

    }

    async function saveEdit() {

        await updateTheme(editingId, {

            name: editName,

            icon: editIcon

        });

        setEditingId(null);

        refresh?.();

    }

    return (

        <AdminSection title="🧠 Alla teman">

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

                            <h3>

                                {category.icon} {category.name}

                            </h3>

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
