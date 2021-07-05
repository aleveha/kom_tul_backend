const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT
});

const getTopNews = () => {
    return new Promise(((resolve, reject) => {
        pool.query('select * from news order by id desc limit 10;', (error, results) => {
            if(error) reject(error);
            resolve(results.rows);
        })
    }))
}

const getAllNews = () => {
    return new Promise(((resolve, reject) => {
        pool.query('select * from news order by id desc;', (error, results) => {
            if(error) reject(error);
            if(results && results.rows) resolve(results.rows);
            else reject("Error");
        })
    }))
}

const addNews = (body) => {
    const {date, name, content} = body;
    return new Promise(((resolve, reject) => {
        pool.query(
            `insert into news(date, name, content) values('${date}', '${name}', '${content}');`,
            (error, result) => {
                if(error) {
                    reject(error);
                }
                resolve(true);
            }
        )
    }));
}

const deleteNews = (body) => {
    const {id, name} = body;
    return new Promise(((resolve, reject) => {
        pool.query(
            `delete from news where id=${id} and name='${name}';`,
            (error) => {
                if(error) {
                    reject(error);
                }
                resolve(true);
            }
        );
    }));
}

module.exports = {
    getTopNews,
    getAllNews,
    addNews,
    deleteNews
}