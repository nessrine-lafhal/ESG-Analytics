-- Script pour créer et peupler la base de données ESG
-- Ce script utilise les données de votre fichier SQL

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS `esgdatawarehouse` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `esgdatawarehouse`;

-- Table des entreprises
CREATE TABLE IF NOT EXISTS `dim_entreprise` (
  `siren` varchar(9) NOT NULL,
  `siret` varchar(14) NOT NULL,
  `raison_social` text,
  `activite_entreprise` varchar(255) DEFAULT NULL,
  `denomination_unite_legale` varchar(255) DEFAULT NULL,
  `categorie_entreprise` varchar(255) DEFAULT NULL,
  `adresse` text,
  `isEcolabelCertified` tinyint(1) DEFAULT '0',
  `isAdherantEcoOrganisme` tinyint(1) DEFAULT '0',
  `isActeurEconomieCirculaire` tinyint(1) DEFAULT '0',
  `isEngagedEVE` tinyint(1) DEFAULT '0',
  `isLabeledEVE` tinyint(1) DEFAULT '0',
  `isRepQualified` tinyint(1) DEFAULT '0',
  `isRGE` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`siren`,`siret`),
  UNIQUE KEY `siret` (`siret`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table des régions
CREATE TABLE IF NOT EXISTS `dim_region` (
  `region_key` int NOT NULL AUTO_INCREMENT,
  `code_region` varchar(255) DEFAULT NULL,
  `nom_region` varchar(255) DEFAULT NULL,
  `code_departement` varchar(255) DEFAULT NULL,
  `nom_departement` varchar(255) DEFAULT NULL,
  `code_commune` varchar(255) DEFAULT NULL,
  `libelle_commune` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`region_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table des secteurs
CREATE TABLE IF NOT EXISTS `dim_secteur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `effet` double DEFAULT NULL,
  `code_commune` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table de faits
CREATE TABLE IF NOT EXISTS `fact_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `siren` varchar(9) DEFAULT NULL,
  `siret` varchar(14) DEFAULT NULL,
  `score_engagement_environnemental` int DEFAULT NULL,
  `pourcentage_cadre_hommes` double DEFAULT NULL,
  `pourcentage_cadre_femmes` double DEFAULT NULL,
  `pourcentage_membre_hommes` double DEFAULT NULL,
  `pourcentage_membre_femmes` double DEFAULT NULL,
  `total_emissions_ges` double DEFAULT NULL,
  `region_key` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `region_key` (`region_key`),
  KEY `siren` (`siren`,`siret`),
  CONSTRAINT `fact_table_ibfk_1` FOREIGN KEY (`region_key`) REFERENCES `dim_region` (`region_key`),
  CONSTRAINT `fact_table_ibfk_2` FOREIGN KEY (`siren`, `siret`) REFERENCES `dim_entreprise` (`siren`, `siret`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
