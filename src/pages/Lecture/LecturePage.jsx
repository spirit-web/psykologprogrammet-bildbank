import { useParams, useNavigate } from "react-router-dom";

import ImageGallery from "../../components/ImageGallery/ImageGallery";
import LectureSidebar from "../../components/LectureSidebar/LectureSidebar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BackButton from "../../components/BackButton/BackButton";

import useLecture from "../../hooks/useLecture";
import useLectures from "../../hooks/useLectures";

function LecturePage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const {

        lecture,

        loading

    } = useLecture(id);

    const { lectures: courseLectures } = useLectures(lecture?.course_id);

    if (loading) {

        return <h2>Laddar föreläsning...</h2>;

    }

    if (!lecture) {

        return <h2>Föreläsningen hittades inte.</h2>;

    }

    const currentIndex = courseLectures.findIndex(l => l.id === lecture.id);

    const previousLecture = currentIndex > 0 ? courseLectures[currentIndex - 1] : null;

    const nextLecture =

        currentIndex >= 0 && currentIndex < courseLectures.length - 1

            ? courseLectures[currentIndex + 1]

            : null;

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

                <h1

                    style={{

                        fontSize: 32,

                        lineHeight: 1.3,

                        margin: "20px 0 8px"

                    }}

                >

                    {lecture.title}

                </h1>

                {

                    lecture.teacher &&

                    <p>👨‍🏫 {lecture.teacher}</p>

                }

                <ImageGallery
                    lecture={lecture}
                    previousLecture={previousLecture}
                    nextLecture={nextLecture}
                    onNavigateLecture={lectureId => navigate(`/lecture/${lectureId}`)}
                />

            </div>

        </div>

    );

}

export default LecturePage;