CREATE TABLE `users` (
  `id` integer PRIMARY KEY,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `username` varchar(255) UNIQUE NOT NULL,
  `hashedPassword` varchar(255) NOT NULL
);

CREATE TABLE `spots` (
  `id` integer PRIMARY KEY,
  `address` varchar(255) NOT NULL,
  `city` varchar(255),
  `state` varchar(255),
  `country` varchar(255),
  `lat` decimal,
  `lng` decimal,
  `name` varchar(255),
  `description` blob,
  `price` decimal NOT NULL,
  `avgRating` decimal,
  `previewImage` integer,
  `ownerId` integer
);

CREATE TABLE `images` (
  `id` integer PRIMARY KEY,
  `url` varchar(255) NOT NULL,
  `preview` boolean,
  `spotId` integer,
  `reviewId` integer
);

CREATE TABLE `reviews` (
  `id` integer PRIMARY KEY,
  `userId` integer,
  `spotId` integer,
  `review` blob,
  `stars` integer NOT NULL
);

CREATE TABLE `bookings` (
  `id` integer PRIMARY KEY,
  `spotId` integer,
  `userId` integer,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL
);

ALTER TABLE `spots` ADD FOREIGN KEY (`previewImage`) REFERENCES `images` (`id`);

ALTER TABLE `spots` ADD FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`);

ALTER TABLE `images` ADD FOREIGN KEY (`spotId`) REFERENCES `spots` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`spotId`) REFERENCES `spots` (`id`);

ALTER TABLE `bookings` ADD FOREIGN KEY (`spotId`) REFERENCES `spots` (`id`);

ALTER TABLE `bookings` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `images` ADD FOREIGN KEY (`reviewId`) REFERENCES `reviews` (`id`);
