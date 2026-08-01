import "./ImageGallery.css";

import { useState } from "react";

import ImageViewer from "./ImageViewer";
import QuickImageUpload from "./QuickImageUpload";
import QuickSlideUpload from "./QuickSlideUpload";
import LectureFileUpload from "./LectureFileUpload";

import useImages from "../../hooks/useImages";
import useSlides from "../../hooks/useSlides";

function ImageGallery({ lecture }) {

    const { images, loading: imagesLoading, addImage } = useImages(lecture.id);

    const { slides, loading: slidesLoading, addSlide } = useSlides(lecture.id);

    const [tab, setTab] = useState("images");

    return (

        <>

            <LectureFileUpload lecture={lecture} />

            <div className="gallery-tabs">

                <button

                    className={tab === "images" ? "gallery-tab active" : "gallery-tab"}

                    onClick={() => setTab("images")}

                >

                    🖼 Minnesbilder

                </button>

                <button

                    className={tab === "slides" ? "gallery-tab active" : "gallery-tab"}

                    onClick={() => setTab("slides")}

                >

                    📄 Originalslides {slides.length > 0 && `(${slides.length})`}

                </button>

            </div>

            {

                tab === "images" &&

                <ImageViewer

                    images={images}

                    loading={imagesLoading}

                    emptyMessage="Inga bilder har lagts till för den här föreläsningen än."

                    uploadSlot={

                        <QuickImageUpload

                            lectureId={lecture.id}

                            onUploaded={addImage}

                        />

                    }

                />

            }

            {

                tab === "slides" &&

                <ImageViewer

                    images={slides}

                    loading={slidesLoading}

                    emptyMessage="Inga originalslides uppladdade för den här föreläsningen än."

                    showActions={false}

                    uploadSlot={

                        <QuickSlideUpload

                            lectureId={lecture.id}

                            nextPageNumber={slides.length}

                            onUploaded={addSlide}

                        />

                    }

                />

            }

        </>

    );

}

export default ImageGallery;
