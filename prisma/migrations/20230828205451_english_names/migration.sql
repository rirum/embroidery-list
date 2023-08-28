-- CreateTable
CREATE TABLE "floss" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "brandName" VARCHAR(100) NOT NULL,
    "flossId" VARCHAR(20) NOT NULL,
    "flossImg" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "red" SMALLINT,
    "blue" SMALLINT,
    "green" SMALLINT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "floss_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "floss" ADD CONSTRAINT "floss_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
