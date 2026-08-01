import { useState } from "react";

import useAdminData from "../../hooks/useAdminData";

import AdminSelect from "./AdminSelect";

import { uploadFile } from "../../services/storage/storage";

import {

    createImage,

    createLecture,

    createSlide,

    updateLecture

} from "../../services/adminDatabase";

import {

    stripExtension,

    groupLectureFilesByTitle,

    sameTitle

} from "../../services/importMatching";

function guessTitle(filename) {

    return stripExtension(filename)

        .replace(/[_-]/g, " ")

        .replace(/\s+/g, " ")

        .trim();

}

function ImportWizard() {

    const [courseId, setCourseId] = useState("");

    const [imageFiles, setImageFiles] = useState([]);

    const [lectureFiles, setLectureFiles] = useState([]);

    const [uploading, setUploading] = useState(false);

    const [status, setStatus] = useState("");

    const [result, setResult] = useState(null);

    const {

        lectures,

        courses,

        refresh

    } = useAdminData();

    function selectImageFiles(event) {

        setImageFiles(Array.from(event.target.files));

    }

    function selectLectureFiles(event) {

        setLectureFiles(Array.from(event.target.files));

    }

    async function findOrCreateLecture(title) {

        const existing = lectures.find(

            lecture =>

                lecture.course_id === Number(courseId) &&

                sameTitle(lecture.title, title)

        );

        if (existing) {

            return existing;

        }

        const created = await createLecture({

            title,

            course_id: Number(courseId)

        });

        if (created) {

            lectures.push(created);

        }

        return created;

    }

    async function uploadAll() {

        if (!courseId) {

            alert("Välj vilken kurs bilderna hör till.");

            return;

        }

        if (imageFiles.length === 0) {

            alert("Välj minst en bild att ladda upp.");

            return;

        }

        setUploading(true);

        setResult(null);

        const imageBasenames = imageFiles.map(

            file => stripExtension(file.name)

        );

        // slideByImageBasename: vilken lecture/slide varje bildfilnamn ska kopplas till
        const slideByImageBasename = new Map();

        setStatus("Skapar föreläsningar och laddar upp originalslides...");

        const lectureGroups = groupLectureFilesByTitle(

            lectureFiles,

            imageBasenames

        );

        for (const { title, items } of lectureGroups.values()) {

            const lecture = await findOrCreateLecture(title);

            if (!lecture) {

                continue;

            }

            let slideNumber = 1;

            for (const { file, matchedImageBasename } of items) {

                const upload = await uploadFile({

                    bucket: "slides",

                    folder: `kurs-${courseId}`,

                    file

                });

                if (!upload) {

                    continue;

                }

                if (file.type === "application/pdf") {

                    if (!lecture.pdf_url) {

                        await updateLecture(lecture.id, {

                            pdf_url: upload.publicUrl

                        });

                        lecture.pdf_url = upload.publicUrl;

                    }

                } else {

                    const slide = await createSlide({

                        lecture_id: lecture.id,

                        title: guessTitle(file.name),

                        image_url: upload.publicUrl,

                        page_number: slideNumber++

                    });

                    if (matchedImageBasename && slide) {

                        slideByImageBasename.set(

                            matchedImageBasename.toLowerCase(),

                            { lectureId: lecture.id, slideId: slide.id }

                        );

                    }

                }

                if (matchedImageBasename && !slideByImageBasename.has(matchedImageBasename.toLowerCase())) {

                    slideByImageBasename.set(

                        matchedImageBasename.toLowerCase(),

                        { lectureId: lecture.id, slideId: null }

                    );

                }

            }

        }

        setStatus("Laddar upp bilder...");

        let linked = 0;

        let unlinked = 0;

        for (let i = 0; i < imageFiles.length; i++) {

            const file = imageFiles[i];

            const basename = imageBasenames[i];

            const match = slideByImageBasename.get(basename.toLowerCase());

            const upload = await uploadFile({

                bucket: "images",

                folder: `kurs-${courseId}`,

                file

            });

            if (!upload) {

                continue;

            }

            await createImage({

                title: guessTitle(file.name),

                image_url: upload.publicUrl,

                description: "",

                lecture_id: match?.lectureId ?? null,

                slide_id: match?.slideId ?? null,

                category_id: null

            });

            if (match) {

                linked++;

            } else {

                unlinked++;

            }

            setStatus(`Laddar upp bilder... (${i + 1}/${imageFiles.length})`);

        }

        setResult({

            total: imageFiles.length,

            linked,

            unlinked,

            lectures: lectureGroups.size

        });

        setImageFiles([]);

        setLectureFiles([]);

        setStatus("");

        setUploading(false);

        refresh?.();

    }


    return (

        <div
            style={{
                marginTop:40,
                padding:30,
                border:"1px solid #ddd",
                borderRadius:12
            }}
        >

            <h2>

                🚀 Import Wizard

            </h2>

            <p>

                Ladda upp originalslides (PDF/PNG) och redesignade bilder för en kurs samtidigt.
                Föreläsning kopplas automatiskt genom att originalfilens namn slutar med bildens
                exakta filnamn, t.ex. "Autonoma nervsystemet - Kurs 2 - 11 - Autonoma nervsystemet.pdf".

            </p>

            <AdminSelect

                label="Kurs"

                value={courseId}

                onChange={e => setCourseId(e.target.value)}

                options={courses}

            />

            <label style={{display:"block", fontWeight:600, marginBottom:6}}>

                Originalslides (PDF eller bild) — valfritt

            </label>

            <input

                type="file"

                multiple

                accept=".pdf,image/*"

                onChange={selectLectureFiles}

            />

            <p>{lectureFiles.length} filer valda</p>

            <br/>

            <label style={{display:"block", fontWeight:600, marginBottom:6}}>

                Redesignade bilder

            </label>

            <input

                type="file"

                multiple

                accept="image/*"

                onChange={selectImageFiles}

            />

            <p>{imageFiles.length} filer valda</p>

            <br/>

            <button

                onClick={uploadAll}

                disabled={uploading}

            >

                {

                    uploading

                        ? status || "Laddar upp..."
                        : "⬆️ Ladda upp alla"

                }

            </button>

            {

                result &&

                <div style={{marginTop:20}}>

                    <p>

                        ✅ {result.total} bilder uppladdade,
                        {" "}{result.lectures} föreläsningar skapade/återanvända.

                    </p>

                    <p>

                        🔗 {result.linked} bilder kopplade till föreläsning/slide.
                        {" "}{result.unlinked > 0 && `⚠️ ${result.unlinked} kunde inte kopplas automatiskt — koppla dem manuellt under "Bilder".`}

                    </p>

                </div>

            }

        </div>

    );

}

export default ImportWizard;