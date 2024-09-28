"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copy, setCopy] = useState("");
  const { data: session } = useSession();
  const pathanme = usePathname()
  const router = useRouter()
  const handleCopy = () => {
    console.log("Copying:", post.prompt); // Debug log
    setCopy(post.prompt);
    navigator.clipboard
      .writeText(post.prompt)
      .then(() => {
        console.log("Copied to clipboard"); // Debug log
      })
      .catch((err) => {
        console.error("Failed to copy: ", err); // Error log
      });
    setTimeout(() => {
      setCopy("");
    }, 3000);
  };
  return (
    <div className=" prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className=" flex flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user-image"
            width={40}
            height={40}
            className=" rounded-full object-contain"
          />
          <div className=" flex flex-col">
            <h3 className=" font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className=" font-inter text-gray-500 text-sm">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copy === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className=" my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className=" font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick}
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathanme === "/profile" && (
        <div className=" mt-5 flex-center gap-4 border-t border-x-gray-100 pt-3">
          <p
            className=" font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className=" font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
