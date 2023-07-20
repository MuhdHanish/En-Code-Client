import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import StudentHomePage from "./pages/StudentHomePage/StudentHomePage";
import AuthProtected from "./components/ProtectedRoute/AuthProtected";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<StudentHomePage />}allowedRoles={["student"]}/>}/>
        <Route path="/login" element={<AuthProtected element={<LoginPage />} />}/>
        <Route path="/register"element={<AuthProtected element={<SignupPage />} />} />
      </Routes>
    </>
  );
}

export default App;
