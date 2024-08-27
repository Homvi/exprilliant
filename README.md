# Exprilliant

Exprilliant is a web app designed to make learning common expressions and idioms both fun and engaging. Developed as a passion project, the app combines **Laravel Inertia** and **React** to deliver a fast, secure, and easily maintainable experience.

## Features

- **Multi-language Support:** Choose your preferred language for both idioms and answers, offering a personalized learning experience.
- **Randomized Questions:** Idioms and potential answers are presented in a random order, adding an element of surprise to each round.
- **Score Tracking:** After five guesses, your score will be displayed. You can then either request five more idioms or switch languages.
- **User Contributions:** Registered users with verified emails can submit new idioms. Once approved by an admin, these idioms will be available in the game.

## Technology Stack

- **Backend:** Laravel with Inertia.js
- **Frontend:** React.js
- **Styling:** Tailwind CSS and DaisyUI
- **Animation:** Lottie React
- **Notifications:** React Toastify
- **Build Tool:** Vite

## Installation

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- PHP 8.1 or higher
- Composer
- Node.js & npm

### Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/exprilliant.git
    cd exprilliant
    ```

2. **Install PHP dependencies:**
    ```bash
    composer install
    ```

3. **Install Node.js dependencies:**
    ```bash
    npm install
    ```

4. **Set up environment variables:**
    - Copy the `.env.example` file to `.env`.
    - Update the following credentials in your `.env` file:
      - **Database Connection:**
        ```plaintext
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=your_database_name
        DB_USERNAME=your_database_username
        DB_PASSWORD=your_database_password
        ```
      - **Email Notifications:**
        ```plaintext
        MAIL_MAILER=smtp
        MAIL_HOST=smtp.your-email-provider.com
        MAIL_PORT=587
        MAIL_USERNAME=your_email@example.com
        MAIL_PASSWORD=your_email_password
        MAIL_ENCRYPTION=tls
        MAIL_FROM_ADDRESS=noreply@yourdomain.com
        MAIL_FROM_NAME="${APP_NAME}"
        ```

5. **Generate an application key:**
    ```bash
    php artisan key:generate
    ```

6. **Run migrations:**
    ```bash
    php artisan migrate
    ```

7. **Run the `ExpressionSeeder`:**
    ```bash
    php artisan db:seed --class=ExpressionSeeder
    ```

8. **Build the frontend assets:**
    ```bash
    npm run dev
    ```

9. **Start the development server:**
    ```bash
    php artisan serve
    ```

The application should now be running at `http://localhost:8000`.

## Usage

- **Play:** Visit the site, select your preferred language, and start learning idioms.
- **Contribute:** Sign up, verify your email, and submit new idioms to help grow the app's content.
- **Admin:** Approve or reject user-submitted idioms.

## Contributing

Contributions are welcome! If you have suggestions, bug reports, or want to add features, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Live Demo

Click the link below to give it a try:  
[Exprilliant - The App](https://exprilliant-7mis8.ondigitalocean.app/)

---

Thank you for checking out Exprilliant! Enjoy learning and improving your language skills.
