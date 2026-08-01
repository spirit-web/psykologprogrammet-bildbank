import { supabase } from "./supabase";

/* =======================================
   COURSES
======================================= */

export async function getAllCourses() {

    const { data, error } = await supabase

        .from("courses")

        .select("*")

        .order("term_id")

        .order("id");

    if (error) {

        console.error(error);

        return [];

    }

    return data;

}

export async function createCourse(course) {

    const { data, error } = await supabase

        .from("courses")

        .insert(course)

        .select()

        .single();

    if (error) {

        console.error(error);

        alert(error.message);

        return null;

    }

    return data;

}

export async function updateCourse(id, updates) {

    const { data, error } = await supabase

        .from("courses")

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

export async function deleteCourse(id) {

    const { error } = await supabase

        .from("courses")

        .delete()

        .eq("id", id);

    if (error) {

        console.error(error);

        return false;

    }

    return true;

}

/* =======================================
   LECTURES
======================================= */

export async function getAllLectures() {

    const { data, error } = await supabase

        .from("lectures")

        .select(`
            *,
            courses(name)
        `)

        .order("course_id")

        .order("lecture_number");

    if (error) {

        console.error(error);

        return [];

    }

    return data;

}

export async function createLecture(lecture) {

    const { data, error } = await supabase

        .from("lectures")

        .insert(lecture)

        .select()

        .single();

    if (error) {

        console.error(error);

        alert(error.message);

        return null;

    }

    return data;

}

export async function deleteLecture(id) {

    const { error } = await supabase

        .from("lectures")

        .delete()

        .eq("id", id);

    if (error) {

        console.error(error);

        return false;

    }

    return true;

}


/* =======================================
   ORIGINAL SLIDES
======================================= */

export async function getAllSlides() {

    const { data, error } = await supabase

        .from("original_slides")

        .select("*")

        .order("lecture_id")

        .order("page_number");

    if (error) {

        console.error(error);

        return [];

    }

    const { data: lectures } = await supabase
        .from("lectures")
        .select("id, title");

    const lectureTitleById = new Map(
        (lectures ?? []).map(lecture => [lecture.id, lecture.title])
    );

    return data.map(slide => ({
        ...slide,
        lectures: {
            title: lectureTitleById.get(slide.lecture_id) ?? null
        }
    }));

}

export async function createSlide(slide) {

    const { data, error } = await supabase

        .from("original_slides")

        .insert(slide)

        .select()

        .single();

    if (error) {

        console.error(error);

        alert(error.message);

        return null;

    }

    return data;

}

export async function deleteSlide(id) {

    const { error } = await supabase

        .from("original_slides")

        .delete()

        .eq("id", id);

    if (error) {

        console.error(error);

        return false;

    }

    return true;

}

/* =======================================
   IMAGES
======================================= */

export async function getAllImages() {

    const { data, error } = await supabase

        .from("images")

        .select(`
            *,
            lectures(title),
            original_slides(page_number),
            categories(name)
        `)

        .order("lecture_id")

        .order("id");

    if (error) {

        console.error(error);

        return [];

    }

    return data;

}

export async function createImage(image) {

    const { data, error } = await supabase

        .from("images")

        .insert(image)

        .select()

        .single();

    if (error) {

        console.error(error);

        alert(error.message);

        return null;

    }

    return data;

}

export async function updateImage(id, updates){

    const { data,error } = await supabase

        .from("images")

        .update(updates)

        .eq("id",id)

        .select()

        .single();

    if(error){

        console.error(error);

        return null;

    }

    return data;

}

export async function deleteImage(id){

    const { error } = await supabase

        .from("images")

        .delete()

        .eq("id",id);

    if(error){

        console.error(error);

        return false;

    }

    return true;

}

/* =======================================
   TEACHERS
======================================= */

export async function getAllTeachers() {

    const { data, error } = await supabase

        .from("teachers")

        .select("*")

        .order("name");

    if (error) {

        console.error(error);

        return [];

    }

    return data;

}

export async function createTeacher(teacher) {

    const { data, error } = await supabase

        .from("teachers")

        .insert(teacher)

        .select()

        .single();

    if (error) {

        console.error(error);

        return null;

    }

    return data;

}

export async function deleteTeacher(id) {

    const { error } = await supabase

        .from("teachers")

        .delete()

        .eq("id", id);

    if (error) {

        console.error(error);

        return false;

    }

    return true;

}

export async function updateTeacher(id, teacher){

    const { error } = await supabase

        .from("teachers")

        .update(teacher)

        .eq("id", id);

    if(error){

        console.error(error);

        alert(error.message);

        return false;

    }

    return true;

}

/* =======================================
   CATEGORIES
======================================= */

export async function getAllCategories(){

    const { data, error } = await supabase

        .from("categories")

        .select("*")

        .order("sort_order");

    if(error){

        console.error(error);

        return [];

    }

    return data;

}

export async function createCategory(category){

    const { error } = await supabase

        .from("categories")

        .insert(category);

    if(error){

        console.error(error);

        alert(error.message);

        return false;

    }

    return true;

}

export async function updateCategory(id, category){

    const { error } = await supabase

        .from("categories")

        .update(category)

        .eq("id", id);

    if(error){

        console.error(error);

        alert(error.message);

        return false;

    }

    return true;

}

export async function deleteCategory(id){

    const { error } = await supabase

        .from("categories")

        .delete()

        .eq("id", id);

    if(error){

        console.error(error);

        alert(error.message);

        return false;

    }

    return true;

}

export async function updateLecture(id, updates) {

    const { error } = await supabase

        .from("lectures")

        .update(updates)

        .eq("id", id);

    if (error) {

        console.error(error);

        return false;

    }

    return true;

}

export async function updateCourseCover(id, cover) {

    const { error } = await supabase
        .from("courses")
        .update({
            cover
        })
        .eq("id", id);

    if (error) {
        console.error(error);
        return false;
    }

    return true;
}