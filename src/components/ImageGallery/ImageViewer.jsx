import "./ImageGallery.css";

import { useState, useEffect, useRef } from "react";

import SlideThumbnail from "../SlideViewer/SlideThumbnail";
import ThemeTagger from "./ThemeTagger";

import useFavorites from "../../hooks/useFavorites";

function ImageViewer({ images, loading, emptyMessage, uploadSlot, showActions = true }) {

    const { isFavorite, toggleFavorite } = useFavorites();

    const [selectedImage, setSelectedImage] = useState(null);

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

    const [fullscreen, setFullscreen] = useState(false);

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

    useEffect(() => {

        function handleKeyDown(event) {

            if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {

                return;

            }

            if (event.key === "ArrowRight") {
                nextImage();
            }

            if (event.key === "ArrowLeft") {
                previousImage();
            }

            if (event.key === "Escape") {
                setFullscreen(false);
                resetView();
            }

            if (showActions && (event.key === "f" || event.key === "F") && selectedImage) {
                toggleFavorite(selectedImage.id);
            }

        }

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);

    }, [selectedImage, currentIndex, images]);

    useEffect(() => {

        if (currentIndex >= 0) {

            thumbnailRefs.current[currentIndex]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });

        }

    }, [currentIndex]);

    return (

        <>

            {uploadSlot}

            {
                loading &&
                <p>Laddar bilder...</p>
            }

            {
                !loading && images.length === 0 &&
                <p>{emptyMessage || "Inga bilder ännu."}</p>
            }

            {
                selectedImage &&
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

                    <div className="zoom-toolbar">

                        <button onClick={zoomOut}>➖</button>

                        <span>{Math.round(zoom * 100)}%</span>

                        <button onClick={zoomIn}>➕</button>

                        <button onClick={downloadImage}>
                            ⬇ Ladda ned bild
                        </button>

                        {
                            showActions &&
                            <>
                                <button
                                    onClick={() => toggleFavorite(selectedImage.id)}
                                    className={isFavorite(selectedImage.id) ? "favorite-active" : ""}
                                >
                                    {isFavorite(selectedImage.id) ? "⭐ Favorit" : "☆ Favorit"}
                                </button>

                                <ThemeTagger imageId={selectedImage.id} />
                            </>
                        }

                    </div>

                    <div

                        className="main-image-wrapper"

                        style={{ cursor: zoom > 1 ? "grab" : "zoom-in" }}

                    >

                        <img

                            className={fullscreen ? "main-image fullscreen" : "main-image"}

                            src={selectedImage.image_url}

                            alt={selectedImage.title}

                            style={{

                                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,

                                transition: dragState.current ? "none" : "0.25s"

                            }}

                            onClick={zoom === 1 ? toggleFullscreen : undefined}

                            onDoubleClick={toggleZoom}

                            onWheel={handleWheel}

                            onMouseDown={handlePointerDown}

                            onMouseMove={handlePointerMove}

                            onMouseUp={handlePointerUp}

                            onMouseLeave={handlePointerUp}

                        />

                    </div>

                    <p className="image-title">
                        {selectedImage.title}
                    </p>

                </>
            }

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

        </>

    );

}

export default ImageViewer;
