# Streamline Add-In: Professional Project Structure

## Overview
The Streamline Add-In is now organized as a professional Outlook task pane application with structured request form handling for legal, vendor, and sales workflows.

## Folder Structure

```
Streamline Add-In Taxonomy/
├── src/
│   ├── taskpane/
│   │   ├── components/
│   │   │   ├── forms/                      # Form-related components
│   │   │   │   ├── RequestDefinitions.ts   # Form field and request type definitions
│   │   │   │   └── RequestForm.tsx         # Main form component
│   │   │   ├── App.tsx                     # Main application component
│   │   │   ├── Header.tsx                  # Header component with branding
│   │   │   ├── HeroList.tsx                # List display component
│   │   │   └── TextInsertion.tsx           # Text insertion utility
│   │   ├── index.tsx                       # React entry point
│   │   ├── taskpane.tsx                    # Outlook API integration
│   │   └── taskpane.html                   # Task pane HTML shell
│   └── commands/
│       ├── commands.ts                     # Command handler for ribbon buttons
│       └── commands.html                   # Command execution frame
├── assets/
│   ├── icon-16.png                         # App icon (16x16)
│   ├── icon-32.png                         # App icon (32x32)
│   ├── icon-64.png                         # App icon (64x64)
│   ├── icon-80.png                         # App icon (80x80)
│   ├── icon-128.png                        # App icon (128x128)
│   └── logo-filled.png                     # Brand logo
├── dist/                                   # Build output (generated)
├── webpack.config.js                       # Build configuration
├── manifest.xml                            # Outlook add-in manifest
├── package.json                            # Node.js dependencies
├── tsconfig.json                           # TypeScript configuration
└── babel.config.json                       # Babel configuration
```

## Component Architecture

### Forms System (`src/taskpane/components/forms/`)

**RequestDefinitions.ts**
- Centralized definitions for all request types and their fields
- Supports 6 request types:
  1. General Legal Request
  2. Vendor Contract Request
  3. Sales Contract Request
  4. NDA
  5. Privacy / AI Matters
  6. Business Development Request
- Each form includes field validation, conditional display logic, and required field markers

**RequestForm.tsx**
- Main form component rendered in the task pane
- Handles user input and dynamic field visibility
- Generates structured request summaries
- Inserts formatted summaries into Outlook message bodies

### Key Features

✓ **Dynamic Field Visibility** – Fields appear/disappear based on user selections  
✓ **Conditional Logic** – HR Matter subfield only shows when HR is selected  
✓ **Fluent UI Integration** – Professional Microsoft design system  
✓ **Form Validation** – Required field enforcement  
✓ **Real-time Preview** – Summary updates as user types  

## Build & Development

### Commands
```bash
# Start development server with hot reload
npm start

# Build for development
npm run build:dev

# Build for production
npm run build

# Lint and fix code style
npm run lint:fix

# Watch mode for development
npm watch
```

### Output
- **Development**: Runs on `https://localhost:3000/`
- **Production**: Builds to `dist/` folder for deployment
- **Manifest**: Updated manifest.xml in dist folder for deployment

## Configuration

### manifest.xml
- Updated display name: "Streamline Add-In Taxonomy"
- Updated description: "Structured request capture for legal, vendor, and sales workflows."
- Provider: Streamline
- Supports: Outlook (desktop and web)
- Activation: Message compose surface

### package.json
- Application name: `streamline-addin-taskpane`
- React 18.2.0 with Fluent UI v9 components
- TypeScript for type safety
- Webpack for bundling and development server

## Request Form Flow

1. User clicks "Open Streamline Form" button in Outlook ribbon
2. Task pane loads with request type selector
3. User selects a request type (e.g., "Vendor Contract Request")
4. Form dynamically displays relevant fields for that request type
5. User completes form fields
6. System displays formatted summary preview
7. User clicks "Insert request summary into message"
8. Formatted summary inserts into message body
9. User completes message and sends to legal team

## Deployment Readiness

- ✓ Production build tested
- ✓ Webpack optimization configured
- ✓ TypeScript strict mode enabled
- ✓ No build warnings or errors
- ✓ Form validation and error handling in place
- ✓ Accessibility features included (Fluent UI)

## Next Steps

1. **Deployment**: Upload manifest.xml and dist/ contents to hosting
2. **Testing**: Test in Outlook on Windows and Mac
3. **Refinement**: Gather user feedback on form fields
4. **Integration**: Connect backend to route requests to legal systems
5. **Branding**: Customize colors/logos in Header component

## Technical Stack

- **Framework**: React 18.2 with TypeScript
- **UI Library**: Fluent UI React v9
- **Build Tool**: Webpack 5
- **Language**: TypeScript 5.4
- **Office API**: Office JavaScript API v1
- **Package Manager**: npm

---
**Project initialized**: May 22, 2026  
**Status**: Ready for development and testing
