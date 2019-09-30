# FILE SHARING APP

File sharing application built on MEAN stack as part of training at VC.

# Instructions

1. clone repository -
   `git clone <repo-url>`

2. install dependencies for both client & server -
   `cd client` & `npm install`
   `cd server` & `npm install`

3. edit '.env' file to add the following variables

PORT - port for server;

CLIENT_URL - http://localhost: 4200 (default for angular dev server);

DB_CLOUD_URI - url for atlas instance;

SECRET - secret phrase for generating jwt tokens;

4. Launch Express backend in terminal -
   `cd server` & `npm run build` & `npm run dev`

5. Launch angular dev server in terminal -
   `cd client` & `ng serve`

## Structure

The project is divided into two directories,
'client' for the frontend & 'server' for the backend

## CLIENT

The frontend has been bootstrapped using Angular CLI v8.x.x

## SERVER

The backend has been built using Node v10.16.x
Data is being stored on MongoDB Atlas cluster instance.

# REQUIREMENTS

1. End User

- User Module

  - Register & Login - DONE
  - Email Verification - DONE

- Friend Module

  - Friends List - Backend DONE; TODO Frontend
  - Search registered user by name, email - Backend DONE; TODO Frontend
  - Add friends via requests - Backend DONE; TODO Intergration with frontend
  - Notifications for friend request - Backend DONE; TODO Intergration with frontend

- File Sharing Module

  - Uploading files (documents, images, videos) - DONE
  - Preview of uploading files - TODO
  - Share files with other users (friends) - TODO
  - View uploaded files - TODO
  - View files shared with the user - TODO
  - Notification to the reciever of file shares - Backend DONE; TODO Integration with frontend

2. Admin

- Admin Dashboard

  - Total number of users in the system - TODO
  - Show number of registrations over a time period - TODO
  - Number of concurrent users on the platform - TODO

- Static Content

  - About Us - TODO
  - Terms & Conditions - TODO

- User Management

  - Users list (/w sorting, pagination) - TODO
  - Block/unblock users - TODO

3. Addon

- Authentication using JWT - DONE
- Profile pic saved to db - DONE
- Themes - Not used, vanilla SCSS
- Modular code - Backend code modularized, refactoring required for frontend
- Testing - PENDING
- API documentation - PENDING
