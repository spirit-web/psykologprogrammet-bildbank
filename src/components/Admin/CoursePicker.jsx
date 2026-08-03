import "../CourseSections/CourseSections.css";

function CoursePicker({ courses = [], onSelect, unlinkedLabel, unlinkedCount = 0 }) {

    return (

        <div className="section-grid">

            {

                courses.map(course => (

                    <div
                        key={course.id}
                        className="section-card"
                        style={{ cursor: "pointer" }}
                        onClick={() => onSelect(course.id)}
                    >

                        <h3>{course.name}</h3>

                    </div>

                ))

            }

            {
                unlinkedLabel &&

                <div
                    className="section-card"
                    style={{
                        cursor: "pointer",
                        border: unlinkedCount > 0 ? "2px solid #f0b429" : undefined
                    }}
                    onClick={() => onSelect("unlinked")}
                >

                    <h3>❓ {unlinkedLabel}</h3>

                    {unlinkedCount > 0 && <p style={{ color: "#a45c00", fontWeight: 600 }}>{unlinkedCount} st</p>}

                </div>
            }

        </div>

    );

}

export default CoursePicker;
