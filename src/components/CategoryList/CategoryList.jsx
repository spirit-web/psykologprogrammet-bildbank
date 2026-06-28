import "./CategoryList.css";

import { demoCategories } from "../../data/demoCategories";

function CategoryList({ course }) {

    return (

        <>

            <h2>Kategorier</h2>

            <div className="category-list">

                {

                    demoCategories

                        .filter(category => category.courseId === course.id)

                        .map(category => (

                            <div

                                key={category.id}

                                className="category-pill"

                                style={{

                                    background: category.color

                                }}

                            >

                                🧠 {category.name}

                            </div>

                        ))

                }

            </div>

        </>

    );

}

export default CategoryList;