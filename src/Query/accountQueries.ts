import "dotenv";
import bcrypt from "bcrypt";
import { prisma } from "../index";
import { user } from "@prisma/client";

const SALT_ROUNDS = 10;

export const getAllUsers = async (): Promise<user[]> => {
    return prisma.user.findMany();
};

const getUser = async (login: string): Promise<user | null> => {
    return await prisma.user.findFirst({
        where: {
            login: login,
        },
    });
};

export const loginUser = async (body: user): Promise<boolean> => {
    const { login, password } = body;
    const user = await getUser(login);

    return user !== null && bcrypt.compare(password, user.password);
};

export const addUser = async (body: user): Promise<user | null> => {
    const { login, password } = body;
    const hash = bcrypt.hashSync(password, SALT_ROUNDS);
    const userAlreadyExist = !!(await getUser(login));

    if (userAlreadyExist) {
        return null;
    }

    return await prisma.user.create({
        data: {
            login: login,
            password: hash,
        },
    });
};
