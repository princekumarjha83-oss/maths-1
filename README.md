# 🧮 MATH RUSH

### 🧠 Brain Speed Challenge

> **Think Fast. Calculate Faster. Become the Math King. 👑**

MATH RUSH is an interactive mathematical brain-training game designed to improve **calculation speed, accuracy, concentration, and problem-solving ability** through a fast-paced gaming experience.

The application generates mathematical questions dynamically and challenges players to solve them before the timer runs out.

It includes multiple game modes, difficulty progression, scoring, XP, streaks, sound effects, vibration feedback, animations, themes, and a leaderboard interface.

---

## 🌐 Live Project

🚀 **Play MATH RUSH:**
`Add your deployed Vercel/Netlify URL here`

💻 **GitHub Repository:**
`https://github.com/princekumarjha83-oss/maths-1`

---

## 📸 Screenshots

Add screenshots of your application here.

Recommended screenshots:

| Screen         | Description                         |
| -------------- | ----------------------------------- |
| 🏠 Home        | Main game menu                      |
| 🎮 Game        | Mathematical question screen        |
| 🏆 Game Over   | Final score and statistics          |
| 🎨 Themes      | Available visual themes             |
| 📊 Leaderboard | Player ranking interface            |
| ⚙️ Settings    | Sound, vibration and theme settings |

Example:

```md
![Home Screen](assets/home.png)
![Game Screen](assets/game.png)
![Game Over](assets/game-over.png)
```

---

# ✨ Features

### 🎮 Multiple Game Modes

MATH RUSH provides five different gameplay modes:

* 🟢 **Classic Mode**
* ⚡ **Time Attack**
* 💀 **Survival**
* 🔢 **LCM Master**
* 📅 **Daily Challenge**

---

### 🧮 Dynamic Mathematical Questions

Questions are generated dynamically instead of using a fixed list.

Supported operations include:

* Addition
* Subtraction
* Multiplication
* Division
* LCM — Least Common Multiple

The difficulty of generated questions increases as the player's score increases.

---

### 📈 Dynamic Difficulty

The game automatically calculates difficulty from the player's score.

```text
Difficulty = floor(Score / 50) + 1
```

For example:

```text
Score 0 – 49       → Difficulty 1
Score 50 – 99      → Difficulty 2
Score 100 – 149    → Difficulty 3
Score 150 – 199    → Difficulty 4
```

This means the game becomes progressively more challenging as the player improves.

---

### 🏆 Scoring System

Correct answers award points based on the player's current streak.

```text
Points = 10 + (Streak × 2)
```

Example:

```text
First correct answer
10 + (0 × 2) = 10 points

Second correct answer
10 + (1 × 2) = 12 points

Third correct answer
10 + (2 × 2) = 14 points
```

Therefore, maintaining a longer streak allows players to earn points faster.

---

### 🔥 Streak System

Every correct answer increases the player's streak.

```text
Correct → Streak +1
Wrong   → Streak reset to 0
```

The application also records the player's **maximum streak** during the game.

---

### ⭐ XP & Ranking

Every correct answer awards:

```text
+5 XP
```

The XP system can be used to determine the player's mathematical rank.

Current rank categories include:

```text
Beginner
Smart
Genius
Math King 👑
```

---

# 🎮 Game Modes

## 🟢 Classic Mode

Classic Mode provides a balanced mathematical challenge.

### Starting Time

```text
30 seconds
```

The player solves as many questions as possible before the timer reaches zero.

Correct answers:

* Increase score
* Increase XP
* Increase streak
* Add bonus time
* Generate a new question

---

## ⚡ Time Attack

Time Attack focuses on speed.

### Starting Time

```text
60 seconds
```

The goal is to solve as many questions as possible within the available time.

This mode is ideal for players who want to test their calculation speed.

---

## 💀 Survival Mode

Survival Mode is the most unforgiving game mode.

### Starting Time

```text
10 seconds
```

A correct answer resets the timer back to:

```text
10 seconds
```

However, a wrong answer immediately ends the game.

```text
Correct Answer
      ↓
Timer Reset → 10 seconds

Wrong Answer
      ↓
Game Over
```

---

## 🔢 LCM Master

LCM Master focuses specifically on **Least Common Multiple** problems.

Example:

```text
LCM(6, 8)
```

Calculation:

```text
GCD(6, 8) = 2

LCM = (6 × 8) / 2

LCM = 24
```

