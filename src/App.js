import { css, Global } from "@emotion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ProtectedRoute,
  ProtectedRegistrationRoute,
} from "./routes/ProtectedRoutes";
import Budgets from "./pages/Budgets";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Transactions from "./pages/Transactions";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <>
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Montserrat:wght@600&display=swap");
          * {
            font-family: "Inter";
          }
          h1 {
            font-family: "Montserrat";
          }
        `}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/Login"
            element={
              <ProtectedRegistrationRoute>
                <Login />
              </ProtectedRegistrationRoute>
            }
          />
          <Route
            path="/SignUp"
            element={
              <ProtectedRegistrationRoute>
                <SignUp />
              </ProtectedRegistrationRoute>
            }
          />
          <Route
            path="/Categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Budgets"
            element={
              <ProtectedRoute>
                <Budgets />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
