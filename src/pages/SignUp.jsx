import React, { useState } from "react";
import MyContainer from "../components/MyContainer";
import { Link } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const SignUp = () => {
  const [show, setShow] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    // console.log("signup function entered", { email, password });
    // if (password.length < 6) {
    //   toast.error("Password should be at least 6 character");
    //   return;
    // }

    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>\/?`~]).{8,}$/;
    if (!regExp.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        toast.success("Signup successfully");
      })
      .catch((e) => {
        console.log(e);
        console.log(e.code);
        // Handle all common Firebase Auth errors
        if (e.code === "auth/email-already-in-use") {
          toast.error("User already exist in database.");
        } else if (e.code === "auth/invalid-email") {
          toast.error("Invalid email address.");
        } else if (e.code === "auth/weak-password") {
          toast.error("Password is too weak. Please choose a stronger one.");
        } else if (e.code === "auth/operation-not-allowed") {
          toast.error("Email/password accounts are not enabled in Firebase.");
        } else if (e.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Please try again later.");
        } else if (e.code === "auth/missing-password") {
          toast.error("Password field cannot be empty.");
        } else if (e.code === "auth/missing-email") {
          toast.error("Email field cannot be empty.");
        } else {
          // For any unknown/unexpected errors
          toast.error(e.message || "An unexpected error occurred");
        }
      });
  };
  return (
    <div className="min-h-[96vh] flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Animated floating circles */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-pink-400/30 rounded-full blur-2xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-pink-400/30 rounded-full blur-2xl top-10 left-10 animate-pulse"></div>
      </div>
      <MyContainer>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
          <div className="max-e-lg text-center lg:text-left">
            <h1 className="text-5xl font-extrabold">Create Your Account</h1>
            <p>
              Join our community and unlock exclusive features. Your journey
              begins here!
            </p>
          </div>
          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">
              Sign Up
            </h2>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-[8px] top-[36px] cursor-pointer z-50"
                >
                  {show ? <FaEye></FaEye> : <IoEyeOff></IoEyeOff>}
                </span>
              </div>

              <button type="submit" className="my-btn">
                Sign Up
              </button>

              <div className="text-center mt-3">
                <p className="text-sm text-white/80">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-pink-300 hover:text-white font-medium underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default SignUp;
