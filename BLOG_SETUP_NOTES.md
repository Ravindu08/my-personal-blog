# Personal Blog Setup & Notes

මෙම ගොනුවේ (file) අඩංගු වන්නේ අපේ සාකච්ඡාවට අදාළ වැදගත් කරුණු සහ ඉදිරි සැලසුමයි. 

## 1. Rebranding (ප්‍රොජෙක්ට් එකේ නම වෙනස් කිරීම)
- දැනට තියෙන "IAS", "IEEE UWU", "ravindu_labs" වගේ නම් අයින් කරලා ඔයාගේ අලුත් නම (උදා: Ravindu's Space / Code & Canvas) දාන්න ඕනේ.
- **වෙනස් විය යුතු තැන්:** Frontend Code, Backend Code, Database Name, සහ README.
- **Git Repository:** Frontend සහ Backend දෙකම එකට තියෙන විදිහට අලුත් GitHub Repository එකකට ප්‍රොජෙක්ට් එක Push කරන්න ඕනේ.

## 2. Hosting Options (හොස්ට් කරන විදිහ)
අපි කතා කරපු විදිහට නොමිලේ සහ හොඳම Hosting Setup එක මෙහෙමයි:
- **Frontend (React/Vite):** **Vercel** (වේගවත් සහ GitHub එක්ක ලේසියෙන්ම සම්බන්ධ කරන්න පුළුවන්)
- **Backend (Python FastAPI):** **Render** (නොමිලේ Python API host කරන්න හොඳම තැන)
- **Database (MongoDB):** **MongoDB Atlas** (Free 512MB, ජීවිත කාලෙටම නොමිලේ)
- **Images:** **Cloudinary** (දැනටමත් code එකේ තියෙනවා)

## 3. SEO (Google Search එකේ උඩට එන්න)
- **Quality Content & Keywords:** කට්ටිය සර්ච් කරන වචන (Keywords) පාවිච්චි කරලා හොඳ ලිපි ලියන්න.
- **Meta Tags:** React Helmet වගේ පැකේජ් එකක් පාවිච්චි කරලා හැම පිටුවකටම Title සහ Description එකක් දෙන්න.
- **Site Speed:** පින්තූර වල සයිස් එක අඩු කරලා Cloudinary හරහා විතරක් ලෝඩ් කරන්න.
- **Mobile Friendly:** ෆෝන් එකටත් ලස්සනට පේන විදිහට UI එක හදන්න.
- **Google Search Console:** සයිට් එක host කරලා ඉවර වුණාම Google එකට සයිට් එක රෙජිස්ටර් කරන්න.
- **Backlinks:** වෙනත් තැන් වල (Social Media, Forums) ඔයාගේ බ්ලොග් ලින්ක් එක ශෙයා කරන්න.

---
**මීළඟ පියවර (Next Steps):**
1. බ්ලොග් එකට දාන නම තීරණය කිරීම.
2. Code එකේ පරණ නම් ඔක්කොම අලුත් නමට මාරු කිරීම.
3. අලුත් GitHub රිපොසිටරි එකක් හදලා මේක ඒකට අප්ලෝඩ් කිරීම.
4. Hosting වැඩකටයුතු කිරීම.

## 4. තීරණය කළ දේවල් සහ වෙනස්කම් (Decisions & Updates)
- **අලුත් නම (Brand Name):** Ravindu Labs
- **Tagline එක:** Exploring Software, AI & Technology
- **ප්‍රොජෙක්ට් කොපිය:** පරණ IAS බ්ලොග් එක වෙනස් කරන්නේ නැතුව, අලුත්ම Folder එකකට (My_Personal_Blog) clean copy එකක් ගත්තා.
- **නම මාරු කිරීම:** ප්‍රොජෙක්ට් එකේ (Frontend + Backend) තිබුණ IAS නම් ඔක්කොම Ravindu Labs විදිහට මාරු කරා.
- **Database එක:** අලුත් ප්‍රොජෙක්ට් එක අලුත්ම `ravindu_labs` කියන Database එකට connect වෙන විදිහට `.env` ෆයිල් එක update කරා. ඒ නිසා පරණ IAS database එකට කිසිම බලපෑමක් වෙන්නේ නෑ.

## 5. දිනපතා සටහන් සහ සාකච්ඡා (Daily Logs & Discussions)

### [2026-10-01] අද දවසේ සාකච්ඡා කළ දේවල්:
- **Project එක Run කරන විදිහ හොයාගත්තා:**
  - **Frontend:** `cd my-project` -> `npm install` -> `npm run dev` (http://localhost:5173)
  - **Backend:** `cd my-project-backend` -> `.\.venv\Scripts\Activate.ps1` -> `python -m uvicorn app.main:app --reload --port 8000` (http://localhost:8000)
- **Backend Error එක සහ Python ගැටළුව:**
  - Backend එකේ `requirements.txt` install කරද්දී `pydantic-core` package එකට අදාළව `linker link.exe not found` කියලා error එකක් ආවා.
  - **හේතුව:** දැනට පාවිච්චි කරන්නේ Python 3.14 (අලුත් version එකක්) නිසා pre-built packages තාම නැති වීම සහ C++ Build Tools මැෂින් එකේ නැති වීම.
  - **විසඳුම:** ප්‍රොජෙක්ට් එකේ අනිත් වැඩ වලට බාධාවක් නොවෙන්න, අපි අලුතින් install කරන්නේ නැතුව පරණ IAS ප්‍රොජෙක්ට් එකේ තිබුණ වැඩ කරන `.venv` ෆෝල්ඩර් එක එහෙම්මම copy කරලා මේ අලුත් ප්‍රොජෙක්ට් එකට දාගත්තා. 
  - දැන් ආයෙ අලුතින් `pip install` කරන්න අවශ්‍ය වෙන්නේ නෑ. කෙලින්ම backend එක run කරන්න පුළුවන්.

- **Frontend එකේ .env අවුල (CORS / Login Issue):**
  - Frontend එකේ `VITE_API_URL` එක පරණ Render link එකට (`https://backen-ias-blog-3lf5.onrender.com`) දීලා තිබුණ නිසා ලොග් වෙන්න බැරි වුණා.
  - **විසඳුම:** ඒක `http://localhost:8000` විදිහට වෙනස් කරලා Frontend එක අලුතින් (`npm run dev`) start කළා.

- **Backend එක Run කිරීමේදී ආපු Port සහ .venv ගැටළු:**
  - පරණ Terminals close නොකර අලුත් ඒවයේ රන් කරන්න හැදුවම `Port 8000 already in use` කියලා ආවා. (පරණ Terminals close කළාම ඒක හරි ගියා).
  - අලුත් Terminal එකේ `.venv` එක Activate වෙලා තිබුණේ නැති නිසා `cloudinary module not found` කියලා ආවා. 
  - **විසඳුම:** Activate කරනවා වෙනුවට කෙලින්ම `.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000` කියන command එක පාවිච්චි කළා.

- **MongoDB Cluster සහ අලුත් Database එක:**
  - MongoDB වල **Cluster** එකක් කියන්නේ එක Database Server එකකට.
  - එක Cluster එකක් (Server එකක්) ඇතුළේ සම්පූර්ණයෙන්ම වෙනම Databases (උදා: `ias_blog_db` සහ `ravindu_labs`) ඕන තරම් හදන්න පුළුවන්. මේවයේ Data එකිනෙකට මික්ස් වෙන්නේ නෑ.
  - Free tier එකේ එක අකවුන්ට් එකකට දෙන්නේ එක Free Cluster එකයි. අලුත්ම Cluster එකක් හදන්න ගියොත් සල්ලි ගෙවන්න වෙනවා.
  - ඒ නිසා අපි පරණ Cluster එක ඇතුලෙම `ravindu_labs` කියලා අලුත් Database එකක් හැදුවා. මේක සම්පූර්ණයෙන්ම වෙනම Database එකක්.

## 6. UI / UX Redesign Plan (Organization to Personal Blog)

### ඉවත් කළ යුතු හෝ සම්පූර්ණයෙන්ම වෙනස් විය යුතු දේවල්:
- **`Team.jsx` (Our Teams):** අයින් කරලා "About Me" (මගේ විස්තර / Skills / Tech Stack) එකතු කිරීම.
- **`Competition.jsx`:** අයින් කරලා "My Projects" / "Portfolio" එකතු කිරීම.
- **`Vision.jsx`:** අයින් කරලා Personal Bio එකක් හෝ "What I Do" section එකක් දැමීම.
- **`Submit.jsx` / `ArticleSubmission.jsx`:** Public submission අයින් කරලා ලිපි ලිවීම Admin ට පමණක් සීමා කිරීම.
- **`Testimonials.jsx`:** Client/Peer recommendations විදිහට වෙනස් කිරීම හෝ ඉවත් කිරීම.

### Design සහ Content වෙනස් විය යුතු ප්‍රධාන තැන්:
- **`Hero.jsx`:** "Welcome to IAS" වෙනුවට "Hi, I'm Ravindu. Welcome to Ravindu Labs" විදිහට හැදීම.
- **`Navbar.jsx` / `Footer.jsx`:** මෙනු ලින්ක්ස් වෙනස් කිරීම (Home, About Me, My Projects, Blog, Contact). Social links වෙනස් කිරීම.
- **`Contact.jsx`:** "Hire me" හෝ "Let's Build Something" විදිහට වෙනස් කිරීම.
- **`Newsletter.jsx`:** "මගේ අලුත්ම Tech Articles ඊමේල් එකට ගෙන්නගන්න" විදිහට වෙනස් කිරීම.

### 7. Premium Design Upgrades (Completed)
- **Hero Section:** අර පරණ "ළමයි ඉන්න ෆොටෝ එක" අයින් කරලා, **True Dark Mode** එකක් එක්ක **Animated Glowing Orbs** (Framer Motion) දාලා තියෙනවා.
- **Glassmorphism:** Buttons වලට සහ Badges වලට වීදුරු වගේ පේන Blur effects (backdrop-blur) එකතු කළා.
- **Gradient Typography:** නම (Ravindu) කැපිලා පේන්න ලස්සන Gradient පාටක් පාවිච්චි කළා.
- **Floating Icons:** React (⚛️) සහ Python (🐍) වගේ floating 3D icons අලුතින් දැම්මා.
- **About Me Section:** `AboutMe.jsx` කියලා අලුත් Component එකක් හදලා, Tech Skills 3D Cards විදිහට Animated කරලා දැම්මා.
- **My Projects Section:** `MyProjects.jsx` කියලා අලුත් Component එකක් හදලා, Projects ටික Image Hover Effects එක්ක ලස්සන Grid එකකට දැම්මා.

### 8. Deployment Preparation
- **GitHub Repository:** `my-personal-blog` නමින් අලුත් Monorepo එකක් සාදා කෝඩ්ස් Push කළා. (Frontend සහ Backend දෙකම එකම Repo එකේ).
- **Gitignore:** Backend එකේ විශාල ෆයිල්ස් (`.venv`) සහ රහස්‍ය තොරතුරු (`.env`) GitHub එකට upload වීම වැළැක්වීමට `my-project-backend` ෆෝල්ඩරය තුළ අලුතින් `.gitignore` ෆයිල් එකක් සෑදුවා.
- **Git Push Timeout Fix:** පරණ පෙනුමේ තිබ්බ 11MB විතර ලොකු වීඩියෝ ෆයිල් එකක් නිසා Git push එක Timeout වුණා. ඒ නිසා ඒ වීඩියෝ එක අයින් කරලා තමයි Push කළේ.

### 9. Layout Updates (Blog-Only Focus)
- පරිශීලකයාට වෙනම Portfolio එකක් ඇති බැවින්, මේ අලුත් සයිට් එක **පිරිසිදු Tech Blog එකක්** පමණක් වන පරිදි වෙනස් කරන ලදී.
- ඒ අනුව `MyProjects.jsx` සහ ඊට අදාළ Links ඉවත් කළා.
- Hero Section එකේ බොත්තම් "Read My Articles" සහ "About the Author" ලෙස වෙනස් කළා.

### 10. Backend Deployment (Render)
- Render හරහා Backend එක Deploy කරද්දී `pydantic-core` library එකට අදාළව `maturin failed` (Rust compile error) එකක් ආවා (Python 3.14 නිසා).
- **විසඳුම:** Render Environment Variables වලට `PYTHON_VERSION=3.11.0` එකතු කරලා Clear Cache & Deploy කිරීම හරහා ගැටළුව නිරාකරණය කළා.
- **Render Free Tier සර්වර් හැසිරීම (Sleep Mode / Inactivity):**
  - Render Free Web Service එකක් විනාඩි 15 ක් එක දිගට Request එකක් නොලැබුණොත් (Inactivity) **Sleep Mode (Spin Down)** එකට යයි.
  - සයිට් එක Offline වෙන්නේ නැත. කවුරුහරි කෙනෙක් සයිට් එකට ඇවිල්ලා Backend එක call කරපු ගමන් ආපහු Wake up (Cold start) වේ.
  - පළමු Request එකේදී Wake up වීමට තත්පර 30-50 ක කුඩා ප්‍රමාදයක් (initial delay) ඇති විය හැක. ඉන්පසු සාමාන්‍ය වේගයෙන් ක්‍රියාත්මක වේ.
  - **හැමවෙලේම Awake තියාගන්නා ක්‍රමය (Free Keep-Alive):** UptimeRobot හෝ Cron-job හරහා සෑම විනාඩි 10 කට වරක් Backend URL එකට Ping එකක් (HTTP GET) යැවීමෙන් සර්වර් එක Sleep නොවී දිගටම 24/7 Active කර තබාගත හැක.

### 11. Frontend Deployment (Vercel)
- **Vercel යනු කුමක්ද?:** React, Vite, Next.js වැනි Frontend වෙබ් අඩවි නොමිලේ අන්තර්ජාලයට (Live Cloud Hosting) දැමීමට ලෝකයේ තිබෙන ප්‍රමුඛතම සහ වේගවත්ම Platform එකකි.
- **Render සහ Vercel වෙනස:**
  - **Render:** Python / FastAPI / Database වැනි Backend සේවා host කිරීමට යොදා ගනී.
  - **Vercel:** අපගේ ඇසට පෙනෙන Visual Website (React Frontend - `my-project`) එක host කිරීමට යොදා ගනී.
- **Vercel වල වාසි:**
  - සම්පූර්ණයෙන්ම Free (Hobby plan).
  - Global Edge Network (CDN) එකක් ඇති බැවින් ශ්‍රී ලංකාව ඇතුළු ලෝකයේ ඕනෑම තැනක සිට ඉතා වේගයෙන් (Milliseconds වලින්) වෙබ් අඩවිය Load වේ.
  - Frontend එක කිසිවිටකත් Sleep වන්නේ නැත (24/7 Instant).
  - GitHub එකට `git push` කරන සෑම විටකම ස්වයංක්‍රීයව අලුත් Version එක Live වෙබ් අඩවියට Update වේ (Automatic CI/CD).
  - නොමිලේ SSL (`https://`) සහ `.vercel.app` Domain එකක් හිමි වේ (Custom Domain ද සම්බන්ධ කළ හැක).
- **cPanel සහ Vercel අතර වෙනස (සාම්ප්‍රදායික Hosting vs Modern Cloud):**
  - **cPanel (Traditional Shared Hosting):** Hostinger, Namecheap, GoDaddy වැනි සාම්ප්‍රදායික Hosting වල File Manager එකට `dist` හෝ `build` folder එක Zip කර manual Upload කළ යුතුය. Update කරන සෑම විටකම නැවත Build කර Upload කළ යුතුය.
  - **Vercel (Modern Git-based Cloud):** cPanel හෝ File Manager අවශ්‍ය නැත. GitHub එකට `git push` කළ සැනින් Vercel Cloud එක විසින්ම Code එක Build කර තත්පර ගණනකින් Live කරයි (CI/CD).

### 12. Deployment Complete (Live Website URLs)
- **Live Frontend (Vercel):** [https://my-personal-blog-sigma.vercel.app/](https://my-personal-blog-sigma.vercel.app/)
- **Live Backend API (Render):** [https://my-personal-blog-6d3c.onrender.com/](https://my-personal-blog-6d3c.onrender.com/)
- **Swagger API Docs:** [https://my-personal-blog-6d3c.onrender.com/docs](https://my-personal-blog-6d3c.onrender.com/docs)
- **Database:** MongoDB Atlas (`ravindu_labs`)

### 13. Blog Admin Credentials (Dashboard Access)
- **Login URL:** [https://my-personal-blog-sigma.vercel.app/login](https://my-personal-blog-sigma.vercel.app/login) (හෝ Local: `http://localhost:5173/login`)
- **ක්රමය 1 (Email & Password):**
  - **Email:** `admin@ravindulabs.com`
  - **Password:** `Admin@123`
- **ක්රමය 2 (Google One-Click Login):**
  - **Email:** `tharushagimhan01@gmail.com` (Superuser Admin permissions ලබා දී ඇත). "Sign in with Google" ක්ලික් කර කෙලින්ම Dashboard එකට පිවිසිය හැක.

### 14. Troubleshooting: Render CORS Fix (Manual Deploy)
- **ගැටළුව:** Vercel එකේ Login වෙන්න හදද්දී Login නොවී නතර වීම.
- **හේතුව:** Render එකේ දුවන පරණ Backend Version එකේ CORS Settings වල Vercel (`*.vercel.app`) Domain එක Allow කර නොතිබීම (`Disallowed CORS origin`).
- **විසඳුම:** Render Dashboard එකට ගොස් **Manual Deploy ➡️ Deploy latest commit** ක්ලික් කර අලුත්ම කෝඩ් එක Deploy කරගත යුතුය. තවද Render Environment Variables වල `FRONTEND_URL` එකට `https://my-personal-blog-sigma.vercel.app` ලබා දිය හැක.

### 15. Modern Editorial Tech Publication Redesign (Article-Centric Architecture)
- **පරිශීලක ඉල්ලීම:** වෙබ් අඩවිය පිරිසිදු Tech Blog එකක් වන බැවින් පුද්ගලික විස්තර (CV/Portfolio) අඩු කර, Articles වලට ප්‍රමුඛත්වය ලබා දෙන ලෝකයේ නවීනතම Blog Design එකක් ක්‍රියාත්මක කිරීම (Linear, Stripe, Hashnode ආභාෂය).
- **ප්‍රධාන වෙනස්කම් සහ අලුත් Features:**
  1. **Personal Resume Block ඉවත් කිරීම:** මුල් පිටුවේ තිබූ විශාල "About Me" / "Download Resume" කොටස ඉවත් කර, ඒ වෙනුවට ලිපි වලට උපරිම ඉඩ ලබා දෙන ලදී. කතුවරයාගේ විස්තර ලිපි පාමුල ඉතා සරල, වෘත්තීය Micro-Badge එකක් ලෙස පමණක් පෙන්වයි.
  2. **Editorial Hero & Spotlight Card:**
     - "Deep Dives into Code, Systems & the Modern Web" යනුවෙන් තාක්ෂණික ප්‍රකාශනයකට ගැළපෙන Header එකක් නිර්මාණය කිරීම.
     - Backend එකෙන් හෝ Data වලින් ඉබේම Fetch වන **Featured Story Spotlight Card** එකක් Hero එක තුළම Embed කිරීම (කවරයේ පින්තූරය, කියවීමේ කාලය, මාතෘකාව සමඟ).
  3. **Live Real-time Search & Discovery Bar:**
     - ලිපි නාමය, අන්තර්ගතය හෝ Tags අනුව ක්ෂණිකව Filter වන Live Search Bar එකක්.
     - Dynamic Category Pills (`All`, `Web Dev`, ආදී).
     - Sorting විකල්ප 3ක්: `Latest` (අලුත්ම ලිපි), `Popular` (වැඩිම Likes/Views), `Quick` (කෙටි කියවීම්).
  4. **16:9 Aspect Modern Article Cards:**
     - නවීන Glass Border, Hover Zoom Cover Image, Floating Category Badges.
     - තත්පරයෙන් Update වන Like Toggle එක සහ Comment/View Counts.
     - කාඩ්පත ක්ලික් කළ විට කෙලින්ම `/article/:slug` හරහා සම්පූර්ණ ලිපිය කියවීමට Route වීම.
  5. **Single Article Reading Experience Upgrade:**
     - ලිපිය කියවන විට Window එක මුදුනේ දිස්වන **Reading Scroll Progress Bar**.
     - ලිපිය අවසානයේ කතුවරයාගේ අත්සන (Micro-Author Bio).
     - **Related Articles ("Keep Reading More Articles")** නිර්දේශ.

### 17. Rich Text Authoring Suite & Typography Engine (Highlight, Underline, Letter Sizes, Bold)
- **පරිශීලක ඉල්ලීම:** ලිපි ලියන විට Plain Text වෙනුවට Text Highlight කිරීම, Bold කිරීම, Titles / Headings Underline කිරීම සහ Letter/Font Sizes (Heading 1, 2, 3, Lead, Small) වෙනස් කිරීමට හැකියාව ලබා දීම.
- **නිර්මාණය කළ සංරචක (Components):**
  1. `RichTextEditor.jsx` (`my-project/src/components/RichTextEditor.jsx`):
     - **Font / Heading Sizes:** Paragraph (Normal 16px), Title / Heading 1 (32px Bold), Section / Heading 2 (24px Bold), Subtitle / Heading 3 (20px Semibold), Lead (18px), Small Caption (13px).
     - **Bold (`<b>` / `Ctrl+B`):** ප්‍රධාන කරුණු අවධාරණය කිරීමට.
     - **Underline (`<u>` / `Ctrl+U`):** මාතෘකා සහ වැදගත් කොටස් Underline කිරීමට (Cyan Accent `#00A39C` Underline Offset සහිතව).
     - **Highlight Engine (`<mark>` / `Ctrl+H`):** විවිධ Neon වර්ණ 5කින් Text Highlight කිරීමේ හැකියාව (Teal Mint, Sunshine Yellow, Electric Purple, Coral Rose, Emerald Green).
     - **අමතර Modern Tools:** Italic (`<i>`), Strikethrough (`<s>`), Bulleted & Numbered Lists (`<ul>`, `<ol>`), Blockquotes (`<blockquote>`), Code Blocks (`<pre><code>`), Hyperlink Dialog (`<a>`), Horizontal Rule (`<hr>`), Clean Format Eraser.
     - **Triple Mode Navigation:**
       - **Visual (WYSIWYG) Mode:** ලිපිය ලියන ගමන්ම Formatting සජීවීව දැකගත හැක.
       - **HTML Code Mode:** Raw HTML tags කෙලින්ම සංස්කරණය කිරීමට කැමති අයට.
       - **Live Preview Mode:** Reader View එකේදී ලිපිය දිස්වන ආකාරය Dark Theme එකෙන් ක්ෂණිකව සජීවීව බලාගත හැක.
     - **Live Writing Stats:** Word Count, Character Count සහ Estimated Reading Time සජීවීව ගණනය වේ.
  2. `ArticleContentRenderer.jsx` (`my-project/src/components/ArticleContentRenderer.jsx`):
     - HTML Tags අඩංගු අලුත් ලිපි ආරක්ෂිතව සහ ඉතාමත් ලස්සන Typography එකකින් Render කරයි.
     - මීට පෙර ලියන ලද පැරණි Plain Text ලිපි බිඳ නොවැටී Clean Paragraphs බවට පත්කර පෙන්වයි (Backward Compatibility).
  3. **Custom Typography CSS (`index.css`):**
     - Headings, Underlines (`u`, `h1 u`, `h2 u`), `<mark>` Highlight Variants, Blockquotes, Code blocks සඳහා Modern Dark & Light CSS Styling එක් කරන ලදී.
- **ඒකාබද්ධ කළ ස්ථාන (Integrated Pages):**
  - `ArticleSubmission.jsx` - නව ලිපි Submit කරන ප්‍රධාන පිටුව.
  - `Dashboard.jsx` - Writers සඳහා Create Article Tab සහ Edit Article Modal.
  - `AdminDashboard.jsx` - Admin සඳහා Create Article Modal.
  - `SingleArticle.jsx` & `ArticleModal.jsx` - ලිපි කියවන පිටු සහ Modal.


