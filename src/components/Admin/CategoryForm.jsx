import { useState } from "react";

import { createCategory } from "../../services/adminDatabase";

function CategoryForm() {

    const [name, setName] = useState("");

    const [icon, setIcon] = useState("");

    const [courseId, setCourseId] = useState(1);

    const [sortOrder, setSortOrder] = useState(1);

    async function saveCategory() {

        const success = await createCategory({

            name,

            icon,

            course_id: Number(courseId),

            sort_order: Number(sortOrder)

        });

        if (success) {

            alert("Kategori sparad!");

            setName("");

            setIcon("");

            setSortOrder(1);

        }

    }

    return (

        <div>

            <h2>

                Ny kategori

            </h2>

            <input

                placeholder="Kategori"

                value={name}

                onChange={(event) =>

                    setName(event.target.value)

                }

            />

            <br /><br />

            <input

                placeholder="Ikon (🧠 📚 ❤️ ⭐)"

                value={icon}

                onChange={(event) =>

                    setIcon(event.target.value)

                }

            />

            <br /><br />

            <input

                placeholder="Kurs ID"

                value={courseId}

                onChange={(event) =>

                    setCourseId(event.target.value)

                }

            />

            <br /><br />

            <input

                placeholder="Sortering"

                value={sortOrder}

                onChange={(event) =>

                    setSortOrder(event.target.value)

                }

            />

            <br /><br />

            <button

                onClick={saveCategory}

            >

                💾 Spara kategori

            </button>

        </div>

    );

}

export default CategoryForm;