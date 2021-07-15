-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "login" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
