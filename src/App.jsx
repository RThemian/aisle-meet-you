import React, { useState, useEffect } from 'react';
import { 
  Heart, MapPin, X, Check, Store, Dumbbell, Coffee, 
  ShoppingBag, Radio, Users, Clock, Navigation, Filter,
  Trees, Flag, AlertCircle, Shield, ThumbsUp, Footprints
} from 'lucide-react';

// Venue categories
const VENUE_TYPES = [
  { id: 'walking', name: 'Walking Around', icon: Footprints, color: 'blue', description: 'Parks, streets, outdoor areas' },
  { id: 'grocery', name: 'Grocery Stores', icon: ShoppingBag, color: 'emerald', description: 'Whole Foods, Trader Joes, etc.' },
  { id: 'gym', name: 'Gyms & Fitness', icon: Dumbbell, color: 'red', description: 'Workout spaces' },
  { id: 'cafe', name: 'Cafes & Coffee', icon: Coffee, color: 'amber', description: 'Coffee shops' },
  { id: 'park', name: 'Parks & Outdoors', icon: Trees, color: 'green', description: 'Public parks and spaces' },
];

// Mock user data - in production, this would come from your backend
const MOCK_USERS = [
  { 
    id: 1, name: "Marcus", age: 28, photos: ["👨🏾"], gender: "M",
    bio: "Taking a morning walk through the neighborhood. Say hi if you see me!",
    broadcasting: true, broadcastLocation: "Downtown Area",
    venueType: 'walking', lastActive: 'Just now', isWalking: true
  },
  { 
    id: 2, name: "Sophie", age: 28, photos: ["👩🏼‍🦰"], gender: "F",
    bio: "Love early morning grocery runs and trying new recipes",
    broadcasting: true, broadcastLocation: "Whole Foods Market",
    venueType: 'grocery', lastActive: '2 min ago', isWalking: false
  },
  { 
    id: 3, name: "Jake", age: 31, photos: ["👨🏻"], gender: "M",
    bio: "Walking my dog around the park. Open to meeting new people 🐕",
    broadcasting: true, broadcastLocation: "Central Park - North Entrance",
    venueType: 'park', lastActive: 'Just now', isWalking: true
  },
  { 
    id: 4, name: "Emma", age: 31, photos: ["👱🏻‍♀️"], gender: "F",
    bio: "Always at the gym after work. Fitness enthusiast!",
    broadcasting: true, broadcastLocation: "LA Fitness",
    venueType: 'gym', lastActive: '5 min ago', isWalking: false
  },
  { 
    id: 5, name: "Chris", age: 29, photos: ["👨🏻"], gender: "M",
    bio: "Taking a lunch break, walking around downtown. Would love to grab coffee!",
    broadcasting: true, broadcastLocation: "Main St & 5th Ave",
    venueType: 'walking', lastActive: '1 min ago', isWalking: true
  },
  { 
    id: 6, name: "James", age: 29, photos: ["👨🏻‍🦰"], gender: "M",
    bio: "Coffee addict and morning person ☕ Remote worker here most days",
    broadcasting: true, broadcastLocation: "Starbucks Reserve",
    venueType: 'cafe', lastActive: '5 min ago', isWalking: false
  },
  { 
    id: 7, name: "Olivia", age: 26, photos: ["👩🏽"], gender: "F",
    bio: "Weekend warrior at farmers markets",
    broadcasting: false, broadcastLocation: null,
    venueType: 'park', lastActive: '1 hour ago', isWalking: false
  },
  { 
    id: 8, name: "Daniel", age: 32, photos: ["👨🏼"], gender: "M",
    bio: "Running errands downtown. Happy to stop and chat if we vibe!",
    broadcasting: true, broadcastLocation: "Shopping District",
    venueType: 'walking', lastActive: '3 min ago', isWalking: true
  },
  { 
    id: 9, name: "Liam", age: 32, photos: ["👨🏼‍🦱"], gender: "M",
    bio: "Organic everything, Whole Foods regular. Let's talk food!",
    broadcasting: true, broadcastLocation: "Whole Foods Market",
    venueType: 'grocery', lastActive: 'Just now', isWalking: false
  },
  { 
    id: 10, name: "Ava", age: 27, photos: ["👩🏻"], gender: "F",
    bio: "Early bird gym sessions 🏋️‍♀️",
    broadcasting: true, broadcastLocation: "24 Hour Fitness",
    venueType: 'gym', lastActive: '3 min ago', isWalking: false
  },
  { 
    id: 11, name: "Ryan", age: 30, photos: ["👨🏽"], gender: "M",
    bio: "Exploring the riverside trail. Great weather for meeting someone new!",
    broadcasting: true, broadcastLocation: "Riverside Trail",
    venueType: 'park', lastActive: '2 min ago', isWalking: true
  },
  { 
    id: 12, name: "Noah", age: 30, photos: ["👨🏽"], gender: "M",
    bio: "Coffee shop regular, usually here working on my laptop",
    broadcasting: true, broadcastLocation: "Blue Bottle Coffee",
    venueType: 'cafe', lastActive: '1 min ago', isWalking: false
  },
  { 
    id: 13, name: "Isabella", age: 25, photos: ["👩🏾"], gender: "F",
    bio: "Sunday morning market enthusiast",
    broadcasting: false, broadcastLocation: null,
    venueType: 'park', lastActive: '30 min ago', isWalking: false
  },
  { 
    id: 14, name: "Alex", age: 34, photos: ["👨🏻‍🦲"], gender: "M",
    bio: "Walking through the arts district. Love spontaneous conversations!",
    broadcasting: true, broadcastLocation: "Arts District",
    venueType: 'walking', lastActive: 'Just now', isWalking: true
  },
];

