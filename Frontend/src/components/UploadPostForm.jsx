import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../axios";
import { useNavigate } from "react-router";

function UploadPostForm({ onSubmit, onGenerateCaption }) {
    const [preview, setPreview] = useState(null);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const [captions, setCaptions] = useState(null)
    const [generating, setGenerating] = useState(false)
    const [uploading, setuploading] = useState(false)
    
    const navigate = useNavigate()

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setSelectedFile(file);
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
        setSelectedFile(null);
        setValue("image", null); 
        setValue("caption", ""); 
    };

    const handleGenerateCaption = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("image", selectedFile);
            console.log("generating captions....");
            
            try {
                setGenerating(true);
                const res = await axios.post("/post/generate-captions", formData);
                console.log("fullresponse:",res);
                const captionsData = res.data.caption
                // console.log(captionsData);
                setCaptions(captionsData)
                console.log(captions);
            } catch (error) {
                console.error("Caption generation failed", error);
            } finally {
                setGenerating(false);
            }
        }
    };

    const submitHandler = async(data) => {
        try {
            setuploading(true);
            console.log(data.caption);
            console.log(selectedFile);

            const formData = new FormData();
            formData.append("image", selectedFile); 
            formData.append("caption", data.caption);

            const post = await axios.post('/post/upload', formData);
            // console.log(post);

            if(post.data.success){
                reset();
                setPreview(null);
                setSelectedFile(null);
                setCaptions(null);
                console.log("Post uploaded..!");
                navigate("/home")
            } else {
                console.log("Cant upload , try Again..!");
            }
        } catch (error) {
            console.error("Uploading failed", error);
        } finally {
            setuploading(false)
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md text-black">
            <h2 className="text-xl font-semibold mb-4 text-center">Upload Post</h2>
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
                {/* Image Input OR Preview */}
                {!preview ? (
                    <div>
                        <label className="block font-medium mb-1">Select Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image", { required: "Image is required" })}
                            onChange={handleImageChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>}
                    </div>
                ) : (
                    <div className="relative">
                        <img src={preview} alt="preview" className="w-full h-64 object-cover rounded" />
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded hover:bg-red-700"
                        >
                            Remove
                        </button>
                    </div>
                )}

                {/* Generate Caption Button */}
                {selectedFile && (
                    <div>
                        <button
                            type="button"
                            onClick={handleGenerateCaption}
                            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition w-full"
                        >
                            {generating ? "generating caption.." :"Generate Caption with AI"}
                        </button>
                    </div>
                )}
                {captions && (
                    <div className="mt-4">
                        <p className="font-medium mb-2">Suggested Captions:</p>
                        <ul className="space-y-2">
                            {Object.entries(captions).map(([key, captionText]) => (
                                <li
                                    key={key}
                                    className="bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200 transition"
                                    onClick={() => setValue("caption", captionText)}
                                >
                                    {captionText}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Caption */}
                <div>
                    <label className="block font-medium mb-1">Caption</label>
                    <textarea
                        {...register("caption", { required: "Caption is required" })}
                        className="w-full px-3 py-2 border rounded resize-none"
                        rows={4}
                        placeholder="Write a caption..."
                    />
                    {errors.caption && <p className="text-red-600 text-sm mt-1">{errors.caption.message}</p>}
                </div>
                
                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    {uploading ? "Uploading.." : "Upload"}
                </button>
            </form>
        </div>
    );
}

export default UploadPostForm;
