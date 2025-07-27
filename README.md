# EduTeams

EduTeams is a simple and accessible educational platform designed for students and teachers. It allows teachers to create and manage courses and lessons, while students can easily view and enroll in these courses.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (login and registration)
- Course creation and management
- Lesson creation and management
- Responsive design compatible with all browsers
- Support for RTL languages

## Technologies Used

- **Backend:** Node.js + Express.js
- **Database:** MySQL with Sequelize ORM
- **Frontend:** EJS + Bootstrap
- **Validation:** Joi
- **Authentication:** JWT + bcrypt
- **File Uploads:** Multer

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/eduteams.git
   ```
2. Navigate to the project directory:
   ```
   cd eduteams
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your database credentials and secret keys.

## Usage

1. Start the server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000` to access the application.

## File Structure

```
eduteams/
├── bin/
│   └── www
├── config/
│   └── database.js
├── models/
│   ├── user.model.js
│   ├── course.model.js
│   ├── lesson.model.js
│   └── enrollment.model.js
├── controllers/
│   ├── auth.controller.js
│   ├── course.controller.js
│   └── lesson.controller.js
├── routes/
│   ├── auth.routes.js
│   ├── course.routes.js
│   └── lesson.routes.js
├── middleware/
│   ├── auth.js
│   ├── role.js
│   └── validator.js
├── views/
│   ├── login.ejs
│   ├── dashboard.ejs
│   ├── course.ejs
│   ├── lessons.ejs
│   └── layout.ejs
├── public/
│   ├── css/
│   ├── js/
│   └── uploads/
├── app.js
├── .env
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.