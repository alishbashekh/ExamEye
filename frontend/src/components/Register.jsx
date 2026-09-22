import React, { useState, useEffect } from "react";
import { Mail, Lock, User, Eye, EyeOff, GraduationCap, UserCheck, CheckCircle2, AlertTriangle, ArrowRight, X, ZoomIn } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "teacher",
  });
  const [showPassword, setShowPassword] = useState(false);
  
  // Verification states
  const [isBiometricVerified, setIsBiometricVerified] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);

  // Check state strictly from router navigation
  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
    }
    
    // Strict Check: Check if capturedImage actual Base64/DataURL image string exists
    if (location.state?.isBiometricVerified && location.state?.capturedImage) {
      setIsBiometricVerified(true);
      setCapturedImage(location.state.capturedImage);
      setErrorMessage("");
    } else {
      setIsBiometricVerified(false);
      setCapturedImage(null);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleSelect = (selectedRole) => {
    setFormData((prev) => ({
      ...prev,
      role: selectedRole,
    }));
    setErrorMessage("");
  };

  // Remove verification
  const handleRemoveVerification = (e) => {
    e.stopPropagation(); // Prevent opening modal on delete click
    setIsBiometricVerified(false);
    setCapturedImage(null);
  };

  const handleGoToVerification = () => {
    navigate("/student-verification", {
      state: { initialData: formData },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.role === "teacher") {
      navigate("/teacher-dashboard");
    } else if (formData.role === "student") {
      if (!isBiometricVerified || !capturedImage) {
        setErrorMessage("Please complete Face Biometric Verification before registering!");
      } else {
        navigate("/student-dashboard");
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8F9FA] px-4 py-6 font-sans sm:px-6 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12 xl:gap-16">
        
        {/* LEFT SECTION */}
        <div className="flex w-full flex-col justify-between text-center lg:w-1/2 lg:text-left">
          <div>
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

            <div className="mt-6 sm:mt-8 lg:mt-12">
              <h1 className="text-2xl font-extrabold tracking-tight text-[#0D2418] sm:text-3xl lg:text-[42px] lg:leading-[1.15]">
                Join ExamEye <br className="hidden sm:inline" />
                Today.
              </h1>
              <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-[#4A5750] sm:text-base lg:mx-0 lg:mt-4 lg:text-lg">
                Create an account to experience next-generation AI powered online examination and proctoring.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-6 hidden w-full max-w-[260px] sm:block sm:max-w-md lg:mx-0 lg:mt-10 lg:max-w-lg">
            <img 
              src="/images/login-illustration.png" 
              alt="ExamEye Illustration" 
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT SECTION (REGISTER CARD) */}
        <div className="w-full lg:w-1/2 lg:max-w-[520px]">
          <div className="rounded-2xl bg-white p-5 shadow-[0_15px_40px_rgba(0,0,0,0.05)] sm:rounded-[28px] sm:p-8 lg:p-10">
            <div className="flex flex-col text-left">
              <h2 className="text-xl font-bold tracking-tight text-[#0B1E14] sm:text-3xl lg:text-4xl">
                Create Account
              </h2>
              <p className="mt-1 text-xs text-[#73827A] sm:text-sm lg:text-base">
                Please fill in your details to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4 sm:mt-8 sm:gap-5">
              {/* FULL NAME */}
              <div>
                <label className="block text-xs font-semibold text-[#1F2923] sm:text-sm">
                  Full Name
                </label>
                <div className="relative mt-1.5 sm:mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400 sm:pl-4">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-10 pr-4 text-xs text-[#0D2418] placeholder-neutral-400 outline-none sm:py-3.5 sm:pl-11 sm:text-sm focus:border-[#092517] focus:ring-1 focus:ring-[#092517]"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-semibold text-[#1F2923] sm:text-sm">
                  Email Address
                </label>
                <div className="relative mt-1.5 sm:mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400 sm:pl-4">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@exameye.edu.pk"
                    className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-10 pr-4 text-xs text-[#0D2418] placeholder-neutral-400 outline-none sm:py-3.5 sm:pl-11 sm:text-sm focus:border-[#092517] focus:ring-1 focus:ring-[#092517]"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-xs font-semibold text-[#1F2923] sm:text-sm">
                  Password
                </label>
                <div className="relative mt-1.5 sm:mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400 sm:pl-4">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-10 pr-10 text-xs text-[#0D2418] placeholder-neutral-400 outline-none sm:py-3.5 sm:pl-11 sm:pr-11 sm:text-sm focus:border-[#092517] focus:ring-1 focus:ring-[#092517]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400 hover:text-neutral-600 sm:pr-4"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </button>
                </div>
              </div>

              {/* ROLE SELECTION */}
              <div>
                <label className="block text-xs font-semibold text-[#1F2923] sm:text-sm">
                  Select Role
                </label>
                <div className="mt-2 grid grid-cols-2 gap-3 sm:gap-4">
                  <div
                    onClick={() => handleRoleSelect("teacher")}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-3.5 text-center transition-all ${
                      formData.role === "teacher"
                        ? "border-[#092517] bg-[#092517]/5 font-bold text-[#092517] ring-1 ring-[#092517]"
                        : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                    }`}
                  >
                    <UserCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm">Teacher</span>
                  </div>

                  <div
                    onClick={() => handleRoleSelect("student")}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-3.5 text-center transition-all ${
                      formData.role === "student"
                        ? "border-[#092517] bg-[#092517]/5 font-bold text-[#092517] ring-1 ring-[#092517]"
                        : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                    }`}
                  >
                    <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm">Student</span>
                  </div>
                </div>
              </div>

              {/* STUDENT WARNING ALERT BOX (UNVERIFIED STATE) */}
              {formData.role === "student" && !isBiometricVerified && (
                <div className="flex flex-col gap-2 rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs text-amber-900">
                  <div className="flex items-center gap-2 font-semibold text-amber-800">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                    <span>Face Verification Required</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-700">
                    Face Biometric Verification is mandatory before completing your registration.
                  </p>
                  <button
                    type="button"
                    onClick={handleGoToVerification}
                    className="mt-1 flex items-center justify-center gap-1.5 rounded-lg bg-[#092517] py-2 text-xs font-semibold text-white transition-all hover:bg-[#071d12]"
                  >
                    <span>Proceed to Face Verification</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {/* ERROR MESSAGE */}
              {errorMessage && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 font-medium">
                  {errorMessage}
                </div>
              )}

              {/* BIOMETRIC VERIFIED BADGE WITH REAL IMAGE THUMBNAIL & MODAL CLICK */}
              {formData.role === "student" && isBiometricVerified && capturedImage && (
                <div 
                  onClick={() => setShowImageModal(true)}
                  className="group flex cursor-pointer items-center justify-between rounded-xl border border-emerald-300 bg-emerald-50/80 p-2.5 transition-all hover:bg-emerald-100/60 sm:p-3 text-xs"
                >
                  <div className="flex items-center gap-2.5 text-emerald-900">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span className="font-bold text-xs sm:text-sm">Face Biometric Verified</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* PHOTO THUMBNAIL PREVIEW */}
                    <div className="relative h-9 w-9 overflow-hidden rounded-lg border-2 border-emerald-500 shadow-sm sm:h-10 sm:w-10">
                      <img 
                        src={capturedImage} 
                        alt="Captured Face" 
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <ZoomIn className="h-3.5 w-3.5 text-white" />
                      </div>
                    </div>

                    {/* CANCEL / CROSS BUTTON */}
                    <button
                      type="button"
                      onClick={handleRemoveVerification}
                      title="Remove verification"
                      className="rounded-full p-1 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-900 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="mt-2 w-full cursor-pointer rounded-xl bg-[#092517] py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#071d12] hover:shadow-lg active:scale-[0.99] sm:rounded-2xl sm:py-4 sm:text-base"
              >
                {formData.role === "teacher" ? "Register as Teacher" : "Register as Student"}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-[#526058] sm:text-sm">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-[#0D2418] hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

      </div>

      {/* MODAL POPUP FOR ENLARGED CAPTURED FACE IMAGE */}
      {showImageModal && capturedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute right-3 top-3 rounded-full bg-neutral-100 p-1 text-neutral-600 hover:bg-neutral-200"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-sm font-bold text-[#0D2418] mb-3">Captured Face Verification</h3>
            <div className="aspect-square w-full overflow-hidden rounded-xl border border-neutral-200">
              <img src={capturedImage} alt="Enlarged Face Verification" className="h-full w-full object-cover" />
            </div>
            <button
              onClick={() => setShowImageModal(false)}
              className="mt-4 w-full rounded-xl bg-[#092517] py-2.5 text-xs font-semibold text-white"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;