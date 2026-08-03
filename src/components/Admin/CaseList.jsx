import { useState } from "react";

import AdminSection from "./AdminSection";
import LinkCaseImagesModal from "./LinkCaseImagesModal";

import { updateCase } from "../../services/cases";
import { getAvatarUrl, getCategoryColor, CASE_CATEGORIES } from "../../utils/caseVisuals";

function CaseList({ cases = [], images = [], onDelete, refresh }) {

    const [editingId, setEditingId] = useState(null);

    const [editName, setEditName] = useState("");
    const [editOccupation, setEditOccupation] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const [linkingCase, setLinkingCase] = useState(null);

    function startEdit(caseItem) {

        setEditingId(caseItem.id);
        setEditName(caseItem.name ?? "");
        setEditOccupation(caseItem.occupation ?? "");
        setEditCategory(caseItem.category ?? "");
        setEditDescription(caseItem.description ?? "");

    }

    async function saveEdit() {

        await updateCase(editingId, {
            name: editName,
            occupation: editOccupation,
            category: editCategory,
            description: editDescription
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
                cases.map(caseItem => {

                    const color = getCategoryColor(caseItem.category);

                    return (

                        <div
                            key={caseItem.id}
                            style={{
                                border: `2px solid ${color.border}`,
                                background: color.bg,
                                borderRadius: 14,
                                padding: 20,
                                marginBottom: 15
                            }}
                        >

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>

                                    <img
                                        src={getAvatarUrl(caseItem.name)}
                                        alt={caseItem.name}
                                        style={{ width: 48, height: 48, borderRadius: "50%", background: "#fff" }}
                                    />

                                    <h3 style={{ margin: 0 }}>
                                        {caseItem.name}
                                        {caseItem.category && <span style={{ color: color.label, fontWeight: 400 }}> — {caseItem.category}</span>}
                                    </h3>

                                </div>

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

                            {caseItem.occupation && <p style={{ color: "#666", margin: "5px 0 0 62px" }}>{caseItem.occupation}</p>}

                            {
                                editingId === caseItem.id &&
                                <div style={{ marginTop: 15, padding: 15, background: "rgba(255,255,255,0.6)", borderRadius: 10 }}>

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
                                        list="case-categories"
                                        value={editCategory}
                                        onChange={e => setEditCategory(e.target.value)}
                                        placeholder="Kategori/diagnos"
                                        style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 8, border: "1px solid #ddd" }}
                                    />

                                    <datalist id="case-categories">
                                        {CASE_CATEGORIES.map(categoryName => <option key={categoryName} value={categoryName} />)}
                                    </datalist>

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

                    );

                })
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