This mode helps players practice number theory and mathematical reasoning.

---

## 📅 Daily Challenge

Daily Challenge provides a dedicated timed game mode.

### Starting Time

```text
40 seconds
```

Players can use this mode as a quick daily mathematical practice session.

> **Note:** The current implementation provides a daily game mode, but it is not yet a server-synchronized global daily challenge.

---

# ⏱️ Time System

Different game modes have different starting times:

| Mode            | Starting Time |
| --------------- | ------------: |
| Classic         |        30 sec |
| Time Attack     |        60 sec |
| Survival        |        10 sec |
| LCM Master      |        45 sec |
| Daily Challenge |        40 sec |

---

## ⏳ Correct Answer Time Bonus

For most modes, a correct answer provides:

```text
+3 seconds
```

The timer is capped at:

```text
60 seconds
```

Survival Mode behaves differently:

```text
Correct Answer → Timer resets to 10 seconds
```

---

## ❌ Wrong Answer

For normal game modes:

```text
Wrong Answer
     ↓
Streak = 0
     ↓
Time -5 seconds
```

In Survival Mode:

```text
Wrong Answer
     ↓
Immediate Game Over
```

---

# 🧠 Mathematical Engine

The mathematical engine is located at:

```text
src/lib/mathEngine.ts
```

Its responsibility is to:

1. Generate mathematical questions.
2. Select mathematical operations.
3. Calculate correct answers.
4. Control question difficulty.
5. Generate LCM questions.
6. Return structured question data.

A generated question contains information such as:

```text
Question
Answer
Operation Type
Difficulty
```

---

# 🔢 Supported Operations

### Addition

Example:

```text
7 + 8 = 15
```

### Subtraction

Example:

```text
17 - 8 = 9
```

### Multiplication

Example:

```text
6 × 7 = 42
```

### Division

Example:

```text
42 ÷ 7 = 6
```

### LCM

Example:

```text
LCM(6, 8) = 24
```

---

# 📐 LCM Algorithm

The application calculates LCM using the relationship between **GCD** and **LCM**.

```text
LCM(a, b) = |a × b| / GCD(a, b)
```

Example:

```text
a = 6
b = 8

GCD(6,8) = 2

LCM = (6 × 8) / 2

LCM = 24
```

---

# 🏗️ Application Architecture

The application follows a simple React-based architecture.

```text
                  ┌─────────────────┐
                  │    React UI     │
                  │     App.tsx     │
                  └────────┬────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │   useGameLogic.ts   │
                │   Game State/Rules  │
                └──────────┬──────────┘
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
      ┌────────────┐ ┌────────────┐ ┌────────────┐
      │ mathEngine │ │   themes   │ │   sounds   │
      │    .ts     │ │    .ts     │ │    .ts     │
      └────────────┘ └────────────┘ └────────────┘
             │
             ▼
      Mathematical
       Questions
```

---

# 📂 Project Structure

```text
maths-1/
│
├── assets/
│
├── src/
│   │
│   ├── hooks/
│   │   └── useGameLogic.ts
│   │
│   ├── lib/
│   │   ├── mathEngine.ts
│   │   ├── sounds.ts
│   │   ├── themes.ts
│   │   └── utils.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── .gitignore
├── INSTRUCTIONS.md
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

---

# 🧩 Important Files

## `App.tsx`

The main React interface.

Responsible for displaying:

* Main menu
* Game interface
* Timer
* Score
* Streak
* Questions
* Answer controls
* Settings
* Themes
* Leaderboard
* Game-over interface

---

## `useGameLogic.ts`

This is the main game controller.

It manages:

```text
Game State
Game Mode
Question
Score
Timer
Level
Streak
Maximum Streak
XP
Settings
```

It also controls:

* Starting games
* Submitting answers
* Timer
* Score calculation
* XP calculation
* Streak calculation
* Game over
* Sound effects
* Vibration
* Level-up effects

---

## `mathEngine.ts`

Responsible for mathematical question generation.

Supported operations:

```text
ADD
SUB
MUL
DIV
LCM
```

---

## `themes.ts`

Contains the application's visual themes.

Available themes include:

```text
Sleek
Neon Math
Space 🚀
Temple 🛕
Kids 🎈
```

---

## `sounds.ts`

Contains sound-effect resources used by the game.

Examples include:

```text
Correct Answer
Wrong Answer
Game Over
Level Up
Button Click
```

---

## `utils.ts`

Contains reusable helper functions used by the application.

---

# 🎨 Themes

MATH RUSH includes multiple visual experiences.

### 🌌 Sleek

Modern dark interface designed for a clean gaming experience.

### 💙 Neon Math

A futuristic neon-inspired mathematical interface.

### 🚀 Space

A space-inspired theme.

### 🛕 Temple

An Indian-inspired visual theme.

### 🎈 Kids

A colorful theme designed for younger players.

---

# 🔊 Sound & Feedback

The game uses sound effects to provide immediate feedback.

### Correct Answer

```text
🔊 Correct Sound
```

### Wrong Answer

```text
🔊 Wrong Sound
```

### Game Over

```text
🔊 Game Over Sound
```

### Level Up

```text
🎉 Level-Up Sound
```

### Button Interaction

```text
🔊 Click Sound
```

Sound can be enabled or disabled through the settings.

---

# 📳 Vibration Feedback

On supported devices, the application can use browser vibration feedback.

For example:

```text
Wrong Answer
      ↓
