import React from 'react';

function PostCard({ image, caption }) {
    return (
        <div className="max-w-sm mx-auto rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white">
            <div className="aspect-square w-full">
                <img
                    src={image}
                    alt="Post"
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="p-4">
                <p className="text-gray-800 text-sm">{caption}</p>
            </div>
        </div>
    );
}

export default PostCard;
