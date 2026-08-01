import "./CourseGrid.css";

import CourseCard from "./CourseCard";

import useCourses from "../../hooks/useCourses";

function CourseGrid({ selectedTerm }) {
  const {

  courses,

  loading

  } = useCourses();

  if (loading) {

    return <h2>Laddar kurser...</h2>;

}

  return (

    <div className="course-grid">

      {

        courses

          .filter(course => course.term_id === selectedTerm)
          .map(course => (

            <CourseCard
              key={course.id}
              course={course}
            />

          ))

      }

    </div>

  );

}

export default CourseGrid;