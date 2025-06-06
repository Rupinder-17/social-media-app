import React, { useEffect, useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { useNavigate, useParams, Link } from "react-router-dom"; // Added Link
import {
  FiArrowLeft,
  FiEdit,
  FiMail,
  FiCalendar,
  FiImage,
  FiTrash2, // Added FiTrash2
} from "react-icons/fi";
import { usePostGetUserName } from "../hooks/usePostGetUserName";
import { useFollow } from "../hooks/useFollow";
import { CiLocationOn } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import { useFollowList } from "../hooks/useFollowList";

export const UserProfile = () => {
  const { data, getUserProfile } = useProfile();
  const navigate = useNavigate();
  const { userpost, getPostByUsername, deletePost } = usePostGetUserName();
  const { toggleFollow } = useFollow();
  const [followerCounts, setFollowerCount] = useState(0);
  const [isUserFollowing, setIsUserFollowing] = useState(false);
  const { followData, userFollowerList, followingData, userFollowingList } =
    useFollowList();
  const [showFollower, setShowFollower] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  // State for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  console.log("followerData", followData);
  console.log("followingData", followingData);

  const { username } = useParams();

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      // Refresh posts after deletion
      getPostByUsername(username);
      setShowDeleteConfirm(false); // Close confirmation dialog
      setPostToDelete(null);
    } catch (e) {
      console.log(e);
    }
  };

  const openDeleteConfirm = (id) => {
    setPostToDelete(id);
    setShowDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setPostToDelete(null);
    setShowDeleteConfirm(false);
  };

  const handleFollowToggle = async (id) => {
    try {
      const result = await toggleFollow(id);
      console.log("result", result);

      if (result.success) {
        setIsUserFollowing(result.isFollowing);
        setFollowerCount(result.followersCount);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserProfile(username);
    getPostByUsername(username);
  }, [username]);

  useEffect(() => {
    if (data) {
      setFollowerCount(data.followersCount || 0);
      setIsUserFollowing(data.isFollowing || false);
    }
  }, [data]);

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
                <button
                  className={`text-sm font-medium flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                    isUserFollowing
                      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      : "bg-gray-500 text-white hover:bg-blue-600"
                  }`}
                  onClick={() => {
                    handleFollowToggle(data.account._id);
                    console.log("id", data?.account?._id);
                  }}
                >
                  {isUserFollowing ? (
                    <>
                      <FaUserCheck size={12} /> Following
                    </>
                  ) : (
                    <>
                      <FaUserPlus size={12} /> Follow
                    </>
                  )}
                </button>

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
                      {userpost?.length || 0}
                    </p>
                    <p className="text-sm text-blue-500 font-medium ">
                      {userpost?.length > 0 ? "Posts" : "Post"}{" "}
                    </p>
                  </div>
                  <div className="text-center bg-gray-50 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <p className="font-bold text-gray-900 text-xl">
                      {followerCounts || 0}
                    </p>

                    <div className="mt-4">
                      <button
                        onClick={() => {
                          userFollowerList(username);
                          setShowFollower((showFollower) => !showFollower);
                        }}
                        className="bg-gray-200 text-black px-4 py-1.5 rounded-full text-sm font-medium shadow-sm hover:bg-gray-300 transition duration-200"
                      >
                        {showFollower ? "Followers" : "Followers"}
                      </button>

                      {showFollower && (
                        <div className="mt-4 bg-white shadow rounded-lg p-4 space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                          {followData?.length > 0 ? (
                            followData.map((user) => (
                              <ul key={user._id}>
                                <li className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md">
                                  <img
                                    src={
                                      user.avatar ||
                                      `https://ui-avatars.com/api/?name=${user?.username?.charAt(
                                        0
                                      )}&background=random`
                                    }
                                    alt={user.username}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                  <Link
                                    to={`/user-profile/${user?.username}`}
                                    className="text-gray-800 font-medium hover:text-blue-600 transition"
                                  >
                                    @{user?.username}
                                  </Link>
                                </li>
                              </ul>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm">
                              No followers found.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-center bg-gray-50 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <p className="font-bold text-gray-900 text-xl">
                      {data.followingCount || 0}
                    </p>
                    <button
                      onClick={() => {
                        userFollowingList(username);
                        setShowFollowing((prev) => !prev);
                      }}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Following
                    </button>
                    {showFollowing && (
                      <div className="mt-4 bg-white shadow rounded-lg p-4 space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                        {followingData?.length > 0 ? (
                          followingData.map((user) => (
                            <ul key={user._id}>
                              <li className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md">
                                <img
                                  src={
                                    user.avatar ||
                                    `https://ui-avatars.com/api/?name=${user?.username?.charAt(
                                      0
                                    )}&background=random`
                                  }
                                  alt={user.username}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <Link
                                  to={`/user-profile/${user?.username}`}
                                  className="text-gray-800 font-medium hover:text-blue-600 transition"
                                >
                                  @{user?.username}
                                </Link>
                              </li>
                            </ul>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">
                            Not following anyone yet.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                    <div className="p-2 flex justify-end">
                      <button
                        onClick={() => openDeleteConfirm(item._id)} // Changed to open confirmation
                        className="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                        title="Delete post"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
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
        <div className="flex flex-col items-center justify-center p-8 min-h-[60vh]"></div>
      )}
    </div>
    // </div>
  );
};
