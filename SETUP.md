# MoodBoard AI - Setup Guide

## Firebase Configuration

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Follow the setup wizard

### 2. Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" provider
4. Configure sign-in methods

### 3. Enable Firestore
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location

### 4. Get Firebase Config
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → Web app
4. Copy the config object

### 5. Update Environment
Update `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
  }
};
```

## Security Rules

Update Firestore security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Deployment

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## Features Implemented

✅ **Authentication**
- Email/password sign up and sign in
- User session management
- Secure sign out

✅ **Firebase Integration**
- Firestore database for playlists and mood history
- Real-time data synchronization
- User-specific data isolation

✅ **UI Components**
- Login and register pages
- User profile display in header
- Authentication state management

✅ **Data Management**
- Save playlists to Firebase
- Save mood history to Firebase
- Fetch user-specific data

## Next Steps

1. Configure Firebase with your project details
2. Test authentication flow
3. Verify playlist saving functionality
4. Deploy to Firebase Hosting
5. Test on different devices

## Troubleshooting

- **Authentication errors**: Check Firebase config and enable Email/Password auth
- **Firestore errors**: Verify security rules and database creation
- **Build errors**: Ensure all dependencies are installed
- **Deployment issues**: Check Firebase CLI installation and project selection 