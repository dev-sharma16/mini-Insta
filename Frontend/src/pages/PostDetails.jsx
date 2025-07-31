import axios from '../axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import PostCard from '../components/PostCard'
import { useForm } from 'react-hook-form'

function PostDetails() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm()

    const navigate = useNavigate()

    const {postId} = useParams()
    const [post, setPost] = useState({})
    const [updating, setUpdating] = useState(false)

    const watchedCaption = watch("newCaption")

    const deleteHandler = async()=>{
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`/post/delete-post/${postId}`)
            alert(response.data.message)
            navigate('/user')
        } catch (error) {
            alert(response.data.message)
            console.error(error);
        }
    }

    const updateHandler = async(formData)=>{
        const confirmUpdate = window.confirm("Are you sure you want to update this post?");
        if(!confirmUpdate) return;

        try {
            setUpdating(true)
            const response = await axios.patch(`/post/update-post/${postId}`, formData) 
            alert(response.data.message)
            navigate('/user')
        } catch (error) {
            console.error(`Error : ${error}`);
        } finally {
            setUpdating(false)
        }
    }

    useEffect(()=>{
        const fetchPost = async()=>{
            // console.log(postId);
            try {
                const response = await axios.get(`/post/${postId}`)
                const postDetails = response.data.post
                setValue("newCaption",postDetails.caption)
                setPost(postDetails)
            } catch (error) {
                console.error(`Error : ${error}`);
            }
        }

        fetchPost();
    },[])
    return (
        <div className='text-white flex flex-col sm:flex-row justify-center gap-10 items-start mt-20 p-10'>
            {/* post section */}
            <div>
                <PostCard
                    image={post.imageUrl}
                    caption={watchedCaption}
                />
            </div>
            {/* update caption section */}
            <div>
                <form onSubmit={handleSubmit(updateHandler)} className='min-w-74 sm:min-w-80'>
                    <div>
                        <label className="block font-semibold mb-3">Caption</label>
                        <input 
                            type="text"
                            {...register("newCaption")}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={updating || post.caption === watchedCaption}
                        className={`w-full cursor-pointer
                            ${post.caption === watchedCaption ? 
                                "bg-blue-900 text-gray-400 py-2 rounded hover:bg-blue-900 transition mt-8":
                                "bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-8"
                            }
                        `}
                    >
                        {updating ? "Updating..." : "Update"}
                    </button>
                </form>
                <button 
                    onClick={deleteHandler}
                    className='w-full cursor-pointer bg-red-600 text-white py-2 rounded hover:bg-red-800 transition mt-3'
                >
                    Delete Post
                </button>
            </div>
        </div>
    )
}

export default PostDetails

// Todo : 1.complete this page for updating caption also, 2.make backend route and it controller to updates the caption also  