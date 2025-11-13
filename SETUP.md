# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Run the Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Step 3: Try the Prototype

The app currently runs with **mock data** so you can demo it immediately without any API keys!

**Try this flow:**
1. Click "Start Broadcasting"
2. Select a venue type (e.g., "Grocery Stores")
3. Browse nearby locations
4. Click "See Who's Here" to view users broadcasting
5. Send approach requests with the heart button
6. View your approaches in the matches screen

---

## 🔑 Adding Real APIs (Optional for Prototype)

### For Google Places Integration:

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Get a Google Places API key:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a project
   - Enable Places API
   - Create credentials
   - Copy your API key

3. Add to `.env`:
```
VITE_GOOGLE_PLACES_API_KEY=your_key_here
```

4. See `API_INTEGRATION_GUIDE.md` for detailed instructions

---

## 📱 Test on Mobile

### Using Your Phone on the Same Network:

1. Find your computer's IP address:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. Update `vite.config.js`:
   ```javascript
   server: {
     host: '0.0.0.0',
     port: 3000
   }
   ```

3. On your phone, go to: `http://YOUR_IP:3000`

---

## 🏗️ Project Structure

```
aisle-meet-you/
├── src/
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styles
│   └── services/            # API services (when ready)
│       ├── placesService.js
│       └── firebaseService.js
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
└── README.md                # Full documentation
```

---

## 🎨 Customization

### Change App Colors:

Edit `src/App.jsx` - all colors use Tailwind classes:
- Primary: `purple-600` and `pink-600`
- Accents: `emerald`, `red`, `amber`

### Add More Venue Types:

In `App.jsx`, update the `VENUE_TYPES` array:

```javascript
const VENUE_TYPES = [
  { id: 'grocery', name: 'Grocery Stores', icon: ShoppingBag, color: 'emerald' },
  { id: 'gym', name: 'Gyms', icon: Dumbbell, color: 'red' },
  // Add your own:
  { id: 'bookstore', name: 'Bookstores', icon: BookOpen, color: 'blue' },
];
```

### Modify Mock Users:

Edit the `MOCK_USERS` array in `App.jsx` to change profiles for demo

---

## 🚢 Deployment

### Deploy to Vercel (Free):

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify (Free):

```bash
npm run build
# Upload the 'dist' folder to Netlify
```

### Environment Variables:

Remember to add your `.env` variables to your hosting platform!

---

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Change port in vite.config.js or:
npm run dev -- --port 3001
```

**Tailwind styles not working?**
```bash
# Rebuild
npm run build
```

**Icons not showing?**
```bash
# Reinstall lucide-react
npm install lucide-react
```

---

## 📚 Next Steps

1. ✅ Run the prototype with mock data
2. ✅ Demo to potential users/investors
3. 📱 Test on mobile devices
4. 🔑 Integrate Google Places API
5. 🗄️ Set up Firebase backend
6. 🚀 Launch beta version

See `README.md` for the full vision and roadmap!

---

## 💬 Questions?

- **Need help?** Check `API_INTEGRATION_GUIDE.md`
- **Want to contribute?** See `README.md` for team needs
- **Investment inquiries?** Contact info in README

**Happy building! 🚀**
