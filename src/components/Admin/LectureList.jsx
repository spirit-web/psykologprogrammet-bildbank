import AdminSection from "./AdminSection";

function LectureList({

    lectures = [],

    onDelete,

    onEdit

}) {

    return (

        <AdminSection

            title="🎓 Alla föreläsningar"

        >

            {

                lectures.length === 0 && (

                    <p>

                        Inga föreläsningar ännu.

                    </p>

                )

            }

            {

                lectures.map(lecture => (

                    <div

                        key={lecture.id}

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

                                {lecture.title}

                            </h3>

                            <p>

                                📚 {lecture.courses?.name}

                            </p>

                            <p>

                                👨‍🏫 {lecture.teacher}

                            </p>

                            <p>

                                📅 {lecture.date}

                            </p>

                            <p>

                                Föreläsning {lecture.lecture_number}

                            </p>

                        </div>

                        <div

                            style={{

                                display:"flex",

                                gap:"12px"

                            }}

                        >

                            <button

                                onClick={()=>

                                    onEdit(lecture)

                                }

                            >

                                ✏️ Redigera

                            </button>

                            <button

                                onClick={()=>

                                    onDelete(lecture.id)

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

export default LectureList;