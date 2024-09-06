import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../../utils/validation";
import AuthInput from "./AuthInput";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { changeStatus, registerUser } from "../../features/userSlice";
import Picture from "./Picture";
import axios from "axios";

const { REACT_APP_CLOUD_SECRET, REACT_APP_CLOUD_NAME } = process.env;

const RegisterForm = () => {
  const { status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [picture, setPicture] = useState();

  const [readablePicture, setReadablePicture] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    let res;
    dispatch(changeStatus("loading"));
    if (picture) {
      // upload image to cloudinary
      await uploadImage().then(async (response) => {
        res = await dispatch(
          registerUser({ ...data, picture: response.secure_url })
        );
      });
    } else {
      res = await dispatch(registerUser({ ...data, picture: "" }));
    }

    if (res?.payload?.user) {
      navigate("/");
    }
  };
  const uploadImage = async () => {
    let formData = new FormData();
    formData.append("upload_preset", REACT_APP_CLOUD_SECRET);
    formData.append("file", picture);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload/`,
      formData
    );
    console.log(data);
    return data;
  };
  return (
    <div className="p-screen w-full flex items-center justify-center overflow-hidden">
      <div className="max-w-md w-full space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-2 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="name"
            type="text"
            placeholder="Full Name"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="status"
            type="text"
            placeholder="Status (Optional)"
            register={register}
            error={errors?.status?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          <Picture
            setPicture={setPicture}
            setReadablePicture={setReadablePicture}
            readablePicture={readablePicture}
          />
          {error ? (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          ) : null}
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit"
          >
            {status === "loading" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Sign up"
            )}
          </button>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>have an account ?</span>
            <Link
              to="/login"
              className=" hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
