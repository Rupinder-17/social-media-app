import React, { useState } from 'react'
import { SocialAppServices } from '../services/SocialAppServices'

export const usePost = () => {

    const [posts, setPosts] = useState({
        loading: false,
        error: null,
        success: false,
    })

   const PostGet = async ()=>{
    setPosts({ loading: true, error: null, success: false });
    try{
        const response = await SocialAppServices.loadpost()
        setPosts({loading: false, error:null, success:true})
        return response
    }
    catch(e){
        console.log(e);
        
    }
   }
   return {
    posts, PostGet
   }
}
