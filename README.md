# E-Commerce-using-React-and-TS

# Overview
The E-Commerce System is a web application designed to facilitate online shopping, allowing users to browse products, add items to their cart, and complete purchases. This project is built using PHP, HTML, CSS, and JavaScript, and it runs on the XAMPP server.

# Features
1. User Authentication – Secure login & registration for customers and admins.
2. Product Management – Admins can add, update, and delete products.
3. Shopping Cart – Add, remove, and manage items before checkout.
4. Order Processing – Place orders, track status, and view history.
5. Payment Integration – Multiple payment methods supported.
6. User-Friendly Interface – Clean, intuitive HTML/CSS design.

# Technologies Used
1. Backend: PHP
2. Frontend: HTML, CSS, JavaScript
3. Database: MySQL (managed via phpMyAdmin)
4. Server Environment: XAMPP

# Prerequisites
1. Before you begin, ensure you have the following installed on your local machine:
    - XAMPP: A free and open-source cross-platform web server solution stack package. This includes Apache, MySQL, and PHP.
    - Download XAMPP
    - A Web Browser: To access the application (e.g., Chrome, Firefox, Edge).

# How to Download and Set Up the Project
1. Clone the repository:
     - Open your Git Bash or terminal and run the following command:
       
       ```bash
         git clone https://github.com/yourusername/e-commerce-system.git
       ```
     - Replace yourusername with your actual GitHub username if you've forked or created your own repository.
       
2. Navigate to the project directory:
     - Change your current directory to the cloned project:
       
       ```bash
         cd e-commerce-system
       ```
       
3. Move Project to XAMPP htdocs
     - Copy the entire e-commerce-system folder into your XAMPP htdocs directory.
       
        - Windows: C:\xampp\htdocs\
        - macOS: /Applications/XAMPP/htdocs/
          
4. Start Apache and MySQL Services
   - Open the XAMPP Control Panel and click the Start buttons next to Apache and MySQL.

5. Set Up the Database
   - Access phpMyAdmin: Open your web browser and go to http://localhost/phpmyadmin.

      ##### Create a New Database:
        - Click on the Databases tab.
        - In the "Create database" section, enter e_commerce as the database name.
        - Click Create.
        - Import the SQL File:
        - Click on the newly created database e_commerce in the left sidebar.
        - Click on the Import tab in the top navigation bar.
        - Click Choose File and navigate to the database directory inside your e-commerce-system project folder.
        - Select the e-commerce.sql file.
        - Scroll down and click the Go button to execute the import.
  
6. Verify Tables
After a successful import, you should see the following tables created under the e_commerce database in phpMyAdmin:
    - users
    - products
    - orders
    - order_items
    - (Add any other tables relevant to your project)
  
Example users table structure: 

| Column Name | Data Type                | Constraints                   | Description                      |
|:------------|:-------------------------|:------------------------------|:---------------------------------|
| user_id     | INT                      | AUTO_INCREMENT PRIMARY KEY     | Unique identifier for the user.  |
| username    | VARCHAR(50)              | NOT NULL                       | User's chosen username.          |
| password    | VARCHAR(255)             | NOT NULL                       | Hashed password for security.    |
| email       | VARCHAR(100)             | NOT NULL                       | User's email address.            |
| role        | ENUM('customer', 'admin')| NOT NULL                       | User's role in the system.       |


# How the Project Works
- The application provides a comprehensive workflow for online shopping:

    - Login Page: Users are directed to the login page upon accessing the application. Existing users can enter their credentials to gain access.
    - Registration Page: New users can register for an account, providing necessary details.
    - Product Catalog: Users can browse through a list of available products, view details, and add items to their cart.
    - Shopping Cart: Users can view their selected items, update quantities, or remove items before proceeding to checkout.
    - Checkout Process: Users can enter shipping information, select payment methods, and place their orders.
    - Order History: Users can view their past orders and track the status of current orders.
    - Accessing the Application
    - Once all the setup steps are complete, open your web browser and go to:
      
       ```bash
          http://localhost/e-commerce-system/
       ```
       
(Or the specific entry point file, e.g., http://localhost/e-commerce-system/index.php)

# Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:
- Fork the repository.
- Create a new branch (git checkout -b feature/YourFeature).
- Make your changes.
- Commit your changes (git commit -m 'Add some feature').
- Push to the branch (git push origin feature/YourFeature).
- Open a Pull Request.
