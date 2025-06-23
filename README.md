# EduTeams

EduTeams is a web platform designed for educational purposes, similar to Microsoft Teams. It allows teachers to create teams, manage courses, and upload educational materials, while students can join teams and access these resources.

## Project Structure

```
eduteams
├── bin
│   └── www                     # Server entry point
├── config
│   └── database.js             # Sequelize connection
├── controllers
│   ├── auth.controller.js       # Authentication logic
│   ├── team.controller.js       # Team management logic
│   ├── course.controller.js     # Course management logic
│   └── lesson.controller.js     # Lesson management logic
├── middleware
│   ├── auth.js                 # JWT validation middleware
│   ├── role.js                 # Role-based access control middleware
│   └── validator.js            # Input validation schemas
├── models
│   ├── index.js                # Sequelize model initialization
│   ├── user.model.js           # User model definition
│   ├── team.model.js           # Team model definition
│   ├── course.model.js         # Course model definition
│   ├── lesson.model.js         # Lesson model definition
│   └── teamMembership.model.js  # Team membership model definition
├── public
│   ├── css                     # CSS files for styling
│   ├── js                      # JavaScript files for frontend functionality
│   └── uploads                 # Directory for uploaded files
├── routes
│   ├── auth.routes.js          # Authentication routes
│   ├── team.routes.js          # Team management routes
│   ├── course.routes.js        # Course management routes
│   └── lesson.routes.js        # Lesson management routes
├── views
│   ├── partials
│   │   ├── header.ejs          # Header template
│   │   └── footer.ejs          # Footer template
│   ├── auth
│   │   ├── login.ejs           # Login form
│   │   └── register.ejs        # Registration form
│   ├── dashboard
│   │   ├── student.ejs         # Student dashboard
│   │   └── teacher.ejs         # Teacher dashboard
│   └── teams
│       └── team-detail.ejs     # Team details view
├── .env                         # Environment variables
├── app.js                       # Express application setup
├── package.json                 # Project metadata and dependencies
└── README.md                    # Project documentation
```

## Features

- **User Authentication**: Users can register and log in to access the platform.
- **Role Management**: Different functionalities are available based on user roles (student or teacher).
- **Team Management**: Teachers can create teams and manage team memberships.
- **Course Management**: Courses can be created within teams, and lessons can be uploaded.
- **File Uploads**: Supports uploading of educational materials in various formats (PDF, video).

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd eduteams
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables in the `.env` file.

4. Start the server:
   ```
   npm start
   ```

5. Access the application in your browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.