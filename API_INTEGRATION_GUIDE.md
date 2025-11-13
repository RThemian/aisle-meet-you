# API Integration Guide - Aisle Meet You

## Overview
This guide will help you integrate real location data using Google Places API and prepare for a backend database.

## Phase 1: Google Places API (For Prototype)

### Step 1: Get Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - **Places API**
   - **Maps JavaScript API** (for map display)
   - **Geolocation API** (for user location)

4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy your API key

### Step 2: Restrict Your API Key (Important for Security)

1. Click on your API key
2. Under "API restrictions" → Select "Restrict key"
3. Only enable:
   - Places API
   - Maps JavaScript API
   - Geolocation API
4. Under "Website restrictions" → Add your domain (localhost for testing)

### Step 3: Set Up Environment Variables

Create a `.env` file in your project root:

```bash
VITE_GOOGLE_PLACES_API_KEY=your_api_key_here
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here  # Can be same as above
```

### Step 4: Install Required Packages

```bash
npm install @googlemaps/js-api-loader
```

### Step 5: Create API Service

Create `src/services/placesService.js`:

```javascript
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
  version: 'weekly',
  libraries: ['places', 'geometry']
});

let placesService = null;

// Initialize Google Places
export const initPlaces = async () => {
  try {
    await loader.load();
    const map = new google.maps.Map(document.createElement('div'));
    placesService = new google.maps.places.PlacesService(map);
    return true;
  } catch (error) {
    console.error('Error loading Google Places:', error);
    return false;
  }
};

// Fetch nearby venues by type
export const fetchNearbyVenues = (location, type, radius = 5000) => {
  return new Promise((resolve, reject) => {
    if (!placesService) {
      reject(new Error('Places service not initialized'));
      return;
    }

    // Map our venue types to Google Places types
    const googleTypes = {
      grocery: 'supermarket',
      gym: 'gym',
      cafe: 'cafe',
      market: 'shopping_mall'
    };

    const request = {
      location: new google.maps.LatLng(location.lat, location.lng),
      radius: radius,
      type: googleTypes[type] || 'store',
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const venues = results.map(place => ({
          id: place.place_id,
          name: place.name,
          address: place.vicinity,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          distance: calculateDistance(
            location.lat,
            location.lng,
            place.geometry.location.lat(),
            place.geometry.location.lng()
          ),
          rating: place.rating,
          users: 0 // Will be populated from your backend
        }));

        // Sort by distance
        venues.sort((a, b) => a.distance - b.distance);
        resolve(venues);
      } else {
        reject(new Error('Places API request failed: ' + status));
      }
    });
  });
};

// Calculate distance between two points (in miles)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 3959; // Radius of Earth in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return (R * c).toFixed(1);
};

// Get user's current location
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};

// Get city name from coordinates (reverse geocoding)
export const getCityFromCoords = async (lat, lng) => {
  try {
    await loader.load();
    const geocoder = new google.maps.Geocoder();
    
    return new Promise((resolve, reject) => {
      geocoder.geocode(
        { location: { lat, lng } },
        (results, status) => {
          if (status === 'OK' && results[0]) {
            const cityComponent = results[0].address_components.find(
              component => component.types.includes('locality')
            );
            resolve(cityComponent?.long_name || 'Unknown');
          } else {
            reject(new Error('Geocoding failed'));
          }
        }
      );
    });
  } catch (error) {
    console.error('Error getting city:', error);
    return 'Unknown';
  }
};
```

### Step 6: Update App.jsx to Use Real API

Replace the mock `fetchNearbyVenues` function in App.jsx:

```javascript
import { fetchNearbyVenues as fetchVenuesFromAPI, getUserLocation, initPlaces } from './services/placesService';

// In your component:
useEffect(() => {
  initPlaces();
}, []);

const fetchNearbyVenues = async (venueType) => {
  try {
    const venues = await fetchVenuesFromAPI(userLocation, venueType);
    setNearbyVenues(venues);
  } catch (error) {
    console.error('Error fetching venues:', error);
    // Fall back to mock data if API fails
    setNearbyVenues(mockVenues[venueType] || []);
  }
};
```

