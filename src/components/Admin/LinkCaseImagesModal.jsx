import { useEffect, useState } from "react";

import { getLinkedImageIds, linkImageToCase, unlinkImageFromCase } from "../../services/cases";

function LinkCaseImagesModal({ caseItem, images, onClose }) {

    const [linkedIds, setLinkedIds] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    useEffect(() => {

        async function load() {

            setLoading(true);

            setLinkedIds(await getLinkedImageIds(caseItem.id));

            setLoading(false);

        }

        load();

    }, [caseItem.id]);

    async function toggle(imageId) {

        if (linkedIds.includes(imageId)) {

            setLinkedIds(current => current.filter(id => id !== imageId));

            await unlinkImageFromCase(caseItem.id, imageId);

        } else {

            setLinkedIds(current => [...current, imageId]);

            await linkImageToCase(caseItem.id, imageId);

        }

    }

    const filtered = images.filter(image =>
        (image.title || "").toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000
            }}
            onClick={onClose}
        >

            <div
                style={{
                    background: "white",
                    borderRadius: 18,
                    padding: 35,
                    width: "90%",
                    maxWidth: 800,
                    maxHeight: "85vh",
                    overflowY: "auto"
                }}
                onClick={event => event.stopPropagation()}
            >

                <h2 style={{ marginBottom: 10 }}>
                    {caseItem.avatar} Koppla verktyg — {caseItem.name}
                </h2>

                <p style={{ color: "#666", marginBottom: 15 }}>
                    Bocka i vilka psykologverktyg som är relevanta för det här fallet. {linkedIds.length} kopplade.
                </p>

                <input
                    placeholder="Sök bland bilder..."
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                    style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd", marginBottom: 20 }}
                />

                {loading && <p>Laddar...</p>}

                {
                    !loading &&
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>

                        {
                            filtered.map(image => (

                                <label
                                    key={image.id}
                                    style={{
                                        width: 130,
                                        cursor: "pointer",
                                        textAlign: "center",
                                        border: linkedIds.includes(image.id) ? "3px solid #214c9d" : "3px solid transparent",
                                        borderRadius: 12,
                                        padding: 4
                                    }}
                                >

                                    <img
                                        src={image.image_url}
                                        alt={image.title}
                                        style={{ width: "100%", height: 85, objectFit: "contain", background: "#eef1f6", borderRadius: 8, display: "block" }}
                                    />

                                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>

                                        <input
                                            type="checkbox"
                                            checked={linkedIds.includes(image.id)}
                                            onChange={() => toggle(image.id)}
                                        />

                                        <span style={{ fontSize: 12, fontWeight: 600, textAlign: "left" }}>
                                            {image.title}
                                        </span>

                                    </div>

                                </label>

                            ))
                        }

                        {
                            filtered.length === 0 &&
                            <p>Inga bilder matchade sökningen.</p>
                        }

                    </div>
                }

                <div style={{ marginTop: 25 }}>

                    <button
                        onClick={onClose}
                        style={{
                            background: "#eee",
                            border: "none",
                            borderRadius: 10,
                            padding: "12px 20px",
                            cursor: "pointer",
                            fontWeight: 600
                        }}
                    >
                        Stäng
                    </button>

                </div>

            </div>

        </div>

    );

}

export default LinkCaseImagesModal;
