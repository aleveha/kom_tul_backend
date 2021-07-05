const {Pool} = require('pg');
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT
});

const checkUser = (body) => {
    const {login, password} = body;
    return new Promise(((resolve, reject) => {
        pool.query(
            `select * from accounts where login='${login}';`,
            (error, result) => {
                if (error) reject(error);
                if (result !== undefined && result.rows !== undefined && result.rows.length > 0) {
                    bcrypt.compare(password, result.rows[0].password, function(err, result) {
                        console.log(result);
                        resolve(result);
                    });
                } else {
                    resolve(false);
                }
            }
        )
    }));
}

const addUser = (body) => {
    const {login, password} = body;
    return new Promise(((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                pool.query(
                    `insert into accounts(login, password) values('${login}', '${hash}');`,
                    (error, result) => {
                        if (error) reject(error);
                        resolve(true);
                    }
                );
            });
        });
    }));
}

module.exports = {
    checkUser,
    addUser
}