---

## Phase 2: Backend Setup (For Production)

### What You'll Need:

1. **User Authentication** (Firebase Auth, Clerk, or custom)
2. **Real-time Database** (Firebase Firestore, Supabase, or MongoDB)
3. **WebSocket/Real-time** (Socket.io, Pusher, or Firebase)

### Recommended Stack (Easiest for MVP):

**Firebase** - Free tier is generous, real-time out of the box

```bash
npm install firebase
```

Create `src/services/firebase.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### Database Structure (Firestore Example):

```
users/
  {userId}/
    name: string
    age: number
    bio: string
    photos: array
    gender: string
    preferences: object

broadcasts/
  {broadcastId}/
    userId: string
    venueId: string
    venueName: string
    venueType: string
    location: geopoint
    startTime: timestamp
    active: boolean

approaches/
  {approachId}/
    fromUserId: string
    toUserId: string
    venueId: string
    timestamp: timestamp
    status: "pending" | "accepted" | "declined"

matches/
  {matchId}/
    user1Id: string
    user2Id: string
    venueId: string
    timestamp: timestamp
```

### Real-time Broadcasting

Create `src/services/broadcastService.js`:

```javascript
import { db } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  query, 
  where, 
  onSnapshot,
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';

// Start broadcasting at a venue
export const startBroadcast = async (userId, venue, userProfile) => {
  const broadcastRef = doc(db, 'broadcasts', `${userId}_${Date.now()}`);
  
  await setDoc(broadcastRef, {
    userId,
    venueId: venue.id,
    venueName: venue.name,
    venueType: venue.type,
    location: {
      lat: venue.lat,
      lng: venue.lng
    },
    userProfile: {
      name: userProfile.name,
      age: userProfile.age,
      bio: userProfile.bio,
      photos: userProfile.photos
    },
    startTime: serverTimestamp(),
    active: true
  });
  
  return broadcastRef.id;
};

// Stop broadcasting
export const stopBroadcast = async (broadcastId) => {
  await deleteDoc(doc(db, 'broadcasts', broadcastId));
};

// Listen to broadcasts at a venue
export const listenToBroadcastsAtVenue = (venueId, callback) => {
  const q = query(
    collection(db, 'broadcasts'),
    where('venueId', '==', venueId),
    where('active', '==', true)
  );
  
  return onSnapshot(q, (snapshot) => {
    const broadcasts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(broadcasts);
  });
};

// Send approach request
export const sendApproach = async (fromUserId, toUserId, venue) => {
  const approachRef = doc(collection(db, 'approaches'));
  
  await setDoc(approachRef, {
    fromUserId,
    toUserId,
    venueId: venue.id,
    venueName: venue.name,
    timestamp: serverTimestamp(),
    status: 'pending'
  });
  
  return approachRef.id;
};
```

---

## Phase 3: Cost Estimates

### Google Places API (Free Tier):
- **First $200/month free** (Google Cloud credit)
- After that: $0.017 per request
- ~11,000 free requests/month

### Firebase (Spark Plan - Free):
- Firestore: 50K reads, 20K writes per day
- Storage: 1GB
- Authentication: Unlimited

### When to Upgrade:
- **100+ daily active users**: Stay on free tier
- **1,000+ daily active users**: ~$50-100/month
- **10,000+ daily active users**: ~$500-1000/month

---

## Phase 4: Testing Without API Keys

For development without API keys, use the mock data already in the app. The app is designed to work with both real and mock data.

---

## Phase 5: Deployment Checklist

- [ ] Set up Firebase project
- [ ] Get Google Places API key
- [ ] Add environment variables to hosting (Vercel/Netlify)
- [ ] Set up authentication
- [ ] Configure security rules in Firebase
- [ ] Test on mobile devices
- [ ] Set up analytics (optional)
- [ ] Configure custom domain
- [ ] Set up error monitoring (Sentry)

---

## Questions?

The prototype currently uses mock data and will work perfectly for demos. When you're ready to go live, follow the phases above to integrate real APIs and backend.
