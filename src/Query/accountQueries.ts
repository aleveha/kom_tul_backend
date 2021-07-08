import { Pool } from "pg";
import "dotenv";
import bcrypt from "bcrypt";

type UserType = {
    login: string;
    password: string;
};

const saltRounds = 10;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: Number.parseInt(process.env.DB_PORT || "5000"),
});

export const checkUser = (body: UserType) => {
    const { login, password } = body;
    return new Promise<boolean>((resolve, reject) => {
        pool.query(
            `select *
             from accounts
             where login = '${login}';`,
            (error, result) => {
                if (error) reject(error);
                if (
                    result !== undefined &&
                    result.rows !== undefined &&
                    result.rows.length > 0
                ) {
                    bcrypt.compare(
                        password,
                        result.rows[0].password,
                        function (err, result) {
                            resolve(result);
                        }
                    );
                } else {
                    resolve(false);
                }
            }
        );
    });
};

export const addUser = (body: UserType) => {
    const { login, password } = body;
    return new Promise<boolean>((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                pool.query(
                    `insert into accounts(login, password)
                     values ('${login}', '${hash}');`,
                    (error) => {
                        if (error) reject(error);
                        resolve(true);
                    }
                );
            });
        });
    });
};
