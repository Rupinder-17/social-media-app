import React from "react";
import { useForm } from "react-hook-form";

export const CountryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg bg-white shadow">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Country & State Form
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country Name
          </label>
          <input
            type="text"
            {...register("countryName", {
              required: "Country name is required",
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.countryName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.countryName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            {...register("state", { required: "State is required" })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
