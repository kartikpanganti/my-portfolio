# Google reCAPTCHA v3 Setup Guide

## 🔐 What's Been Added

Your Contact form now includes:
- ✅ **Google reCAPTCHA v3** - Invisible spam protection
- ✅ **Form Validation** - Client-side validation for all fields
- ✅ **Error Messages** - Real-time feedback for users
- ✅ **Security Token** - Sent with EmailJS for verification

---

## 📝 Setup Instructions

### Step 1: Get Your reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Sign in with your Google account
3. Click **"+"** to register a new site
4. Fill in the form:
   - **Label**: Portfolio Contact Form
   - **reCAPTCHA type**: Select **reCAPTCHA v3**
   - **Domains**: Add your domain (e.g., `yourdomain.com`, `localhost` for testing)
5. Click **Submit**
6. Copy both keys:
   - **Site Key** (public key)
   - **Secret Key** (keep this private!)

### Step 2: Update Contact.jsx

Replace the test key in `Contact.jsx` (line ~17):

```javascript
// REPLACE THIS:
const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Test key

// WITH YOUR ACTUAL SITE KEY:
const RECAPTCHA_SITE_KEY = 'YOUR_ACTUAL_SITE_KEY_HERE';
```

### Step 3: (Optional) Server-Side Verification

For maximum security, verify the reCAPTCHA token on your backend:

```javascript
// Example: Node.js backend verification
const verifyRecaptcha = async (token) => {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=YOUR_SECRET_KEY&response=${token}`
  });
  const data = await response.json();
  return data.success && data.score >= 0.5; // Score threshold
};
```

---

## ✨ Features Implemented

### 1. Form Validation Rules

| Field | Validation |
|-------|-----------|
| **Name** | Required, 2-50 characters |
| **Email** | Required, valid email format |
| **Subject** | Required, 3-100 characters |
| **Message** | Required, 10-1000 characters |

### 2. Real-Time Error Display
- Red border on invalid fields
- Error message appears below each field
- Errors clear when user starts typing

### 3. reCAPTCHA v3 Integration
- **Invisible**: No checkbox or challenges
- **Automatic**: Runs in background during form submission
- **Score-based**: Google assigns a score (0.0-1.0) based on user behavior
- **Token**: Sent with EmailJS data for verification

### 4. Enhanced Security
- Prevents spam and bot submissions
- Client-side validation before submission
- Token included in email for tracking

---

## 🧪 Testing

### Test Key (Already Added)
The form currently uses Google's test key:
- **Site Key**: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
- This key **always passes** verification
- Use for development/testing only
- **Replace before deploying to production!**

### Testing Checklist
- [ ] Empty form submission (should show errors)
- [ ] Invalid email format (should show error)
- [ ] Short name/message (should show error)
- [ ] Valid form submission (should send email)
- [ ] Check EmailJS for received emails
- [ ] Verify reCAPTCHA badge appears in bottom-right
- [ ] Test on mobile devices

---

## 🎨 UI Changes

### Error States
- Input borders turn **red** when invalid
- Error messages appear in **red text** below fields
- Errors auto-clear when user types

### Privacy Notice Updated
Added mention of reCAPTCHA protection

### Success/Error Messages
- ✅ Success: "Message sent successfully! I'll get back to you soon."
- ❌ Error: "Failed to send message. Please try again or contact me directly."
- 🔒 reCAPTCHA Error: "Security verification failed. Please refresh and try again."

---

## 📧 EmailJS Template Variables

The form now sends these additional variables:

```javascript
{
  from_name: "User's Name",
  reply_to: "user@email.com",
  subject: "Subject Line",
  message: "Message content",
  portfolio_url: "https://yourdomain.com",
  contacted_via: "Portfolio Website",
  device_info: "Browser/Device info",
  locale: "en-US",
  timestamp: "Tue, 14-Oct-2025 at 11:45:12 PM",
  recaptcha_token: "03AGdBq26..." // NEW!
}
```

---

## 🚀 Deployment Notes

1. **Replace Test Key**: Update `RECAPTCHA_SITE_KEY` with your real key
2. **Add Domains**: Add your production domain to reCAPTCHA admin
3. **Test Thoroughly**: Test form on production before launch
4. **Monitor**: Check Google reCAPTCHA admin for spam reports

---

## 🔧 Troubleshooting

### "reCAPTCHA not loaded" Error
- Check internet connection
- Verify Site Key is correct
- Check browser console for errors
- Ensure domain is registered in reCAPTCHA admin

### Form Validation Not Working
- Check browser console for JavaScript errors
- Verify all imports are correct
- Clear browser cache and reload

### reCAPTCHA Badge Not Appearing
- Badge appears in bottom-right corner
- May take a few seconds to load
- Check if script loaded in Network tab

---

## 📚 Resources

- [Google reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/v3)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [React Hook Form (Alternative)](https://react-hook-form.com/)

---

## 🛡️ Security Best Practices

1. ✅ Never expose your **Secret Key** in client-side code
2. ✅ Verify reCAPTCHA tokens on your backend (recommended)
3. ✅ Set a minimum score threshold (0.5 recommended)
4. ✅ Monitor reCAPTCHA admin for suspicious activity
5. ✅ Rate limit form submissions on backend
6. ✅ Sanitize all input data before processing

---

## 📝 License & Attribution

This implementation uses:
- Google reCAPTCHA v3 (Free tier)
- EmailJS (Free tier)
- React & Framer Motion

**reCAPTCHA Badge**: Google's badge is required to be visible. It's automatically added to the bottom-right of your page.

---

**Need Help?** Check the browser console for detailed error messages.
