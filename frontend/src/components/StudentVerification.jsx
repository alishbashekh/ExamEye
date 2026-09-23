import React, { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Webcam from "react-webcam";
import {
  Sun,
  Camera,
  Image as ImageIcon,
  Slash,
  Info,
  Lock,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  ArrowLeft
} from "lucide-react";

const StudentVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.initialData || {};

  const webcamRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const handleStartVerification = () => {
    setIsCameraOpen(true);
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setIsCameraOpen(false);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setIsCameraOpen(true);
  };

  // Submit actual captured Base64 image back to Register Page
  const handleSubmitVerification = () => {
    if (!capturedImage) return;

    navigate("/register", {
      state: {
        formData: initialData,
        isBiometricVerified: true,
        capturedImage: capturedImage, // Pass actual image data
      },
    });
  };

  // Back without verification
  const handleBackToRegister = () => {
    navigate("/register", {
      state: {
        formData: initialData,
        isBiometricVerified: false,
        capturedImage: null,
      },
    });
  };

  return (
    <div className="min-h-screen w-full bg-white font-sans text-[#0D2418]">
      <header className="flex items-center justify-between border-b border-neutral-200 px-4 py-3.5 sm:px-8 lg:px-16">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <img
            src="/images/exameye-logo.png"
            alt="ExamEye Logo"
            className="h-7 w-7 object-contain sm:h-9 sm:w-9"
          />
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-[#0A1E14] sm:text-2xl">
              ExamEye
            </span>
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#092517] sm:text-[10px]">
              AI PROCTOR
            </span>
          </div>
        </Link>

        <button
          onClick={handleBackToRegister}
          className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Register</span>
        </button>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-12 lg:py-10">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#0D2418] sm:text-4xl">
            Verify Your Identity
          </h1>
          <p className="mt-1.5 text-xs text-[#4A5750] sm:text-base">
            Take a clear photo to verify your identity before creating your ExamEye account.
          </p>
          <div className="mt-2.5 inline-flex items-center gap-2 text-xs text-[#73827A] sm:text-sm">
            <Lock className="h-3.5 w-3.5 stroke-[1.8]" />
            <span>Your photo is used strictly for identity verification.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
          {/* CAMERA BOX */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-900">
                {!isCameraOpen && !capturedImage && (
                  <div className="relative flex h-full w-full flex-col items-center justify-center bg-white">
                    <img
                      src="/images/Biometric-illustration.png"
                      alt="Biometric Verification Illustration"
                      className="h-full w-full object-contain p-4 opacity-90"
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#092517] shadow-sm border border-neutral-200">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Camera Ready
                      </span>
                    </div>
                  </div>
                )}

                {isCameraOpen && (
                  <div className="relative h-full w-full">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/png"
                      className="h-full w-full object-cover"
                      videoConstraints={{ facingMode: "user" }}
                    />
                    <button
                      onClick={capturePhoto}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer rounded-full bg-[#092517] px-6 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:bg-[#071d12]"
                    >
                      Capture Photo
                    </button>
                  </div>
                )}

                {capturedImage && (
                  <div className="relative h-full w-full">
                    <img
                      src={capturedImage}
                      alt="Captured Face"
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={handleRetake}
                      className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-black"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Retake
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-[#092517]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#092517]"></span>
                Your photo is used strictly for identity verification.
              </div>

              <div className="mt-5">
                {!capturedImage ? (
                  <button
                    onClick={handleStartVerification}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#092517] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#071d12] active:scale-[0.99]"
                  >
                    <span>Start Face Verification</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 text-xs">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span className="font-semibold text-emerald-900">
                          Face Captured Successfully
                        </span>
                      </div>
                      <span className="shrink-0 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        Ready
                      </span>
                    </div>

                    <button
                      onClick={handleSubmitVerification}
                      className="w-full cursor-pointer rounded-xl bg-[#092517] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#071d12] active:scale-[0.99]"
                    >
                      Submit Verification
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <h3 className="text-base font-bold text-[#0D2418] sm:text-lg">
                For a successful verification
              </h3>

              <div className="mt-5 flex flex-col gap-4 sm:gap-6">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F2] text-[#092517]">
                    <Sun className="h-4 w-4 stroke-[1.8]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0D2418] sm:text-sm">01 Good Lighting</h4>
                    <p className="mt-0.5 text-xs text-[#526058]">
                      Make sure your face is clearly visible in bright, even lighting.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F2] text-[#092517]">
                    <Camera className="h-4 w-4 stroke-[1.8]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0D2418] sm:text-sm">02 Face the Camera</h4>
                    <p className="mt-0.5 text-xs text-[#526058]">
                      Look directly at the camera and keep your face inside the frame.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F2] text-[#092517]">
                    <ImageIcon className="h-4 w-4 stroke-[1.8]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0D2418] sm:text-sm">03 Clear Background</h4>
                    <p className="mt-0.5 text-xs text-[#526058]">
                      Use a clean, uncluttered background for better detection.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F2] text-[#092517]">
                    <Slash className="h-4 w-4 stroke-[1.8]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0D2418] sm:text-sm">04 Remove Obstructions</h4>
                    <p className="mt-0.5 text-xs text-[#526058]">
                      Remove sunglasses, masks, or anything covering your face.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#D0E2D7] bg-[#EAF2ED]/60 p-3.5 text-xs sm:p-4">
              <Info className="h-4 w-4 shrink-0 text-[#092517]" />
              <div className="text-[#35473E]">
                <span className="font-bold text-[#0D2418]">Before you continue</span>
                <p className="mt-0.5 text-[11px] sm:text-xs">
                  Ensure only your face is visible and your camera is working properly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentVerification;