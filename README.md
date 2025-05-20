# E-Commerce-Website
A full-featured eCommerce site built with React and Firebase. Supports email/password and Google sign-in. New Google users are redirected to complete their profile; existing users go to the homepage. Includes Redux-powered cart and secure user data handling via Firebase.
# 🛒 React + Firebase eCommerce Website

A full-featured eCommerce web application built using **React** and **Firebase**. It includes user authentication, profile management, and a shopping cart system powered by Redux Toolkit.

## 🚀 Features

- **Authentication**
  - Sign up with user details First Name, Last Name, Email, Phone Number, and Password
  - Google Sign-In support via Firebase
  - Redirects first-time Google users to complete their profile
  - Existing users go directly to the homepage

- **User Data Handling**
  - Stores user details in Firebase Realtime Database or Firestore
  - Conditional routing based on user profile completeness

- **Cart System**
  - Add to Cart functionality
  - Cart state managed with **Redux Toolkit**
  - Supports item quantity changes and removal

## 🛠️ Technologies Used
HTML, CSS, JS
- **Frontend**: React
- **State Management**: Redux Toolkit
- **Backend/DB**: Firebase (Authentication + Firestore/Realtime Database)
