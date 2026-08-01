import { useParams } from "react-router-dom";

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

            <LectureSidebar courseId={lecture.course_id} />

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

                {

                    lecture.teacher &&

                    <p>👨‍🏫 {lecture.teacher}</p>

                }

                <ImageGallery
                    lecture={lecture}
                />

            </div>

        </div>

    );

}

export default LecturePage;