# Node.js Authentication System

This project is a complete authentication system built using Node.js, Express, and MongoDB, designed as a starter code for creating any new application. It includes functionalities like email sign up, sign in, sign out, password reset, and Google social authentication. The system also includes extra features such as forgot password and reCAPTCHA for enhanced security.

## Features
- Email Sign Up
- Email Sign In
- Sign Out
- Password Reset after Sign In
- Password encryption stored in the database
- Google Login/Sign Up (Social Authentication)
- Forgot Password (with reset link or random password sent via email)
- Notifications for:
  - Unmatching passwords during sign up
  - Incorrect password during sign in
- reCAPTCHA on both sign up and log in pages (Extra Points)
- Sending emails using parallel jobs (Super Extra Points)

## Folder Structure



## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running
- Google OAuth credentials

### Installation
1. Clone the repository:
    ```bash
    git clone [https://github.com/your-username/your-repo.git](https://github.com/ajitkumarpal1/autWithFruntEnd)
    ```
2. Navigate to the project directory:
    ```bash
    cd your-repo
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the following variables with your configuration:
      ```
      PORT=3000
      MONGO_URI=your_mongo_db_uri
      SESSION_SECRET=your_session_secret
      GOOGLE_CLIENT_ID=your_google_client_id
      GOOGLE_CLIENT_SECRET=your_google_client_secret
      EMAIL_HOST=your_email_host
      EMAIL_PORT=your_email_port
      EMAIL_USER=your_email_user
      EMAIL_PASS=your_email_password
      ```

### Running the Application
1. Start the server:
    ```bash
    npm start
    ```
2. Open your browser and navigate to `http://localhost:9000`.

### Folder Structure Explanation

- **config**: Contains configuration files for database connections, passport strategies, etc.
- **controllers**: Handles the logic for different routes and user interactions.
- **middlewares**: Contains middleware functions for authentication, validation, etc.
- **models**: Defines the database schemas using Mongoose.
- **routes**: Defines the application routes and links them to the appropriate controllers.
- **utils**: Utility functions and helpers.
- **views**: EJS templates for rendering HTML pages.

### Implemented Functionalities

#### Sign Up with Email
- Page: `user_sign_up.ejs`
- Validates and creates a new user with encrypted password.
- Displays notifications for unmatching passwords.

#### Sign In
- Page: `user_sign_in.ejs`
- Authenticates the user and redirects to home page.
- Displays notifications for incorrect password.

#### Sign Out
- Signs the user out and redirects to sign in page.

#### Reset Password after Sign In
- Allows authenticated users to reset their password.
- Encrypts the new password and updates in the database.

#### Google Login/Signup
- Uses Passport.js for Google OAuth authentication.

#### Forgot Password
- Page: `forgoten_password.ejs`
- Sends a reset password link via email which expires after a certain time.

### Extra Features
- Implemented reCAPTCHA for additional security on sign up and sign in pages.
- Sending emails using parallel jobs to improve performance.

### Deployment
- Ensure all environment variables are set correctly.
- Deploy the application on a platform like Heroku, AWS, or any other cloud provider.



## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries or feedback, please contact [your-email@example.com].
