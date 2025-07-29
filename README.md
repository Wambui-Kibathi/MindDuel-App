# MindDuel

MindDuel is a responsive React web application that challenges users with trivia quizzes on various topics and difficulty levels. It features user authentication, profile management and all quiz questions are stored locally using a `json-server`, allowing full CRUD operations within the app. No external API is used.

## Features

1. **User Authentication**: Register and log in to access the full app.
2. **Quiz Topics**: Choose from a variety of topics like General Knowledge, Art, Literature, and Entertainment.
3. **Difficulty Levels**: Pick your difficulty level – Easy, Medium, or Hard.
4. **Timed Quizzes**: Answer questions within a time limit of 30 seconds.
5. **Results Summary**: See your score upon completion.
6. **Profile Management**: Update or delete your user profile.
7. **Theme Toggle**: Light and Dark mode support.
8. **RESTful API (JSON Server)**: Mock backend for local development.

## Repositories
- Frontend: [MindDuel-App](https://github.com/your-username/MindDuel-App)  
- Backend: [MindDuel-App-backend](https://github.com/your-username/MindDuel-App-backend) 

## Installation

# Frontend
Use the package manager [npm](https://www.npmjs.com/) to install and run **MindDuel**.

```bash
# Clone the repository
git clone https://github.com/your-username/MindDuel-App.git

# Navigate to the project folder
cd MindDuel-App

# Install dependencies
npm install

# Install JSON server within the project directory.
npm install json-server

# Start the mock backend (db.json should be in root)
json-server --watch db.json --port 3000

# Start the React app
npm run dev
```
To build the project for production:
```bash
npm run build
```
# Backend
```bash
# Clone the repository
git clone https://github.com/your-username/MindDuel-App-backend.git

# Navigate to the project folder
cd MindDuel-App-backend

# Install dependencies
npm install

# Start backend
npm start  # Runs on port 10000
```

## Usage
- Register to log in and access quizzes.
- Choose your desired quiz topic and difficulty.
- Answer each question within the time limit.
- Submit your quiz to view your scores.
- Navigate to your profile to edit or delete your user info.

## Technologies Used
1. React
2. Vite
3. React Router DOM
4. React Icons
5. JSON Server
6. CSS Modules 

## Contributing
Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.
Please make sure to:
- Follow consistent code style.
- Include relevant test data in db.json.
- Test your changes before submitting.

## Team Credits
This project was developed collaboratively by the following contributors:
1. Wambui Kibathi – Team Lead, Frontend Development, App Structure, Timer, Quiz card, Difficulty selector, Topics card.
2. Afya Mosingi – Nav Bar, Error Boundary logic, LightDarkToggle feature.
3. Aaaqil West – Authentication Logic, Register/Login Form, About Page.
4. Samuel Baraka – Profile Page, Result Handling
Special thanks to everyone who contributed their time and effort to make MindDuel possible!

## Live Site
Visit the live site here:
[Mind Duel Frontend](https://mindduel-app.onrender.com)

# Troubleshooting
API errors? Ensure your frontend is using the correct endpoint (deployed by default).

## ©️ Copyright

© 2025 Wambui Kibathi. All rights reserved.

---

## License 
MIT