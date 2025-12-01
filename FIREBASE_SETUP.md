# Firebase Phone Authentication Setup Guide

This guide walks you through configuring Firebase Console for phone authentication in the Artisan Home application.

## Prerequisites

- A Firebase project created at [Firebase Console](https://console.firebase.google.com/)
- Admin access to the Firebase project
- Your application domains (development and production)

## Step 1: Enable Phone Authentication

1. Navigate to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. In the left sidebar, click **Authentication**
4. Click the **Sign-in method** tab
5. In the **Sign-in providers** list, find **Phone**
6. Click on **Phone** to expand the configuration
7. Toggle the **Enable** switch to ON
8. Click **Save**

**Validates: Requirement 5.3**

## Step 2: Configure Authorized Domains

Firebase only allows authentication requests from authorized domains for security.

### For Development (localhost)

1. In the Firebase Console, go to **Authentication** → **Settings** tab
2. Scroll down to **Authorized domains** section
3. `localhost` should already be listed by default
4. If not present, click **Add domain** and enter `localhost`

**Validates: Requirement 5.4**

### For Production

1. In the same **Authorized domains** section, click **Add domain**
2. Enter your production domain (e.g., `artisan-home.com`)
3. If using a subdomain, add it as well (e.g., `app.artisan-home.com`)
4. Click **Add**

**Important Notes:**
- Do NOT include `http://` or `https://` in the domain
- Do NOT include port numbers
- Do NOT include paths (e.g., `/auth`)
- Examples of correct formats:
  - ✅ `artisan-home.com`
  - ✅ `app.artisan-home.com`
  - ❌ `https://artisan-home.com`
  - ❌ `artisan-home.com:3000`

**Validates: Requirement 5.5**

## Step 3: Verify API Credentials

1. In Firebase Console, click the **gear icon** (⚙️) next to Project Overview
2. Select **Project settings**
3. Scroll down to **Your apps** section
4. Find your web app or click **Add app** if you haven't created one
5. Copy the Firebase configuration object
6. Verify that your `frontend/firebase/firebase.js` file contains the correct values:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

**Validates: Requirement 5.2**

## Step 4: Check SMS Quota and Usage

1. In Firebase Console, go to **Authentication**
2. Click the **Usage** tab
3. Review your SMS quota:
   - **Spark Plan (Free)**: Limited SMS per day
   - **Blaze Plan (Pay-as-you-go)**: Higher limits, charges apply
4. Set up billing alerts if on Blaze plan:
   - Go to **Project settings** → **Usage and billing**
   - Click **Details & settings** under Firebase
   - Set up budget alerts

**Validates: Requirement 5.1**

## Production Deployment Checklist

Use this checklist before deploying phone authentication to production:

### Firebase Console Configuration
- [ ] Phone authentication provider is enabled
- [ ] Production domain is added to authorized domains
- [ ] API key is correctly configured in application
- [ ] Firebase project has appropriate billing plan for expected SMS volume
- [ ] Budget alerts are configured (if using Blaze plan)

### Application Configuration
- [ ] `firebase.js` contains production Firebase config
- [ ] Application is served over HTTPS (required for production)
- [ ] reCAPTCHA container element exists in the DOM
- [ ] Error handling is implemented for all authentication flows
- [ ] Loading states are properly displayed during async operations

### Testing
- [ ] Test phone authentication with real phone numbers
- [ ] Test OTP resend functionality
- [ ] Test error scenarios (invalid phone, wrong OTP, expired OTP)
- [ ] Verify reCAPTCHA appears and functions correctly
- [ ] Test on multiple devices and browsers

### Monitoring
- [ ] Set up Firebase Analytics for authentication events
- [ ] Monitor authentication failure rates in Firebase Console
- [ ] Set up alerts for quota thresholds
- [ ] Log authentication errors for debugging (without logging sensitive data)

### Security
- [ ] Never log phone numbers in production
- [ ] Never log OTP codes
- [ ] Implement rate limiting on client side
- [ ] Use environment variables for Firebase config (not hardcoded)
- [ ] Review Firebase Security Rules if using other Firebase services

**Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5**

## Troubleshooting Common Issues

### Issue 1: "reCAPTCHA verification failed" Error

**Symptoms:**
- Error code: `auth/captcha-check-failed`
- OTP is not sent

**Possible Causes & Solutions:**

1. **Domain not authorized**
   - **Solution**: Add your domain to authorized domains in Firebase Console (see Step 2)
   - Verify the domain matches exactly (no http://, no port numbers)

2. **reCAPTCHA container not found**
   - **Solution**: Ensure the element with id `recaptcha-container` exists in your JSX
   - Check that the element is rendered before calling `setupRecaptcha()`

3. **Incorrect RecaptchaVerifier initialization**
   - **Solution**: Verify constructor parameters are in correct order:
     ```javascript
     new RecaptchaVerifier(auth, containerId, options)
     ```
   - NOT: `new RecaptchaVerifier(containerId, options, auth)`

4. **Multiple reCAPTCHA instances**
   - **Solution**: Implement instance reuse logic (check `window.recaptchaVerifier` before creating new)
   - Call `cleanupRecaptcha()` before creating a new instance

### Issue 2: "Invalid phone number" Error

**Symptoms:**
- Error code: `auth/invalid-phone-number`
- OTP send fails immediately

**Possible Causes & Solutions:**

1. **Incorrect phone number format**
   - **Solution**: Use E.164 format: `+[country code][number]`
   - Example: `+2348012345678` (Nigeria)
   - Example: `+14155552671` (USA)

2. **Missing country code**
   - **Solution**: Ensure phone number starts with `+` and country code
   - Implement client-side validation before sending

3. **Phone number contains spaces or special characters**
   - **Solution**: Strip all non-digit characters except the leading `+`
   - Example: `+234 801 234 5678` → `+2348012345678`

### Issue 3: "Quota exceeded" Error

**Symptoms:**
- Error code: `auth/quota-exceeded`
- Cannot send more OTPs

**Possible Causes & Solutions:**

1. **Daily SMS limit reached (Spark plan)**
   - **Solution**: Upgrade to Blaze plan for higher limits
   - Wait until quota resets (typically 24 hours)

2. **Too many requests from same IP**
   - **Solution**: Implement client-side rate limiting
   - Add cooldown timer between resend attempts
   - Firebase automatically rate limits per phone number

3. **Testing with same number repeatedly**
   - **Solution**: Use Firebase test phone numbers for development
   - Go to Authentication → Sign-in method → Phone → Test phone numbers
   - Add test numbers with predefined OTP codes

### Issue 4: "Invalid verification code" Error

**Symptoms:**
- Error code: `auth/invalid-verification-code`
- OTP verification fails

**Possible Causes & Solutions:**

1. **User entered wrong code**
   - **Solution**: Allow retry without resending OTP
   - Display clear error message
   - Ensure OTP input accepts exactly 6 digits

2. **Code expired**
   - **Solution**: OTP codes expire after ~5 minutes
   - Implement resend functionality
   - Display expiration timer to user

3. **Using old confirmation result**
   - **Solution**: Store the latest `confirmationResult` from `sendOTP()`
   - Replace old result when resending OTP

### Issue 5: "Too many requests" Error

**Symptoms:**
- Error code: `auth/too-many-requests`
- Temporary block on authentication attempts

**Possible Causes & Solutions:**

1. **Rapid repeated attempts**
   - **Solution**: Implement exponential backoff
   - Add cooldown timer between attempts
   - Display clear message to user about waiting period

2. **Automated testing without test phone numbers**
   - **Solution**: Use Firebase test phone numbers for automated tests
   - Avoid testing with real phone numbers in CI/CD

### Issue 6: reCAPTCHA Not Appearing

**Symptoms:**
- No visible reCAPTCHA challenge
- OTP send fails silently

**Possible Causes & Solutions:**

1. **Using invisible reCAPTCHA**
   - **Solution**: This is expected behavior with `size: 'invisible'`
   - reCAPTCHA only appears if Google detects suspicious activity
   - No action needed if OTP sends successfully

2. **Container element missing**
   - **Solution**: Add `<div id="recaptcha-container"></div>` to your JSX
   - Ensure it's rendered before calling `setupRecaptcha()`

3. **CSS hiding the container**
   - **Solution**: Check that container is not `display: none`
   - Use `visibility: hidden` if you want to hide it

### Issue 7: "Network error" or Timeout

**Symptoms:**
- Generic network error
- Request times out

**Possible Causes & Solutions:**

1. **No internet connection**
   - **Solution**: Check user's network connectivity
   - Display user-friendly error message
   - Implement retry mechanism

2. **Firebase service outage**
   - **Solution**: Check [Firebase Status Dashboard](https://status.firebase.google.com/)
   - Implement fallback authentication method if critical

3. **Firewall or proxy blocking Firebase**
   - **Solution**: Ensure Firebase domains are whitelisted:
     - `*.firebaseapp.com`
     - `*.googleapis.com`
     - `*.google.com`

### Issue 8: Works Locally but Fails in Production

**Symptoms:**
- Authentication works on localhost
- Fails when deployed to production domain

**Possible Causes & Solutions:**

1. **Production domain not authorized**
   - **Solution**: Add production domain to Firebase authorized domains
   - Verify domain matches exactly (check for www vs non-www)

2. **Not using HTTPS**
   - **Solution**: Firebase requires HTTPS in production
   - Set up SSL certificate for your domain

3. **Wrong Firebase config**
   - **Solution**: Verify production build uses correct Firebase config
   - Check environment variables are set correctly

4. **API key restrictions**
   - **Solution**: If using restricted API keys, add your domain to allowed referrers
   - Go to Google Cloud Console → Credentials → Edit API key

## Getting Help

If you encounter issues not covered in this guide:

1. **Check Firebase Console Logs**
   - Go to Authentication → Users tab
   - Look for failed authentication attempts

2. **Enable Debug Logging**
   ```javascript
   import { getAuth } from 'firebase/auth';
   const auth = getAuth();
   auth.settings.appVerificationDisabledForTesting = true; // Only for testing!
   ```

3. **Firebase Support Resources**
   - [Firebase Documentation](https://firebase.google.com/docs/auth/web/phone-auth)
   - [Firebase Support](https://firebase.google.com/support)
   - [Stack Overflow - firebase tag](https://stackoverflow.com/questions/tagged/firebase)

4. **Common Firebase Error Codes**
   - [Auth Error Codes Reference](https://firebase.google.com/docs/reference/js/auth#autherrorcodes)

## Additional Resources

- [Firebase Phone Auth Documentation](https://firebase.google.com/docs/auth/web/phone-auth)
- [reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/display)
- [E.164 Phone Number Format](https://en.wikipedia.org/wiki/E.164)
- [Firebase Pricing](https://firebase.google.com/pricing)
- [Firebase Security Best Practices](https://firebase.google.com/docs/rules/basics)
