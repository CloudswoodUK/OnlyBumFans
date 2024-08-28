import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import { Toaster } from "react-hot-toast";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import AdditionalInformationPage from "./pages/AdditionalInformationPage";
import { userAuthStore } from "./store/authStore";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = userAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  } else if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  } else {
    return children;
  }
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = userAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};
function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = userAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth) {
    return <div className="flex items-center justify-center h-screen text-center text-red-700 text-3xl font-light">Loading...</div>; // or return null to prevent premature redirection
  }
  console.log("Is Authenticated", isAuthenticated);
  console.log("User", user);
  return (
    /*<>
    <h1 className='text-5xl text-center text-violet-500'>Hello World</h1>
    </>*/

    <div>
      <Routes>
        <Route path="/" element={"Home"} />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignupPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/additional-information"
          element={
            <ProtectedRoute>
              <AdditionalInformationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        {/* catch all routes */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Toaster />
    </div>
  );
}
export default App;
