import { useState } from "react";

import SlideThumbnail from "../SlideViewer/SlideThumbnail";
import useCourseImages from "../../hooks/useCourseImages";
import { updateImage } from "../../services/adminDatabase";

function LinkExistingImages({ lecture, currentImageIds, onLinked }) {

    const [open, setOpen] = useState(false);

    const { images: courseImages, loading } = useCourseImages(open ? lecture.course_id : null);

    const [linkingId, setLinkingId] = useState(null);

    const pickable = courseImages.filter(
        image => !currentImageIds.includes(image.id)
    );

    async function handlePick(image) {

        setLinkingId(image.id);

        const updated = await updateImage(image.id, { lecture_id: lecture.id });

        if (updated) {

            onLinked?.(updated);

        }

        setLinkingId(null);

    }

    if (!open) {

        return (

            <button className="pill-button" onClick={() => setOpen(true)}>
                🔗 Koppla bilder
            </button>

        );

    }

    return (

        <div className="link-images-panel">

            <div className="link-images-header">

                <strong>Koppla bilder från kursen</strong>

                <button className="pill-button" onClick={() => setOpen(false)}>
                    Stäng
                </button>

            </div>

            {loading && <p>Laddar kursens bilder...</p>}

            {!loading && pickable.length === 0 &&
                <p>Inga fler bilder i kursen att koppla — alla är redan kopplade hit.</p>
            }

            <div className="link-images-grid">

                {pickable.map(image => (

                    <div key={image.id} style={{ opacity: linkingId === image.id ? 0.5 : 1 }}>

                        <SlideThumbnail
                            image={image}
                            onClick={() => linkingId === null && handlePick(image)}
                        />

                    </div>

                ))}

            </div>

        </div>

    );

}

export default LinkExistingImages;
