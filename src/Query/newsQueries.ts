import { news } from "@prisma/client";
import { prisma } from "../index";

require("dotenv").config();

export const getTopNews = async (): Promise<news[]> => {
    return await prisma.news.findMany({ take: 10 });
};

export const getAllNews = async (): Promise<news[]> => {
    return await prisma.news.findMany();
};

export const addNews = async (body: news): Promise<news> => {
    const { date, name, content } = body;

    return await prisma.news.create({
        data: {
            date: new Date(date),
            name: name,
            content: content,
        },
    });
};

export const deleteNews = async (body: news): Promise<boolean> => {
    const { id } = body;
    const news = await prisma.news.delete({
        where: {
            id: Number(id),
        },
    });

    return news !== null;
};
