# Contact-Management-System
# Contact Management System

## Overview
The **Contact Management System** is a full-stack web application designed for managing personal and professional contacts. It provides functionalities to perform CRUD (Create, Read, Update, Delete) operations on contacts. The project has a user-friendly interface and is built using modern web development technologies, including Node.js for the backend, SQLite for the database, and HTML, CSS, and JavaScript for the frontend.

---

## Features
- **Add Contacts**: Add contact details including Name, Email, and Phone Number.
- **View Contacts**: Displays a list of saved contacts in a table format.
- **Edit Contacts**: Update the details of existing contacts.
- **Delete Contacts**: Remove unwanted contacts from the list.
- **Responsive Design**: Works seamlessly on different screen sizes.

---

## Technology Stack
### **Frontend**
- **HTML**: For structuring the user interface.
- **CSS**: For styling and making the application visually appealing.
- **JavaScript**: For client-side interactivity and AJAX requests.

### **Backend**
- **Node.js**: For creating the server and handling API requests.
- **Express.js**: For routing and middleware.

### **Database**
- **SQLite**: For storing contact information.

---

## Project Structure
ContactManagementSystem/ │ ├── public/ │ ├── index.html # Main frontend HTML file │ ├── style.css # Styling for the user interface │ ├── script.js # Client-side JavaScript │ ├── server.js # Backend server script ├── contacts.db # SQLite database ├── README.md # Documentation ├── package.json # Node.js package configuration

---

## ER Diagram
The Entity-Relationship (ER) diagram below represents the database structure for the Contact Management System:

![ER Diagram](https://github.com/Sufiyansiddiqui123/Contact-Management-System/blob/main/er-diagram-contact-management.png)

---

## Installation and Setup

### Prerequisites
- Node.js installed on your system.
- A code editor like Visual Studio Code.
- Basic understanding of JavaScript and Node.js.

### Steps to Run the Project
1. **Clone the Repository**  
   ```bash
   git clone <repository-url>
   cd ContactManagementSystem
2. **Run the project**
   ```bash
   node server.js
