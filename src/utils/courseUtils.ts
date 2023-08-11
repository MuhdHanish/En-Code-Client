import { AxiosError } from "axios";
import { getCourseById, getPopularCourses, getTutorCourses, postCourse, unListCourse, upadteCourse,getCourses,listCourse, getCourseDetailsAdmin, getCourseDetailsTutor } from "../api/courseApi";
import { setStudentToCourse } from "../api/courseApi";
import { Course } from "../dtos/Course";

export const getFullPopularCoruses = async (): Promise<Course[] | Error> => {
  try {
    const courses = (await getPopularCourses()) as Course[];
    return courses;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getFullCoruses = async (): Promise<Course[] | Error> => {
  try {
    const courses = (await getCourses()) as Course[];
    return courses;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postFullCourse = async (course:Course): Promise<Course | Error> => {
  try {
    const courses = await postCourse(course);
    return courses;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCourseDetailsDashborad = async (): Promise<{ _id: string, total: string }[] | Error> => {
   try {
     const details = await getCourseDetailsAdmin() as { _id: string, total: string }[] ;
     return details;
   } catch (error) {
    return Promise.reject(error);
   }
};

export const getCourseDetailsTutorDashborad = async (tutorId:string): Promise<{ _id: string, total: string }[] | Error> => {
   try {
     const details = await getCourseDetailsTutor(tutorId) as { _id: string, total: string }[] ;
     return details;
   } catch (error) {
    return Promise.reject(error);
   }
};

export const upadteCourseDetails = async (course:Course, _id:string): Promise<Course | Error> => {
  try {
    const courses = await upadteCourse(course, _id);
    return courses;
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err);
  }
};

export const getTutorCourse = async (id: string): Promise<Course[] | null> => {
  try {
    const courses = (await getTutorCourses(id)) as Course[];
    return courses;
  } catch (error) {
  return Promise.reject(error);
  }
};

export const getSelectedCourse = async(id: string): Promise<Course|null> => {
  try {
    const course = (await getCourseById(id)) as Course;
    return course;
  } catch (error) {
  return Promise.reject(error);
  }
}

export const setCourse = async (courseId: string, userId: string,): Promise<Course | null> => {
  try {
    const course = (await setStudentToCourse(courseId, userId)) as Course;
    return course;
  } catch (error) {
  return Promise.reject(error);
  }
}

export const listTheCourse = async (courseId: string): Promise<Course | null> => {
  try {
    const course = (await listCourse(courseId)) as Course;
    return course;
  } catch (error) {
  return Promise.reject(error);
  }
}

export const unListTheCourse = async (courseId: string): Promise<Course | null> => {
  try {
    const course = (await unListCourse(courseId)) as Course;
    return course;
  } catch (error) {
    return Promise.reject(error);
  }
}