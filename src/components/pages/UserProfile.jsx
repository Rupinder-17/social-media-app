import React, { useEffect } from 'react'
import { useProfile } from '../hooks/useProfile'

export const UserProfile = () => {
  const {getUserProfile}= useProfile()
  // useEffect(()=>{
  //   // getUserProfile()
  // })
  return (
    <div>
        <div>
          <h1 onClick={()=>getUserProfile()} className='bg-red-800'>userProfile</h1>
          <div>
            <button>follow</button>
            <button>follower</button>
          </div>
        </div>
    </div>
  )
}
