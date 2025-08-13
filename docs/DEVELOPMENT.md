# EduTeams Development Guide

This document provides information for developers working on the EduTeams platform.

## Project Overview

EduTeams is an educational platform built with:

- Node.js and Express.js for the backend
- EJS for templating
- MySQL for the database
- Sequelize ORM for database interactions
- CSS3 and vanilla JavaScript for the frontend

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- MySQL database
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd eduteams
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   - Create a MySQL database
   - Update the `.env` file with your database credentials

4. Run database migrations:

   ```bash
   node migrate.js
   ```

5. Start the development server:
   ```bash
   npm start
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_database_name
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
```

## Project Structure

```
eduteams/
├── bin/                 # Server startup scripts
├── config/              # Database configuration
├── controllers/        # Request handlers
├── middleware/         # Authentication, validation, and role-based access
├── models/             # Database models (Sequelize)
├── public/              # Static assets (CSS, JS, images, uploads)
├── routes/             # API route definitions
├── views/               # EJS templates
├── docs/                # Documentation files
├── .env                 # Environment variables
├── app.js               # Main application file
├── migrate.js           # Database migration script
└── package.json         # Project dependencies
```

## Development Workflow

### Adding New Features

1. Create a new branch for your feature:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Implement your changes

3. Write tests if applicable

4. Commit your changes:

   ```bash
   git commit -m "Add feature description"
   ```

5. Push to your branch:

   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a pull request

### Code Style

- Follow the existing code style in the project
- Use 2 spaces for indentation
- Use camelCase for JavaScript variables and functions
- Use PascalCase for JavaScript classes
- Use UPPER_SNAKE_CASE for constants
- Use kebab-case for file names

### Database Migrations

When making changes to the database schema:

1. Update the model files in `models/`
2. Create a new migration file in `migrations/`
3. Run the migration:
   ```bash
   node migrate.js
   ```

## Testing

### Running Tests

To run the test suite:

```bash
npm test
```

### Writing Tests

Tests are written using Jest. Place test files in the `__tests__` directory with the naming convention `*.test.js`.

## API Development

### Adding New Endpoints

1. Create a controller function in the appropriate file in `controllers/`
2. Add the route in the appropriate file in `routes/`
3. Add any necessary middleware
4. Update the API documentation in `docs/API.md`

### Error Handling

All API endpoints should handle errors gracefully and return appropriate HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Frontend Development

### Templates

EJS templates are located in the `views/` directory. The structure follows:

- `views/partials/`: Reusable template components
- `views/auth/`: Authentication pages
- `views/courses/`: Course-related pages
- `views/lessons/`: Lesson-related pages
- `views/teams/`: Team-related pages
- `views/enrollments/`: Enrollment-related pages
- `views/dashboard/`: Dashboard pages

### CSS

CSS is located in `public/style.css`. The file is organized by:

- Reset and base styles
- Header styles
- Main content styles
- Form styles
- Dashboard styles
- Team styles
- Course styles
- Lesson styles
- Home page styles
- Footer styles
- Responsive design
- RTL Support
- Progress bar styles
- Additional UI components
- Card styles
- Action buttons
- Video container

### JavaScript

JavaScript files are located in `public/js/`:

- `app.js`: Main application JavaScript
- `layout.js`: Layout-related JavaScript
- `login.js`: Login page JavaScript
- `dashboard.js`: Dashboard page JavaScript
- `course.js`: Course-related JavaScript
- `lessons.js`: Lesson-related JavaScript
- `enrollments.js`: Enrollment-related JavaScript

## Database Development

### Models

Database models are defined in `models/` using Sequelize. Each model file exports a function that takes `sequelize` and `DataTypes` as parameters.

### Relationships

Relationships between models are defined in `models/index.js`. When adding new models, ensure relationships are properly defined.

### Migrations

Database migrations are handled by `migrate.js`. This script:

1. Connects to the database
2. Syncs models with the database
3. Handles any necessary data transformations

## Security

### Authentication

Authentication is handled using JWT tokens. Middleware functions are provided in `middleware/auth.js`.

### Authorization

Role-based access control is implemented with middleware in `middleware/role.js`.

### Input Validation

Input validation is handled using Joi. Validation schemas are defined in `middleware/validator.js`.

## Deployment

### Production Setup

1. Set environment variables for production
2. Run database migrations
3. Start the server with:
   ```bash
   NODE_ENV=production node app.js
   ```

### Docker Deployment

A Dockerfile is provided for containerized deployment.

## Troubleshooting

### Common Issues

1. **Database Connection Errors**

   - Check your `.env` file for correct database credentials
   - Ensure MySQL is running
   - Verify database exists and user has proper permissions

2. **JWT Authentication Errors**

   - Check `JWT_SECRET` environment variable
   - Ensure tokens are being sent with requests
   - Verify token expiration settings

3. **File Upload Issues**
   - Check file size limits in middleware
   - Verify upload directory permissions
   - Ensure file type restrictions are correct

### Debugging

Use the following debugging techniques:

- Add console.log statements to trace execution
- Use debugger statements for breakpoints
- Check server logs for error messages
- Use database client to inspect data directly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## Resources

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [EJS Documentation](https://ejs.co/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
