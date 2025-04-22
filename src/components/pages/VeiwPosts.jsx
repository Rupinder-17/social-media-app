import React, { useEffect } from 'react'
import { usePost } from '../hooks/usePost'

export const VeiwPosts = () => {
     const {posts, PostGet} =usePost()
     console.log("postfetch", posts);
     
     useEffect(()=>{
        PostGet()
     },[])
  return (
    <div>
        <h1>your posts</h1>
        {/* {posts.data.posts.content} */}

    </div>
  )
}
