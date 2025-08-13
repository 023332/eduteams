# EduTeams Database Schema

This document describes the database schema for the EduTeams platform.

## Overview

EduTeams uses a MySQL database with the following main entities:

- Users (students and teachers)
- Teams (groups for collaboration)
- Courses (educational content)
- Lessons (individual learning units)
- Enrollments (student-course relationships)
- Team Memberships (user-team relationships)

## Entity Relationship Diagram

```
Users ────────┬─────────────────────── Teams
              │                         │
              │                         │
              ├──────────────────────►  │
              │                         │
              │                         │
              │                         │
              │                         │
Enrollments ◄─┤                         │
              │                         │
              │                         │
Courses ◄─────┤                         │
              │                         │
              │                         │
Lessons ◄─────┤                         │
              │                         │
              │                         │
TeamMemberships ◄───────────────────────┘
```

## Tables

### Users

Stores information about students and teachers.

**Columns:**

- `id` (INTEGER, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier
- `name` (STRING) - User's full name
- `email` (STRING, UNIQUE) - User's email address
- `password` (STRING) - Hashed password
- `role` (STRING) - User role ('student' or 'teacher')
- `profilePicture` (STRING, NULLABLE) - URL to profile picture
- `bio` (TEXT, NULLABLE) - User biography
- `lastLogin` (DATE, NULLABLE) - Timestamp of last login
- `createdAt` (DATE) - Record creation timestamp
- `updatedAt` (DATE) - Record update timestamp

### Teams

Stores information about collaborative groups.

**Columns:**

- `id` (INTEGER, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier
- `name` (STRING) - Team name
- `description` (TEXT, NULLABLE) - Team description
- `ownerId` (INTEGER) - ID of the user who created the team (foreign key to Users)
- `createdAt` (DATE) - Record creation timestamp
- `updatedAt` (DATE) - Record update timestamp

### Courses

Stores information about educational courses.

**Columns:**

- `id` (INTEGER, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier
- `title` (STRING) - Course title
- `description` (TEXT, NULLABLE) - Course description
- `teamId` (INTEGER) - ID of the team this course belongs to (foreign key to Teams)
- `createdBy` (INTEGER) - ID of the user who created the course (foreign key to Users)
- `startDate` (DATE, NULLABLE) - Course start date
- `endDate` (DATE, NULLABLE) - Course end date
- `createdAt` (DATE) - Record creation timestamp
- `updatedAt` (DATE) - Record update timestamp

### Lessons

Stores information about individual lessons within courses.

**Columns:**

- `id` (INTEGER, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier
- `title` (STRING) - Lesson title
- `content` (TEXT, NULLABLE) - Lesson content (HTML/text)
- `fileUrl` (STRING, NULLABLE) - URL to uploaded materials
- `courseId` (INTEGER) - ID of the course this lesson belongs to (foreign key to Courses)
- `order` (INTEGER, NULLABLE) - Display order of lessons within a course
- `duration` (INTEGER, NULLABLE) - Estimated duration in minutes
- `videoUrl` (STRING, NULLABLE) - URL to video content
- `createdAt` (DATE) - Record creation timestamp
- `updatedAt` (DATE) - Record update timestamp

### Enrollments

Stores information about student-course relationships.

**Columns:**

- `id` (INTEGER, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier
- `userId` (INTEGER) - ID of the enrolled user (foreign key to Users)
- `courseId` (INTEGER) - ID of the enrolled course (foreign key to Courses)
- `enrollmentDate` (DATE) - Date of enrollment
- `completionDate` (DATE, NULLABLE) - Date of course completion
- `progress` (FLOAT) - Progress percentage (0-100)
- `createdAt` (DATE) - Record creation timestamp
- `updatedAt` (DATE) - Record update timestamp

### TeamMemberships

Stores information about user-team relationships.

**Columns:**

- `id` (INTEGER, PRIMARY KEY, AUTO_INCREMENT) - Unique identifier
- `userId` (INTEGER) - ID of the user (foreign key to Users)
- `teamId` (INTEGER) - ID of the team (foreign key to Teams)
- `createdAt` (DATE) - Record creation timestamp
- `updatedAt` (DATE) - Record update timestamp

## Relationships

### Users ↔ Teams

- Many-to-Many relationship through TeamMemberships table
- Users can belong to multiple teams
- Teams can have multiple users

### Users ↔ Teams (Ownership)

- One-to-Many relationship
- One user can own multiple teams
- Each team is owned by one user

### Teams ↔ Courses

- One-to-Many relationship
- One team can have multiple courses
- Each course belongs to one team

### Users ↔ Courses (Creation)

- One-to-Many relationship
- One user can create multiple courses
- Each course is created by one user

### Courses ↔ Lessons

- One-to-Many relationship
- One course can have multiple lessons
- Each lesson belongs to one course

### Users ↔ Enrollments

- One-to-Many relationship
- One user can have multiple enrollments
- Each enrollment belongs to one user

### Courses ↔ Enrollments

- One-to-Many relationship
- One course can have multiple enrollments
- Each enrollment belongs to one course

## Indexes

### Users

- Primary Key: `id`
- Unique: `email`

### Teams

- Primary Key: `id`
- Foreign Key: `ownerId` references `Users.id`

### Courses

- Primary Key: `id`
- Foreign Key: `teamId` references `Teams.id`
- Foreign Key: `createdBy` references `Users.id`

### Lessons

- Primary Key: `id`
- Foreign Key: `courseId` references `Courses.id`

### Enrollments

- Primary Key: `id`
- Foreign Key: `userId` references `Users.id`
- Foreign Key: `courseId` references `Courses.id`
- Unique: `userId` + `courseId` combination

### TeamMemberships

- Primary Key: `id`
- Foreign Key: `userId` references `Users.id`
- Foreign Key: `teamId` references `Teams.id`
- Unique: `userId` + `teamId` combination

## Constraints

### Users

- `email` must be unique
- `role` must be either 'student' or 'teacher'
- `password` is required
- `name` is required

### Teams

- `name` is required
- `ownerId` is required

### Courses

- `Now let me create a documentation file for the database schema:

<write_to_file>
<path>docs/DATABASE.md</path>
<content>

# EduTeams Database Schema

This document describes the database schema for the EduTeams platform.

## Overview

EduTeams uses a MySQL database with the following tables:

- Users
- Teams
- TeamMemberships
- Courses
- Lessons
- Enrollments

## Entity Relationship Diagram

```
Users
├── id (PK)
├── name
├── email
├── password
├── role
├── profilePicture
├── bio
├── lastLogin
├── createdAt
└── updatedAt

Teams
├── id (PK)
├── name
├── description
├── ownerId (FK: Users.id)
├── createdAt
└── updatedAt

TeamMemberships
├── id (PK)
├── userId (FK: Users.id)
├── teamId (FK: Teams.id)
├── createdAt
└── updatedAt

Courses
├── id (PK)
├── title
├── description
├── teamId (FK: Teams.id)
├── createdBy (FK: Users.id)
├── startDate
├── endDate
├── createdAt
└── updatedAt

Lessons
├── id (PK)
├── title
├── content
├── fileUrl
├── courseId (FK: Courses.id)
├── order
├── duration
├── videoUrl
├── createdAt
└── updatedAt

Enrollments
├── id (PK)
├── userId (FK: Users.id)
├── courseId (FK: Courses.id)
├── enrollmentDate
├── completionDate
├── progress
├── createdAt
└── updatedAt
```

## Table Definitions

### Users

Stores information about all users (students and teachers).

| Column         | Type    | Constraints                          | Description               |
| -------------- | ------- | ------------------------------------ | ------------------------- |
| id             | INTEGER | PRIMARY KEY, AUTO_INCREMENT          | Unique user identifier    |
| name           | STRING  | NOT NULL                             | User's full name          |
| email          | STRING  | NOT NULL, UNIQUE                     | User's email address      |
| password       | STRING  | NOT NULL                             | Hashed password           |
| role           | STRING  | NOT NULL, ENUM('student', 'teacher') | User's role               |
| profilePicture | STRING  | NULL                                 | URL to profile picture    |
| bio            | TEXT    | NULL                                 | User's biography          |
| lastLogin      | DATE    | NULL                                 | Timestamp of last login   |
| createdAt      | DATE    | NOT NULL                             | Record creation timestamp |
| updatedAt      | DATE    | NOT NULL                             | Record update timestamp   |

### Teams

Stores information about teams that users can join.

| Column      | Type    | Constraints                      | Description               |
| ----------- | ------- | -------------------------------- | ------------------------- |
| id          | INTEGER | PRIMARY KEY, AUTO_INCREMENT      | Unique team identifier    |
| name        | STRING  | NOT NULL                         | Team name                 |
| description | TEXT    | NULL                             | Team description          |
| ownerId     | INTEGER | NOT NULL, FOREIGN KEY (Users.id) | Team creator/owner        |
| createdAt   | DATE    | NOT NULL                         | Record creation timestamp |
| updatedAt   | DATE    | NOT NULL                         | Record update timestamp   |

### TeamMemberships

Junction table for many-to-many relationship between Users and Teams.

| Column    | Type    | Constraints                      | Description                  |
| --------- | ------- | -------------------------------- | ---------------------------- |
| id        | INTEGER | PRIMARY KEY, AUTO_INCREMENT      | Unique membership identifier |
| userId    | INTEGER | NOT NULL, FOREIGN KEY (Users.id) | User identifier              |
| teamId    | INTEGER | NOT NULL, FOREIGN KEY (Teams.id) | Team identifier              |
| createdAt | DATE    | NOT NULL                         | Record creation timestamp    |
| updatedAt | DATE    | NOT NULL                         | Record update timestamp      |

### Courses

Stores information about courses created by teachers.

| Column      | Type    | Constraints                      | Description                 |
| ----------- | ------- | -------------------------------- | --------------------------- |
| id          | INTEGER | PRIMARY KEY, AUTO_INCREMENT      | Unique course identifier    |
| title       | STRING  | NOT NULL                         | Course title                |
| description | TEXT    | NULL                             | Course description          |
| teamId      | INTEGER | NOT NULL, FOREIGN KEY (Teams.id) | Team this course belongs to |
| createdBy   | INTEGER | NOT NULL, FOREIGN KEY (Users.id) | User who created the course |
| startDate   | DATE    | NULL                             | Course start date           |
| endDate     | DATE    | NULL                             | Course end date             |
| createdAt   | DATE    | NOT NULL                         | Record creation timestamp   |
| updatedAt   | DATE    | NOT NULL                         | Record update timestamp     |

### Lessons

Stores information about lessons within courses.

| Column    | Type    | Constraints                        | Description                   |
| --------- | ------- | ---------------------------------- | ----------------------------- |
| id        | INTEGER | PRIMARY KEY, AUTO_INCREMENT        | Unique lesson identifier      |
| title     | STRING  | NOT NULL                           | Lesson title                  |
| content   | TEXT    | NULL                               | Lesson content (HTML)         |
| fileUrl   | STRING  | NULL                               | URL to lesson materials       |
| courseId  | INTEGER | NOT NULL, FOREIGN KEY (Courses.id) | Course this lesson belongs to |
| order     | INTEGER | NULL                               | Display order of lessons      |
| duration  | INTEGER | NULL                               | Lesson duration in minutes    |
| videoUrl  | STRING  | NULL                               | URL to video content          |
| createdAt | DATE    | NOT NULL                           | Record creation timestamp     |
| updatedAt | DATE    | NOT NULL                           | Record update timestamp       |

### Enrollments

Stores information about student enrollments in courses.

| Column         | Type    | Constraints                        | Description                  |
| -------------- | ------- | ---------------------------------- | ---------------------------- |
| id             | INTEGER | PRIMARY KEY, AUTO_INCREMENT        | Unique enrollment identifier |
| userId         | INTEGER | NOT NULL, FOREIGN KEY (Users.id)   | Student identifier           |
| courseId       | INTEGER | NOT NULL, FOREIGN KEY (Courses.id) | Course identifier            |
| enrollmentDate | DATE    | NOT NULL, DEFAULT NOW()            | Date of enrollment           |
| completionDate | DATE    | NULL                               | Date of course completion    |
| progress       | FLOAT   | NULL, MIN 0, MAX 100               | Progress percentage          |
| createdAt      | DATE    | NOT NULL                           | Record creation timestamp    |
| updatedAt      | DATE    | NOT NULL                           | Record update timestamp      |

## Relationships

### Users ↔ Teams

- Many-to-many relationship through TeamMemberships table
- Users can be members of multiple teams
- Teams can have multiple members

### Users ↔ Teams (Ownership)

- One-to-many relationship
- Users can own multiple teams
- Each team has one owner

### Teams ↔ Courses

- One-to-many relationship
- Teams can have multiple courses
- Each course belongs to one team

### Users ↔ Courses (Creation)

- One-to-many relationship
- Users can create multiple courses
- Each course is created by one user

### Courses ↔ Lessons

- One-to-many relationship
- Courses can have multiple lessons
- Each lesson belongs to one course

### Users ↔ Courses (Enrollment)

- Many-to-many relationship through Enrollments table
- Users can enroll in multiple courses
- Courses can have multiple enrolled students

## Indexes

The following indexes are recommended for optimal performance:

1. **Users**

   - Primary Key: id
   - Unique Index: email

2. **Teams**

   - Primary Key: id
   - Index: ownerId

3. **TeamMemberships**

   - Primary Key: id
   - Index: userId
   - Index: teamId
   - Composite Index: (userId, teamId)

4. **Courses**

   - Primary Key: id
   - Index: teamId
   - Index: createdBy

5. **Lessons**

   - Primary Key: id
   - Index: courseId
   - Index: order

6. **Enrollments**
   - Primary Key: id
   - Index: userId
   - Index: courseId
   - Composite Index: (userId, courseId)

## Constraints

### Foreign Key Constraints

All foreign key relationships are enforced with cascading rules:

- When a User is deleted, related TeamMemberships and Enrollments are deleted
- When a Team is deleted, related TeamMemberships, Courses, and Enrollments are deleted
- When a Course is deleted, related Lessons and Enrollments are deleted

### Check Constraints

1. **Users.role** must be either 'student' or 'teacher'
2. **Enrollments.progress** must be between 0 and 100
3. **Lessons.duration** must be a positive integer (if provided)

## Sample Queries

### Get all courses for a user

```sql
SELECT c.*
FROM Courses c
JOIN Teams t ON c.teamId = t.id
JOIN TeamMemberships tm ON t.id = tm.teamId
WHERE tm.userId = ?
```

### Get all students enrolled in a course

```sql
SELECT u.*
FROM Users u
JOIN Enrollments e ON u.id = e.userId
WHERE e.courseId = ?
```

### Get all lessons for a course ordered by position

```sql
SELECT *
FROM Lessons
WHERE courseId = ?
ORDER BY order ASC
```

### Get user's progress in a course

```sql
SELECT e.progress
FROM Enrollments e
WHERE e.userId = ? AND e.courseId = ?
```
