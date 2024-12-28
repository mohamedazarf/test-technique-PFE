// const express = require('express');
// const sql = require('mssql');

// const app = express();
// const port = 3000;

// Database configuration
// const dbConfig = {
//     user: 'admin',      // SQL Server username
//     password: '',  // SQL Server password
//     server: 'localhost',        // Database server (could be localhost or IP)
//     database: 'The Bridge',  // Name of your database
//     options: {
//         encrypt: true,         // Use encryption if needed (recommended)
//         trustServerCertificate: true  // Trust the server certificate (useful for local dev)
//     }
// };
// const dbConfig = {
//     server: 'DESKTOP-SPH58N9', // Your server name
//     database: 'The Bridge', // Your database name
//     options: {
//       encrypt: true, // Use encryption if needed (recommended)
//       trustServerCertificate: true // Trust the server certificate (useful for self-signed certs)
//     },
//     authentication: {
//       type: 'default', // Use Windows Authentication
//     }
//   };
  
// Test the database connection
// sql.connect(dbConfig)
//     .then(() => {
//         console.log('Connected to the SQL Server database!');
//     })
//     .catch(err => {
//         console.error('Error connecting to database:', err);
//     });

// // Basic Route Example
// app.get('/', (req, res) => {
//     res.send('Hello, Express.js!');
// });

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

// // Route to create a new course
// app.post('/courses', async (req, res) => {
//     const { title, description, price, imagePath } = req.body;

//     try {
//         const result = await sql.query`INSERT INTO Courses (Title, Description, Price, ImagePath) 
//                                        VALUES (${title}, ${description}, ${price}, ${imagePath})`;
//         res.status(201).send({ message: 'Course created successfully', courseId: result.recordset[0].CourseID });
//     } catch (err) {
//         console.error('Error inserting data:', err);
//         res.status(500).send('Error creating course');
//     }
// });

// // Route to get all courses
// app.get('/courses', async (req, res) => {
//     try {
//         const result = await sql.query`SELECT * FROM Courses`;
//         res.status(200).send(result.recordset);
//     } catch (err) {
//         console.error('Error fetching data:', err);
//         res.status(500).send('Error retrieving courses');
//     }
// });

// const {createPool} = require('mssql');

// const pool = createPool({
//     user: 'admin',
//     password: '',       
//     server: 'DESKTOP-SPH58N9',        
//     database: 'The Bridge', 
//     connectionLimit: 1 
// });
// pool.query(`SELECT * FROM Courses`).then(result => console.log(result.recordset));

// const sql = require('mssql');

// Configuration for SQL Server
// const config = {
//     user: 'admin',
//     password: '', // Provide the password
//     server: 'DESKTOP-SPH58N9', // Use server name or IP address
//     database: 'The Bridge',
//     options: {
//         encrypt: false, // Use true if connecting to Azure
//         trustServerCertificate: true, // Required for self-signed certificates
//     },
//     pool: {
//         max: 1, // Maximum number of connections in the pool
//         min: 0,
//         idleTimeoutMillis: 30000 // Connection timeout
//     }
// };

// // Connecting to SQL Server and running a query
// async function fetchCourses() {
//     try {
//         const pool = await sql.connect(config);
//         const result = await pool.request().query('SELECT * FROM Courses');
//         console.log(result.recordset);
//         sql.close();
//     } catch (err) {
//         console.error('Error fetching data:', err);
//         sql.close();
//     }
// }

// // Execute the function
// fetchCourses();

const dbConfig = {
    server: 'DESKTOP-SPH58N9', // Use the server name shown in SSMS
    database: 'The Bridge',    // Your database name
    options: {
        encrypt: false, // Set to true if required
        trustServerCertificate: true, // Accept self-signed certificates
    },
    authentication: {
        type: 'ntlm', // Windows Authentication type
        options: {
            domain: '', // Leave empty for local machine authentication
            userName: '', // No username needed for local authentication
            password: '', // No password needed for local authentication
        },
    },
};

const sql = require('mssql');

async function testConnection() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Connected to the database!');
        const result = await pool.request().query('SELECT * FROM Courses'); // Replace with your query
        console.log(result.recordset);
        pool.close();
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

testConnection();
