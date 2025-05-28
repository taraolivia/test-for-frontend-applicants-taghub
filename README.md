
# Test for Frontend Applicants – TagHub

**Author:** Tara Olivia Bjørheim  
**Live demo:** _[View on Netlify](https://your-netlify-link.netlify.app)_  
**Repo:** _[GitHub](https://tara-test-frontend.netlify.app/)_

---

## About the Project

This project was created as a submission for the frontend developer assignment at **Smart Management AS**, built around their product **TagHub**. It demonstrates my solutions for two tasks:

- **Task 1:** Debug and analyze a laggy chat UI.  
- **Task 2:** Build a functional UI for exploring project items and viewing related events.

📄 [Test Description](https://gitlab.taghub.net/documentation/devdocs/-/wikis/Test-for-Frontend-applicants)

---

## 🛠️ Stack & Tools

- React (with Vite)  
- TypeScript  
- Tailwind CSS  
- Zustand (for global state)  
- React Router  
- Netlify (deployment)

---

## Task 1 – Laggy Chat

🔗 **Path:** `/task1`

A performance analysis and explanation page that replicates a laggy chat interface. It includes:

- The original unoptimized chat component  
- A written explanation of what causes the lag  
- Suggested improvements (explained simply)  
- UX impact discussion

---

## Task 2 – Items Explorer

🔗 **Path:** `/items-explorer`

A dynamic UI for selecting a project and viewing all associated items and events. Features include:

- Project selector dropdown  
- Scrollable item table with filter options  
- Clickable item cards that open a detail view  
- Full event history per item  
- Login with TagHub access key

---

## 🔐 Authentication

To access the TagHub API, the user must enter a valid `TAGHUB_ACCESS_KEY`.  
A simple login page stores the key using Zustand and persists it in localStorage.

The footer shows the login status and offers log in/out options.

---

## Getting Started

Clone the repo:

```bash
git clone https://github.com/taraolivia/test-for-frontend-applicants-taghub
cd test-for-frontend-applicants-taghub
````

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

## ✅ Features

* ✨ Smooth, responsive UI with Tailwind
* 🔁 Context-aware routing
* 🔐 Authentication with persistent state
* ⚡ Real API data fetching (TagHub)
* ♿ Accessibility-focused layout

---

## ✨ Author

**Tara Olivia Bjørheim**
Frontend Developer & Administrative Coordinator
