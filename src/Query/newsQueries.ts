import { news } from "@prisma/client";
import { prisma } from "../index";
import { hashGenerator } from "../Utils/hashGenerator";

require("dotenv").config();

export const getTopNews = async (): Promise<news[]> => {
    return await prisma.news.findMany({ take: 10 });
};

export const getAllNews = async (): Promise<news[]> => {
    return await prisma.news.findMany({
        orderBy: [{ date: "asc" }],
    });
};

export const addNews = async (body: news[]): Promise<news[]> => {
    return await Promise.all(
        body.map(async (news) => {
            const { name_cz, name_en, content_cz, content_en, uuid } = news;
            const timeStamp = Date.now();

            return await prisma.news.upsert({
                where: {
                    uuid: uuid ?? "withOutUuid",
                },
                update: {
                    name_cz: name_cz,
                    name_en: name_en,
                    content_cz: content_cz,
                    content_en: content_en,
                },
                create: {
                    date: new Date(timeStamp),
                    name_cz: name_cz,
                    name_en: name_en,
                    content_cz: content_cz,
                    content_en: content_en,
                    uuid: hashGenerator(timeStamp.toString()),
                },
            });
        })
    );
};

export const deleteNews = async (body: news): Promise<news[]> => {
    const { uuid } = body;
    await prisma.news.delete({
        where: {
            uuid: uuid,
        },
    });

    return await getAllNews();
};
