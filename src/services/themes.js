import { supabase } from "./supabase";

export async function getThemes() {

    const { data, error } = await supabase

        .from("themes")

        .select("*")

        .order("name");

    if (error) {

        console.error(error);

        return [];

    }

    return data;

}

export async function getThemesForImage(imageId) {

    const { data, error } = await supabase

        .from("image_themes")

        .select("theme_id, themes(id, name, icon)")

        .eq("image_id", imageId);

    if (error) {

        console.error(error);

        return [];

    }

    return data.map(row => row.themes);

}

export async function getCourseThemes(courseId) {

    const { data: lectures, error: lectureError } = await supabase

        .from("lectures")

        .select("id")

        .eq("course_id", courseId);

    if (lectureError || !lectures || lectures.length === 0) {

        return [];

    }

    const lectureIds = lectures.map(lecture => lecture.id);

    const { data, error } = await supabase

        .from("image_themes")

        .select("themes(id,name,icon), images!inner(lecture_id)")

        .in("images.lecture_id", lectureIds);

    if (error) {

        console.error(error);

        return [];

    }

    const uniqueThemes = new Map();

    for (const row of data) {

        if (row.themes) {

            uniqueThemes.set(row.themes.id, row.themes);

        }

    }

    return [...uniqueThemes.values()];

}

export async function getImagesByTheme(themeId) {

    const { data, error } = await supabase

        .from("image_themes")

        .select("images(*)")

        .eq("theme_id", themeId);

    if (error) {

        console.error(error);

        return [];

    }

    return data.map(row => row.images).filter(Boolean);

}

export async function getCourseImagesByTheme(courseId, themeId) {

    const { data: lectures, error: lectureError } = await supabase

        .from("lectures")

        .select("id")

        .eq("course_id", courseId);

    if (lectureError || !lectures || lectures.length === 0) {

        return [];

    }

    const lectureIds = lectures.map(lecture => lecture.id);

    const { data, error } = await supabase

        .from("image_themes")

        .select("images!inner(*)")

        .eq("theme_id", themeId)

        .in("images.lecture_id", lectureIds);

    if (error) {

        console.error(error);

        return [];

    }

    return data.map(row => row.images).filter(Boolean);

}

export async function createTheme(name, icon) {

    const { data, error } = await supabase

        .from("themes")

        .insert(icon ? { name, icon } : { name })

        .select()

        .single();

    if (error) {

        console.error(error);

        return null;

    }

    return data;

}

export async function tagImage(imageId, themeId) {

    const { error } = await supabase

        .from("image_themes")

        .insert({ image_id: imageId, theme_id: themeId });

    if (error) {

        console.error(error);

        return false;

    }

    return true;

}

export async function untagImage(imageId, themeId) {

    const { error } = await supabase

        .from("image_themes")

        .delete()

        .eq("image_id", imageId)

        .eq("theme_id", themeId);

    if (error) {

        console.error(error);

        return false;

    }

    return true;

}
