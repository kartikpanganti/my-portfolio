# reCAPTCHA Hosting Troubleshooting Guide

## Issue: reCAPTCHA not loading on hosted site

### 1. Environment Variables Check

**For Netlify:**
1. Go to Site Settings → Environment Variables
2. Add these variables:
   ```
   VITE_RECAPTCHA_SITE_KEY = 6LeuZeorAAAAACj-bDl3iMj1w_ZsEDTiN48Cwg8u
   VITE_EMAILJS_SERVICE_ID = service_kqb5az8
   VITE_EMAILJS_TEMPLATE_ID = template_29v3266
   VITE_EMAILJS_PUBLIC_KEY = H4Zz3Tdb9SqT2ydV6
   ```
3. Redeploy the site after adding variables

**For Vercel:**
1. Go to Project Settings → Environment Variables
2. Add the same variables as above
3. Redeploy

### 2. Domain Configuration

**reCAPTCHA Console Setup:**
1. Go to https://www.google.com/recaptcha/admin
2. Select your site
3. Add your hosted domain to "Domains" list:
   - `your-domain.netlify.app` (for Netlify)
   - `your-domain.vercel.app` (for Vercel)
   - Your custom domain if you have one
4. Save changes

### 3. Build Configuration

**Check your vite.config.js:**
```javascript
export default defineConfig({
  // ... other config
  define: {
    // Ensure env vars are available at build time
    'import.meta.env.VITE_RECAPTCHA_SITE_KEY': JSON.stringify(process.env.VITE_RECAPTCHA_SITE_KEY),
  }
})
```

### 4. Console Debugging

Open browser console on your hosted site and look for:
- "reCAPTCHA Environment Check" log
- "Contact Form Environment Check" log
- Any reCAPTCHA error messages

### 5. Common Issues

1. **Environment variables not available at build time**
   - Solution: Ensure variables are added in hosting platform settings

2. **Domain not added to reCAPTCHA console**
   - Solution: Add your hosted domain to reCAPTCHA site settings

3. **Build cache issues**
   - Solution: Clear build cache and redeploy

4. **CSP (Content Security Policy) blocking reCAPTCHA**
   - Solution: Check if your hosting platform has CSP headers blocking Google domains

### 6. Testing Steps

1. Open hosted site in incognito/private window
2. Open browser console
3. Check for environment variable logs
4. Scroll to footer - reCAPTCHA badge should appear
5. Try submitting contact form

### 7. Emergency Fallback

If reCAPTCHA still doesn't work, you can temporarily disable it by commenting out the reCAPTCHA check in Contact.jsx:

```javascript
// Comment this out temporarily:
// if (!recaptchaLoaded) {
//   throw new Error('reCAPTCHA Enterprise not loaded. Please refresh the page.');
// }
```