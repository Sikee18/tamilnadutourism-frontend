# Manual Deployment Guide for ThamizhTrails

**Status:** ✅ Build Successful
**Output Folder:** `out` (Located in this project directory)

You are ready to deploy your static frontend to Netlify manually.

## Step 1: Upload to Netlify
1. Go to [https://app.netlify.com](https://app.netlify.com) and log in.
2. Click **"Add new site"** -> **"Deploy manually"**.
3. Locate the `out` folder in your project:
   `c:\Users\rathu\Downloads\tamilnadutourismfrontend1\out`
4. **Drag and drop the `out` folder** into the upload area on Netlify.
5. Wait for the upload to complete. Your site is now live!

## Step 2: Chatbot Backend Connection
Currently, your build is configured to look for the backend at `http://localhost:3001` (default).

If you have your backend deployed on Render (e.g., `https://my-backend.onrender.com`), you need to **re-build** the frontend with this URL for the chatbot to work on the live site.

**To re-build with the live backend URL:**
1. Open your terminal in VS Code.
2. Run the following command (replace the URL with your actual backend URL):

   ```powershell
   $env:NEXT_PUBLIC_API_URL="https://your-render-backend-url.onrender.com"; npm run build
   ```

3. Once finished, drag and drop the **new** content of the `out` folder to Netlify (in "Deploys" tab -> "Trigger deploy" is not available for manual, you just drag to the deploy summary area usually, or create a new site if easier).

## Step 3: Verify
- Check "Destinations" page (Dynamic routes fixed).
- Check "Visualize" -> "AR/VR" (Dynamic routes fixed).
- Check "Bookings" / "Payment" pages.
