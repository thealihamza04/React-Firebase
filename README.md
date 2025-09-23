    

# React-Supabase

A modern **React + Supabase** CRUD scaffolded with **Vite**, styled using **Tailwind CSS**, and powered by **ShadCN UI**, **Lucide Icons**, and **Zustand** for state management.
It comes with a clean, professional folder structure for scalability.

---

## 📂 Project Structure

```
React-supabase/
├─ public/              
│  ├─ assets/           # App-specific assets (logos, svgs)
├─ src/
│  ├─ api/              # API service layer (Supabase queries)
│  │  └─ service/todo_api.js
│  ├─ components/       # UI + Feature components
│  │  ├─ ui/            # ShadCN-based UI primitives
│  ├─ hooks/            # Custom hooks
│  ├─ lib/              # Helper utilities
│  ├─ pages/            # Page-level components (Home.jsx)
│  ├─ store/            # Zustand store
│  ├─ utils/            # Utility functions
│  ├─ App.jsx           # Root app
│  ├─ main.jsx          # Entry file
│  └─ supabaseClient.js # Supabase client instance
```

---

## ⚡ Features

* 🔥 Full CRUD functionality with Supabase backend
* 🎨 UI built with TailwindCSS + ShadCN components
* 🌓 Dark mode support via custom hook (`useDarkMode`)
* 🗂 Organized, scalable folder structure
* ✔ Zustand for state management

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/thealihamza04/React-SB.git
cd React-SB
npm install
```

### 2. Configure Supabase

Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=your_supabase_url        # Settings → API → Project URL
VITE_SUPABASE_ANON_KEY=your_anon_key      # Settings → API Keys → anon/public key
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

## 🛠 Tech Stack

* **React 18 + Vite**
* **Supabase** (Database + Backend)
* **Zustand** (State Management)
* **TailwindCSS**
* **ShadCN UI Components**
* **Lucide React Icons**

---

## 🌐 Live Demo

[React-SB Todos on Vercel](https://react-sb-todos.vercel.app/)
