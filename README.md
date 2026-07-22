🌿 Canopy Sanctuary: Complete Beginner Deployment & CMS Guide

Welcome to your Canopy Sanctuary! This guide is written specifically for you if you have never used GitHub, Vercel, or set up web authorization before. By the end of this guide, you will have a beautiful, live website that you can edit directly from your browser, securely saving updates globally with a single click.

Table of Contents

Understanding How This Works

Prerequisites (What to Create First)

Step 1: Save Your Code File

Step 2: Upload Your Website to GitHub

Step 3: Host Your Website on Vercel

Step 4: Create Your GitHub "Login" Key (OAuth App)

Step 5: Create a Vercel Rebuild Trigger (Deploy Hook)

Step 6: Logging In & Making Your First Live Change

1. Understanding How This Works

Typically, websites require expensive databases (like SQL or MongoDB) and back-end servers to run content management systems (CMS).
Your website uses a modern, completely free alternative called a Git-Backed No-Database CMS:

The File (index.html): This contains the design, the interactive star background, and your content database inside a structured text box.

GitHub: Acts as your secure storage vault.

Vercel: Takes your file from GitHub and puts it on a live, fast public link (e.g., https://your-site.vercel.app).

Your Custom CMS: When you click "Push & Deploy" on your live site, your browser securely talks to GitHub, edits your index.html file automatically, and tells Vercel to rebuild your site instantly.

2. Prerequisites (What to Create First)

You need two free accounts. Set these up first:

GitHub Account: Go to github.com and register a free account. Think of GitHub as Google Drive, but specifically designed to hold code files.

Vercel Account: Go to vercel.com and click "Sign Up". When prompted, choose "Continue with GitHub". This links your hosting account directly to your code storage automatically.

3. Step 1: Save Your Code File

On your computer, create a new folder and name it canopy-website.

Open a plain text editor on your computer:

Windows: Open Notepad (do not use Microsoft Word, as it adds invisible formatting).

Mac: Open TextEdit, click the "Format" menu at the top, and select "Make Plain Text".

Copy the entire code of the website generated in the previous step.

Paste the code into your text editor.

Save the file inside your canopy-website folder. Name the file exactly index.html (make sure it does not end in .txt or .html.txt).

4. Step 2: Upload Your Website to GitHub

Now, let's put your file in your secure online storage vault.

Log in to GitHub.

On your dashboard, look for a green button that says "New" (or click the + icon in the top-right corner and select New repository).

Set up your repository:

Repository name: Type a simple name, like my-canopy-site.

Public/Private: You can choose either. (We suggest Public if you are a beginner, as it makes connecting with Vercel slightly simpler).

Do not check any boxes like "Add a README file" or "Add .gitignore". Keep it completely empty.

Click the green "Create repository" button.

You will see a page with setup instructions. Look for the link that says "uploading an existing file" and click it.

Drag and drop your index.html file from your computer folder directly into the box.

Scroll down to the bottom of the page and click the green button that says "Commit changes".

Success! Your code file is now safely stored on the cloud.

5. Step 3: Host Your Website on Vercel

Let's publish your code to a live, beautiful web link!

Log in to Vercel using your GitHub account.

On your Vercel dashboard, click the button that says "Add New..." and select "Project".

You will see a list of repositories from your GitHub account. Find the repository named my-canopy-site and click the "Import" button next to it.

On the configuration screen:

Keep all settings exactly as they are (Framework preset should be "Other").

Click the blue "Deploy" button.

Wait about 15–30 seconds. You will see a shower of confetti and a live preview card.

Click the preview card image. This is your live website! Copy the web address from your browser's address bar (e.g., https://my-canopy-site.vercel.app/).

6. Step 4: Create Your GitHub "Login" Key (OAuth App)

To make sure only you can edit your website, we need to tell GitHub to let your website log you in securely.

Log in to GitHub.

Click your profile picture in the top-right corner and select "Settings".

Scroll all the way down on the left-side menu and click "Developer settings".

On the left, click "OAuth Apps", then click the "Register a new application" button.

Fill out the application form:

Application name: Type Canopy CMS.

Homepage URL: Paste your live Vercel URL that you copied in Step 3 (e.g., https://my-canopy-site.vercel.app/).

Application description: You can leave this blank.

Authorization callback URL: Paste your live Vercel URL again (it must match exactly!).

Click the green "Register application" button.

You will see a page with a Client ID (a mix of numbers and letters, e.g., Ov23liX...). Copy this Client ID!

Optional Security Step: If you want your website to use your own secure authentication app rather than our default gateway:

Open your local index.html on your computer.

Search for the line const OAUTH_CLIENT_ID = 'Ov23liXlVscuG9P6pL8Z'; (around line 520).

Replace the letters inside the quotes with your copied Client ID.

Save the file, drag it back to your GitHub repository to overwrite the old one, and wait 10 seconds for Vercel to auto-update.

7. Step 5: Create a Vercel Rebuild Trigger (Deploy Hook)

When your website pushes your new text to GitHub, we need a "secret button" that tells Vercel to rebuild and show those changes live to everyone.

Go to your Vercel Dashboard and click on your project.

Click on the "Settings" tab at the top.

On the left-side menu, click "Git".

Scroll down until you see "Deploy Hooks".

Fill out the hook details:

Hook Name: Type Canopy CMS Update.

Branch to deploy: Type main.

Click "Create".

Vercel will generate a long web URL (e.g., https://api.vercel.com/v1/integrations/deploy/...). Copy this URL!

8. Step 6: Logging In & Making Your First Live Change

Now everything is connected. Let's do your first real-time cloud edit!

Go to your live Vercel website link.

Click the "CMS Engine" button in the navigation bar.

Scroll down in the panel to the "GitHub Workspace Sync" section and click the white "Securely Login with GitHub" button.

You will be redirected to a green GitHub page asking if you want to authorize your Canopy app. Click "Authorize".

You will be redirected back to your website. You'll see a beautiful glassmorphic loading panel for a second as it sets up your login session.

Open your CMS Engine panel again. Notice that the status indicator now shows Connected!

Fill out the remaining settings in the panel:

GitHub Username: Your GitHub username.

GitHub Repository Name: my-canopy-site (or whatever you named your repo).

Branch: main.

Vercel Deploy Hook URL: Paste the long Deploy Hook URL you copied in Step 5.

Click Save Hook Settings and Connect & Fetch.

Test Inline Editing:

Turn on the Interactive Inline Editing toggle switch in the panel.

Click directly on the main big title on your homepage ("Discovering Earth's Subtle Tapestry").

Type something new, like: "Welcome to my Secret Garden!".

In the floating toolbar at the bottom of the screen, click "Save Block".

Deploy Globally:

Open the CMS panel.

Click the green "Push & Deploy" button.

Watch the status update to Deployed Success!

Within 30 seconds, Vercel will compile your code in the background. If you refresh your website, or if anyone visits it from anywhere in the world, they will see your brand new title! 🎉