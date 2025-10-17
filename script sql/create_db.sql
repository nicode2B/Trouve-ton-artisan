CREATE DATABASE IF NOT EXISTS `trouve_ton_artisan` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `trouve_ton_artisan`;

-- -----------------------------------------------------
-- Table `Categorie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Categorie` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Specialite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Specialite` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(100) NOT NULL UNIQUE,
  `categorie_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`categorie_id`) REFERENCES `Categorie` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Artisan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Artisan` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) NOT NULL,
  `note` DECIMAL(2,1) NOT NULL,
  `ville` VARCHAR(100) NOT NULL,
  `a_propos` TEXT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `site_web` VARCHAR(255) NULL,
  `top_du_mois` BOOLEAN NOT NULL DEFAULT FALSE,
  `specialite_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`specialite_id`) REFERENCES `Specialite` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE = InnoDB;