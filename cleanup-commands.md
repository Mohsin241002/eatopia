# Cleanup Commands for Unused Features

## 1. Remove Unused Dependencies
```bash
npm uninstall animejs gsap @gsap/react emailjs-com
```

## 2. Remove Unused Components
```bash
Remove-Item "src\components\BurgerTrail.tsx" -Force
Remove-Item "src\components\ParallaxSection.tsx" -Force
Remove-Item "src\components\background\PixabayBackground.tsx" -Force
```

## 3. Remove Unused API Integrations
```bash
Remove-Item "src\lib\pixabay.ts" -Force
Remove-Item "src\lib\gemini.ts" -Force
Remove-Item "src\lib\googlemaps.ts" -Force
Remove-Item "src\hooks\useGoogleMaps.ts" -Force
```

## 4. Remove Unused Route (Optional)
```bash
Remove-Item "src\app\main\" -Recurse -Force
Remove-Item "src\components\pages\MainPage.jsx" -Force
```

## Environment Variables to Remove from .env.local
- NEXT_PUBLIC_PIXABAY_API_KEY
- NEXT_PUBLIC_GEMINI_API_KEY  
- NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

## Dependencies that will remain (all actively used):
- @emailjs/browser (used in contact page)
- @googlemaps/js-api-loader (remove this too if removing Google Maps)
- @radix-ui/react-label (used in forms)
- @tabler/icons-react (used throughout UI)
- clsx (used in utils)
- firebase (used for auth and data)
- motion (used in animations)
- react-icons (used in components)
- tailwind-merge (used in utils)