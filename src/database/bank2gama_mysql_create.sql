USE bank2gama;

CREATE TABLE `clients` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(50) NOT NULL,
	`lastname` varchar(50) NOT NULL,
	`email` varchar(100) NOT NULL UNIQUE,
	`legalId` varchar(11) NOT NULL UNIQUE,
	`birth` DATE NOT NULL,
	`active` BOOLEAN NOT NULL DEFAULT true,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	`deletedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `accounts` (
	`id` int NOT NULL AUTO_INCREMENT,
	`clientId` int NOT NULL,
	`type` varchar(8) NOT NULL,
  `balance` FLOAT NOT NULL,
	`active` BOOLEAN NOT NULL DEFAULT true,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	`deletedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `operations` (
	`id` int NOT NULL AUTO_INCREMENT,
	`clientId` int NOT NULL,
	`accountId` int NOT NULL,
	`type` varchar(7) NOT NULL,
  `value` FLOAT NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `credentials` (
	`id` int NOT NULL AUTO_INCREMENT,
	`email` varchar(100) NOT NULL UNIQUE,
	`hash` varchar(255),
	`recovery` varchar(255),
	`lastLogin` DATETIME,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `accounts` ADD CONSTRAINT `accounts_fk0` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`);

ALTER TABLE `operations` ADD CONSTRAINT `operations_fk0` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`);

ALTER TABLE `operations` ADD CONSTRAINT `operations_fk1` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`);

ALTER TABLE `credentials` ADD CONSTRAINT `credentials_fk0` FOREIGN KEY (`email`) REFERENCES `clients`(`email`);