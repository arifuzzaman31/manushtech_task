# Setting up a PostgreSQL and Node.js Project

This guide will help you set up a Node.js Backend project with a PostgreSQL database.

## Prerequisites

* **Node.js:** Ensure you have Node.js installed on your system.
* **PostgreSQL:** Install PostgreSQL on your machine.
* **pg (Node.js client):** This is a popular PostgreSQL client for Node.js. We'll install it using npm.

## Project Setup

1.  **Clone the repository and navigate to the backend:**

    ```bash
    git clone [https://github.com/arifuzzaman31/manushtech_task.git](https://github.com/arifuzzaman31/manushtech_task.git)
    cd manushtech_task/backend/
    ```

2.  **Initialize a Node.js Project:**

    ```
    npm install
    ```

## Configure the Database Connection

You'll need to create a file to store your database connection string. It is common to use a `.env` file for this, and the `dotenv` package to load it.

1.  **Create a Database:**

    * Open the PostgreSQL command-line interface (e.g., `psql`) or a GUI tool like pgAdmin.
    * Create a new database. For example:

        ```sql
        CREATE DATABASE manushtech_pgdb;
        ```

2.  **Create a `.env` file:**

    ```
    nano .env
    ```

3.  **Add the Connection String to `.env`:**

    ```
    DATABASE_URL="postgresql://user:password@localhost:5432/manushtech_pgdb"
    ```

    * **Important:** Replace the values with your actual PostgreSQL credentials.

## Explanation of the Connection String

The connection string you provided, `DATABASE_URL="postgresql://postgres:7575@localhost:5432/manushtech_pgdb"`, follows this general format:

```
postgresql://[user]:[password]@[host]:[port]/[database]
```

4.  **Then, run the following commands:**

```bash
npm install
npx prisma migrate dev --name initial
npx prisma generate
npm run seed
npm run dev
```

# Frontend Setup

# 1. install npm:
```
cd manushtech_task/frontend/
npm install
or
npm install -f
npm run dev
```

# 2. Login Creadentials:
```
email: abir@manush.tech
password: adminpassword
```