"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Profile from "@/components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete the post");
        }
  
        // Re-fetch the posts after deletion
        const fetchResponse = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await fetchResponse.json();
        console.log("Updated posts:", data); // Debug log
        setPosts(data); // Update state with new posts
      } catch (error) {
        console.error("Error deleting post:", error); // Debug log
      }
    }
  };
  
  
  
  return (
    <div>
      <Profile
        name={"My name"}
        desc={"welcome to your profile"}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyProfile;
