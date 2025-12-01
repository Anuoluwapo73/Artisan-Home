# Phone Authentication Design Document

## Overview

This design document outlines the implementation of phone number authentication with OTP verification using Firebase Authentication and reCAPTCHA. The system will provide a secure, user-friendly authentication flow that properly handles reCAPTCHA initialization, OTP sending, and verification.

The primary focus is on fixing the current implementation issues:
- Incorrect RecaptchaVerifier constructor parameters
- Missing reCAPTCHA cleanup and reuse logic
- Inadequate error handling
- Firebase Console configuration requirements

## Architecture

### High-Level Flow

```
User Input Phone → Validate Format → Initialize reCAPTCHA → Send OTP → 
Display Verification UI → User Enters OTP → Verify OTP → Authenticate User
```

### Component Structure

1. **Phone Authentication Page Component** (`page.jsx`)
   - Manages UI state (phone input, OTP input, loading states)
   - Handles user interactions
   - Displays error messages and feedback

2. **Phone Auth Service** (`phoneAuth.js`)
   - Encapsulates Firebase phone authentication logic
   - Manages reCAPTCHA lifecycle
   - Provides clean API for OTP operations

3. **Firebase Configuration** (`firebase.js`)
   - Initializes Firebase app
   - Exports auth instance

## Components and Interfaces

### Phone Auth Service Interface

```javascript
// phoneAuth.js exports

/**
 * Initializes reCAPTCHA verifier if not already created
 * @param {string} containerId - DOM element ID for reCAPTCHA
 * @returns {RecaptchaVerifier} The verifier instance
 */
export function setupRecaptcha(containerId)

/**
 * Sends OTP to the provided phone number
 * @param {string} phoneNumber - Phone in E.164 format
 * @returns {Promise<{success: boolean, confirmationResult?: ConfirmationResult, error?: Error}>}
 */
export function sendOTP(phoneNumber)

/**
 * Verifies the OTP code
 * @param {ConfirmationResult} confirmationResult - Result from sendOTP
 * @param {string} code - 6-digit OTP code
 * @returns {Promise<{success: boolean, user?: User, error?: Error}>}
 */
export function verifyOTP(confirmationResult, code)

/**
 * Cleans up reCAPTCHA instance (for resend scenarios)
 */
export function cleanupRecaptcha()
```

### Page Component State

```javascript
{
  phone: string,              // User's phone number input
  otp: string,                // OTP code input
  step: number,               // 1 = phone input, 2 = OTP input
  loading: boolean,           // Loading state
  error: string | null,       // Error message
  confirmationResult: ConfirmationResult | null  // Firebase confirmation
}
```

## Data Models

### Phone Number Format
- **Format**: E.164 international format
- **Pattern**: `+[country code][number]`
- **Example**: `+2348012345678`
- **Validation**: Must start with '+' and contain 10-15 digits

### OTP Code Format
- **Length**: 6 digits
- **Type**: String (to preserve leading zeros)
- **Pattern**: `^\d{6}$`

### Error Types
```javascript
{
  'auth/invalid-phone-number': 'Invalid phone number format',
  'auth/missing-phone-number': 'Phone number is required',
  'auth/quota-exceeded': 'Too many requests. Please try again later',
  'auth/captcha-check-failed': 'reCAPTCHA verification failed',
  'auth/invalid-verification-code': 'Invalid OTP code',
  'auth/code-expired': 'OTP code has expired'
}
```

## Corre
ctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, several properties can be consolidated:
- Properties 1.4 and 2.2 both test UI state transitions after successful OTP send - these can be combined
- Properties 3.2, 3.4, and 3.5 all test error message display - these can be combined into one comprehensive error handling property
- Properties 6.1 and 6.2 test cleanup and recreation - these can be combined into one resend flow property

### Core Properties

**Property 1: Phone number format validation**
*For any* string input, the validation function should return true only if the string matches E.164 format (starts with '+' followed by 10-15 digits), and false otherwise.
**Validates: Requirements 1.1**

**Property 2: Successful OTP send triggers UI transition**
*For any* successful OTP send operation, the UI state should transition from step 1 (phone input) to step 2 (OTP input) and display a confirmation message.
**Validates: Requirements 1.4, 2.2**

