-- CreateTable
CREATE TABLE "Videos" (
    "id" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "classOrder" INTEGER NOT NULL,
    "classDescription" TEXT NOT NULL,
    "classTime" TEXT,
    "videoUrl" TEXT NOT NULL,
    "bannerUrl" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoView" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "viewed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "VideoView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Videos_className_key" ON "Videos"("className");

-- CreateIndex
CREATE UNIQUE INDEX "Videos_videoUrl_key" ON "Videos"("videoUrl");

-- CreateIndex
CREATE UNIQUE INDEX "VideoView_videoId_userId_key" ON "VideoView"("videoId", "userId");

-- AddForeignKey
ALTER TABLE "VideoView" ADD CONSTRAINT "VideoView_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoView" ADD CONSTRAINT "VideoView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
