import "./CourseHeader.css";

import { useEffect, useState } from "react";

import { getCourseTeachers } from "../../services/database";

function CourseHeader({ course }) {

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {

        async function load() {

            const data = await getCourseTeachers(course.id);

            setTeachers(data);

        }

        load();

    }, [course.id]);

    return (

        <div className="course-header">

            {
                course.cover &&
                <img

                    src={course.cover}

                    alt={course.name}

                    className="course-cover-large"

                />
            }

            <div className="course-header-info">

                <h1>{course.name}</h1>

                {

                    teachers.length > 0 &&

                    <div className="course-teachers">

                        {

                            teachers.map(teacher => (

                                <div key={teacher.id} className="course-teacher-chip">

                                    {

                                        teacher.image_url &&

                                        <img src={teacher.image_url} alt={teacher.name} />

                                    }

                                    <span>{teacher.name}</span>

                                </div>

                            ))

                        }

                    </div>

                }

                <p>{course.credits} poäng</p>

                <p>{course.description}</p>

            </div>

        </div>

    );

}

export default CourseHeader;
