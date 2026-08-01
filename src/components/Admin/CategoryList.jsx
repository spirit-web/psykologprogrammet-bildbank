import AdminSection from "./AdminSection";

function CourseList({

    courses = [],

    onDelete,

    onEdit

}) {

    return (

        <AdminSection

            title="📚 Alla kurser"

        >

            {

                courses.length === 0 && (

                    <p>

                        Inga kurser ännu.

                    </p>

                )

            }

            {

                courses.map(course => (

                    <div

                        key={course.id}

                        style={{

                            border: "1px solid #ddd",

                            borderRadius: "14px",

                            padding: "25px",

                            marginBottom: "20px",

                            display: "flex",

                            justifyContent: "space-between",

                            alignItems: "center",

                            background: "#fff"

                        }}

                    >

                        <div>

                            <h3>

                                {course.name}

                            </h3>

                            <p>

                                👨‍🏫 {course.teacher}

                            </p>

                            <p>

                                🎓 Termin {course.term_id}

                            </p>

                            <p>

                                {course.credits} hp

                            </p>

                        </div>

                        <div

                            style={{

                                display: "flex",

                                gap: "12px"

                            }}

                        >

                            <button

                                onClick={() =>

                                    onEdit(course)

                                }

                            >

                                ✏️ Redigera

                            </button>

                            <button

                                onClick={() =>

                                    onDelete(course.id)

                                }

                            >

                                🗑 Ta bort

                            </button>

                        </div>

                    </div>

                ))

            }

        </AdminSection>

    );

}

export default CourseList;