**Property 3: Error handling displays appropriate messages**
*For any* error that occurs during authentication (invalid phone, network error, Firebase error), the system should display a user-friendly error message that corresponds to the error type.
**Validates: Requirements 1.5, 3.2, 3.4, 3.5**

**Property 4: OTP code format validation**
*For any* string input, the OTP validation function should return true only if the string is exactly 6 digits, and false otherwise.
**Validates: Requirements 2.3**

**Property 5: Loading state during async operations**
*For any* async authentication operation (sending OTP or verifying OTP), the loading state should be true while the operation is in progress and false when it completes.
**Validates: Requirements 3.1**

**Property 6: Failed verification allows retry**
*For any* OTP verification failure, the UI should remain on step 2 (verification step) and allow the user to enter a different code.
**Validates: Requirements 3.3**

**Property 7: reCAPTCHA instance reuse**
*For any* sequence of OTP send requests without cleanup, the system should reuse the same reCAPTCHA Verifier instance rather than creating new instances.
**Validates: Requirements 4.3**

**Property 8: Resend flow cleanup and recreation**
*For any* OTP resend operation, the system should clear the previous reCAPTCHA Verifier instance and create a new one, replacing the previous confirmation result.
**Validates: Requirements 6.1, 6.2, 6.5**

### Edge Cases and Examples

**Example 1: Correct reCAPTCHA initialization**
When the component mounts, the RecaptchaVerifier should be initialized with parameters in the correct order: (auth, containerId, options).
**Validates: Requirements 4.1, 4.5**

**Example 2: Invisible reCAPTCHA configuration**
The reCAPTCHA Verifier should be created with size: 'invisible' in the options object.
**Validates: Requirements 4.2**

**Example 3: Component cleanup**
When the component unmounts, the cleanup function should remove the reCAPTCHA Verifier instance from window object.
**Validates: Requirements 4.4**

**Example 4: Confirmation result handling**
After successful OTP send, the system should store the ConfirmationResult object for later verification.
**Validates: Requirements 2.1**

**Example 5: Successful authentication**
When OTP verification succeeds, the system should authenticate the user and update the auth state.
**Validates: Requirements 2.5**

## Error Handling

### Error Categories

1. **Validation Errors** (Client-side)
   - Invalid phone number format
   - Invalid OTP format
   - Missing required fields

2. **Firebase Errors** (Server-side)
   - `auth/invalid-phone-number`: Phone number format rejected by Firebase
   - `auth/missing-phone-number`: No phone number provided
   - `auth/quota-exceeded`: Too many SMS requests
   - `auth/captcha-check-failed`: reCAPTCHA verification failed
   - `auth/invalid-verification-code`: Wrong OTP entered
   - `auth/code-expired`: OTP expired (typically after 5 minutes)
   - `auth/too-many-requests`: Rate limit exceeded

3. **Network Errors**
   - Connection timeout
   - No internet connection
   - Firebase service unavailable

### Error Handling Strategy

```javascript
try {
  // Attempt operation
} catch (error) {
  if (error.code) {
    // Firebase error with error code
    const message = ERROR_MESSAGES[error.code] || 'An error occurred';
    setError(message);
  } else if (error.message.includes('network')) {
    // Network error
    setError('Network error. Please check your connection.');
  } else {
    // Unknown error
    setError('An unexpected error occurred. Please try again.');
  }
  console.error('Auth error:', error);
}
```

### User-Friendly Error Messages

```javascript
const ERROR_MESSAGES = {
  'auth/invalid-phone-number': 'Please enter a valid phone number in format: +2348012345678',
  'auth/missing-phone-number': 'Phone number is required',
  'auth/quota-exceeded': 'Too many requests. Please try again in a few minutes',
  'auth/captcha-check-failed': 'Verification failed. Please refresh and try again',
  'auth/invalid-verification-code': 'Invalid code. Please check and try again',
  'auth/code-expired': 'Code expired. Please request a new one',
  'auth/too-many-requests': 'Too many attempts. Please try again later'
};
```

## Testing Strategy

### Unit Testing

