# Fitness Club Website

A complete fitness club website with user authentication, database connectivity, and modern UI.

## Features

- User registration and login system
- Database connectivity with MySQL
- Session management
- Responsive design
- Protected routes for authenticated users
- Modern UI with video backgrounds

## Setup Instructions

### 1. Database Setup

1. Make sure MySQL is installed and running on your system
2. Open MySQL command line or MySQL Workbench
3. Run the database setup script:
   ```sql
   source setup_database.sql
   ```
   Or copy and paste the contents of `setup_database.sql` into your MySQL client

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Database Connection

Edit `db.js` and update the database credentials:
```javascript
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',           // Your MySQL username
    password: '@hudabhat891', // Your MySQL password
    database: 'userAuth'
});
```

### 4. Start the Server

```bash
npm start
```

The server will start at `http://localhost:5500`

## Usage

1. **Sign Up**: Visit `http://localhost:5500/signup.html` to create a new account
2. **Login**: Visit `http://localhost:5500/login.html` to login with your credentials
3. **Home Page**: After successful login, you'll be redirected to the homepage

## File Structure

- `server.js` - Main server file with authentication routes
- `db.js` - Database connection configuration
- `auth.js` - Client-side authentication management
- `login.html` - Login page
- `signup.html` - Registration page
- `homepage.html` - Main homepage
- `index.html` - Landing page
- `setup_database.sql` - Database setup script

## Authentication Flow

1. User signs up → Data stored in MySQL database
2. User logs in → Credentials verified against database
3. Successful login → Session created, redirected to homepage
4. Failed login → Error message displayed
5. Logout → Session destroyed, redirected to homepage

## Troubleshooting

- **Database Connection Error**: Check MySQL credentials in `db.js`
- **Signup Error**: Ensure database and table are created using `setup_database.sql`
- **Server Not Starting**: Check if port 5500 is available or change in `server.js`
- **Static Files Not Loading**: Ensure all HTML/CSS/JS files are in the same directory as `server.js`