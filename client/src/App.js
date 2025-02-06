import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import ModeloList from "./components/ModeloList";
import ModeloForm from "./components/ModeloForm";
import IPhoneList from "./components/IPhoneList";
import IPhoneForm from "./components/IPhoneForm";
import IPhoneUsedForm from "./components/IPhoneUsedForm";
import IPhoneUsedList from "./components/IPhoneUsedList";
import IPadForm from "./components/IPadForm";
import IPadList from "./components/IPadList";
import ApplewatchForm from "./components/ApplewatchForm";
import ApplewatchList from "./components/ApplewatchList";
import MacbookForm from "./components/MacbookForm";
import MacbookList from "./components/MacbookList";
import Menu from "./components/Navbar";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import Welcome from "./pages/Welcome";
import AllItems from "./components/AllItems";
import { Container } from "@mui/material";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/iphone" />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/modelo"
        element={
          <ProtectedRoute user={user} roleRequired="admin">
            <ModeloList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/modelo/new"
        element={
          <ProtectedRoute user={user} roleRequired="admin">
            <ModeloForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/modelo/:id_modelo/edit"
        element={
          <ProtectedRoute user={user} roleRequired="admin">
            <ModeloForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/iphone"
        element={
          <ProtectedRoute user={user}>
            <IPhoneList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/allitems"
        element={
          <ProtectedRoute user={user}>
            <AllItems />
          </ProtectedRoute>
        }
      />
      <Route
        path="/iphone/new"
        element={
          <ProtectedRoute user={user}>
            <IPhoneForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/iphone/:id_iphone/edit"
        element={
          <ProtectedRoute user={user}>
            <IPhoneForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/iphoneused"
        element={
          <ProtectedRoute user={user}>
            <IPhoneUsedList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/iphoneused/new"
        element={
          <ProtectedRoute user={user}>
            <IPhoneUsedForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/iphoneused/:id_iphone_usado/edit"
        element={
          <ProtectedRoute user={user}>
            <IPhoneUsedForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ipad"
        element={
          <ProtectedRoute user={user}>
            <IPadList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ipad/new"
        element={
          <ProtectedRoute user={user}>
            <IPadForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ipad/:id_ipad/edit"
        element={
          <ProtectedRoute user={user}>
            <IPadForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/applewatch"
        element={
          <ProtectedRoute user={user}>
            <ApplewatchList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/applewatch/new"
        element={
          <ProtectedRoute user={user}>
            <ApplewatchForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/applewatch/:id_applewatch/edit"
        element={
          <ProtectedRoute user={user}>
            <ApplewatchForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/macbook"
        element={
          <ProtectedRoute user={user}>
            <MacbookList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/macbook/new"
        element={
          <ProtectedRoute user={user}>
            <MacbookForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/macbook/:id_macbook/edit"
        element={
          <ProtectedRoute user={user}>
            <MacbookForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Menu />
        <Container>
          <AppRoutes />
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}
