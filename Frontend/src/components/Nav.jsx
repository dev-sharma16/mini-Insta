import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
    const navItems = [
        { path: "/", label: "Home" },
        { path: "/upload", label: "Upload Post" },
        { path: "/user", label: "User" },
        { path: "/login", label: "Login" },
        { path: "/register", label: "Register" },
    ];

    const getNavLinkClass = ({ isActive }) =>
        isActive
            ? "text-blue-500 font-semibold border-b-2 border-blue-500"
            : "text-gray-300 hover:text-white";

    return (
        <nav className="bg-gray-900 px-6 py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <ul className="flex space-x-6">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={getNavLinkClass}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
