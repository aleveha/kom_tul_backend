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
    const { date, name_cz, name_en, content_cz, content_en } = body;

    return await prisma.news.create({
        data: {
            date: new Date(date),
            name_cz: name_cz,
            name_en: name_en,
            content_cz: content_cz,
            content_en: content_en,
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