Device Vibrates
      ↓
200 ms
```

Vibration can be enabled or disabled through settings.

---

# 🎉 Visual Effects

The application uses animation and celebration effects to improve the gaming experience.

Technologies include:

* Motion animations
* Canvas Confetti
* Animated transitions
* Interactive buttons
* Responsive UI

When a level-up event occurs, the application can display a confetti effect.

---

# 🛠️ Technology Stack

| Technology         | Purpose                |
| ------------------ | ---------------------- |
| ⚛️ React           | User interface         |
| 🔷 TypeScript      | Type-safe programming  |
| ⚡ Vite             | Development/build tool |
| 🎨 Tailwind CSS    | Styling                |
| 🎬 Motion          | Animations             |
| 🎯 Lucide React    | Icons                  |
| 🔊 use-sound       | Sound effects          |
| 🎉 Canvas Confetti | Celebration effects    |
| 🧩 clsx            | Conditional classes    |
| 🔀 tailwind-merge  | Tailwind class merging |

The repository's current `package.json` defines React 19, TypeScript, Vite, Tailwind CSS, Motion, Lucide React, use-sound, Canvas Confetti and related dependencies.

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone https://github.com/princekumarjha83-oss/maths-1.git
```

---

## 2. Enter the project directory

```bash
cd maths-1
```

---

## 3. Install dependencies

```bash
npm install
```

---

## 4. Start the development server

```bash
npm run dev
```

The project's Vite script starts the development server on port `3000`.

Open:

```text
http://localhost:3000
```

---

# 💻 Available Commands

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Production Build

```bash
npm run build
```

Creates the production build.

### Preview

```bash
npm run preview
```

Runs the production build locally.

### Type Checking

```bash
npm run lint
```

Runs TypeScript checking without generating output.

### Clean Build

```bash
npm run clean
```

Removes the `dist` directory.

These commands correspond to the scripts currently defined in the repository's `package.json`.

---

# 📦 Production Build

To create a production build:

```bash
npm run build
```

The generated files will be placed inside:

```text
dist/
```

You can then deploy the generated application to a suitable static hosting platform.

---

# 📱 Android APK

The repository also contains:

```text
INSTRUCTIONS.md
```

with instructions for packaging the web application as an Android application using Capacitor.

The general workflow is:

```text
React Application
       ↓
npm run build
       ↓
Capacitor
       ↓
Android Project
       ↓
Android Studio
       ↓
APK / AAB
```

For Android development, you will need the required Android development environment and Java/Android tooling.

See:

```text
INSTRUCTIONS.md
```

for the project's Android packaging instructions.

---

# 🔐 Security & Configuration

Do not commit private API keys, passwords, tokens, or credentials to GitHub.

Use environment variables when a future version of the application requires secret configuration.

Example:

```env
VITE_API_KEY=your_key_here
```

And keep sensitive environment files out of Git:

```text
.env
.env.local
```

---

# 📊 Current Game Logic

The main game logic follows this process:

```text
Start Game
     ↓
Select Game Mode
     ↓
Set Timer
     ↓
Generate Question
     ↓
User Enters Answer
     ↓
Check Answer
     ↓
 ┌───────────────┐
 │               │
Correct        Wrong
 │               │
 ▼               ▼
Score +         Streak = 0
XP +            Time -5 sec
Streak +        OR Game Over
Time Bonus
 │
 ▼
Generate Next Question
     ↓
Timer Continues
     ↓
Timer = 0
     ↓
Game Over
```

