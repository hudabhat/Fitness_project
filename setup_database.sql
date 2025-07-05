-- Database setup script for Fitness Club
-- Run this script in MySQL to create the database and table

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS userAuth;
USE userAuth;

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a test user (optional)
-- INSERT INTO users (name, email, phone, password) VALUES ('Test User', 'test@example.com', '1234567890', 'password123'); 