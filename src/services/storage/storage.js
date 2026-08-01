import { supabase } from "../supabase";

function sanitizeFilename(name) {

    return name

        .normalize("NFD")

        .replace(/[\u0300-\u036f]/g, "")

        .replace(/[^a-zA-Z0-9._-]/g, "_");

}

export async function uploadFile({

    bucket,

    folder = "",

    file

}) {

    const cleanName = sanitizeFilename(file.name);

    const filename =

        `${Date.now()}-${cleanName}`;

    const path =

        folder

            ? `${folder}/${filename}`

            : filename;

    const { error } = await supabase

        .storage

        .from(bucket)

        .upload(path, file);

    if (error) {

        console.error(error);

        alert(error.message);

        return null;

    }

    const { data } =

        supabase

            .storage

            .from(bucket)

            .getPublicUrl(path);

    return {

        filename,

        path,

        publicUrl: data.publicUrl

    };

}