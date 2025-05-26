import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import { email } from "zod/v4";

const schema = z.object({
  username: z
    .string()
    .min(4, { message: "???" })
    .max(10, { message: "10 to jada na pao" }),
  email: z.string().email(),
});
export const Form = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  console.log("formstate", formState.errors);

  const API_KEY = "cklFWXY3djJzbmtSOFp3UmhLVHM1UFNhdG9ZU2hsSVBaYnh6VmlubQ==";
  const BASE_URL = "https://api.countrystatecity.in/v1";

  const countryCode = async () => {
    try {
      const res = await fetch(`${BASE_URL}/countries/`, {
        method: "GET",
        headers: {
          "X-CSCAPI-KEY": API_KEY,
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(()=>{
    countryCode()
  },[])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          User Form
        </h2>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username")}
            placeholder="Enter your username"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formState.errors.username && (
            <p>{formState.errors.username.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-black font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
