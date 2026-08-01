import { useState } from "react";
import { supabase } from "../../services/supabase";

function FileUpload({

    bucket = "images",

    folder = "",

    onUploaded

}) {

    const [uploading, setUploading] = useState(false);

    async function upload(event) {

        const file = event.target.files[0];

        if (!file) return;

        setUploading(true);

        const filename =

            `${Date.now()}-${file.name}`;

        const path =

            folder

                ? `${folder}/${filename}`

                : filename;

        const { error } = await supabase.storage

            .from(bucket)

            .upload(path, file);

        if (error) {

            alert(error.message);

            setUploading(false);

            return;

        }

        const {

            data

        } = supabase.storage

            .from(bucket)

            .getPublicUrl(path);

        setUploading(false);

        if (onUploaded) {

            onUploaded(data.publicUrl);

        }

    }

    return (

        <div>

            <input

                type="file"

                accept="image/*"

                onChange={upload}

            />

            {

                uploading &&

                <p>

                    Laddar upp...

                </p>

            }

        </div>

    );

}

export default FileUpload;