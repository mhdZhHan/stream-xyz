# Video Sharing App

A React Native application for sharing AI-generated videos, using Appwrite for user authentication and storage.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Introduction

This project is a mobile application developed with React Native, aimed at providing a platform for users to upload, share, and manage AI-generated videos. The application leverages Appwrite for user authentication, database management, and file storage.

## Features

- User authentication (sign up, login, logout)
- Video and thumbnail upload
- Video listing and searching
- User profile management
- Secure storage of media files
- AI prompt support for video creation

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/mhdZhHan/stream-xyz.git
   cd stream-xyz
   ```
3. Install dependencies:

   ```bash
   yarn install
   ```
5. Set up environment variables:

Create a `.env` file in the root directory and add your Appwrite project credentials:

   ```bash
   APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   APPWRITE_PROJECT_ID=your_project_id
   APPWRITE_DATABASE_ID=your_database_id
   APPWRITE_USER_COLLECTION_ID=your_user_collection_id
   APPWRITE_VIDEO_COLLECTION_ID=your_video_collection_id
   APPWRITE_BUCKET_ID=your_bucket_id
   ```
4. Run the application:
  ```bash
  yarn start
  ```
## Usage

### Authentication

Users can sign up and log in using their email and password. The app uses Appwrite's `Account` service to handle user authentication.

### Uploading Media

Users can upload videos and thumbnails using the Expo Document Picker. The media files are stored in Appwrite's storage buckets.

### Listing and Searching Videos

Users can view a list of all uploaded videos and use the search functionality to find specific videos based on their titles.

### Profile Management

Users can manage their profiles, including updating their username and avatar.

## Technologies Used

- React Native
- Expo
- Appwrite
- TypeScript

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request
