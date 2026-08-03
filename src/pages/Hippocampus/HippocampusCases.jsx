import { useEffect, useState } from "react";

import ImageViewer from "../../components/ImageGallery/ImageViewer";
import "../../components/CourseSections/CourseSections.css";

import { getCases, getImagesForCase } from "../../services/cases";
import { getAvatarUrl, getCategoryColor } from "../../utils/caseVisuals";

// One representative case per diagnos shown by default; "Visa fler fall" reveals the rest.
const DEFAULT_CASE_FIRST_NAMES = {
    "ADHD": "Tomas",
    "Ångestsyndrom": "Emma",
    "Ätstörningar": "Erik",
    "Autism": "Elias",
    "Borderline": "Johanna",
    "Depression": "Henrik",
    "Missbruk/beroende": "Peter",
    "Spelberoende": "Mikael",
    "Tvångssyndrom": "Fatima"
};

function isDefaultCase(caseItem) {

    const firstName = (caseItem.name || "").split(",")[0].trim();

    return DEFAULT_CASE_FIRST_NAMES[caseItem.category] === firstName;

}

function HippocampusCases() {

    const [cases, setCases] = useState([]);

    const [selectedCase, setSelectedCase] = useState(null);

    const [caseImages, setCaseImages] = useState([]);

    const [loadingImages, setLoadingImages] = useState(false);

    const [lightboxId, setLightboxId] = useState(null);

    const [showAll, setShowAll] = useState(false);

    useEffect(() => {

        getCases().then(setCases);

    }, []);

    const defaultCases = cases.filter(isDefaultCase);

    const visibleCases = showAll ? cases : defaultCases;

    const hasMoreCases = cases.length > defaultCases.length;

    async function openCase(caseItem) {

        setSelectedCase(caseItem);

        setLoadingImages(true);

        setCaseImages(await getImagesForCase(caseItem.id));

        setLoadingImages(false);

    }

    return (

        <>

            {
                !selectedCase &&
                <>

                    <div className="section-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>

                        {
                            visibleCases.map(caseItem => {

                                const color = getCategoryColor(caseItem.category);

                                return (

                                    <div
                                        key={caseItem.id}
                                        className="section-card"
                                        style={{
                                            cursor: "pointer",
                                            background: color.bg,
                                            border: `2px solid ${color.border}`
                                        }}
                                        onClick={() => openCase(caseItem)}
                                    >

                                        <img
                                            src={getAvatarUrl(caseItem.name)}
                                            alt={caseItem.name}
                                            style={{ width: 72, height: 72, borderRadius: "50%", background: "#fff" }}
                                        />

                                        <h3 style={{ margin: "10px 0 0" }}>{caseItem.name}</h3>

                                        {caseItem.category && <p style={{ color: color.label, margin: "4px 0 0", fontWeight: 600 }}>{caseItem.category}</p>}

                                    </div>

                                );

                            })
                        }

                        {
                            cases.length === 0 &&
                            <p>Inga fall inlagda än.</p>
                        }

                    </div>

                    {
                        hasMoreCases &&

                        <div style={{ textAlign: "center", marginTop: 25 }}>

                            <button
                                onClick={() => setShowAll(current => !current)}
                                className="pill-button"
                            >
                                {showAll ? "Visa färre fall" : "Visa fler fall"}
                            </button>

                        </div>
                    }

                </>
            }

            {
                selectedCase &&
                <>

                    <button
                        onClick={() => setSelectedCase(null)}
                        style={{ marginBottom: 20 }}
                    >
                        ← Alla fall
                    </button>

                    <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>

                        <img
                            src={getAvatarUrl(selectedCase.name)}
                            alt={selectedCase.name}
                            style={{ width: 96, height: 96, borderRadius: "50%", background: getCategoryColor(selectedCase.category).bg, border: `3px solid ${getCategoryColor(selectedCase.category).border}` }}
                        />

                        <div>

                            <h2 style={{ margin: 0 }}>{selectedCase.name}</h2>

                            {selectedCase.occupation && <p style={{ margin: "2px 0 0", color: "#666" }}>{selectedCase.occupation}</p>}

                        </div>

                    </div>

                    {
                        selectedCase.description &&
                        <p style={{ maxWidth: 700, lineHeight: 1.6 }}>{selectedCase.description}</p>
                    }

                    <h3 style={{ marginTop: 30 }}>Kopplade psykologverktyg</h3>

                    {loadingImages && <p>Laddar...</p>}

                    {
                        !loadingImages && caseImages.length === 0 &&
                        <p>Inga verktyg kopplade till det här fallet än.</p>
                    }

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 15 }}>

                        {
                            caseImages.map(image => (

                                <img
                                    key={image.id}
                                    src={image.image_url}
                                    alt={image.title}
                                    onClick={() => setLightboxId(image.id)}
                                    style={{
                                        width: 130,
                                        height: 130,
                                        objectFit: "cover",
                                        borderRadius: 10,
                                        cursor: "pointer",
                                        background: "#eef1f6"
                                    }}
                                />

                            ))
                        }

                    </div>

                    {
                        lightboxId &&
                        <ImageViewer
                            images={caseImages}
                            hideGrid
                            startId={lightboxId}
                            onCloseLightbox={() => setLightboxId(null)}
                        />
                    }

                </>
            }

        </>

    );

}

export default HippocampusCases;
