import { useEffect, useState } from "react";

import ImageViewer from "../../components/ImageGallery/ImageViewer";
import "../../components/CourseSections/CourseSections.css";

import { getCases, getImagesForCase } from "../../services/cases";

function HippocampusCases() {

    const [cases, setCases] = useState([]);

    const [selectedCase, setSelectedCase] = useState(null);

    const [caseImages, setCaseImages] = useState([]);

    const [loadingImages, setLoadingImages] = useState(false);

    const [lightboxId, setLightboxId] = useState(null);

    useEffect(() => {

        getCases().then(setCases);

    }, []);

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
                <div className="section-grid">

                    {
                        cases.map(caseItem => (

                            <div
                                key={caseItem.id}
                                className="section-card"
                                style={{ cursor: "pointer" }}
                                onClick={() => openCase(caseItem)}
                            >

                                <h1>{caseItem.avatar}</h1>

                                <h3>{caseItem.name}</h3>

                                {caseItem.category && <p style={{ color: "#888", margin: "4px 0 0" }}>{caseItem.category}</p>}

                            </div>

                        ))
                    }

                    {
                        cases.length === 0 &&
                        <p>Inga fall inlagda än.</p>
                    }

                </div>
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

                        <div style={{ fontSize: 56 }}>{selectedCase.avatar}</div>

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
