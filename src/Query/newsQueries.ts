const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT,
});

interface INews {
    id: number;
    name: string;
    content: string;
    date: string;
}

export const getTopNews = () => {
    return new Promise<INews[]>((resolve, reject) => {
        pool.query(
            "select * from news order by id desc limit 10;",
            (error: Error, results: any) => {
                console.log(typeof results);
                if (error) reject(error);
                resolve(results.rows);
            }
        );
    });
};

export const getAllNews = () => {
    return new Promise<INews[]>((resolve, reject) => {
        pool.query(
            "select * from news order by id desc;",
            (error: Error, results: any) => {
                if (error) reject(error);
                if (results && results.rows) resolve(results.rows);
                else reject("Error");
            }
        );
    });
};

export const addNews = (body: INews) => {
    const { date, name, content } = body;
    return new Promise<boolean>((resolve, reject) => {
        pool.query(
            `insert into news(date, name, content)
             values ('${date}', '${name}', '${content}');`,
            (error: Error) => {
                if (error) {
                    reject(error);
                }
                resolve(true);
            }
        );
    });
};

export const deleteNews = (body: INews) => {
    const { id, name } = body;
    return new Promise<boolean>((resolve, reject) => {
        pool.query(
            `delete
             from news
             where id = ${id}
               and name = '${name}';`,
            (error: Error) => {
                if (error) {
                    reject(error);
                }
                resolve(true);
            }
        );
    });
};
