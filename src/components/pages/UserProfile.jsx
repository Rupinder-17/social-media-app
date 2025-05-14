import React, { useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiEdit } from "react-icons/fi";
import { usePostGetUserName } from "../hooks/usePostGetUserName";

export const UserProfile = () => {
  const { data, getUserProfile, followerUser } = useProfile();
  // const { data: posts, } = usePost();
  const navigate = useNavigate();
  const {userpost ,getPostByUsername}= usePostGetUserName()
  console.log("area",userpost);
  
  
  

  const { username } = useParams();

  useEffect(() => {
    getUserProfile(username);
    getPostByUsername(username)
  }, []);

  const handleFollowerList = () => {
    followerUser(data?.account?._id);
  };
  return (
    <div>
      <div>
        <div className="min-h-screen bg-gray-50">
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-800 flex items-center gap-1 hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <FiArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-semibold text-center flex-1">
              Profile
            </h1>
            <div className="w-10"></div>
          </div>

          {data ? (
            <div className="max-w-xl mx-auto p-4">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                  {data.coverImage && (
                    <img
                      src={data?.coverImage}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute bottom-2 right-2 flex items-center gap-2">
                    <label
                      htmlFor="coverImage"
                      className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition shadow-sm hover:shadow flex items-center gap-1"
                    >
                      <FiEdit size={14} /> Change Cover
                      {/* <input
                            type="file"
                            id="coverImage"
                            name="coverImage"
                            accept="image/*"
                            onChange={(e) => {
                              setCoverImagefile(e.target.files[0]);
                            }}
                            className="hidden"
                          /> */}
                    </label>
                    {/* {coverImagefile && (
                          <button
                            onClick={handleCoverImage}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-medium transition shadow-sm hover:shadow"
                          >
                            Save
                          </button>
                        )} */}
                  </div>
                </div>

                <div className="px-4 pt-0 pb-4 relative">
                  <div className="absolute -top-12 left-4 border-4 border-white rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 w-24 h-24 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                    {data?.avatar ? (
                      <img
                        src={data.avatar}
                        alt={data?.account?.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      data?.account?.username?.charAt(0).toUpperCase() || "U"
                    )}
                  </div>

                  <div className="flex justify-end mt-2">
                    <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-gray-700 text-sm transition-colors">
                      <FiEdit size={14} /> Edit Profile
                    </button>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-xl font-bold text-gray-900">
                      {data?.account?.username || "Username"}
                    </h2>
                    {data.fullName && (
                      <p className="text-gray-600 text-sm">{data.fullName}</p>
                    )}
                    {data.bio && (
                      <p className="mt-2 text-gray-700">{data.bio}</p>
                    )}

                    <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
                      <div className="text-center">
                        <p className="font-bold text-gray-900">
                          {data.postsCount || 0}
                        </p>
                        <p className="text-xs text-gray-500">Posts</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-gray-900">
                          {data.followersCount || 0}
                        </p>
                        <button
                          className="text-xs bg-blue-700 px-2 py-1 rounded-3xl text-gray-100"
                          onClick={handleFollowerList}
                        >
                          Followers
                        </button>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-gray-900">
                          {data.followingCount || 0}
                        </p>
                        <button className="text-xs bg-blue-700 px-2 py-1 rounded-3xl text-gray-100">
                          Following
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Profile Sections */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Account Info
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-500 text-sm">Email</p>
                      <p className="text-gray-900">
                        {data.email || "Not provided"}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-500 text-sm">Joined</p>
                      <p className="text-gray-900">
                        {data.createdAt
                          ? new Date(data.createdAt).toLocaleDateString()
                          : "Not available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {userpost?.map((item) => (
                  <img src={item?.images[0].url} alt="" />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8">
              <p className="text-gray-500">No profile information available</p>
              <button
                // onClick={() => getProfile()}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
