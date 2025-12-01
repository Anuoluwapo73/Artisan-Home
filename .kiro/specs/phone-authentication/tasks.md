# Implementation Plan

- [x] 1. Fix RecaptchaVerifier initialization bug





  - Update phoneAuth.js to use correct RecaptchaVerifier constructor parameter order
  - Change from `new RecaptchaVerifier(containerId, options, auth)` to `new RecaptchaVerifier(auth, containerId, options)`
  - Add expired-callback handler to options
  - _Requirements: 4.1, 4.5_

- [x] 2. Implement phone number validation





  - Create validatePhoneNumber function that checks E.164 format
  - Pattern: starts with '+' followed by 10-15 digits
  - Return boolean indicating validity
  - _Requirements: 1.1_

- [ ]* 2.1 Write property test for phone validation
  - **Property 1: Phone number format validation**
  - **Validates: Requirements 1.1**
-

- [x] 3. Implement OTP code validation




  - Create validateOTPCode function that checks for exactly 6 digits
  - Pattern: `^\d{6}$`
  - Return boolean indicating validity
  - _Requirements: 2.3_

- [ ]* 3.1 Write property test for OTP validation
  - **Property 4: OTP code format validation**
  - **Validates: Requirements 2.3**

- [x] 4. Create error message mapping utility





  - Define ERROR_MESSAGES object with all Firebase error codes
  - Create getErrorMessage function that maps error codes to user-friendly messages
  - Handle network errors and unknown errors
  - _Requirements: 1.5, 3.2, 3.4, 3.5_

- [ ]* 4.1 Write property test for error message mapping
  - **Property 3: Error handling displays appropriate messages**
  - **Validates: Requirements 1.5, 3.2, 3.4, 3.5**

- [x] 5. Refactor phoneAuth.js service





  - Implement setupRecaptcha function with correct parameters
  - Implement sendOTP function with proper error handling
  - Implement verifyOTP function
  - Implement cleanupRecaptcha function for resend scenarios
  - Add instance reuse logic (check if window.recaptchaVerifier exists)
  - _Requirements: 1.2, 1.3, 2.1, 2.4, 4.1, 4.3, 6.1, 6.2_

- [ ]* 5.1 Write property test for reCAPTCHA instance reuse
  - **Property 7: reCAPTCHA instance reuse**
  - **Validates: Requirements 4.3**

- [ ]* 5.2 Write unit tests for phoneAuth service
  - Test setupRecaptcha creates verifier with correct parameters
  - Test sendOTP handles success and error cases
  - Test verifyOTP handles success and error cases
  - Test cleanupRecaptcha removes verifier instance
  - _Requirements: 4.1, 4.2, 4.4, 4.5_
-

- [x] 6. Update phone authentication page component




  - Add phone number validation before sending OTP
  - Add OTP code validation before verifying
  - Implement loading state management
  - Add error state and display error messages
  - Integrate with refactored phoneAuth service
  - Add input validation feedback
  - _Requirements: 1.1, 1.4, 2.2, 2.3, 3.1, 3.3, 3.4_

- [ ]* 6.1 Write property test for UI state transitions
  - **Property 2: Successful OTP send triggers UI transition**
  - **Validates: Requirements 1.4, 2.2**

- [ ]* 6.2 Write property test for loading state
  - **Property 5: Loading state during async operations**
  - **Validates: Requirements 3.1**

- [ ]* 6.3 Write property test for failed verification retry
  - **Property 6: Failed verification allows retry**
  - **Validates: Requirements 3.3**

- [ ]* 6.4 Write unit tests for page component
  - Test phone input validation feedback
  - Test OTP input validation feedback
  - Test error message display
  - Test step transitions
  - _Requirements: 1.1, 2.3, 3.2, 3.4_

- [x] 7. Implement OTP resend functionality





  - Add "Resend OTP" button in step 2
  - Call cleanupRecaptcha before resending
  - Call sendOTP with same phone number
  - Update confirmation result with new result
  - Add resend cooldown timer (optional but recommended)
  - _Requirements: 6.1, 6.2, 6.3, 6.5_

- [ ]* 7.1 Write property test for resend flow
  - **Property 8: Resend flow cleanup and recreation**
  - **Validates: Requirements 6.1, 6.2, 6.5**
-

- [x] 8. Add visual feedback and UX improvements




  - Add loading spinner during OTP send
  - Add loading spinner during OTP verification
  - Disable submit buttons during loading
  - Add success message after authentication
  - Style error messages appropriately
  - Add phone number format hint text
  - _Requirements: 3.1, 3.4_

- [x] 9. Checkpoint - Ensure all tests pass





  - Ensure all tests pass, ask the user if questions arise.


- [x] 10. Create Firebase Console configuration guide




  - Document steps to enable phone authentication
  - Document steps to add authorized domains
  - Create checklist for production deployment
  - Add troubleshooting section for common issues
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ]* 11. Write integration tests for complete flow
  - Test happy path: phone input → OTP send → verify → success
  - Test error path: invalid phone → error → correction → success
  - Test resend path: send → resend → verify → success
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5_
-

- [x] 12. Final checkpoint - Ensure all tests pass




  - Ensure all tests pass, ask the user if questions arise.
