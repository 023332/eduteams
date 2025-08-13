# EduTeams API Documentation

This document provides detailed information about the EduTeams REST API.

## Authentication

All API endpoints (except authentication endpoints) require authentication using JWT tokens.

### Register

```
POST /auth/register
```

Registers a new user.

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "student|teacher"
}
```

**Response:**

```json
{
  "token": "jwt_token"
}
```

### Login

```
POST /auth/login
```

Authenticates a user and returns a JWT token.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "token": "jwt_token"
}
```

## Teams

### Create Team

```
POST /api/teams
```

Creates a new team.

**Request Body:**

```json
{
  "name": "string",
  "description": "string"
}
```

**Response:**

```json
{
  "id": "integer",
  "name": "string",
  "description": "string",
  "ownerId": "integer",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Get User's Teams

```
GET /api/teams
```

Retrieves all teams the user is a member of.

**Response:**

```json
[
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "ownerId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### Get Team Details

```
GET /api/teams/:id
```

Retrieves detailed information about a specific team.

**Response:**

```json
{
  "id": "integer",
  "name": "string",
  "description": "string",
  "ownerId": "integer",
  "createdAt": "date",
  "updatedAt": "date",
  "members": [
    {
      "id": "integer",
      "name": "string",
      "email": "string",
      "role": "string"
    }
  ],
  "courses": [
    {
      "id": "integer",
      "title": "string",
      "description": "string"
    }
  ]
}
```

### Update Team

```
PUT /api/teams/:id
```

Updates a team's information.

**Request Body:**

```json
{
  "name": "string",
  "description": "string"
}
```

**Response:**

```json
{
  "id": "integer",
  "name": "string",
  "description": "string",
  "ownerId": "integer",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Delete Team

```
DELETE /api/teams/:id
```

Deletes a team.

**Response:**

```json
{
  "message": "Team deleted successfully"
}
```

## Courses

### Create Course

```
POST /api/courses
```

Creates a new course.

**Request Body:**

```json
{
  "title": "string",
  "description": "string",
  "teamId": "integer",
  "startDate": "date",
  "endDate": "date"
}
```

**Response:**

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "teamId": "integer",
  "createdBy": "integer",
  "startDate": "date",
  "endDate": "date",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Get Courses by Team

```
GET /api/courses/team/:teamId
```

Retrieves all courses for a specific team.

**Response:**

```json
[
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "teamId": "integer",
    "createdBy": "integer",
    "startDate": "date",
    "endDate": "date",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### Get Course Details

```
GET /api/courses/:id
```

Retrieves detailed information about a specific course.

**Response:**

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "teamId": "integer",
  "createdBy": "integer",
  "startDate": "date",
  "endDate": "date",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Update Course

```
PUT /api/courses/:id
```

Updates a course's information.

**Request Body:**

```json
{
  "title": "string",
  "description": "string",
  "teamId": "integer",
  "startDate": "date",
  "endDate": "date"
}
```

**Response:**

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "teamId": "integer",
  "createdBy": "integer",
  "startDate": "date",
  "endDate": "date",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Delete Course

```
DELETE /api/courses/:id
```

Deletes a course.

**Response:**

```json
{
  "message": "Course deleted successfully"
}
```

## Lessons

### Create Lesson

```
POST /api/lessons
```

Creates a new lesson.

**Request Body:**

```json
{
  "title": "string",
  "content": "string",
  "courseId": "integer",
  "order": "integer",
  "duration": "integer",
  "videoUrl": "string"
}
```

**Response:**

```json
{
  "id": "integer",
  "title": "string",
  "content": "string",
  "fileUrl": "string",
  "courseId": "integer",
  "order": "integer",
  "duration": "integer",
  "videoUrl": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Upload Lesson File

```
POST /api/lessons/upload
```

Uploads a file for a lesson.

**Request Body:**
Form data with file input.

**Response:**

```json
{
  "message": "File uploaded successfully"
}
```

### Get Lessons by Course

```
GET /api/lessons/course/:id
```

Retrieves all lessons for a specific course.

**Response:**

```json
[
  {
    "id": "integer",
    "title": "string",
    "content": "string",
    "fileUrl": "string",
    "courseId": "integer",
    "order": "integer",
    "duration": "integer",
    "videoUrl": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### Get Lesson Details

```
GET /api/lessons/:id
```

Retrieves detailed information about a specific lesson.

**Response:**

```json
{
  "id": "integer",
  "title": "string",
  "content": "string",
  "fileUrl": "string",
  "courseId": "integer",
  "order": "integer",
  "duration": "integer",
  "videoUrl": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Update Lesson

```
PUT /api/lessons/:id
```

Updates a lesson's information.

**Request Body:**

```json
{
  "title": "string",
  "content": "string",
  "courseId": "integer",
  "order": "integer",
  "duration": "integer",
  "videoUrl": "string"
}
```

**Response:**

```json
{
  "id": "integer",
  "title": "string",
  "content": "string",
  "fileUrl": "string",
  "courseId": "integer",
  "order": "integer",
  "duration": "integer",
  "videoUrl": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Delete Lesson

```
DELETE /api/lessons/:id
```

Deletes a lesson.

**Response:**

```json
{
  "message": "Lesson deleted successfully"
}
```

## Enrollments

### Enroll in Course

```
POST /api/enrollments
```

Enrolls the current user in a course.

**Request Body:**

```json
{
  "courseId": "integer"
}
```

**Response:**

```json
{
  "id": "integer",
  "userId": "integer",
  "courseId": "integer",
  "enrollmentDate": "date",
  "completionDate": "date",
  "progress": "float",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Get User's Enrollments

```
GET /api/enrollments
```

Retrieves all enrollments for the current user.

**Response:**

```json
[
  {
    "id": "integer",
    "userId": "integer",
    "courseId": "integer",
    "enrollmentDate": "date",
    "completionDate": "date",
    "progress": "float",
    "createdAt": "date",
    "updatedAt": "date",
    "Course": {
      "id": "integer",
      "title": "string",
      "User": {
        "id": "integer",
        "name": "string"
      }
    }
  }
]
```

### Get Course Enrollments

```
GET /api/enrollments/course/:courseId
```

Retrieves all enrollments for a specific course.

**Response:**

```json
[
  {
    "id": "integer",
    "userId": "integer",
    "courseId": "integer",
    "enrollmentDate": "date",
    "completionDate": "date",
    "progress": "float",
    "createdAt": "date",
    "updatedAt": "date",
    "User": {
      "id": "integer",
      "name": "string",
      "email": "string"
    }
  }
]
```

### Update Enrollment Progress

```
PUT /api/enrollments/:id
```

Updates the progress of an enrollment.

**Request Body:**

```json
{
  "progress": "float"
}
```

**Response:**

```json
{
  "id": "integer",
  "userId": "integer",
  "courseId": "integer",
  "enrollmentDate": "date",
  "completionDate": "date",
  "progress": "float",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Unenroll from Course

```
DELETE /api/enrollments/:id
```

Unenrolls the user from a course.

**Response:**

```json
{
  "message": "Successfully unenrolled from course"
}
```
