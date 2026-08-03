import "./ImageGallery.css";

import { useState, useEffect, useRef } from "react";

import SlideThumbnail from "../SlideViewer/SlideThumbnail";
import ThemeTagger from "./ThemeTagger";

import useFavorites from "../../hooks/useFavorites";
import { deleteImage } from "../../services/adminDatabase";
import { supabase } from "../../services/supabase";

function ImageViewer({ images, loading, emptyMessage, uploadSlot, showActions = true, onDeleted, hideGrid = false, startId = null, onCloseLightbox, layout = "compact" }) {

    const { isFavorite, toggleFavorite } = useFavorites();

    const [deleting, setDeleting] = useState(false);

    const [selectedImage, setSelectedImage] = useState(

        startId ? (images.find(image => image.id === startId) ?? null) : null

    );

    const previousCount = useRef(images.length);

    useEffect(() => {

        if (images.length === 0) {

            setSelectedImage(null);

        } else if (images.length > previousCount.current) {

            setSelectedImage(images[images.length - 1]);

        } else if (!selectedImage || !images.some(image => image.id === selectedImage.id)) {

            setSelectedImage(images[0]);

        }

        previousCount.current = images.length;

    }, [images]);

    const [fullscreen, setFullscreen] = useState(!!startId);

    const [zoom, setZoom] = useState(1);

    const [pan, setPan] = useState({ x: 0, y: 0 });

    const dragState = useRef(null);

    const thumbnailRefs = useRef([]);

    const currentIndex = images.findIndex(
        image => image.id === selectedImage?.id
    );

    function resetView() {

        setZoom(1);

        setPan({ x: 0, y: 0 });

    }

    function previousImage() {

        if (currentIndex <= 0) return;

        setSelectedImage(images[currentIndex - 1]);

        resetView();

    }

    function nextImage() {

        if (currentIndex >= images.length - 1) return;

        setSelectedImage(images[currentIndex + 1]);

        resetView();

    }

    function toggleFullscreen() {

        if (fullscreen && startId) {

            onCloseLightbox?.();

            return;

        }

        setFullscreen(!fullscreen);

    }

    function toggleZoom() {

        setZoom(zoom === 1 ? 2 : 1);

        setPan({ x: 0, y: 0 });

    }

    function zoomIn() {

        setZoom(Math.min(zoom + 0.25, 3));

    }

    function zoomOut() {

        setZoom(current => {

            const next = Math.max(current - 0.25, 0.5);

            if (next === 1) setPan({ x: 0, y: 0 });

            return next;

        });

    }

    function handleWheel(event) {

        if (!event.ctrlKey && !event.metaKey) {

            return;

        }

        event.preventDefault();

        if (event.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }

    }

    function handlePointerDown(event) {

        if (zoom === 1) return;

        dragState.current = {

            startX: event.clientX - pan.x,

            startY: event.clientY - pan.y

        };

    }

    function handlePointerMove(event) {

        if (!dragState.current) return;

        setPan({

            x: event.clientX - dragState.current.startX,

            y: event.clientY - dragState.current.startY

        });

    }

    function handlePointerUp() {

        dragState.current = null;

    }

    async function downloadImage() {

        if (!selectedImage) return;

        try {

            const response = await fetch(selectedImage.image_url);

            const blob = await response.blob();

            const extension =
                selectedImage.image_url.split(".").pop().split("?")[0];

            const link = document.createElement("a");

            link.href = URL.createObjectURL(blob);

            link.download = `${selectedImage.title || "bild"}.${extension}`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            URL.revokeObjectURL(link.href);

        } catch (error) {

            window.open(selectedImage.image_url, "_blank");

        }

    }

    async function handleDelete() {

        if (!selectedImage) return;

        if (!window.confirm(`Ta bort "${selectedImage.title || "bilden"}"? Går inte att ångra.`)) {

            return;

        }

        setDeleting(true);

        const path = selectedImage.image_url?.split("/object/public/images/")[1];

        await deleteImage(selectedImage.id);

        if (path) {

            await supabase.storage.from("images").remove([path]);

        }

        setDeleting(false);

        onDeleted?.(selectedImage.id);

    }

    useEffect(() => {

        function handleKeyDown(event) {

            if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {

                return;

            }

            const panStep = 40;

            if (fullscreen && zoom > 1 && event.key.startsWith("Arrow")) {

                event.preventDefault();

                if (event.key === "ArrowRight") setPan(p => ({ ...p, x: p.x - panStep }));
                if (event.key === "ArrowLeft") setPan(p => ({ ...p, x: p.x + panStep }));
                if (event.key === "ArrowDown") setPan(p => ({ ...p, y: p.y - panStep }));
                if (event.key === "ArrowUp") setPan(p => ({ ...p, y: p.y + panStep }));

                return;

            }

            if (event.key === "ArrowRight") {
                nextImage();
            }

            if (event.key === "ArrowLeft") {
                previousImage();
            }

            if (event.key === "Escape") {
                if (startId) {
                    onCloseLightbox?.();
                } else {
                    setFullscreen(false);
                }
                resetView();
            }

            if (showActions && (event.key === "f" || event.key === "F") && selectedImage) {
                toggleFavorite(selectedImage.id);
            }

        }

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);

    }, [selectedImage, currentIndex, images, fullscreen, zoom]);

    useEffect(() => {

        if (currentIndex >= 0) {

            thumbnailRefs.current[currentIndex]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });

        }

    }, [currentIndex]);

    const controlsRow = (

        <div className="zoom-toolbar">

            {
                layout === "compact" &&
                <>
                    <button onClick={zoomOut}>➖</button>

                    <span>{Math.round(zoom * 100)}%</span>

                    <button onClick={zoomIn}>➕</button>
                </>
            }

            <button onClick={downloadImage} title="Ladda ned bild">
                ⬇
            </button>

            {
                showActions && selectedImage &&
                <>
                    <button
                        onClick={() => toggleFavorite(selectedImage.id)}
                        className={isFavorite(selectedImage.id) ? "favorite-active" : ""}
                        title="Favorit"
                    >
                        {isFavorite(selectedImage.id) ? "⭐" : "☆"}
                    </button>

                    <ThemeTagger imageId={selectedImage.id} />

                    <button

                        onClick={handleDelete}

                        disabled={deleting}

                        className="delete-image-button"

                    >

                        {deleting ? "Tar bort..." : "🗑 Ta bort bild"}

                    </button>
                </>
            }

            <span>
                Bild {currentIndex + 1} av {images.length}
            </span>

        </div>

    );

    const mainImageBlock = (

        <>

            <div className={layout === "browse" ? "main-image-wrapper-outer" : undefined}>

                {
                    layout === "browse" &&
                    <button
                        className="image-side-nav prev"
                        onClick={previousImage}
                        disabled={currentIndex <= 0}
                        title="Föregående"
                    >
                        ⬅
                    </button>
                }

                <div

                    className="main-image-wrapper"

                    style={{ cursor: "zoom-in" }}

                >

                    <img

                        className="main-image"

                        src={selectedImage?.image_url}

                        alt={selectedImage?.title}

                        onClick={toggleFullscreen}

                    />

                </div>

                {
                    layout === "browse" &&
                    <button
                        className="image-side-nav next"
                        onClick={nextImage}
                        disabled={currentIndex === -1 || currentIndex >= images.length - 1}
                        title="Nästa"
                    >
                        ➡
                    </button>
                }

            </div>

            <p className="image-title">
                {selectedImage?.title}
            </p>

        </>

    );

    const gridBlock = (

        <div className="gallery-grid">

            {
                images.map((image, index) => (

                    <div
                        key={image.id}
                        ref={element => thumbnailRefs.current[index] = element}
                    >

                        <SlideThumbnail
                            image={image}
                            active={image.id === selectedImage?.id}
                            onClick={() => {
                                setSelectedImage(image);
                                resetView();
                            }}
                        />

                    </div>

                ))
            }

        </div>

    );

    return (

        <>

            {!hideGrid && uploadSlot}

            {
                !hideGrid && loading &&
                <p>Laddar bilder...</p>
            }

            {
                !hideGrid && !loading && images.length === 0 &&
                <p>{emptyMessage || "Inga bilder ännu."}</p>
            }

            {!hideGrid && layout === "browse" && gridBlock}

            {
                selectedImage &&
                <>
                {
                    !hideGrid && layout === "compact" &&
                    <>
                    <div className="image-navigation">

                        <button onClick={previousImage}>
                            ⬅ Föregående
                        </button>

                        <span>
                            Bild {currentIndex + 1} av {images.length}
                        </span>

                        <button onClick={nextImage}>
                            Nästa ➡
                        </button>

                    </div>

                    {controlsRow}

                    {mainImageBlock}
                    </>
                }

                {
                    !hideGrid && layout === "browse" &&
                    <>
                    {mainImageBlock}

                    {controlsRow}
                    </>
                }

                    {

                        fullscreen &&

                        <div className="lightbox-overlay">

                            <button

                                className="lightbox-close"

                                onClick={toggleFullscreen}

                                title="Stäng"

                            >

                                ✕

                            </button>

                            {

                                currentIndex > 0 &&

                                <button

                                    className="lightbox-nav lightbox-prev"

                                    onClick={previousImage}

                                    title="Föregående"

                                >

                                    ⬅

                                </button>

                            }

                            {

                                currentIndex < images.length - 1 &&

                                <button

                                    className="lightbox-nav lightbox-next"

                                    onClick={nextImage}

                                    title="Nästa"

                                >

                                    ➡

                                </button>

                            }

                            <img

                                className="lightbox-image"

                                src={selectedImage.image_url}

                                alt={selectedImage.title}

                                style={{

                                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,

                                    transition: dragState.current ? "none" : "0.25s",

                                    cursor: zoom > 1 ? "grab" : "default"

                                }}

                                onDoubleClick={toggleZoom}

                                onWheel={handleWheel}

                                onMouseDown={handlePointerDown}

                                onMouseMove={handlePointerMove}

                                onMouseUp={handlePointerUp}

                                onMouseLeave={handlePointerUp}

                            />

                        </div>

                    }

                </>
            }

            {!hideGrid && layout === "compact" && gridBlock}

        </>

    );

}

export default ImageViewer;
