# rvnotas

Create a modern, minimal, and ultra-clean Bible Reader and Commentary web app inspired by the aesthetic of Airbnb and Swarm (Foursquare).

Key Design & Aesthetic Guidelines:

- Vibe: Premium, spacious, modern, and uncluttered. Use warm neutral backgrounds (e.g., #FAF9F6 or #FFFFFF), dark charcoal text (#1A1A1A) for maximum legibility, and subtle slate/gray accents.

- Typography: Elegant serif font for Bible body text (e.g., Georgia or Merriweather) with generous line-height (1.8), and a crisp sans-serif font (Inter) for UI elements, labels, and navigation.

- UI Components: Rounded corners (rounded-2xl), soft borders (border-neutral-200/50), subtle floating shadows, and sleek pill-shaped controls.

Layout Structure:

1. Header: Minimalist top bar with a clean logo ("Comentario Bíblico"), a search bar input, and a theme toggle (light/dark mode).

2. Navigation Bar: A floating or sticky pill bar containing:

   - Book Selector dropdown

   - Chapter Selector dropdown

   - Quick "Previous" and "Next" chapter buttons with subtle arrow icons.

3. Reading Area:

   - Single column centered layout for reading on mobile/tablet.

   - On desktop, a two-column or clean main panel layout where the Bible text occupies the main reading canvas and study notes appear in a soft card section below or to the side.

4. Add Lucide React icons for all interactive controls. Include subtle loading skeletons.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://rvnotas.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5b625881-fa84-45ee-8fec-cbfb62964dde).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
