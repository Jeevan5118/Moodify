# MoodBoard AI 🎵

A modern Angular 17+ web application that generates personalized music playlists based on your mood using AI-powered recommendations and Firebase integration.

## ✨ Features

### 🎯 Core Features
- **Mood Selection Interface**: Choose from 8 different moods with beautiful emoji buttons
- **AI Playlist Generation**: Get personalized playlists with confidence scores
- **Visual Feedback**: See your selected mood and confidence bar
- **Song Information**: View song titles, artists, durations, and YouTube links
- **Firebase Integration**: Secure cloud storage and authentication
- **User Authentication**: Sign up, sign in, and manage your account
- **Mood History**: Revisit your previous mood selections and playlists
- **Search Functionality**: Search through your saved playlists

### 🔐 Authentication Features
- **Email/Password Authentication**: Secure user registration and login
- **User Profiles**: Personalized experience with user-specific data
- **Cloud Storage**: Playlists and mood history stored in Firebase Firestore
- **Real-time Sync**: Live updates across devices
- **Secure Data**: User-specific data isolation

### 🎨 UI/UX Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Smooth Animations**: Beautiful transitions and hover effects
- **Modern Design**: Clean, intuitive interface with gradient backgrounds
- **Accessibility**: Proper focus states and keyboard navigation

### 🎵 Music Features
- **8 Mood Categories**: Happy, Sad, Chill, Energetic, Angry, Relaxed, Romantic, Nostalgic
- **Curated Playlists**: Each mood has 8 carefully selected songs
- **YouTube Integration**: Direct links to listen to songs on YouTube
- **Duration Tracking**: See total playlist duration
- **Artist Information**: Complete song metadata

## 🚀 Technology Stack

- **Frontend**: Angular 17+ (Standalone Components)
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication + Firestore)
- **State Management**: RxJS Observables
- **Storage**: Firebase Firestore + localStorage fallback
- **Routing**: Angular Router
- **Animations**: CSS animations and transitions

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd moodboard-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   
   Create a Firebase project at [Firebase Console](https://console.firebase.google.com/) and:
   
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Get your Firebase config
   
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

4. **Start the development server**
   ```bash
   ng serve
   ```

5. **Open your browser**
   Navigate to `http://localhost:4200`

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── auth/             # Authentication components (login/register)
│   │   ├── header/           # Navigation and theme toggle
│   │   ├── mood-selector/    # Mood selection interface
│   │   ├── playlist-display/ # Playlist visualization
│   │   └── history/          # Saved playlists history
│   ├── pages/
│   │   ├── home/             # Main application page
│   │   └── playlist/         # Playlist display page
│   ├── services/
│   │   ├── firebase.service.ts # Firebase integration
│   │   ├── mood.ts           # Mood and playlist logic
│   │   └── storage.ts        # localStorage operations
│   ├── models/
│   │   └── mood.model.ts     # TypeScript interfaces
│   ├── data/
│   │   └── playlist-data.ts  # Sample playlist data
│   └── app.routes.ts         # Routing configuration
├── environments/
│   └── environment.ts        # Firebase configuration
├── styles.css                # Global styles and Tailwind
└── index.html               # Main HTML file
```

## 🎮 How to Use

### For New Users
1. **Sign Up**: Create a new account with email and password
2. **Select Your Mood**: Choose from 8 different mood options
3. **Generate Playlist**: Get your AI-generated playlist with confidence score
4. **Save Playlist**: Click "Save Playlist" to store it in Firebase
5. **Listen to Music**: Click the play button next to any song to open YouTube

### For Returning Users
1. **Sign In**: Use your existing credentials
2. **View History**: Check your previous mood selections and playlists
3. **Create New**: Generate new playlists for different moods
4. **Manage**: Save, delete, or replay your favorite playlists

### General Features
- **Search**: Use the search bar to find specific moods or songs
- **Toggle Theme**: Switch between light and dark themes
- **Sign Out**: Securely log out from your account

## 🔐 Firebase Setup

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

### 4. Security Rules
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

## 🎨 Mood Categories

- **😊 Happy**: Upbeat, positive songs to lift your spirits
- **😢 Sad**: Melancholic, emotional songs for reflection
- **😎 Chill**: Relaxed, laid-back vibes
- **💪 Energetic**: High-energy, motivational tracks
- **😡 Angry**: Intense, powerful music for release
- **🧘 Relaxed**: Peaceful, calming melodies
- **💕 Romantic**: Love songs and romantic ballads
- **🌅 Nostalgic**: Classic, timeless tracks

## 🔧 Development

### Building for Production
```bash
ng build --configuration production
```

### Running Tests
```bash
ng test
```

### Code Formatting
```bash
ng lint
```

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with grid layouts
- **Tablet**: Adapted layouts with touch-friendly interactions
- **Mobile**: Streamlined interface with mobile-optimized components

## 🎯 Future Enhancements

- [ ] Spotify API integration for real-time music playback
- [ ] Social features and playlist sharing
- [ ] Advanced mood detection using AI
- [ ] Music genre filtering
- [ ] Export playlists to various platforms
- [ ] Personalized recommendations based on listening history
- [ ] Push notifications for new playlist suggestions
- [ ] Offline mode with service workers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Firebase for backend services and authentication
- Angular team for the amazing framework
- Tailwind CSS for the utility-first styling
- YouTube for music links
- All the artists whose music makes this app special

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Made with ❤️ and 🎵 by the MoodBoard AI Team**
