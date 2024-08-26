const express = require('express');
const mysql = require('mysql');
const path = require('path');
const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 配置 MySQL 数据库连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'student_data'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// 配置静态文件夹以服务前端文件
app.use(express.static(path.join(__dirname, 'public')));

// 处理成绩查询请求
app.post('/get-score', (req, res) => {
    const idCard = req.body.id_card;
    const query = 'SELECT name, score FROM student_scores WHERE id_card = ?';

    db.query(query, [idCard], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'ID Card not found' });
        }
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
