import { useParams } from "react-router-dom";

import SlideViewer from "../../components/SlideViewer/SlideViewer";
import LectureToolbar from "../../components/LectureToolbar/LectureToolbar";
import LectureSearch from "../../components/LectureSearch/LectureSearch";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import LectureSidebar from "../../components/LectureSidebar/LectureSidebar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BackButton from "../../components/BackButton/BackButton";

import useLecture from "../../hooks/useLecture";

function LecturePage() {

    const { id } = useParams();

    const {

        lecture,

        loading

    } = useLecture(id);

    if (loading) {

        return <h2>Laddar föreläsning...</h2>;

    }

    if (!lecture) {

        return <h2>Föreläsningen hittades inte.</h2>;

    }

    return (

        <div
            style={{
                display: "flex",
                background: "#f7f9fc"
            }}
        >

            <LectureSidebar />

            <div
                style={{
                    flex: 1,
                    padding: "40px"
                }}
            >

                <BackButton />

                <Breadcrumb
                    items={[
                        {
                            label: "Kurs",
                            link: `/course/${lecture.course_id}`
                        },
                        {
                            label: lecture.title
                        }
                    ]}
                />

                <h1>

                    📚 {lecture.title}

                </h1>

                <p>

                    👨‍🏫 {lecture.teacher}

                </p>

                <p>

                    📅 {lecture.date}

                </p>

                <p>

                    🖼 {lecture.images} bilder

                </p>

                <LectureToolbar />

                <LectureSearch />

                <SlideViewer
                    image="https://picsum.photos/1200/700"
                />

                <ImageGallery
                    lecture={lecture}
                />

            </div>

        </div>

    );

}

export default LecturePage;