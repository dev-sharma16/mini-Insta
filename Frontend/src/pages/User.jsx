import axios from '../axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice'

function User() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutHandler = async()=>{
    await axios.get("/auth/logout")
    dispatch(logout());
    navigate("/login")
  }

  return (
    <div className="text-white text-center mt-10">
      {user ? (
        <>
          <h1 className="text-2xl font-semibold">Hi, {user.username} 👋</h1>
          <button 
            onClick={logoutHandler} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-15"
          >
            LogOut
          </button>
        </>
      ) : (
        <div>
          <h1 className="text-xl mb-4">You're not logged in.</h1>
          <Link to="/login">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default User;
