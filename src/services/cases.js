import { supabase } from "./supabase";

export async function getCases() {

    const { data, error } = await supabase
        .from("cases")
        .select("*")
        .order("category")
        .order("name");

    if (error) {
        console.error(error);
        return [];
    }

    return data;

}

export async function createCase(caseData) {

    const { data, error } = await supabase
        .from("cases")
        .insert(caseData)
        .select()
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;

}

export async function updateCase(id, updates) {

    const { data, error } = await supabase
        .from("cases")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;

}

export async function deleteCase(id) {

    const { error } = await supabase
        .from("cases")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        return false;
    }

    return true;

}

export async function getImagesForCase(caseId) {

    const { data, error } = await supabase
        .from("case_images")
        .select("images(*)")
        .eq("case_id", caseId);

    if (error) {
        console.error(error);
        return [];
    }

    return data.map(row => row.images).filter(Boolean);

}

export async function getLinkedImageIds(caseId) {

    const { data, error } = await supabase
        .from("case_images")
        .select("image_id")
        .eq("case_id", caseId);

    if (error) {
        console.error(error);
        return [];
    }

    return data.map(row => row.image_id);

}

export async function linkImageToCase(caseId, imageId) {

    const { error } = await supabase
        .from("case_images")
        .insert({ case_id: caseId, image_id: imageId });

    if (error) {
        console.error(error);
        return false;
    }

    return true;

}

export async function unlinkImageFromCase(caseId, imageId) {

    const { error } = await supabase
        .from("case_images")
        .delete()
        .eq("case_id", caseId)
        .eq("image_id", imageId);

    if (error) {
        console.error(error);
        return false;
    }

    return true;

}
