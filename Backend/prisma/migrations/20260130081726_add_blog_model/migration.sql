-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);
