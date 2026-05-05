# 🐱💪 Kitty Fits — Personal Trainer Landing Page

Official website for **Kitty Fits**, a personal trainer. 
The site showcases her story, services, and drives potential clients to connect via WhatsApp.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

---

## Overview

Kitty Fits is a personal trainer landing page built to:

- Present who Kitty is and her fitness philosophy
- Showcase her training services and plans
- Build trust through testimonials and results
- Convert visitors into clients via WhatsApp CTA

The site is a **single-page experience** with a modal contact form and a direct WhatsApp link as the primary conversion channel.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.2.4 | React framework (App Router) |
| [React](https://react.dev) | 19.2.4 | UI library |
| [TypeScript](https://www.typescriptlang.org) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | ^4 | Styling |
| [React Icons](https://react-icons.github.io/react-icons) | ^5.6.0 | Icon library (social + UI icons) |
| [pnpm](https://pnpm.io) | 10.32.1 | Package manager |

---

## Getting Started

### Prerequisites

- Node.js `v20+`
- pnpm `v10+`

Install pnpm if you don't have it:

```bash
npm install -g pnpm
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/paolavrgs/kittyfits_web.git
cd kittyfits_web

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.local

# 4. Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

---

## Project Structure

```
kittyfits_web/
├── app/
│   ├── layout.tsx          
│   ├── page.tsx            
│   └── globals.css         
├── components/
│   ├── Navbar.tsx          
│   ├── Hero.tsx            
│   ├── About.tsx           
│   ├── Services.tsx        
│   ├── Team.tsx            
│   ├── Colab.tsx           
│   ├── Testimonials.tsx    
│   ├── ContactModal.tsx    
│   └── Footer.tsx          
├── public/
│   └── assets/     
├── .env.local              
└── package.json
```

---

## Features

- **Single page layout**
- **WhatsApp CTA** as the primary conversion button throughout the page
- **Modal contact form** for lead capture before redirecting to WhatsApp
- **Responsive design** — works on all screen sizes
- **Fast performance** — static generation via Next.js App Router

---

## Environment Variables

Create a `.env.local` file at the root with the following:

```env
# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=584XXXXXXXXX
```

> Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never store sensitive secrets with this prefix.

---

## Deployment

The project is optimized for deployment on [Vercel](https://vercel.com):

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

Set your environment variables in the Vercel dashboard under **Settings → Environment Variables** before deploying to production.

---

## WhatsApp Integration

The primary CTA redirects users to WhatsApp with a pre-filled message:

```ts
const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`
```

---

## License

Private project — all rights reserved © Kitty Fits.