import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
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
  ArrowLeft,
  AlertCircle,
  Loader2
} from "lucide-react";

const StudentVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.initialData || {};

  const webcamRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isProcessingFace, setIsProcessingFace] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [faceError, setFaceError] = useState(null);

  // 1. Load face-api models on component mount
  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsModelLoading(true);
        const MODEL_URL = "/models"; // Ensure models are placed in /public/models
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        setIsModelLoading(false);
      } catch (err) {
        console.error("Failed to load face detection models:", err);
        setFaceError("Failed to load face detection AI models. Please check your network or public/models directory.");
        setIsModelLoading(false);
      }
    };

    loadModels();
  }, []);

  const handleStartVerification = () => {
    setCameraError(null);
    setFaceError(null);
    setIsCameraOpen(true);
  };

  // 2. Capture Photo & Generate Face Descriptor
  const capturePhoto = useCallback(async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setCapturedImage(imageSrc);
    setIsCameraOpen(false);
    setIsProcessingFace(true);
    setFaceError(null);

    try {
      // Create HTML Image element from base64 string
      const img = await faceapi.fetchImage(imageSrc);

      // Detect single face with landmarks & descriptor
      const detection = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        setFaceError("No clear face detected. Please ensure your face is fully visible, well-lit, and re-take.");
        setFaceDescriptor(null);
      } else {
        // Convert Float32Array descriptor to regular JavaScript Array for clean state transfer
        const descriptorArray = Array.from(detection.descriptor);
        setFaceDescriptor(descriptorArray);
      }
    } catch (err) {
      console.error("Error computing face descriptor:", err);
      setFaceError("An error occurred while processing your face profile. Please try again.");
    } finally {
      setIsProcessingFace(false);
    }
  }, [webcamRef]);

  const handleRetake = () => {
    setCapturedImage(null);
    setFaceDescriptor(null);
    setFaceError(null);
    setCameraError(null);
    setIsCameraOpen(true);
  };

  const handleUserMediaError = (error) => {
    console.error("Camera access error:", error);
    setCameraError("Unable to access camera. Please check camera permissions and try again.");
    setIsCameraOpen(false);
  };

  // 3. Pass Base64 Image + Face Descriptor back to Register Route
  const handleSubmitVerification = () => {
    if (!capturedImage || !faceDescriptor) return;

    navigate("/register", {
      state: {
        formData: initialData,
        isBiometricVerified: true,
        capturedImage: capturedImage,
        faceDescriptor: faceDescriptor, // Array of 128 numerical values
      },
    });
  };

  const handleBackToRegister = () => {
    navigate("/register", {
      state: {
        formData: initialData,
        isBiometricVerified: false,
        capturedImage: null,
        faceDescriptor: null,
      },
    });
  };

  return (
    <div className="min-h-screen w-full bg-white font-sans text-[#0D2418]">
      {/* Header */}
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
          className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Register</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-12 lg:py-10">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#0D2418] sm:text-4xl">
            Verify Your Identity
          </h1>
          <p className="mt-1.5 text-xs text-[#4A5750] sm:text-base">
            Take a clear photo to extract your biometric face profile before completing registration.
          </p>
          <div className="mt-2.5 inline-flex items-center gap-2 text-xs text-[#73827A] sm:text-sm">
            <Lock className="h-3.5 w-3.5 stroke-[1.8]" />
            <span>Your facial biometric descriptor is securely encrypted and stored for proctoring session verification.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
          {/* CAMERA BOX */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-900">
                {/* Model Loading State */}
                {isModelLoading && (
                  <div className="flex flex-col items-center justify-center gap-2.5 text-white">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                    <span className="text-xs font-semibold">Loading Face Recognition AI Models...</span>
                  </div>
                )}

                {/* Default Placeholder State */}
                {!isModelLoading && !isCameraOpen && !capturedImage && !cameraError && (
                  <div className="relative flex h-full w-full flex-col items-center justify-center bg-white">
                    <img
                      src="/images/Biometric-illustration.png"
                      alt="Biometric Verification Illustration"
                      className="h-full w-full object-contain p-4 opacity-90"
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-[#092517] shadow-sm">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
                        AI Models Loaded
                      </span>
                    </div>
                  </div>
                )}

                {/* Camera Error State */}
                {cameraError && (
                  <div className="flex flex-col items-center justify-center px-6 text-center text-white">
                    <AlertCircle className="mb-2 h-10 w-10 text-red-400" />
                    <p className="text-xs font-medium text-red-200">{cameraError}</p>
                    <button
                      onClick={handleStartVerification}
                      className="mt-4 rounded-lg bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {/* Live Webcam Stream */}
                {!isModelLoading && isCameraOpen && (
                  <div className="relative h-full w-full -scale-x-100">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/png"
                      className="h-full w-full object-cover"
                      videoConstraints={{ facingMode: "user" }}
                      onUserMediaError={handleUserMediaError}
                    />

                    {/* Face Oval Overlay Guide */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="h-3/4 w-1/2 rounded-[50%] border-2 border-dashed border-white/70 shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]"></div>
                    </div>

                    <button
                      onClick={capturePhoto}
                      className="-scale-x-100 absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer rounded-full bg-[#092517] px-6 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:bg-[#071d12] active:scale-95"
                    >
                      Capture Photo
                    </button>
                  </div>
                )}

                {/* Processing Descriptor Loader Overlay */}
                {isProcessingFace && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white backdrop-blur-xs">
                    <Loader2 className="mb-2 h-8 w-8 animate-spin text-emerald-400" />
                    <span className="text-xs font-semibold">Extracting Facial Descriptor...</span>
                  </div>
                )}

                {/* Captured Image State */}
                {capturedImage && !isProcessingFace && (
                  <div className="relative h-full w-full">
                    <img
                      src={capturedImage}
                      alt="Captured Face"
                      className="h-full w-full object-cover [transform:rotateY(180deg)]"
                    />
                    <button
                      onClick={handleRetake}
                      className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-black"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Retake
                    </button>
                  </div>
                )}
              </div>

              {/* Face Detection Validation Feedback */}
              {faceError && (
                <div className="mt-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
                  <div>
                    <span className="font-bold">Face Extraction Failed:</span> {faceError}
                  </div>
                </div>
              )}

              <div className="mt-5">
                {!capturedImage ? (
                  <button
                    onClick={handleStartVerification}
                    disabled={isModelLoading}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#092517] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#071d12] disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99]"
                  >
                    <span>{isCameraOpen ? "Recenter & Re-open" : "Start Face Verification"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <div className="flex flex-col gap-3">
                    {faceDescriptor && (
                      <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 text-xs">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                          <span className="font-semibold text-emerald-900">
                            Facial Descriptor Extracted (128-d Vector)
                          </span>
                        </div>
                        <span className="shrink-0 rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                          Ready
                        </span>
                      </div>
                    )}

                    <button
                      onClick={handleSubmitVerification}
                      disabled={!faceDescriptor || isProcessingFace}
                      className="w-full cursor-pointer rounded-xl bg-[#092517] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#071d12] disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.99]"
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