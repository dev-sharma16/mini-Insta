import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UploadPost from "../pages/UploadPost";
import User from "../pages/User";
import ChangePassword from "../pages/ChangePassword";
import PostDetails from "../pages/PostDetails";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<UploadPost />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/change-password" element={<ChangePassword />} />
            <Route path="/user/post/:postId" element={<PostDetails />} />
        </Routes>
    );
}

export default AppRoutes;
