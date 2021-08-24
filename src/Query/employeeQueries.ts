import { employee } from "@prisma/client";
import { prisma } from "../index";
import { hashGenerator } from "../Utils/hashGenerator";

export const getAllEmployees = async (): Promise<employee[]> => {
    return await prisma.employee.findMany();
};

export const addEmployee = async (body: employee[]) => {
    return Promise.all(
        body.map(async (employee) => {
            const { uuid, ...rest } = employee;
            const timestamp = Date.now();

            return await prisma.employee.upsert({
                where: {
                    uuid: uuid ?? "emptyUuid",
                },
                update: {
                    ...rest,
                },
                create: {
                    uuid: hashGenerator(timestamp.toString()),
                    ...rest,
                },
            });
        })
    );
};

export const deleteEmployee = async (body: employee) => {
    const { uuid } = body;
    await prisma.employee.delete({
        where: {
            uuid: uuid,
        },
    });

    return await getAllEmployees();
};
