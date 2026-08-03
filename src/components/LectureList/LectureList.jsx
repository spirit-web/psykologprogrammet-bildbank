import "./LectureList.css";

import LectureCard from "./LectureCard";

import useLectures from "../../hooks/useLectures";

function LectureList({ course }) {

    const {

        lectures,

        loading

    } = useLectures(course.id);

    if (loading) {

        return <h2>Laddar föreläsningar...</h2>;

    }

    return (

        <>

            <h2>

                Föreläsningar

            </h2>

            <div className="lecture-list">

                {

                    lectures.map(lecture => (

                        <LectureCard

                            key={lecture.id}

                            lecture={lecture}

                        />

                    ))

                }

            </div>

        </>

    );

}

export default LectureList;