const express = require('express');
const sql = require('mssql');
const app = express();
const port = 3000;

const config = {
    server: 'localhost',
    database: 'WebTest',
    options: {
        trustedConnection: true
    }
};

app.get('/getText', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT TOP 1 StringData FROM TestString');
        
        sql.close();
        res.send(result.recordset[0].StringData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
