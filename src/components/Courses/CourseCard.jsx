import { Link } from "react-router-dom";

import "./CourseGrid.css";

function CourseCard({ course }) {

  const primaryTeacher =

    course.course_teachers?.find(row => row.is_primary)?.teachers ??

    course.course_teachers?.[0]?.teachers ??

    null;

  return (

    <Link
      to={`/course/${course.id}`}
      style={{ textDecoration: "none" }}
    >

      <div
        className="course-card"
      >

        {
          course.cover &&
          <img
            src={course.cover}
            alt={course.name}
            className="course-cover"
          />
        }

        <div className="course-content">

          <h3>{course.name}</h3>

          {

            primaryTeacher &&

            <p className="teacher" style={{ display: "flex", alignItems: "center", gap: 8 }}>

              {

                primaryTeacher.image_url &&

                <img

                  src={primaryTeacher.image_url}

                  alt={primaryTeacher.name}

                  style={{

                    width: 32,

                    height: 32,

                    borderRadius: "50%",

                    objectFit: "cover"

                  }}

                />

              }

              {primaryTeacher.name}

            </p>

          }

          <p>
            {course.description}
          </p>

          <p>
            🎓 {course.credits} hp
          </p>

          <div
            style={{
              background:"#16386B",
              color:"white",
              padding:"12px",
              borderRadius:"10px",
              textAlign:"center",
              marginTop:"20px",
              fontWeight:"600"
            }}
          >

            Öppna kurs

          </div>

        </div>

      </div>

    </Link>

  );

}

export default CourseCard;