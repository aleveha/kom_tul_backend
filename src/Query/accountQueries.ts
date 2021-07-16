import "dotenv";
import bcrypt from "bcrypt";
import { prisma } from "../index";
import { user } from "@prisma/client";

const SALT_ROUNDS = 10;

export const getAllUsers = async (): Promise<user[]> => {
    return prisma.user.findMany();
};

export const checkUser = async (body: user): Promise<boolean> => {
    const { login, password } = body;
    const user = await prisma.user.findFirst({
        where: {
            login: login,
        },
    });

    return user !== null && (await bcrypt.compare(password, user.password));
};

export const addUser = async (body: user): Promise<user> => {
    const { login, password } = body;
    const hash = bcrypt.hashSync(password, SALT_ROUNDS);

    return await prisma.user.create({
        data: {
            login: login,
            password: hash,
        },
    });
};
