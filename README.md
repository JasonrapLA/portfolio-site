# jasonrappaportfolio.com

Portfolio site for Jason Rappaport. Built with Jekyll, hosted free on GitHub Pages, edited with Pages CMS.

## 1. Put it on GitHub (one time, ~5 min)

1. On github.com click **+ → New repository**. Name it `portfolio-site`, set it to **Public**, and create it empty.
2. On the new repo's page click **uploading an existing file**. Drag in everything from this folder, including the hidden `.pages.yml` file. On a Mac, press **Cmd + Shift + .** in Finder to show hidden files. Click **Commit changes**.
3. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then branch **main** and folder **/ (root)**. Save.
4. Go straight on to step 2. The site is set up to run on your own domain, so it won't open properly at the github.io address in the meantime.

## 2. Point your domain at it (one time)

In Squarespace, go to **Domains → jasonrappaportfolio.com → DNS settings**:

- Remove the Squarespace defaults.
- Add a **CNAME** record with host `www` and data `jasonrapla.github.io`.
- Add four **A** records with host `@`, pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`.

Then in GitHub, go to **Settings → Pages → Custom domain**, enter `www.jasonrappaportfolio.com`, and once it verifies, tick **Enforce HTTPS**. DNS changes can take a few hours.

Keep the domain registered at Squarespace; you only need to stop paying for the Squarespace website plan.

**Before you cancel the Squarespace website plan**, re-upload the project images. Some projects still load their images from Squarespace's servers, and those images will disappear when the plan ends. Upload each one in the editor (step 3) to replace the old link.

## 3. Edit the site

1. Go to **app.pagescms.org** and sign in with GitHub.
2. Open the `portfolio-site` repo. You'll see three sections:
   - **Projects**: add, remove or edit work. Turn on **Featured** to show a project as a big homepage tile, and use **Order** to sort.
   - **Site text**: headline, intro, highlight numbers, About, career, contact details and résumé.
   - **Awards**: every award, grouped by show. Fill in **Project** to show which work won.
3. Click **Save**. The site updates in about a minute.

Images you upload go in the `images/` folder automatically.

## Still to fill in

- Email, LinkedIn and résumé (in Site text). The contact buttons stay hidden until these are filled in.
- Portrait (in Site text).
- Hero images and film links for most projects.
- Summaries for the More work projects. A project without a summary shows as a plain line without a link.
- Problem, idea and result text for Backyard Legends and Project Convey.
