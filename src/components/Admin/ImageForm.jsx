import { useState } from "react";

import AdminSection from "./AdminSection";
import AdminInput from "./AdminInput";
import AdminTextarea from "./AdminTextarea";
import AdminButton from "./AdminButton.jsx";

import { createImage } from "../../services/adminDatabase";

import useAdminData from "../../hooks/useAdminData";
import AdminSelect from "./AdminSelect";

import FileUpload from "../FileUpload/FileUpload";

function ImageForm({ refresh }) {

    const [title,setTitle]=useState("");

    const [lectureId,setLectureId]=useState("");

    const [categoryId,setCategoryId]=useState("");

    const [slideId,setSlideId]=useState("");

    const [imageUrl,setImageUrl]=useState("");

    const [description,setDescription]=useState("");
    const {

    lectures,

    categories,

    slides

}=useAdminData();

    async function save(){

        if(!imageUrl){

            alert("Välj en bildfil innan du sparar.");

            return;

        }

        const result=

        await createImage({

            title,

            image_url: imageUrl,
            lecture_id: lectureId || null,
            category_id: categoryId || null,
            slide_id: slideId || null,

            description

        });

        if(!result){

            return;

        }

        setTitle("");
        setLectureId("");
        setCategoryId("");
        setSlideId("");
        setImageUrl("");
        setDescription("");

        refresh?.();

    }

    return(

        <AdminSection title="🖼 Ny bild">

            <AdminInput

                placeholder="Titel"

                value={title}

                onChange={e=>setTitle(e.target.value)}

            />

            <AdminSelect

            label="Föreläsning"

            value={lectureId}

            onChange={e=>setLectureId(e.target.value)}

            options={lectures}

            labelField="title"

            />

            <AdminSelect

            label="Kategori"

            value={categoryId}

            onChange={e=>setCategoryId(e.target.value)}

            options={categories}

            />

            <AdminSelect

            label="Originalslide"

            value={slideId}

            onChange={e=>setSlideId(e.target.value)}

            options={slides}

            labelField="page_number"

            />

            <FileUpload

                bucket="images"

                folder="concepts"

                onUploaded={setImageUrl}

            />

            <br />

            <AdminTextarea

                placeholder="Beskrivning"

                value={description}

                onChange={e=>setDescription(e.target.value)}

            />

            <AdminButton

                onClick={save}

            >

                💾 Spara bild

            </AdminButton>

        </AdminSection>

    )

}

export default ImageForm;