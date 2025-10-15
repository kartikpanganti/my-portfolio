# Netlify reCAPTCHA Setup Guide

## Step 1: Add Environment Variables in Netlify

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add these variables:

```
VITE_RECAPTCHA_SITE_KEY = 6LeuZeorAAAAACj-bDl3iMj1w_ZsEDTiN48Cwg8u
VITE_EMAILJS_SERVICE_ID = service_kqb5az8
VITE_EMAILJS_TEMPLATE_ID = template_29v3266
VITE_EMAILJS_PUBLIC_KEY = H4Zz3Tdb9SqT2ydV6
```

## Step 2: Configure reCAPTCHA Domain

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Select your site (key: 6LeuZeorAAAAACj-bDl3iMj1w_ZsEDTiN48Cwg8u)
3. Add your Netlify domain to the **Domains** list:
   - `your-site-name.netlify.app`
   - `localhost` (for local testing)
   - Any custom domain you have

## Step 3: Clear Build Cache and Redeploy

1. In Netlify dashboard, go to **Site settings** → **Build & deploy**
2. Click **Clear cache and redeploy site**
3. Wait for the new deployment to complete

## Step 4: Verify Setup

After deployment, check:
1. Open browser console on your live site
2. Look for any reCAPTCHA-related errors
3. Scroll to footer - reCAPTCHA badge should appear
4. Try submitting the contact form

## Common Issues and Solutions

### Issue: Environment variables not available
**Solution:** Ensure variables are added in Netlify dashboard, not just in .env file

### Issue: Domain not authorized
**Solution:** Add your Netlify domain to reCAPTCHA console

### Issue: Content Security Policy blocking
**Solution:** The netlify.toml file has been configured with proper CSP headers

### Issue: Script loading fails
**Solution:** Check network tab for any blocked requests to google.com domains

## Testing Commands

Run locally with production build:
```bash
npm run build
npm run preview
```

This will simulate the production environment locally.