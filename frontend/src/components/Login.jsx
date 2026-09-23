import React, { useState } from "react";

import { Mail, Lock, Eye, EyeOff, Check } from "lucide-react";

import { Link } from "react-router-dom";

import { ArrowUpRight } from "lucide-react";



const Login = () => {

  const [formData, setFormData] = useState({

    email: "",

    password: "",

    rememberMe: false,

  });

  const [showPassword, setShowPassword] = useState(false);



  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: type === "checkbox" ? checked : value,

    }));

  };



  const handleSubmit = (e) => {

    e.preventDefault();

    console.log("Login submitted:", formData);

  };



  return (

    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8F9FA] px-4 py-6 font-sans sm:px-6 lg:px-12">

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12 xl:gap-16">

       

        {/* LEFT SECTION (BRAND & ILLUSTRATION) */}

        <div className="flex w-full flex-col justify-between text-center lg:w-1/2 lg:text-left">

          <div>

            {/* LOGO */}

            <Link to="/" className="inline-flex items-center gap-3">
                          <img
                            src="/images/exameye-logo.png"
                            alt="ExamEye Logo"
                            className="h-8 w-8 object-contain sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                          />
                          <div className="flex flex-col text-left">
                            <span className="text-xl font-black tracking-tight text-[#0A1E14] sm:text-2xl lg:text-3xl">
                              ExamEye
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#092517] sm:text-xs">
                              AI PROCTOR
                            </span>
                          </div>
                        </Link>



            {/* HEADINGS */}

            <div className="mt-10 sm:mt-12">

              <h1 className="text-3xl font-extrabold tracking-tight text-[#0D2418] sm:text-4xl lg:text-[42px] lg:leading-[1.15]">

                Secure Exams. <br />

                Trusted Results.

              </h1>

              <p className="mt-4 max-w-md text-base leading-relaxed text-[#4A5750] sm:text-lg">

                AI-powered proctoring to ensure fairness, integrity and trust in every online exam.

              </p>

            </div>

          </div>



          {/* PUBLIC FOLDER PNG ILLUSTRATION */}

          <div className="mt-8 w-full max-w-md lg:mt-12">

            <img

              src="/images/login-illustration.png"

              alt="ExamEye Illustration"

              className="w-full h-auto object-contain"

            />

          </div>

        </div>



        {/* RIGHT SECTION (LOGIN CARD) */}

        <div className="w-full lg:w-1/2 lg:max-w-[500px]">

          <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] sm:p-10 lg:p-12">

            <div className="flex flex-col text-left">

              <h2 className="text-3xl font-bold tracking-tight text-[#0B1E14] sm:text-4xl">

                Welcome Back,

              </h2>

              <p className="mt-2 text-sm text-[#73827A] sm:text-base">

                Sign in to your ExamEye account to continue

              </p>

            </div>



            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">

              {/* EMAIL FIELD */}

              <div>

                <label className="block text-sm font-semibold text-[#1F2923]">

                  Email Address

                </label>

                <div className="relative mt-2">

                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400">

                    <Mail className="h-5 w-5" />

                  </div>

                  <input

                    type="email"

                    name="email"

                    required

                    value={formData.email}

                    onChange={handleChange}

                    placeholder="email@exameye.edu.pk"

                    className="w-full rounded-xl border border-neutral-300 bg-white py-3.5 pl-11 pr-4 text-sm text-[#0D2418] placeholder-neutral-400 outline-none transition-all focus:border-[#092517] focus:ring-1 focus:ring-[#092517]"

                  />

                </div>

              </div>



              {/* PASSWORD FIELD */}

              <div>

                <label className="block text-sm font-semibold text-[#1F2923]">

                  Password

                </label>

                <div className="relative mt-2">

                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400">

                    <Lock className="h-5 w-5" />

                  </div>

                  <input

                    type={showPassword ? "text" : "password"}

                    name="password"

                    required

                    value={formData.password}

                    onChange={handleChange}

                    placeholder="enter your password"

                    className="w-full rounded-xl border border-neutral-300 bg-white py-3.5 pl-11 pr-11 text-sm text-[#0D2418] placeholder-neutral-400 outline-none transition-all focus:border-[#092517] focus:ring-1 focus:ring-[#092517]"

                  />

                  <button

                    type="button"

                    onClick={() => setShowPassword(!showPassword)}

                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-400 transition-colors hover:text-neutral-600"

                  >

                    {showPassword ? (

                      <EyeOff className="h-5 w-5" />

                    ) : (

                      <Eye className="h-5 w-5" />

                    )}

                  </button>

                </div>

              </div>



              {/* REMEMBER ME (CUSTOM GREEN CHECKBOX) & FORGOT PASSWORD */}

              <div className="flex items-center justify-between text-xs sm:text-sm">

                <label className="flex cursor-pointer items-center gap-2 text-[#4A5750]">

                  <div className="relative flex items-center">

                    <input

                      type="checkbox"

                      name="rememberMe"

                      checked={formData.rememberMe}

                      onChange={handleChange}

                      className="sr-only"

                    />

                    <div

                      className={`h-4 w-4 rounded border transition-all flex items-center justify-center ${

                        formData.rememberMe

                          ? "bg-[#092517] border-[#092517]"

                          : "border-neutral-300 bg-white"

                      }`}

                    >

                      {formData.rememberMe && (

                        <Check className="h-3 w-3 text-white stroke-[3]" />

                      )}

                    </div>

                  </div>

                  Remember Me

                </label>

                <Link

                  to="/forgot-password"

                  className="font-semibold text-[#0B1E14] transition-colors hover:underline"

                >

                  Forgot Password?

                </Link>

              </div>



              {/* SUBMIT BUTTON */}

           

<button

  type="submit"

  className="group relative mt-1 flex h-[56px] w-full items-center justify-center gap-2 overflow-hidden rounded-[14px] bg-[#092517] text-[15px] font-semibold text-white shadow-[0_10px_25px_rgba(9,37,23,0.16)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#071d12] hover:shadow-[0_14px_30px_rgba(9,37,23,0.22)] active:translate-y-0"

>

  <span className="transition-transform duration-300 group-hover:-translate-x-1">

    Sign In

  </span>



  <ArrowUpRight

    className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"

  />

</button>







            </form>



            {/* OR DIVIDER */}

            <div className="relative my-8 text-center">

              <div className="absolute inset-0 flex items-center">

                <div className="w-full border-t border-neutral-200" />

              </div>

              <span className="relative bg-white px-4 text-xs uppercase tracking-wider text-neutral-400">

                or

              </span>

            </div>



            {/* REGISTER LINK */}

            <p className="text-center text-sm text-[#526058]">

              Don't have an account?{" "}

              <Link

                to="/Register"

                className="font-bold text-[#0D2418] transition-colors hover:underline"

              >

                Register Yourself

              </Link>

            </p>

          </div>

        </div>



      </div>

    </div>

  );

};



export default Login; 

