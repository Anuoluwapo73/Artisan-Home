"use client";

import { useState, useEffect } from "react";
import {
  sendOTP,
  verifyOTP,
  validatePhoneNumber,
  validateOTPCode,
  getErrorMessage,
  cleanupRecaptcha,
} from "../../../firebase/phoneAuth.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PhoneLoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [phoneValidationError, setPhoneValidationError] = useState(null);
  const [otpValidationError, setOtpValidationError] = useState(null);
  const [lastPhoneNumber, setLastPhoneNumber] = useState(""); // Store phone number for resend
  const [resendCooldown, setResendCooldown] = useState(0); // Cooldown timer in seconds
  const [successMessage, setSuccessMessage] = useState(null); // Success message after authentication

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    // Clear validation error when user types
    if (phoneValidationError) {
      setPhoneValidationError(null);
    }
    // Clear general error when user types
    if (error) {
      setError(null);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    setOtp(value);
    // Clear validation error when user types
    if (otpValidationError) {
      setOtpValidationError(null);
    }
    // Clear general error when user types
    if (error) {
      setError(null);
    }
  };

  const requestOTP = async () => {
    console.log("🟢 requestOTP called with phone:", phone);
    
    // Clear previous errors and success messages
    setError(null);
    setPhoneValidationError(null);
    setSuccessMessage(null);

    // Validate phone number format before sending
    if (!validatePhoneNumber(phone)) {
      console.log("🔴 Phone validation failed");
      setPhoneValidationError(
        "Please enter a valid phone number in format: +2348012345678"
      );
      return;
    }

    console.log("✅ Phone validation passed");
    setLoading(true);

    try {
      console.log("🟢 Calling sendOTP...");
      const result = await sendOTP(phone);
      console.log("🟢 sendOTP result:", result);

      if (result.success) {
        console.log("✅ OTP sent successfully, transitioning to step 2");
        setConfirmationResult(result.confirmationResult);
        setLastPhoneNumber(phone); // Store phone number for resend
        setStep(2);
        // Clear phone input for security
        setPhone("");
      } else {
        // Handle error from sendOTP
        console.log("🔴 OTP send failed:", result.error);
        const errorMessage = getErrorMessage(result.error);
        console.log("🔴 Error message:", errorMessage);
        setError(errorMessage);
      }
    } catch (err) {
      // Handle unexpected errors
      console.log("🔴 Unexpected error:", err);
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
      console.log("🟢 requestOTP completed");
    }
  };

  const handleVerifyOTP = async () => {
    // Clear previous errors and success messages
    setError(null);
    setOtpValidationError(null);
    setSuccessMessage(null);

    // Validate OTP code format before verifying
    if (!validateOTPCode(otp)) {
      setOtpValidationError("Please enter a valid 6-digit code");
      return;
    }

    setLoading(true);

    try {
      const result = await verifyOTP(confirmationResult, otp);

      if (result.success) {
        // Show success message
        setSuccessMessage("Phone verified successfully! You are now authenticated.");
        // Reset form after a delay to show success message
        setTimeout(() => {
          setOtp("");
          setStep(1);
          setConfirmationResult(null);
          setLastPhoneNumber("");
          setResendCooldown(0);
          setSuccessMessage(null);
        }, 3000);
      } else {
        // Handle error from verifyOTP - stay on step 2 to allow retry
        const errorMessage = getErrorMessage(result.error);
        setError(errorMessage);
      }
    } catch (err) {
      // Handle unexpected errors - stay on step 2 to allow retry
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    // Clear previous errors and success messages
    setError(null);
    setOtpValidationError(null);
    setSuccessMessage(null);

    setLoading(true);

    try {
      // Cleanup previous reCAPTCHA instance
      cleanupRecaptcha();

      // Send new OTP to the same phone number
      const result = await sendOTP(lastPhoneNumber);

      if (result.success) {
        // Update confirmation result with new result
        setConfirmationResult(result.confirmationResult);
        // Clear OTP input
        setOtp("");
        // Start cooldown timer (60 seconds)
        setResendCooldown(60);
        // Show success message
        setError(null);
      } else {
        // Handle error from sendOTP
        const errorMessage = getErrorMessage(result.error);
        setError(errorMessage);
      }
    } catch (err) {
      // Handle unexpected errors
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Cooldown timer effect
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Phone Authentication
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Secure login with your phone number
        </p>

        <div id="recaptcha-container"></div>

        {/* Display success messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
            <svg
              className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-green-800 dark:text-green-200 font-medium">
              {successMessage}
            </p>
          </div>
        )}

        {/* Display general error messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-red-800 dark:text-red-200 font-medium">
              {error}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Phone Number
              </label>
              <Input
                id="phone"
                type="text"
                placeholder="+234XXXXXXXXXX"
                value={phone}
                onChange={handlePhoneChange}
                disabled={loading}
                aria-invalid={!!phoneValidationError}
                className="w-full"
              />
              {/* Phone validation feedback */}
              {phoneValidationError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {phoneValidationError}
                </p>
              )}
              {!phoneValidationError && (
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Format: +[country code][number] (e.g., +2348012345678)
                </p>
              )}
            </div>
            <Button
              onClick={requestOTP}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading && (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                OTP sent successfully! Please check your phone.
              </p>
            </div>
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Verification Code
              </label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={handleOtpChange}
                maxLength={6}
                disabled={loading}
                aria-invalid={!!otpValidationError}
                className="w-full text-center text-2xl tracking-widest font-mono"
              />
              {/* OTP validation feedback */}
              {otpValidationError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {otpValidationError}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <Button
                onClick={handleVerifyOTP}
                disabled={loading}
                className="w-full"
                size="lg"
                variant="default"
              >
                {loading && (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
              <Button
                onClick={handleResendOTP}
                disabled={loading || resendCooldown > 0}
                className="w-full"
                size="lg"
                variant="outline"
              >
                {loading && (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {resendCooldown > 0
                  ? `Resend OTP (${resendCooldown}s)`
                  : "Resend OTP"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
