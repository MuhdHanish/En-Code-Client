import { User } from "./dtos/User";
import { useCallback, useEffect } from "react";
import { useDispatch} from "react-redux";
import { Route, Routes } from "react-router-dom";
import { saveUser } from "./redux/userSlice/userSlice";
import { AdminPage, LoginPage, SignupPage, StudentPage,  TutorPage  } from "./pages";
import AuthProtected from "./components/Common/ProtectedRoute/AuthProtected";
import ProtectedRoute from "./components/Common/ProtectedRoute/ProtectedRoute";
import { StudentCatalog, StudentHome, StudentSelectedCourse, StudentSelectedCourseGate } from "./components/Student";
import { TutorHome, TutorSelectedCourse, TutorSessionGate } from "./components/Tutor";
import { CourseProtectedCaseOne, CourseProtectedCaseTwo } from "./components/Common/ProtectedCourseRoute/ProtetedCourseRoute";
import { AdminHome } from "./components/admin";

function App() {
  
  const dispatch = useDispatch();
  const saveUserFromLocalStorage = useCallback(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(saveUser(JSON.parse(user) as User));
    }
  }, [dispatch]);
  useEffect(() => {
    saveUserFromLocalStorage(); 
  }, [saveUserFromLocalStorage]);

  return (
<>
  <Routes>
    <Route path="/" element={<ProtectedRoute element={<StudentPage />} allowedRoles={["student"]} />} >
      <Route index={true} element={<StudentHome />} />
      <Route path="catalog" element={<StudentCatalog />} />
      <Route path="course/:selectedCourseId" element={<CourseProtectedCaseOne element={<StudentSelectedCourseGate />} />}  />
      <Route path="selected/course/:selectedCourseId" element={<CourseProtectedCaseTwo element={<StudentSelectedCourse />} />} />
    </Route>
    <Route path="/tutor" element={<ProtectedRoute element={<TutorPage />} allowedRoles={["tutor"]} />}>
      <Route index={true} element={<TutorHome />} />
      <Route path="section" element={<TutorSessionGate />} />
      <Route path="selected/course/:selectedCourseId" element={<TutorSelectedCourse/>} />
    </Route>
    <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} allowedRoles={["admin"]} />}>
      <Route index={true} element={<AdminHome/>} />
      <Route path="users" element={<AdminHome/>} />
      <Route path="courses" element={<AdminHome/>} />
      <Route path="languages" element={<AdminHome/>} />
    </Route>
    <Route path="/login" element={<AuthProtected element={<LoginPage />} />} />
    <Route path="/register" element={<AuthProtected element={<SignupPage />} />} />
  </Routes>
</>

  );
}
export default App;
