import axios from '../axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import PostCard from '../components/PostCard'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const fetchPost = async()=>{
      try {
        setLoading(true)
        const response = await axios.get("/post/all-posts")
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
    <div className="min-h-screen  px-5 py-8">
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
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home