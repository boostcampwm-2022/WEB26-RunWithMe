-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(20) NOT NULL,
    `salt` VARCHAR(80) NOT NULL,
    `password` VARCHAR(256) NOT NULL,
    `zipCode` INTEGER NOT NULL,
    `pace` DECIMAL(7, 2) NULL,

    UNIQUE INDEX `User_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(512) NOT NULL,
    `img` VARCHAR(512) NOT NULL,
    `path` JSON NOT NULL,
    `pathLength` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recruit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(512) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `maxPpl` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecruitsOnUsers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attendeeId` INTEGER NOT NULL,
    `recruitId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recruit` ADD CONSTRAINT `Recruit_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecruitsOnUsers` ADD CONSTRAINT `RecruitsOnUsers_attendeeId_fkey` FOREIGN KEY (`attendeeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecruitsOnUsers` ADD CONSTRAINT `RecruitsOnUsers_recruitId_fkey` FOREIGN KEY (`recruitId`) REFERENCES `Recruit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
