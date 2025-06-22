# VibeVin Dashboard

A modern, responsive dashboard UI for the VibeVin hackathon web app built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Dashboard Layout**: Clean, responsive design with sidebar navigation
- **Dark Mode Support**: Toggle between light and dark themes
- **Interactive Components**: Animated cards and elements using Framer Motion
- **Mobile Responsive**: Optimized for all screen sizes
- **Modular Architecture**: Cleanly separated components for easy maintenance
- **Animated Logo**: W breaking apart into two Vs to form VibeVin

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd VibeVin
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Project Structure

```
VibeVin/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Root page (redirects to dashboard)
├── components/
│   ├── AnimatedLogo.tsx      # Animated logo component
│   ├── BountyCard.tsx        # Bounty display component
│   ├── ContentFeed.tsx       # Social content feed
│   ├── Header.tsx            # Top navigation bar
│   ├── PromptCard.tsx        # Prompt performance metrics
│   ├── Sidebar.tsx           # Left navigation sidebar
│   └── WalletBadge.tsx       # Wallet badges and tokens
├── lib/
│   └── utils.ts              # Utility functions
└── package.json
```

## 🎨 Components

### Dashboard Sections

1. **Active Bounties**: Display current bounties with progress tracking
2. **Prompt Performance**: Metrics and mini charts for prompt analytics
3. **Wallet Badges**: Visual tokens and achievements
4. **Recent Content**: AI-generated social media posts

### Key Features

- **Responsive Grid Layout**: Adapts to different screen sizes
- **Interactive Elements**: Hover effects and smooth animations
- **Status Indicators**: Real-time sync status and notifications
- **Theme Toggle**: Switch between light and dark modes
- **Mobile Navigation**: Collapsible sidebar for mobile devices
- **Animated Logo**: W transforms into two Vs on page load

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- CSS variables for theming
- Dark mode support
- Custom color palette
- Animation utilities

### TypeScript
Strict TypeScript configuration with:
- Path aliases (`@/*`)
- Next.js types
- Component prop interfaces

## 🚀 Deployment

Build the project for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Future Enhancements

- [ ] Real API integration (Comet Opik, Jenius MCP SDK)
- [ ] User authentication
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Custom themes
- [ ] Export functionality

## 📄 License

This project is licensed under the MIT License.