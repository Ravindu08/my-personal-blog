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

