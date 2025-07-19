# Retro Phone Portfolio

An interactive, retro-themed portfolio designed to look and feel like a classic Nokia-style mobile phone. This project showcases web development skills through a unique, nostalgic user interface, complete with a functional Snake game.

**[Try the Live Demo Here!](https://your-deployment-link.com)**

![Project Screenshot](https://i.imgur.com/your-screenshot.png)

---

## Features

- **Retro UI/UX:** Styled to mimic a classic mobile phone, featuring a pixel-art font and a synthwave-inspired dark color scheme.
- **Keyboard Navigation:** Control the entire interface using your keyboard.
    - **Arrow Keys:** Navigate menus and control the Snake game.
    - **Enter:** Select menu items or restart the game.
    - **Spacebar:** Open the main menu.
    - **Escape (Esc):** Go back to the previous screen.
- **Animated Transitions:** Smooth, sliding animations for all screen changes provide a fluid user experience.
- **Functional Snake Game:** A complete, playable version of the classic Snake game, built with the HTML5 Canvas API, featuring grid lines and bordered elements for better visibility.
- **Dynamic Content:** All portfolio data (experience, projects, skills) is loaded from a separate `data.js` file, making it easy to update.
- **Audio Feedback:** Uses Tone.js to provide a nostalgic boot-up sound.

---

## Tech Stack

- **Frontend:** React.js
- **Styling:** CSS with Custom Properties (Variables) & Tailwind CSS utility classes.
- **Animation:** `react-transition-group`
- **Audio:** `Tone.js`
- **Development:** Babel (for in-browser JSX transformation)

---

## Project Structure

The project is organized into three main files, along with the `index.html` entry point.


/
├── index.html        # The main HTML file that loads all scripts and styles
├── style.css         # Contains all styling, including layout, themes, and animations
├── data.js           # Holds all personal portfolio data for easy editing
└── App.js            # The core React application logic and components


---

## Local Setup & Installation

To run this project locally, you don't need a complex build setup.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd your-repo-name
    ```

3.  **Run a local server:**
    Since the project uses vanilla HTML, CSS, and in-browser JavaScript, you can simply open the `index.html` file in your browser. For the best experience (to avoid any CORS issues if you add more features), run it with a simple local server. If you have Python installed:

    ```bash
    # For Python 3
    python -m http.server

    # For Python 2
    python -m SimpleHTTPServer
    ```
    Then, open your browser and go to `http://localhost:8000`.

---

## Keyboard Controls

A handy instruction manual is displayed on the screen, but here are the primary controls:

| Key             | Action         |
| --------------- | -------------- |
| **Arrow Keys** | Navigate Menus / Control Snake |
| **Enter** | Select / OK    |
| **Spacebar** | Open Menu      |
| **Escape (Esc)**| Go Back        |
| **Number Keys** | Control Snake (2, 4, 6, 8) |


