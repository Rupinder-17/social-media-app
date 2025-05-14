import React, { useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiEdit,
  FiMail,
  FiCalendar,
  FiImage,
} from "react-icons/fi";
import { usePostGetUserName } from "../hooks/usePostGetUserName";
import { CiLocationOn } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";

export const UserProfile = () => {
  const { data, getUserProfile, followerUser } = useProfile();
  const navigate = useNavigate();
  const { userpost, getPostByUsername, deletePost } = usePostGetUserName();
  console.log("area", userpost);
  

  const { username } = useParams();
  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserProfile(username);
    getPostByUsername(username);
  }, []);

  const handleFollowerList = () => {
    followerUser(data?.account?._id);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-800 flex items-center gap-1 hover:bg-gray-100 p-2 rounded-full transition-colors"
        >
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold text-center flex-1">Profile</h1>
        <div className="w-10"></div>
      </div>

      {data ? (
        <div className="max-w-3xl mx-auto p-4">
          {/* Profile Header Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 transition-all duration-300 hover:shadow-md">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
              {data.coverImage ? (
                <img
                  src={data?.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/70">
                  <FiImage size={40} />
                </div>
              )}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <label
                  htmlFor="coverImage"
                  className="bg-white/90 hover:bg-white text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-1 backdrop-blur-sm"
                >
                  <FiEdit size={14} /> Change Cover
                </label>
              </div>
            </div>

            <div className="px-6 pt-0 pb-6 relative">
              <div className="absolute -top-14 left-6 border-4 border-white rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 w-28 h-28 flex items-center justify-center text-white text-3xl font-bold shadow-lg transition-transform duration-300 hover:scale-105">
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

              <div className="flex justify-end mt-3">
                <button className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 px-4 py-2 rounded-full text-white text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                  <FiEdit size={14} /> Edit Profile
                </button>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900">
                  {data?.account?.username || "Username"}
                </h2>
                {data.fullName && (
                  <p className="text-gray-600 text-sm font-medium mt-1">
                    {data.fullName}
                  </p>
                )}
                {data.bio && (
                  <p className="mt-3 text-gray-700 leading-relaxed">
                    {data.bio}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-4">
                  {data.location && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <CiLocationOn className="mr-1" size={16} />
                      <span>{data.location}</span>
                    </div>
                  )}
                  {data.website && (
                    <div className="flex items-center text-blue-500 text-sm">
                      <IoIosLink className="mr-1" size={16} />
                      <a
                        href={data.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {data.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex gap-6 mt-6 pt-4 border-t border-gray-100">
                  <div className="text-center bg-gray-50 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <p className="font-bold text-gray-900 text-xl">
                      {userpost.length || 0}
                    </p>
                    <p className="text-sm text-blue-500 font-medium ">{userpost.length > 0 ? "Post" :"Posts"} </p>
                  </div>
                  <div className="text-center bg-gray-50 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <p className="font-bold text-gray-900 text-xl">
                      {data.followersCount || 0}
                    </p>
                    <button
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                      onClick={handleFollowerList}
                    >
                      Followers
                    </button>
                  </div>
                  <div className="text-center bg-gray-50 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <p className="font-bold text-gray-900 text-xl">
                      {data.followingCount || 0}
                    </p>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                      Following
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Info Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 transition-all duration-300 hover:shadow-md">
            <div className="p-5">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <FaRegBookmark className="mr-2" /> Account Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <FiMail className="text-gray-400 mr-3" size={18} />
                  <div>
                    <p className="text-gray-500 text-xs font-medium">Email</p>
                    <p className="text-gray-900 font-medium">
                      {data.email || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <FiCalendar className="text-gray-400 mr-3" size={18} />
                  <div>
                    <p className="text-gray-500 text-xs font-medium">Joined</p>
                    <p className="text-gray-900 font-medium">
                      {data.createdAt
                        ? new Date(data.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Not available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Posts Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <FiImage className="mr-2" /> Posts
            </h3>

            {userpost && userpost.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userpost.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    {item?.images && item.images[0] && (
                      <div className="relative pb-[100%] overflow-hidden bg-gray-100">
                        <img
                          src={item.images[0].url}
                          alt={`Post ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {item.content && (
                      <div className="p-3">
                        <p className="text-gray-800 text-sm line-clamp-2">
                          {item.content}
                        </p>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        console.log("'''''", userpost._id);
                        handleDeletePost(item._id);
                      }}
                    >
                      del
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center shadow-sm">
                <p className="text-gray-500">No posts yet</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 min-h-[60vh]">
          {/* <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse mb-4 flex items-center justify-center">
            <FiImage className="text-gray-400" size={30} />
          </div>
          <p className="text-gray-500 mb-2">No profile information available</p>
          <p className="text-gray-400 text-sm mb-4">
            The profile you're looking for might not exist or is still loading
          </p>
          <button className="mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md">
            Refresh
          </button> */}
        </div>
      )}
    </div>
    // </div>
  );
};
