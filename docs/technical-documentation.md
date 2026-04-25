# Technical Documentation (Assignment 3)

## Project Overview
This project is a more advanced version of my portfolio website built with HTML, CSS, and JavaScript. It builds on the previous assignments by adding API integration, more state management, stronger JavaScript logic, and a cleaner user interface.

The website contains the main sections of a portfolio website: Welcome, About Me, Projects, GitHub Repositories, and Contact.

## Folder Structure
- `index.html` — Main page structure
- `css/styles.css` — Page styling, responsive layout, dark mode styles, and UI improvements
- `js/script.js` — JavaScript interactivity and logic
- `assets/images/` — Images used in the Projects section
- `docs/ai-usage-report.md` — AI usage report
- `docs/technical-documentation.md` — This document

## HTML Structure (index.html)
- `<main id="container">` wraps the main content of the page
- Sections:
  - `#welcome` — lets the visitor enter and save their name
  - `#about` — short introduction about me
  - `#projects` — shows project cards with title, category, description, and image
    - Includes filter dropdown (`#filterProjects`)
    - Includes sort dropdown (`#sortProjects`)
    - Includes search input (`#projectSearch`)
    - Includes an empty state message (`#emptyMessage`)
  - `#github-projects` — shows repositories loaded from the GitHub API
    - Includes refresh button (`#loadReposBtn`)
    - Includes status message (`#repoStatus`)
    - Includes repository container (`#repoList`)
  - `#contact` — contact form with name, email, and message
    - Includes a feedback message element (`#formMessage`)

## CSS Styling (css/styles.css)
- The layout is centered using `#container` with a max-width.
- Sections are styled like cards using padding, rounded corners, borders, and a light shadow.
- The hero area at the top shows the name, subtitle, and dark mode button in a cleaner layout.
- The projects section uses a grid for controls and project cards.
- The GitHub section uses repository cards instead of a simple list.
- Inputs, buttons, and dropdowns are styled consistently.
- Images are responsive using `max-width: 100%` and `height: auto`.
- Responsive behavior:
  - On smaller screens, layouts stack vertically.
  - Buttons can stretch to full width for easier use on mobile.
- Dark mode:
  - The `.dark` class changes the background, text, cards, inputs, and buttons.
  - Dark mode also updates the custom dropdown arrow colors.

## JavaScript Interactivity (js/script.js)

### 1. Visitor Name Saving
- The welcome section allows the visitor to enter their name.
- The name is saved using `localStorage`.
- The saved name is shown again when the page is reopened.
- The name can be saved either by clicking the Save button or pressing Enter.

### 2. Dark/Light Mode Toggle
- A button with `id="themeToggle"` toggles dark mode.
- On click:
  - Adds or removes the `dark` class on the `<body>`
  - Updates the button text
  - Saves the theme in `localStorage`
- On page load:
  - The saved theme is loaded and applied automatically

### 3. Project Search, Filter, and Sort
- The projects section supports three controls:
  - Search by text
  - Filter by category
  - Sort by title
- The search input listens for typing and updates the visible projects.
- The filter dropdown shows all projects or only selected categories.
- The sort dropdown changes the order of the project cards.
- If no project matches, an empty message is shown.

### 4. Contact Form Validation
- The form has `id="contactForm"`.
- On submit:
  - Prevents default form submission
  - Checks if fields are empty
  - Checks that the name has at least 3 characters
  - Checks that the email looks valid
  - Checks that the message has at least 10 characters
  - Displays error or success messages
  - Resets the form after successful submission

### 5. GitHub API Integration
- The GitHub section fetches public repositories from the GitHub API.
- Repositories are loaded automatically when the page opens.
- The refresh button allows loading them again.
- Each repository is displayed in a styled card with:
  - repository name
  - description
  - main language
- If loading fails, an error message is shown to the user.

## Performance and Compatibility
- Images use `loading="lazy"` to improve loading performance.
- The website uses plain HTML, CSS, and JavaScript without heavy libraries.
- The layout is responsive and works better across different screen sizes.
- The code is separated into clear files for structure and readability.

## How to Run Locally
1. Open the project folder in VS Code.
2. Open `index.html` in a browser, or use the VS Code Live Server extension.