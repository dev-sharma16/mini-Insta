import { useEffect } from 'react';
import axios from '../axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

export const useAuthCheck = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/auth/user");
            
                if (res.data.success) {
                    dispatch(login(res.data.user));
                } else {
                    navigate("/login");
                }
            } catch {
                navigate("/login");
            }
        };
    
        fetchUser();
    }, []);
};
