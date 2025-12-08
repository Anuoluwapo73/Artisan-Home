import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase.js";

/**
 * Error messages mapping for Firebase authentication errors
 */
const ERROR_MESSAGES = {
  'auth/invalid-phone-number': 'Please enter a valid phone number in format: +2348012345678',
  'auth/missing-phone-number': 'Phone number is required',
  'auth/quota-exceeded': 'Too many requests. Please try again in a few minutes',
  'auth/captcha-check-failed': 'Verification failed. Please refresh and try again',
  'auth/invalid-verification-code': 'Invalid code. Please check and try again',
  'auth/code-expired': 'Code expired. Please request a new one',
  'auth/too-many-requests': 'Too many attempts. Please try again later'
};

/**
 * Maps error codes to user-friendly messages
 * @param {Error} error - Error object from Firebase or network
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  if (!error) {
    return 'An unexpected error occurred. Please try again.';
  }

  // Handle Firebase errors with error codes
  if (error.code && ERROR_MESSAGES[error.code]) {
    return ERROR_MESSAGES[error.code];
  }

  // Handle network errors
  if (error.message && (
    error.message.toLowerCase().includes('network') ||
    error.message.toLowerCase().includes('connection') ||
    error.message.toLowerCase().includes('timeout')
  )) {
    return 'Network error. Please check your connection.';
  }

  // Handle unknown errors
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Validates phone number format (E.164)
 * @param {string} phoneNumber - Phone number to validate
 * @returns {boolean} True if valid E.164 format, false otherwise
 */
export const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return false;
  }
  
  // E.164 format: starts with '+' followed by 10-15 digits
  const e164Pattern = /^\+\d{10,15}$/;
  return e164Pattern.test(phoneNumber);
};

/**
 * Validates OTP code format
 * @param {string} code - OTP code to validate
 * @returns {boolean} True if valid 6-digit code, false otherwise
 */
export const validateOTPCode = (code) => {
  if (!code || typeof code !== 'string') {
    return false;
  }
  
  // OTP format: exactly 6 digits
  const otpPattern = /^\d{6}$/;
  return otpPattern.test(code);
};

/**
 * Initializes reCAPTCHA verifier if not already created
 * Reuses existing instance if available
 * @param {string} containerId - DOM element ID for reCAPTCHA
 * @returns {RecaptchaVerifier} The verifier instance
 */
export const setupRecaptcha = (containerId = "recaptcha-container") => {
  // Reuse existing instance if available
  if (window.recaptchaVerifier) {
    return window.recaptchaVerifier;
  }

  // Create new instance with correct parameter order
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth, // auth instance (first parameter)
    containerId, // container ID (second parameter)
    {
      size: "invisible",
      callback: (response) => {
        console.log("reCAPTCHA solved");
      },
      'expired-callback': () => {
        console.log("reCAPTCHA expired");
      }
    }
  );

  return window.recaptchaVerifier;
};

/**
 * Sends OTP to the provided phone number
 * @param {string} phoneNumber - Phone in E.164 format
 * @returns {Promise<{success: boolean, confirmationResult?: ConfirmationResult, error?: Error}>}
 */
export const sendOTP = async (phoneNumber) => {
  try {
    console.log("🔵 Starting OTP send for:", phoneNumber);
    
    // Setup reCAPTCHA (reuses existing instance if available)
    const appVerifier = setupRecaptcha();
    console.log("🔵 reCAPTCHA verifier ready:", appVerifier);

    // Send OTP via Firebase
    console.log("🔵 Calling signInWithPhoneNumber...");
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    );

    console.log("✅ OTP sent successfully! Confirmation result:", confirmationResult);
    return { success: true, confirmationResult };
  } catch (error) {
    console.error("❌ OTP send failed:", error);
    console.error("❌ Error code:", error.code);
    console.error("❌ Error message:", error.message);
    return { success: false, error };
  }
};

/**
 * Verifies the OTP code
 * @param {ConfirmationResult} confirmationResult - Result from sendOTP
 * @param {string} code - 6-digit OTP code
 * @returns {Promise<{success: boolean, user?: User, error?: Error}>}
 */
export const verifyOTP = async (confirmationResult, code) => {
  try {
    // Verify the OTP code
    const result = await confirmationResult.confirm(code);
    const user = result.user;

    return { success: true, user };
  } catch (error) {
    console.error("OTP verification failed:", error);
    return { success: false, error };
  }
};

/**
 * Cleans up reCAPTCHA instance (for resend scenarios)
 * Should be called before creating a new reCAPTCHA instance
 */
export const cleanupRecaptcha = () => {
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (error) {
      console.error("Error clearing reCAPTCHA:", error);
    }
    window.recaptchaVerifier = null;
  }
};
