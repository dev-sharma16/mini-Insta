import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UploadPost from "../pages/UploadPost";
import User from "../pages/User";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<UploadPost />} />
            <Route path="/user" element={<User />} />
        </Routes>
    );
}

export default AppRoutes;
