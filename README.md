# React + Firebase

Modern React CRUD and realtime chat using Firebase Firestore. Built with Vite, TailwindCSS, ShadCN UI, Lucide icons, and Zustand.

## Getting Started

1) Install deps

```
npm install
```

2) Firebase setup

- Create a Firebase project and enable Firestore (Native mode)
- Copy `.env.example` to `.env` and fill the Firebase keys

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Dev Firestore Rules (for local testing only):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Dev only; secure for prod
    }
  }
}
```

3) Start

```
npm run dev
```

Visit http://localhost:5173

## Where Things Live

- `src/utils/firebaseClient.js` – Firebase app + Firestore init
- `src/hooks/useFirebase.js` – Realtime chat hook (onSnapshot)
- `src/api/service/todo_api.js` – Todos CRUD via Firestore
- `src/components/chat/` – Chat UI
- `src/components/todo/` – Todos UI

## Data Models

- `messages`: { username, content, created_at: serverTimestamp() }
- `todos`: { title, description, done, createdat: serverTimestamp() }

Timestamps are converted to ISO strings for display.

