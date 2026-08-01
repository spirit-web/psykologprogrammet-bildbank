import { supabase } from "./supabase";

export async function getCourses() {

    const { data, error } = await supabase

        .from("courses")

        .select("*, course_teachers(is_primary, teachers(id,name,image_url))")

        .order("term_id")

        .order("id");

    if (error) {

        console.error(error);

        return [];

    }

    return data;

}

export async function getCourse(id){

    const { data, error } = await supabase

        .from("courses")

        .select("*")

        .eq("id", id)

        .single();

    if(error){

        console.error(error);

        return null;

    }

    return data;

}

export async function getLectures(courseId){

    const { data,error } = await supabase

        .from("lectures")

        .select("*, image_count:images(count), cover:images(id,image_url)")

        .eq("course_id",courseId)

        .order("id", { foreignTable: "cover", ascending: true })

        .limit(1, { foreignTable: "cover" })

        .order("featured", { ascending: false })

        .order("lecture_number");

    if(error){

        console.error(error);

        return [];

    }

    return data.map(lecture => ({

        ...lecture,

        cover: lecture.cover?.[0]?.image_url ?? null,

        images: lecture.image_count?.[0]?.count ?? 0

    }));

}

export async function getLecture(id){

    const { data,error } = await supabase

        .from("lectures")

        .select("*")

        .eq("id",id)

        .single();

    if(error){

        console.error(error);

        return null;

    }

    return data;

}

export async function getImages(lectureId) {

    const { data, error } = await supabase

        .from("images")

        .select("*")

        .eq("lecture_id", lectureId)

        .order("id");

    if (error) {

        console.error(error);

        return [];

    }

    return data;

}

export async function getSlides(lectureId) {

    const { data, error } = await supabase

        .from("original_slides")

        .select("*")

        .eq("lecture_id", lectureId)

        .order("page_number");

    if (error) {

        console.error(error);

        return [];

    }

    return data;

}

export async function getCourseTeachers(courseId) {

    const { data, error } = await supabase

        .from("course_teachers")

        .select("teachers(id,name,title,image_url)")

        .eq("course_id", courseId);

    if (error) {

        console.error(error);

        return [];

    }

    return data.map(row => row.teachers).filter(Boolean);

}

export async function getCategories(courseId) {

    const { data, error } = await supabase

        .from("categories")

        .select("*")

        .eq("course_id", courseId)

        .order("sort_order");

    if (error) {

        console.error(error);

        return [];

    }

    return data;

}