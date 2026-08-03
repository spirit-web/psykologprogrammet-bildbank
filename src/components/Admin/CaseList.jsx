import { useState } from "react";

import AdminSection from "./AdminSection";
import EmojiPicker from "./EmojiPicker";
import LinkCaseImagesModal from "./LinkCaseImagesModal";

import { updateCase } from "../../services/cases";

function CaseList({ cases = [], images = [], onDelete, refresh }) {

    const [editingId, setEditingId] = useState(null);

    const [editName, setEditName] = useState("");
    const [editOccupation, setEditOccupation] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editAvatar, setEditAvatar] = useState("");

    const [linkingCase, setLinkingCase] = useState(null);

    function startEdit(caseItem) {

        setEditingId(caseItem.id);
        setEditName(caseItem.name ?? "");
        setEditOccupation(caseItem.occupation ?? "");
        setEditCategory(caseItem.category ?? "");
        setEditDescription(caseItem.description ?? "");
        setEditAvatar(caseItem.avatar ?? "🧑");

    }

    async function saveEdit() {

        await updateCase(editingId, {
            name: editName,
            occupation: editOccupation,
            category: editCategory,
            description: editDescription,
            avatar: editAvatar
        });

        setEditingId(null);

        refresh?.();

    }

    return (

        <AdminSection title="🩺 Alla fall">

            {
                cases.length === 0 &&
                <p>Inga fall ännu.</p>
            }

            {
                cases.map(caseItem => (

                    <div
                        key={caseItem.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: 14,
                            padding: 20,
                            marginBottom: 15,
                            background: "#fff"
                        }}
                    >

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                            <h3>
                                {caseItem.avatar} {caseItem.name}
                                {caseItem.category && <span style={{ color: "#888", fontWeight: 400 }}> — {caseItem.category}</span>}
                            </h3>

                            <div style={{ display: "flex", gap: 10 }}>

                                <button onClick={() => setLinkingCase(caseItem)}>
                                    🔗 Koppla verktyg
                                </button>

                                <button onClick={() => startEdit(caseItem)}>
                                    ✏️
                                </button>

                                <button onClick={() => onDelete(caseItem.id)}>
                                    🗑
                                </button>

                            </div>

                        </div>

                        {caseItem.occupation && <p style={{ color: "#666", margin: "5px 0" }}>{caseItem.occupation}</p>}

                        {
                            editingId === caseItem.id &&
                            <div style={{ marginTop: 15, padding: 15, background: "#fafafa", borderRadius: 10 }}>

                                <input
                                    value={editName}
                                    onChange={e => setEditName(e.target.value)}
                                    placeholder="Namn"
                                    style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 8, border: "1px solid #ddd" }}
                                />

                                <input
                                    value={editOccupation}
                                    onChange={e => setEditOccupation(e.target.value)}
                                    placeholder="Sysselsättning"
                                    style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 8, border: "1px solid #ddd" }}
                                />

                                <input
                                    value={editCategory}
                                    onChange={e => setEditCategory(e.target.value)}
                                    placeholder="Kategori/diagnos"
                                    style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 8, border: "1px solid #ddd" }}
                                />

                                <EmojiPicker value={editAvatar} onChange={setEditAvatar} />

                                <textarea
                                    rows={5}
                                    value={editDescription}
                                    onChange={e => setEditDescription(e.target.value)}
                                    placeholder="Beskrivning"
                                    style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 8, border: "1px solid #ddd", resize: "vertical" }}
                                />

                                <button onClick={saveEdit}>💾 Spara</button>
                                <button onClick={() => setEditingId(null)} style={{ marginLeft: 10 }}>Avbryt</button>

                            </div>
                        }

                    </div>

                ))
            }

            {
                linkingCase &&
                <LinkCaseImagesModal
                    caseItem={linkingCase}
                    images={images}
                    onClose={() => setLinkingCase(null)}
                />
            }

        </AdminSection>

    );

}

export default CaseList;
