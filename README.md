# 🛒 Aisle Meet You

> **Dating App for Real-World Approaches** - Broadcast your availability at real locations and meet people in person.

## 🎯 The Concept

**Problem:** Online dating has moved connection entirely online. People match based on photos, chat endlessly, and rarely meet. Meanwhile, opportunities for organic in-person connections are everywhere - at gyms, coffee shops, grocery stores - but there's no way to signal you're open to being approached.

**Solution:** Aisle Meet You lets users "broadcast" when they're at a location and open to meeting someone. Other users at the same location can see who's broadcasting and send an approach request. If mutual interest exists, both get notified to look for each other in real life.

## ✨ Unique Features

### 1. **Location-Based Broadcasting**
- Users "go live" at specific venues (gyms, cafes, grocery stores, markets)
- Real-time indicator shows who's currently at each location
- No swiping through endless profiles - only see people actually there

### 2. **Real Venues, Real Meetings**
- Integrates with Google Places API for actual local businesses
- Multiple venue categories: Grocery Stores, Gyms, Cafes, Farmers Markets
- Shows distance and number of people broadcasting at each location

### 3. **Approach Request System**
- Send interest to someone at your location
- If they reciprocate, you both get notified
- Meet organically at the venue you're both already at

### 4. **No Endless Messaging**
- The app facilitates the initial connection
- The actual meeting happens in person, immediately
- Reduces ghosting, catfishing, and time-wasting

## 🚀 How It Works

1. **Select a Venue Type** (gym, cafe, grocery store, etc.)
2. **See Nearby Locations** with real-time broadcast counts
3. **Browse People Broadcasting** at each venue
4. **Send Approach Request** if interested
5. **Meet in Person** if mutual interest

OR

1. **Check In to a Location** where you're currently at
2. **Start Broadcasting** to signal you're open to approaches
3. **Receive Approach Requests** from others at the same venue
4. **Accept if Interested** and meet face-to-face

## 🎨 Current Status

This is a **working prototype** with:
- ✅ Full UI/UX flow
- ✅ Mock data for demonstration
- ✅ All screens and interactions
- ✅ Ready for Google Places API integration
- ✅ Designed for Firebase backend

## 🛠️ Tech Stack

- **Frontend:** React 19 + Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Maps/Places:** Google Places API (ready to integrate)
- **Backend (Future):** Firebase/Firestore
- **Real-time:** Firebase Real-time Database

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔑 API Integration

Currently runs on mock data for prototyping. To integrate real APIs:

1. See `API_INTEGRATION_GUIDE.md` for detailed setup
2. Get Google Places API key
3. Set up Firebase project (optional, for production)
4. Add environment variables

## 🎯 Why This Will Work

### Market Gap
- **Tinder/Bumble/Hinge:** All photos first, meeting later (if at all)
- **Happn:** Shows people you crossed paths with (passive, no intent signal)
- **Thursday/Bounce:** Event-based but still app-driven conversations
- **Aisle Meet You:** Combines real-time location + explicit availability signal

### User Psychology
- **Fear of Rejection Reduced:** Broadcasting signals openness
- **Efficient:** No weeks of messaging, meet today
- **Safe:** Public locations, daylight, people around
- **Authentic:** See the real person immediately, no filters

### Business Model Potential
- **Freemium:** Limited broadcasts per week, premium for unlimited
- **Venue Partnerships:** Promote specific locations/events
- **Premium Features:** See who viewed you, broadcast priority, extended radius
- **B2B:** Gyms/cafes pay to promote their location as "singles-friendly"

## 📊 Competitive Analysis

| Feature | Tinder | Bumble | Happn | Aisle Meet You |
|---------|--------|--------|-------|----------------|
| **Real-time location** | ❌ | ❌ | ✅ | ✅ |
| **Broadcast availability** | ❌ | ❌ | ❌ | ✅ |
| **Immediate meetings** | ❌ | ❌ | ❌ | ✅ |
| **No endless chatting** | ❌ | ❌ | ❌ | ✅ |
| **Specific venue focus** | ❌ | ❌ | ❌ | ✅ |

## 🎯 Target Users

### Primary
- **Young professionals (25-35)** who are tired of online dating
- **Fitness enthusiasts** already at gyms regularly
- **Health-conscious singles** at Whole Foods, Trader Joe's
- **Remote workers** at coffee shops looking to connect

### Secondary
- Anyone who prefers in-person chemistry over profile swiping
- People in new cities looking to meet locals organically
- Those who want dating to feel less forced, more natural

## 📱 Planned Features

### Phase 2
- [ ] Push notifications for approach requests
- [ ] In-app messaging (only after mutual approach)
- [ ] Photo verification
- [ ] Safety features (report, block)
- [ ] Calendar integration for preferred broadcast times

### Phase 3
- [ ] Group broadcasts (meet with friends)
- [ ] Events at venues (happy hours, fitness classes)
- [ ] Venue reviews and recommendations
- [ ] Success stories / testimonials
- [ ] Referral program

## 💰 Monetization Strategy

### Free Tier
- 3 broadcasts per week
- View broadcasters at any location
- Send 5 approach requests per day

### Premium ($9.99/month)
- Unlimited broadcasts
- Unlimited approach requests
- See who viewed your profile
- Broadcast priority (appear first)
- Extended radius search

### Business Partnerships
- Venue promotion packages
- "Singles Night" event hosting
- Sponsored location features

## 🚀 Go-to-Market

1. **Beta Test:** 1-2 popular gym chains or grocery stores
2. **Local Launch:** One city (LA, NYC, or SF)
3. **Influencer Marketing:** Fitness influencers, dating coaches
4. **PR Angle:** "The anti-dating app that gets you offline"
5. **Viral Potential:** User success stories, unique concept

## 📈 Success Metrics

- **User Acquisition:** Downloads, signups
- **Engagement:** Broadcasts per user per week
- **Conversion:** Approach requests sent
- **Retention:** Weekly active broadcasters
- **Revenue:** Premium subscriptions, venue partnerships

## 🔒 Privacy & Safety

- Location only shared when actively broadcasting
- Users can stop broadcasting anytime
- Public venues only (safety in crowds)
- Report/block features
- Photo verification to prevent catfishing
- No precise location until mutual interest

## 👥 Team Needs

For MVP launch:
- [ ] iOS/Android developers (React Native)
- [ ] Backend developer (Firebase/Node.js)
- [ ] UI/UX designer
- [ ] Marketing/growth person

## 📞 Contact

This is a prototype demonstration. For investment inquiries or to discuss the concept further, please reach out.

---

**Built with ❤️ for people who want to meet IRL**
