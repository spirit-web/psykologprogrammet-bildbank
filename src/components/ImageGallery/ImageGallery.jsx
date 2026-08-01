import "./ImageGallery.css";

import { useState, useEffect, useRef } from "react";

import SlideThumbnail from "../SlideViewer/SlideThumbnail";
import QuickImageUpload from "./QuickImageUpload";

import useImages from "../../hooks/useImages";

function ImageGallery({ lecture }) {

    const { images, loading, addImage } = useImages(lecture.id);

    const [selectedImage, setSelectedImage] = useState(null);

    function handleUploaded(newImage) {

        addImage(newImage);

        setSelectedImage(newImage);

    }

    useEffect(() => {

        if (images.length > 0 && !selectedImage) {

            setSelectedImage(images[0]);

        }

    }, [images]);

    const [fullscreen, setFullscreen] = useState(false);

    const [zoom, setZoom] = useState(1);

    const thumbnailRefs = useRef([]);

    const currentIndex = images.findIndex(
        image => image.id === selectedImage?.id
    );

    function previousImage() {

        if (currentIndex <= 0) return;

        setSelectedImage(
            images[currentIndex - 1]
        );

        setZoom(1);

    }

    function nextImage() {

        if (currentIndex >= images.length - 1) return;

        setSelectedImage(
            images[currentIndex + 1]
        );

        setZoom(1);

    }

    function toggleFullscreen() {

        setFullscreen(!fullscreen);

    }

    function toggleZoom() {

        setZoom(
            zoom === 1 ? 2 : 1
        );

    }

    function zoomIn() {

        setZoom(

            Math.min(
                zoom + 0.25,
                3
            )

        );

    }

    function zoomOut() {

        setZoom(

            Math.max(
                zoom - 0.25,
                0.5
            )

        );

    }

    function handleWheel(event) {

        event.preventDefault();

        if (event.deltaY < 0) {

            zoomIn();

        } else {

            zoomOut();

        }

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

            if (event.key === "ArrowRight") {

                nextImage();

            }

            if (event.key === "ArrowLeft") {

                previousImage();

            }

            if (event.key === "Escape") {

                setFullscreen(false);

                setZoom(1);

            }

        }

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

        };

    }, [selectedImage]);

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

            <h2>

                🖼 Bildgalleri

            </h2>

            <QuickImageUpload

                lectureId={lecture.id}

                onUploaded={handleUploaded}

            />

            {

                loading &&

                <p>Laddar bilder...</p>

            }

            {

                !loading && images.length === 0 &&

                <p>Inga bilder har lagts till för den här föreläsningen än.</p>

            }

            {

                selectedImage &&

                <>

                    <div className="image-navigation">

                        <button
                            onClick={previousImage}
                        >

                            ⬅ Föregående

                        </button>

                        <span>

                            Bild {currentIndex + 1} av {images.length}

                        </span>

                        <button
                            onClick={nextImage}
                        >

                            Nästa ➡

                        </button>

                    </div>

                    <div className="zoom-toolbar">

                        <button
                            onClick={zoomOut}
                        >

                            ➖

                        </button>

                        <span>

                            {Math.round(zoom * 100)}%

                        </span>

                        <button
                            onClick={zoomIn}
                        >

                            ➕

                        </button>

                        <button
                            onClick={downloadImage}
                        >

                            ⬇ Ladda ned bild

                        </button>

                    </div>

                    <img

                        className={

                            fullscreen

                                ? "main-image fullscreen"

                                : "main-image"

                        }

                        src={selectedImage.image_url}

                        alt={selectedImage.title}

                        style={{

                            transform: `scale(${zoom})`,

                            transition: "0.25s"

                        }}

                        onClick={toggleFullscreen}

                        onDoubleClick={toggleZoom}

                        onWheel={handleWheel}

                    />

                </>

            }

            <div className="gallery-grid">

                {

                    images.map((image, index) => (

                        <div

                            key={image.id}

                            ref={(element) =>

                                thumbnailRefs.current[index] = element

                            }

                        >

                            <SlideThumbnail

                                image={image}

                                active={image.id === selectedImage?.id}

                                onClick={() => {

                                    setSelectedImage(image);

                                    setZoom(1);

                                }}

                            />

                        </div>

                    ))

                }

            </div>

        </>

    );

}

export default ImageGallery;