const App = () => {
  const [view, setView] = useState('login');
  const [userLocation, setUserLocation] = useState(null);
  const [selectedVenueType, setSelectedVenueType] = useState(null);
  const [nearbyVenues, setNearbyVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [broadcasting, setBroadcasting] = useState(false);
  const [broadcastVenue, setBroadcastVenue] = useState(null);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [showApproachSent, setShowApproachSent] = useState(false);

  // Simulate getting user location
  const getUserLocation = () => {
    // In production, use navigator.geolocation.getCurrentPosition()
    setUserLocation({
      lat: 34.0522,
      lng: -118.2437,
      city: 'Los Angeles'
    });
  };

  // Simulate fetching nearby venues from Google Places API
  const fetchNearbyVenues = async (venueType) => {
    // In production, this would call Google Places API
    // For now, we'll use mock data
    const mockVenues = {
      walking: [
        { id: 'w1', name: "Downtown Area", address: "Main St District", distance: 0.1, users: 2, type: 'area' },
        { id: 'w2', name: "Main St & 5th Ave", address: "Intersection", distance: 0.3, users: 1, type: 'street' },
        { id: 'w3', name: "Shopping District", address: "Retail area", distance: 0.5, users: 1, type: 'area' },
        { id: 'w4', name: "Arts District", address: "Gallery row", distance: 0.8, users: 1, type: 'area' },
        { id: 'w5', name: "Waterfront Walk", address: "Harbor area", distance: 1.2, users: 0, type: 'area' },
      ],
      park: [
        { id: 'p1', name: "Central Park - North Entrance", address: "110th St", distance: 0.4, users: 1, type: 'park' },
        { id: 'p2', name: "Riverside Trail", address: "River Rd", distance: 0.7, users: 1, type: 'trail' },
        { id: 'p3', name: "City Plaza", address: "Downtown", distance: 0.9, users: 0, type: 'plaza' },
        { id: 'p4', name: "Memorial Park", address: "Park Ave", distance: 1.3, users: 0, type: 'park' },
      ],
      grocery: [
        { id: 1, name: "Whole Foods Market", address: "123 Main St", distance: 0.3, users: 2, type: 'store' },
        { id: 2, name: "Trader Joe's", address: "456 Oak Ave", distance: 0.8, users: 0, type: 'store' },
        { id: 3, name: "Sprouts Farmers Market", address: "789 Pine Rd", distance: 1.2, users: 0, type: 'store' },
        { id: 4, name: "Erewhon Market", address: "321 Elm St", distance: 1.5, users: 0, type: 'store' },
      ],
      gym: [
        { id: 5, name: "LA Fitness", address: "234 Fitness Blvd", distance: 0.5, users: 1, type: 'store' },
        { id: 6, name: "24 Hour Fitness", address: "567 Strong St", distance: 0.9, users: 1, type: 'store' },
        { id: 7, name: "Equinox", address: "890 Wellness Way", distance: 1.3, users: 0, type: 'store' },
        { id: 8, name: "Gold's Gym", address: "432 Muscle Ave", distance: 1.7, users: 0, type: 'store' },
      ],
      cafe: [
        { id: 9, name: "Starbucks Reserve", address: "345 Coffee Ln", distance: 0.2, users: 1, type: 'store' },
        { id: 10, name: "Blue Bottle Coffee", address: "678 Brew St", distance: 0.6, users: 1, type: 'store' },
        { id: 11, name: "Intelligentsia", address: "901 Bean Blvd", distance: 1.0, users: 0, type: 'store' },
        { id: 12, name: "The Coffee Bean", address: "543 Roast Rd", distance: 1.4, users: 0, type: 'store' },
      ],
    };

    setNearbyVenues(mockVenues[venueType] || []);
  };

  const getUsersAtVenue = (venue) => {
    // Filter users broadcasting at this venue
    return MOCK_USERS.filter(user => 
      user.broadcasting && 
      user.broadcastLocation === venue.name
    );
  };

  const handleVenueTypeSelect = (type) => {
    setSelectedVenueType(type);
    fetchNearbyVenues(type);
    setView('venues');
  };

  const handleVenueSelect = (venue) => {
    setSelectedVenue(venue);
    setCurrentUserIndex(0);
    setView('venue-users-list'); // Show list view first
  };

  const handleStartBroadcast = (venue) => {
    setBroadcasting(true);
    setBroadcastVenue(venue);
    setSelectedVenue(venue); // Set the venue so we can show other users there
    setCurrentUserIndex(0); // Start from first user
    setView('broadcasting-with-users'); // New view that shows other broadcasters
  };

  const handleStopBroadcast = () => {
    setBroadcasting(false);
    setBroadcastVenue(null);
    setSelectedVenue(null);
    setView('venues');
  };

  const handleApproach = (user) => {
    setMatches([...matches, user]);
    setShowApproachSent(true);
    setTimeout(() => {
      setShowApproachSent(false);
      if (currentUserIndex < getUsersAtVenue(selectedVenue).length - 1) {
        setCurrentUserIndex(currentUserIndex + 1);
      } else {
        // Go back to list view
        setView(broadcasting ? 'broadcasting-with-users' : 'venue-users-list');
      }
    }, 2000);
  };

  const handlePass = () => {
    if (currentUserIndex < getUsersAtVenue(selectedVenue).length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      // Go back to list view
      setView(broadcasting ? 'broadcasting-with-users' : 'venue-users-list');
    }
  };

  // Login Screen
  if (view === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 rounded-full p-4 mb-4">
              <Radio className="w-12 h-12 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Aisle Meet You
            </h1>
            <p className="text-gray-600">Broadcast your availability. Meet in real life.</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Radio className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Go Live Anywhere</h3>
                  <p className="text-sm text-gray-600">Broadcast while walking, at parks, cafes, gyms, or stores</p>
                </div>
              </div>
            </div>
            
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-pink-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">See Who's Available</h3>
                  <p className="text-sm text-gray-600">Find people broadcasting near you, approach with confidence</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Meet Immediately</h3>
                  <p className="text-sm text-gray-600">No endless messaging - connect in person, today</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Respectful Community</h3>
                  <p className="text-sm text-gray-600">Everyone signals openness - polite declines expected & respected</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              getUserLocation();
              setView('categories');
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg"
          >
            Start Broadcasting
          </button>

          <p className="text-center text-xs text-gray-500 mt-4">
            By continuing, you agree to be respectful to all users. Harassment or insulting language will result in permanent ban.
          </p>
        </div>
      </div>
    );
  }

  // Category Selection
  if (view === 'categories') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Where do you want to meet?</h2>
              <p className="text-gray-600">Choose your preferred venue type or walk around</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {VENUE_TYPES.map(type => {
                const Icon = type.icon;
                const isWalking = type.id === 'walking';
                return (
                  <button
                    key={type.id}
                    onClick={() => handleVenueTypeSelect(type.id)}
                    className={`bg-white border-2 ${isWalking ? 'border-blue-400 shadow-lg' : `border-${type.color}-200`} hover:border-${type.color}-400 hover:bg-${type.color}-50 rounded-2xl p-6 transition-all text-center group relative`}
                  >
                    {isWalking && (
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        NEW!
                      </div>
                    )}
                    <div className={`inline-block bg-${type.color}-100 rounded-full p-4 mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-8 h-8 text-${type.color}-600`} />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{type.name}</h3>
                    <p className="text-xs text-gray-500">{type.description}</p>
                  </button>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <Footprints className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">New: Walking Broadcasts!</h3>
                  <p className="text-sm text-gray-600">
                    Now you can broadcast while walking around town, at parks, or street corners. 
                    Perfect for spontaneous meetups!
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setView('matches')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-colors"
            >
              View My Approaches ({matches.length})
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Venues List
  if (view === 'venues') {
    const selectedType = VENUE_TYPES.find(t => t.id === selectedVenueType);
    const Icon = selectedType?.icon;
    const isWalkingMode = selectedVenueType === 'walking';

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setView('categories')}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ←
                </button>
                {Icon && <Icon className={`w-6 h-6 text-${selectedType.color}-600`} />}
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedType?.name}</h2>
                  <p className="text-sm text-gray-500">Near {userLocation?.city}</p>
                </div>
              </div>
              <button
                onClick={() => setView('matches')}
                className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                <Heart className="w-4 h-4" />
                {matches.length}
              </button>
            </div>

            {broadcasting && broadcastVenue && (
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Radio className="w-6 h-6 text-purple-600" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">You're Broadcasting!</p>
                      <p className="text-sm text-gray-600">at {broadcastVenue.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleStopBroadcast}
                    className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Stop
                  </button>
                </div>
              </div>
            )}

            {isWalkingMode && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Footprints className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Walking Broadcasts</h3>
                    <p className="text-sm text-gray-600">
                      These people are broadcasting while walking around. Perfect for spontaneous coffee dates or a walk in the park!
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {nearbyVenues.map(venue => {
                const usersHere = getUsersAtVenue(venue);
                const isArea = venue.type === 'area' || venue.type === 'street';
                return (
                  <div
                    key={venue.id}
                    className={`bg-white border-2 ${isArea ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200'} hover:border-purple-300 rounded-xl p-4 transition-all`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {isArea && <Footprints className="w-4 h-4 text-blue-600" />}
                          <h3 className="font-semibold text-gray-800">{venue.name}</h3>
                          {usersHere.length > 0 && (
                            <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                              <Radio className="w-3 h-3" />
                              {usersHere.length} {isArea ? 'walking' : 'live'}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {venue.distance} mi
                          </span>
                          <span>{venue.address}</span>
                        </div>
                        
                        <div className="flex gap-2">
                          {usersHere.length > 0 && (
                            <button
                              onClick={() => handleVenueSelect(venue)}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                            >
                              {isArea ? 'See Who\'s Walking' : 'See Who\'s Here'}
                            </button>
                          )}
                          {!broadcasting && (
                            <button
                              onClick={() => handleStartBroadcast(venue)}
                              className="bg-white border-2 border-purple-300 hover:bg-purple-50 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                            >
                              {isArea ? 'Broadcast While Walking' : 'Broadcast Here'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Venue Users List - Shows all users at a selected venue
  if (view === 'venue-users-list' && selectedVenue) {
    const usersHere = getUsersAtVenue(selectedVenue);
    const isWalkingMode = selectedVenue.type === 'area' || selectedVenue.type === 'street';

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setView('venues')}
                className="text-gray-600 hover:text-gray-800"
              >
                ←
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {isWalkingMode ? (
                    <Footprints className="w-5 h-5 text-blue-600" />
                  ) : (
                    <MapPin className="w-5 h-5 text-purple-600" />
                  )}
                  <h2 className="text-xl font-bold text-gray-800">{selectedVenue.name}</h2>
                </div>
                <p className="text-sm text-gray-500">
                  {usersHere.length} {usersHere.length === 1 ? 'person' : 'people'} {isWalkingMode ? 'walking here' : 'broadcasting here'}
                </p>
              </div>
              <button
                onClick={() => setView('matches')}
                className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                <Heart className="w-4 h-4" />
                {matches.length}
              </button>
            </div>

            {/* Users List */}
            {usersHere.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">No one here right now</p>
                <p className="text-sm text-gray-400">Check back soon or try another location!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {usersHere.map((user, index) => (
                  <div
                    key={user.id}
                    onClick={() => {
                      setCurrentUserIndex(index);
                      setView('users');
                    }}
                    className="bg-white border-2 border-gray-200 hover:border-purple-400 hover:shadow-lg rounded-xl p-4 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      {/* User Photo */}
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center text-4xl">
                          {user.photos[0]}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Radio className="w-3 h-3" />
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-800 text-lg">{user.name}, {user.age}</h3>
                          {user.isWalking && (
                            <Footprints className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{user.bio}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {user.lastActive}
                          </span>
                          {user.isWalking ? (
                            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                              Walking
                            </span>
                          ) : (
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                              Here now
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Users at Venue
  if (view === 'users' && selectedVenue) {
    const usersHere = getUsersAtVenue(selectedVenue);
    const currentUser = usersHere[currentUserIndex];

    if (!currentUser) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">No more users at this location</p>
            <button
              onClick={() => setView('venues')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium"
            >
              Back to Venues
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-4 flex items-center justify-between">
            <button
              onClick={() => setView(broadcasting ? 'broadcasting-with-users' : 'venue-users-list')}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              ← Back
            </button>
            <div className="flex items-center gap-2">
              {currentUser.isWalking ? (
                <Footprints className="w-4 h-4 text-blue-500" />
              ) : (
                <MapPin className="w-4 h-4 text-gray-500" />
              )}
              <span className="text-sm font-medium text-gray-700">{selectedVenue.name}</span>
            </div>
            <div className="text-sm text-gray-500">
              {currentUserIndex + 1}/{usersHere.length}
            </div>
          </div>

          {showApproachSent && (
            <div className="bg-green-500 text-white rounded-2xl p-4 mb-4 text-center animate-bounce">
              <Check className="w-6 h-6 mx-auto mb-2" />
              <p className="font-semibold">Approach request sent!</p>
              <p className="text-sm">They'll see your profile if interested</p>
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative h-96 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
              <span className="text-9xl">{currentUser.photos[0]}</span>
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 animate-pulse">
                <Radio className="w-4 h-4" />
                {currentUser.isWalking ? 'Walking' : 'Broadcasting'}
              </div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {currentUser.lastActive}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {currentUser.name}, {currentUser.age}
              </h3>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                {currentUser.isWalking ? (
                  <>
                    <Footprints className="w-4 h-4" />
                    <span>Walking near {currentUser.broadcastLocation}</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4" />
                    <span>At {currentUser.broadcastLocation}</span>
                  </>
                )}
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-4">
                <p className="text-gray-700">{currentUser.bio}</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-900 font-medium mb-1">
                      💡 Respectful Approaching
                    </p>
                    <p className="text-xs text-blue-700">
                      {currentUser.name} is broadcasting to signal openness. If you approach and they decline, 
                      please be respectful. Everyone has the right to say no politely.
                    </p>
                  </div>
                </div>
              </div>

              {currentUser.isWalking && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-amber-800">
                    🚶 <strong>Walking Broadcast:</strong> {currentUser.name} is on the move! 
                    If mutual interest, you'll both get their approximate location to meet up.
                  </p>
                </div>
              )}

              <div className="flex gap-4 justify-center mb-4">
                <button
                  onClick={handlePass}
                  className="w-16 h-16 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shadow-lg"
                >
                  <X className="w-8 h-8 text-gray-500" />
                </button>
                <button
                  onClick={() => handleApproach(currentUser)}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all shadow-lg"
                >
                  <Heart className="w-10 h-10 text-white" />
                </button>
              </div>

              <button
                className="w-full text-center text-sm text-gray-500 hover:text-red-600 flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                Report inappropriate behavior
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Broadcasting View - Shows other users at your location
  if (view === 'broadcasting-with-users') {
    const usersHere = getUsersAtVenue(broadcastVenue).filter(u => u.id !== 1); // Filter out yourself (id:1 for demo)
    const isWalkingMode = broadcastVenue.type === 'area' || broadcastVenue.type === 'street';

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            {/* Broadcasting Status Header */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Radio className="w-6 h-6 text-purple-600" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">You're Broadcasting!</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      {isWalkingMode ? (
                        <>
                          <Footprints className="w-4 h-4" />
                          Walking at {broadcastVenue.name}
                        </>
                      ) : (
                        <>
                          <MapPin className="w-4 h-4" />
                          At {broadcastVenue.name}
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleStopBroadcast}
                  className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border-2 border-gray-300"
                >
                  Stop
                </button>
              </div>
              <p className="text-sm text-gray-600">
                You're visible to others at this location. They can send you approach requests!
              </p>
            </div>

            {/* Title */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {isWalkingMode ? 'Who\'s Walking Here' : 'Who\'s Here'}
              </h2>
              <p className="text-gray-600">
                {usersHere.length} {usersHere.length === 1 ? 'person' : 'people'} broadcasting at this location
              </p>
            </div>

            {/* Users List */}
            {usersHere.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">No one else here yet</p>
                <p className="text-sm text-gray-400">Be the first! Others will see you when they arrive.</p>
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                {usersHere.map(user => (
                  <div
                    key={user.id}
                    onClick={() => {
                      const userIndex = usersHere.findIndex(u => u.id === user.id);
                      setCurrentUserIndex(userIndex);
                      setView('users');
                    }}
                    className="bg-white border-2 border-gray-200 hover:border-purple-400 hover:shadow-lg rounded-xl p-4 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      {/* User Photo */}
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center text-4xl">
                          {user.photos[0]}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Radio className="w-3 h-3" />
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-800 text-lg">{user.name}, {user.age}</h3>
                          {user.isWalking && (
                            <Footprints className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{user.bio}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {user.lastActive}
                          </span>
                          {user.isWalking ? (
                            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                              Walking
                            </span>
                          ) : (
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                              Here now
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="space-y-3">
              <button
                onClick={() => setView('venues')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all"
              >
                Browse Other Locations
              </button>
              <button
                onClick={() => setView('matches')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4" />
                View My Approaches ({matches.length})
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original Broadcasting View (kept for backwards compatibility but rarely used now)
  if (view === 'broadcasting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="relative inline-block mb-6">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-full p-6">
                <Radio className="w-16 h-16 text-purple-600" />
              </div>
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse"></span>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">You're Live!</h2>
            <p className="text-gray-600 mb-6">
              Broadcasting at <strong>{broadcastVenue?.name}</strong>
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
              <p className="text-gray-700 mb-4">
                Other users at this location can now see your profile and send you approach requests.
              </p>
              <p className="text-sm text-gray-600">
                You'll get a notification when someone wants to meet you!
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setView('venues')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all"
              >
                Browse Other Users
              </button>
              <button
                onClick={handleStopBroadcast}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-colors"
              >
                Stop Broadcasting
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Matches / Approaches View
  if (view === 'matches') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Your Approaches</h2>
                <p className="text-gray-600">People you've expressed interest in</p>
              </div>
              <button
                onClick={() => setView('categories')}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Done
              </button>
            </div>

            {matches.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No approaches yet</p>
                <button
                  onClick={() => setView('categories')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-medium"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {matches.map(match => (
                  <div key={match.id} className="bg-white border-2 border-purple-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                      <span className="text-7xl">{match.photos[0]}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-1">{match.name}, {match.age}</h3>
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {match.broadcastLocation}
                      </p>
                      <span className="inline-block mt-2 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                        Pending
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;