We will use **Jest** and **React Testing Library** for unit tests. Unit tests will cover:

1. **Phone number validation function**
   - Valid E.164 formats
   - Invalid formats (missing +, too short, too long, contains letters)
   - Edge cases (empty string, null, undefined)

2. **OTP validation function**
   - Valid 6-digit codes
   - Invalid codes (too short, too long, contains letters)
   - Edge cases (empty string, leading zeros)

3. **Error message mapping**
   - Each Firebase error code maps to correct message
   - Unknown errors get generic message
   - Network errors get network-specific message

4. **Component state transitions**
   - Step changes from 1 to 2 after successful OTP send
   - Step remains at 2 after failed verification
   - Loading states toggle correctly

### Property-Based Testing

We will use **fast-check** for property-based testing. Each property-based test will run a minimum of 100 iterations.

**Property-based tests will be tagged with this format:**
```javascript
// Feature: phone-authentication, Property 1: Phone number format validation
```

1. **Property 1: Phone number format validation**
   - Generate random strings with various patterns
   - Verify only valid E.164 formats pass validation

2. **Property 3: Error handling displays appropriate messages**
   - Generate various error objects
   - Verify each error type produces a non-empty, user-friendly message

3. **Property 4: OTP code format validation**
   - Generate random strings
   - Verify only 6-digit strings pass validation

4. **Property 7: reCAPTCHA instance reuse**
   - Call setupRecaptcha multiple times
   - Verify the same instance is returned

5. **Property 8: Resend flow cleanup and recreation**
   - Simulate resend flow
   - Verify old instance is cleared and new one is created

### Integration Testing

Integration tests will verify the complete authentication flow:

1. **Happy path**: Phone input → OTP send → OTP verify → Authentication success
2. **Error path**: Invalid phone → Error display → Correction → Success
3. **Resend path**: OTP send → Resend → New OTP → Verify → Success

### Firebase Console Configuration Checklist

These are manual verification steps, not automated tests:

1. ✓ Phone authentication enabled in Firebase Console
2. ✓ Authorized domains include:
   - `localhost` (for development)
   - Production domain (for deployment)
3. ✓ Valid API key in firebase.js
4. ✓ SMS quota not exceeded
5. ✓ Test phone numbers configured (optional, for testing)

## Implementation Notes

### Critical Fix: RecaptchaVerifier Constructor

**Current (Incorrect) Implementation:**
```javascript
// WRONG - auth is first parameter
window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
  { size: "invisible" }
);
```

**Correct Implementation:**
```javascript
// CORRECT - auth is third parameter
window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
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
```

### reCAPTCHA Lifecycle Management

1. **Initialization**: Create once when needed
2. **Reuse**: Use same instance for multiple OTP sends
3. **Cleanup**: Clear instance before resend or on unmount
4. **Recreation**: Create new instance after cleanup

### State Management Best Practices

1. Use single source of truth for confirmation result
2. Clear error messages when starting new operations
3. Disable submit buttons during loading
4. Provide clear visual feedback for each state

### Security Considerations

1. Never log phone numbers in production
2. Never log OTP codes
3. Clear sensitive data from state after authentication
4. Use HTTPS in production
5. Implement rate limiting on client side (in addition to Firebase)

## Dependencies

- `firebase` (v10+): Firebase SDK
- `react` (v18+): UI framework
- `jest`: Unit testing
- `@testing-library/react`: React component testing
- `fast-check`: Property-based testing

## Firebase Console Setup Steps

1. Go to Firebase Console → Authentication → Sign-in method
2. Enable "Phone" provider
3. Go to Settings → Authorized domains
4. Add your domains:
   - `localhost` (automatically included)
   - Your production domain (e.g., `artisan-home.com`)
5. Verify API key restrictions (if using restricted keys)
6. Check SMS quota in Usage tab

## Deployment Considerations

### Development
- Use `localhost` as authorized domain
- Test with real phone numbers
- Monitor Firebase console for errors

### Production
- Add production domain to authorized domains
- Set up monitoring for authentication failures
- Implement analytics for conversion tracking
- Consider SMS costs and quota limits
- Set up alerts for quota thresholds
