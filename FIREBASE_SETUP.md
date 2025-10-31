Firebase Setup (Firestore)

Overview
- Replace Supabase with Firebase Firestore for Todos CRUD and Realtime Chat.

Install
- npm i firebase

Config
- Copy `.env.example` to `.env` and fill:
  - VITE_FIREBASE_API_KEY
  - VITE_FIREBASE_AUTH_DOMAIN
  - VITE_FIREBASE_PROJECT_ID
  - VITE_FIREBASE_STORAGE_BUCKET
  - VITE_FIREBASE_MESSAGING_SENDER_ID
  - VITE_FIREBASE_APP_ID

Firestore
- Enable Firestore in Native mode in your Firebase project.
- Recommended dev rules (do not use in production):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Dev only
    }
  }
}
```

App Changes
- src/utils/firebaseClient.js: initializes Firebase + Firestore and exports `db`.
- src/hooks/useFirebase.js: realtime chat via Firestore `onSnapshot`.
- src/api/service/todo_api.js: CRUD rewritten to use Firestore collections.
- src/components/chat/Index.jsx: switched to `useFirebaseMessages`.

Collections
- messages: { username: string, content: string, created_at: serverTimestamp() }
- todos: { title: string, description: string, done: boolean, createdat: serverTimestamp() }

Notes
- Message timestamps are converted to ISO strings to match existing UI expectations.
- Todo doc IDs are used as `id` in the UI.

