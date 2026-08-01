import { uploadFile } from "./storage";

export async function uploadMany({

    bucket,

    folder,

    files,

    onProgress

}) {

    const uploaded = [];

    let completed = 0;

    for (const file of files) {

        const result = await uploadFile({

            bucket,

            folder,

            file

        });

        if (result) {

            uploaded.push(result);

        }

        completed++;

        if (onProgress) {

            onProgress(

                Math.round(

                    completed /

                    files.length *

                    100

                )

            );

        }

    }

    return uploaded;

}