The current React hook defines the five game modes and their starting timers, manages score/streak/XP, handles answer submission, and runs the countdown timer.

---

# 🧮 Example Gameplay

Suppose the game generates:

```text
8 × 7 = ?
```

The player enters:

```text
56
```

The application checks:

```text
User Answer = 56
Correct Answer = 56
```

Therefore:

```text
✅ Correct

Score +10
XP +5
Streak +1
Time +3 seconds
```

The game then generates another question.

If the player maintains a streak, the score bonus increases:

```text
10 + (Streak × 2)
```

---

# ❌ Example Wrong Answer

Question:

```text
15 + 8 = ?
```

Correct answer:

```text
23
```

User enters:

```text
25
```

Result:

```text
❌ Wrong

Streak → 0
Time → -5 seconds
```

In Survival Mode:

```text
❌ Wrong
     ↓
Game Over
```

---

# 🏆 What Makes MATH RUSH Different?

MATH RUSH combines mathematical practice with game mechanics.

Instead of simply solving worksheets, users experience:

```text
Mathematics
     +
Speed
     +
Competition
     +
Streaks
     +
XP
     +
Levels
     +
Animations
     +
Sound
     =
Gamified Learning
```

This makes mathematical practice more interactive and engaging.

---

# 🎯 Project Objectives

The main objectives of MATH RUSH are:

1. Improve mental calculation speed.
2. Improve mathematical accuracy.
3. Encourage repeated mathematical practice.
4. Develop concentration.
5. Introduce gamification into mathematics.
6. Provide different difficulty levels.
7. Give users immediate feedback.
8. Create an engaging and responsive interface.

---

# 🔮 Future Improvements

The project can be extended with:

### 👤 User Accounts

Add authentication so every player can maintain an individual profile.

### ☁️ Online Leaderboard

Connect the leaderboard to a backend database.

Possible technologies:

```text
Firebase
Supabase
MongoDB
PostgreSQL
```

### 🌎 Global Competition

Allow players to compete with users around the world.

### 📅 Real Daily Challenge

Create one synchronized challenge for every player each day.

### 📈 Player Statistics

Track:

```text
Total Games
Total Questions
Correct Answers
Wrong Answers
Accuracy
Highest Score
Highest Streak
Average Response Time
```

### 🏅 Achievements

Examples:

```text
🔥 10 Streak
⚡ 50 Correct Answers
🧠 100 Questions Solved
👑 Math King
💯 Perfect Game
```

### 📱 Mobile Application

Package the project as Android/iOS applications using Capacitor.

### 🌐 Multiplayer

Add real-time multiplayer mathematical battles.

### 🤖 AI Difficulty

Use adaptive algorithms to automatically adjust question difficulty according to player performance.

---

# 📌 Current Limitations

The current project is primarily a frontend game.

Some features that could be expanded in future versions include:

* Persistent user accounts
* Cloud database
* Global leaderboard
* Server-side game statistics
* Synchronized daily challenges
* Online multiplayer
* Persistent player progress across devices

These can be added in future releases.

---

# 📚 Learning Outcomes

This project demonstrates practical knowledge of:

* React development
* TypeScript
* React Hooks
* Custom Hooks
* State management
* Event handling
* Mathematical algorithms
* Random question generation
* Timer-based applications
* Responsive UI development
* Animation
* Audio integration
* Browser APIs
* Component-based architecture
* Vite development
* Frontend project deployment

---

# 👨‍💻 Author

### Prince Kumar Jha

Computer Science & Engineering Student

GitHub:

`https://github.com/princekumarjha83-oss`

---

# ⭐ Support

If you find this project interesting:

⭐ Star the repository
🍴 Fork the repository
🐛 Report issues
💡 Suggest improvements

---

# 📄 License

This project can be released under the **MIT License**.

If you choose to use the MIT License, add a `LICENSE` file to the repository containing the official MIT License text.

---

## 🧠 MATH RUSH

### **Think Fast. Calculate Faster. Become the Math King. 👑**

```text
              🧮
         MATH RUSH
      Brain Speed Challenge

       THINK → SOLVE → WIN
```
