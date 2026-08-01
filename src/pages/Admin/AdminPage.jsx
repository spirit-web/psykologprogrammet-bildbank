import { useEffect, useState } from "react";

import BackButton from "../../components/BackButton/BackButton";

import CourseForm from "../../components/Admin/CourseForm";
import CourseList from "../../components/Admin/CourseList";

import LectureForm from "../../components/Admin/LectureForm";
import LectureList from "../../components/Admin/LectureList";

import ImageForm from "../../components/Admin/ImageForm";
import ImageList from "../../components/Admin/ImageList";

import SlideList from "../../components/Admin/SlideList";
import EditSlideModal from "../../components/Admin/EditSlideModal";
import AdminSlideUpload from "../../components/Admin/AdminSlideUpload";

import TeacherForm from "../../components/Admin/TeacherForm";
import TeacherList from "../../components/Admin/TeacherList";

import CategoryForm from "../../components/Admin/CategoryForm";
import CategoryList from "../../components/Admin/CategoryList";

import ImportWizard from "../../components/Admin/ImportWizard";
import EditImageModal from "../../components/Admin/EditImageModal";
import EditCourseModal from "../../components/Admin/EditCourseModal";
import EditLectureModal from "../../components/Admin/EditLectureModal";

import {

    getAllCourses,
    getAllLectures,
    getAllImages,
    getAllSlides,
    getAllTeachers,
    getAllCategories,

    deleteCourse,
    deleteLecture,
    deleteImage,
    deleteSlide,
    deleteTeacher,
    deleteCategory

} from "../../services/adminDatabase";

function AdminPage() {

    const [selectedPage, setSelectedPage] = useState("courses");

    const [courses, setCourses] = useState([]);
    const [lectures, setLectures] = useState([]);
    const [images, setImages] = useState([]);
    const [slides, setSlides] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [categories, setCategories] = useState([]);

    const [editingImage, setEditingImage] = useState(null);

    const [editingSlide, setEditingSlide] = useState(null);

    const [editingCourse, setEditingCourse] = useState(null);

    const [editingLecture, setEditingLecture] = useState(null);

    async function loadAll() {

        setCourses(await getAllCourses());
        setLectures(await getAllLectures());
        setImages(await getAllImages());
        setSlides(await getAllSlides());
        setTeachers(await getAllTeachers());
        setCategories(await getAllCategories());

    }

    useEffect(() => {

        loadAll();

    }, []);

    async function removeCourse(id) {

        await deleteCourse(id);

        loadAll();

    }

    async function removeLecture(id) {

        await deleteLecture(id);

        loadAll();

    }

    async function removeImage(id) {

        await deleteImage(id);

        loadAll();

    }

    async function removeSlide(id) {

        await deleteSlide(id);

        loadAll();

    }

    async function removeTeacher(id) {

        await deleteTeacher(id);

        loadAll();

    }

    async function removeCategory(id) {

        await deleteCategory(id);

        loadAll();

    }

    return (

        <div

            style={{

                maxWidth: "1200px",

                margin: "0 auto",

                padding: "40px"

            }}

        >

            <BackButton />

            <h1>

                Adminpanel

            </h1>

            <p>

                Här administreras hela Psykopedia.

            </p>

            <hr />

            <h2>

                Snabbmeny

            </h2>

            <div

                style={{

                    display: "flex",

                    gap: "10px",

                    flexWrap: "wrap",

                    marginBottom: "40px"

                }}

            >

                <button onClick={() => setSelectedPage("courses")}>

                    📚 Kurser

                </button>

                <button onClick={() => setSelectedPage("lectures")}>

                    🎓 Föreläsningar

                </button>

                <button onClick={() => setSelectedPage("images")}>

                    🖼 Bilder

                </button>

                <button onClick={() => setSelectedPage("slides")}>

                    📑 Slides

                </button>

                <button onClick={() => setSelectedPage("teachers")}>

                    👨‍🏫 Lärare

                </button>

                <button onClick={() => setSelectedPage("categories")}>

                    🧠 Kategorier

                </button>

            </div>

            {selectedPage === "courses" && (

                <>

                    <CourseForm refresh={loadAll} />

                    <CourseList

                        courses={courses}

                        onDelete={removeCourse}

                        onEdit={setEditingCourse}

                    />

                </>

            )}

            {selectedPage === "lectures" && (

                <>

                    <LectureForm refresh={loadAll} />

                    <LectureList

                        lectures={lectures}

                        onDelete={removeLecture}

                        onEdit={setEditingLecture}

                    />

                </>

            )}

            {selectedPage === "images" && (

                <>

                    <ImageForm refresh={loadAll} />

                    <ImageList

                        images={images}

                        onDelete={removeImage}

                        onEdit={setEditingImage}

                    />

                </>

            )}

            {selectedPage === "slides" && (

                <>

                    <p style={{color:"#666"}}>

                        Ladda upp originalslides och koppla direkt till rätt föreläsning, eller gör det via föreläsningssidans flik "Originalslides".

                    </p>

                    <AdminSlideUpload

                        lectures={lectures}

                        refresh={loadAll}

                    />

                    <SlideList

                        slides={slides}

                        onDelete={removeSlide}

                        onEdit={setEditingSlide}

                    />

                </>

            )}

            {selectedPage === "teachers" && (

                <>

                    <TeacherForm refresh={loadAll} />

                    <TeacherList

                        teachers={teachers}

                        courses={courses}

                        onDelete={removeTeacher}

                        onEdit={(teacher)=>console.log(teacher)}

                    />

                </>

            )}

            {selectedPage === "categories" && (

                <>

                    <CategoryForm refresh={loadAll} />

                    <CategoryList

                        categories={categories}

                        onDelete={removeCategory}

                        onEdit={(category)=>console.log(category)}

                    />

                </>

            )}

        <hr style={{marginTop:60}} />

        <ImportWizard />

        {

            editingImage &&

            <EditImageModal

                image={editingImage}

                lectures={lectures}

                categories={categories}

                slides={slides}

                onClose={() => setEditingImage(null)}

                onSaved={loadAll}

            />

        }

        {

            editingSlide &&

            <EditSlideModal

                slide={editingSlide}

                lectures={lectures}

                onClose={() => setEditingSlide(null)}

                onSaved={loadAll}

            />

        }

        {

            editingCourse &&

            <EditCourseModal

                course={editingCourse}

                onClose={() => setEditingCourse(null)}

                onSaved={loadAll}

            />

        }

        {

            editingLecture &&

            <EditLectureModal

                lecture={editingLecture}

                courses={courses}

                onClose={() => setEditingLecture(null)}

                onSaved={loadAll}

            />

        }

        </div>

    );

}

export default AdminPage;