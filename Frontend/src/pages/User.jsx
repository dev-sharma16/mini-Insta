import axios from '../axios';
import React, {useState, useEffect}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice'
import PostCard from '../components/PostCard';

function User() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutHandler = async()=>{
    await axios.get("/auth/logout")
    dispatch(logout());
    navigate("/login")
  }

  const postHandler = ()=>{
    navigate("/upload")
  }

  const changePasswordHandler = ()=>{
    navigate("/user/change-password")
  }

  const updatePostHandler = (postId)=>{
    navigate(`/user/post/${postId}`)
  }

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const fetchPost = async()=>{
      try {
        setLoading(true)
        const response = await axios.get("/post/user-posts")
        const postsData = response.data
        const posts = postsData?.data
        console.log(postsData);
        console.log(posts);
        setPosts(posts)
      } catch (error) {
        console.error('cant fetch post :',error);
      } finally {
        setLoading(false)
      }
    } 
    fetchPost()
  },[])

  return (
    <div className="text-white text-center mt-10">
      {user ? (
        <>
          <h1 className="text-2xl font-semibold">Hi, {user.username} 👋</h1>
          <button 
            onClick={logoutHandler} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition mt-15"
          >
            LogOut
          </button>
          <button 
            onClick={postHandler} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-15 ml-10"
          >
            Create Post
          </button>
          <button 
            onClick={changePasswordHandler} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-15 ml-10"
          >
            Change Password
          </button>
          <div className='mt-15 px-5 sm:px-15'>
            <h1 className="text-2xl font-bold mb-6">Latest Posts</h1>
            {loading ? (
              <p>Loading posts...</p>
            ) : posts?.length === 0 ? (
              <p>No posts yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    image={post.imageUrl}
                    caption={post.caption}
                    onTap={()=>{updatePostHandler(post._id)}}
                  />
                ))}
              </div>
            )}
          </div>
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