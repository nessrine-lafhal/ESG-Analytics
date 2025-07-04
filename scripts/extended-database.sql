-- Script pour créer et peupler une base de données ESG étendue
-- Dataset considérablement élargi avec 50+ entreprises

CREATE DATABASE IF NOT EXISTS `esgdatawarehouse_extended` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `esgdatawarehouse_extended`;

-- Table des entreprises étendue
CREATE TABLE IF NOT EXISTS `dim_entreprise` (
  `siren` varchar(9) NOT NULL,
  `siret` varchar(14) NOT NULL,
  `raison_social` text,
  `activite_entreprise` varchar(255) DEFAULT NULL,
  `denomination_unite_legale` varchar(255) DEFAULT NULL,
  `categorie_entreprise` varchar(255) DEFAULT NULL,
  `adresse` text,
  `chiffre_affaires` bigint DEFAULT NULL,
  `effectif` int DEFAULT NULL,
  `date_creation` date DEFAULT NULL,
  `isEcolabelCertified` tinyint(1) DEFAULT '0',
  `isAdherantEcoOrganisme` tinyint(1) DEFAULT '0',
  `isActeurEconomieCirculaire` tinyint(1) DEFAULT '0',
  `isEngagedEVE` tinyint(1) DEFAULT '0',
  `isLabeledEVE` tinyint(1) DEFAULT '0',
  `isRepQualified` tinyint(1) DEFAULT '0',
  `isRGE` tinyint(1) DEFAULT '0',
  `isBCorpCertified` tinyint(1) DEFAULT '0',
  `isISO14001` tinyint(1) DEFAULT '0',
  `isISO26000` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`siren`,`siret`),
  UNIQUE KEY `siret` (`siret`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insertion de 50+ entreprises avec données réalistes
INSERT INTO `dim_entreprise` VALUES 
('015851793','01585179300016','DORAS CHENOVE','Commerce de gros de matériaux de construction','DORAS CHENOVE','PME','6 Rue Antoine Becquerel, 21300 Chenôve',2500000,25,'2010-03-15',0,1,1,0,0,1,0,0,1,0),
('017150103','01715010300046','HYGIENE & NATURE','Fabrication de savons et détergents écologiques','HYGIENE & NATURE','PME','12 Boulevard Eiffel, 21600 Longvic',3200000,32,'2008-05-20',1,1,0,1,1,1,0,1,1,1),
('016550113','01655011300019','SAS ROYER','Travaux de maçonnerie générale','SAS ROYER','PME','12 Rue Jules Ferry, 21300 Chenôve',1800000,18,'2012-09-10',0,1,0,0,0,1,1,0,0,0),
('018234567','01823456700025','ECOTECH SOLUTIONS','Conseil en technologies environnementales','ECOTECH SOLUTIONS','PME','45 Avenue de la République, 69001 Lyon',5600000,42,'2015-01-12',1,1,1,1,1,1,0,1,1,1),
('019876543','01987654300018','GREEN ENERGY FRANCE','Production d\'énergie renouvelable','GREEN ENERGY FRANCE','ETI','123 Rue de la Paix, 13001 Marseille',25000000,180,'2011-06-08',1,1,1,0,0,1,1,1,1,1),
('020456789','02045678900031','SUSTAINABLE FASHION','Fabrication de vêtements éco-responsables','SUSTAINABLE FASHION','PME','78 Boulevard Saint-Germain, 75006 Paris',4200000,35,'2016-11-25',1,0,1,1,1,0,0,1,1,0),
('021654321','02165432100044','BIO AGRICULTURE OUEST','Agriculture biologique et distribution','BIO AGRICULTURE OUEST','PME','156 Route de Nantes, 35000 Rennes',3800000,28,'2013-04-18',1,1,1,0,0,1,0,0,1,1),
('022987654','02298765400037','RECYCL\'INNOV','Recyclage et valorisation des déchets','RECYCL\'INNOV','PME','89 Rue du Commerce, 31000 Toulouse',4700000,38,'2014-08-22',0,1,1,1,0,1,0,1,1,0),
('023456789','02345678900062','TRANSPORT VERT','Transport et logistique verte','TRANSPORT VERT','ETI','234 Avenue des Champs, 67000 Strasbourg',12000000,95,'2009-12-03',0,1,1,0,1,1,0,0,1,1),
('024789123','02478912300055','CONSTRUCTION DURABLE','Construction écologique et rénovation','CONSTRUCTION DURABLE','PME','167 Rue de la Liberté, 59000 Lille',6300000,52,'2017-02-14',1,1,0,0,0,1,1,1,1,0),
('025147258','02514725800048','TECH FOR PLANET','Solutions numériques pour l\'environnement','TECH FOR PLANET','PME','45 Rue de Rivoli, 75001 Paris',7800000,65,'2018-07-30',0,0,1,1,1,0,0,1,1,1),
('026369147','02636914700073','ALIMENTAIRE RESPONSABLE','Production alimentaire biologique','ALIMENTAIRE RESPONSABLE','PME','123 Avenue de la Mer, 06000 Nice',3600000,29,'2012-10-05',1,1,1,1,0,1,0,0,1,1),
('027582514','02758251400086','MOBILITÉ ÉLECTRIQUE','Fabrication de véhicules électriques','MOBILITÉ ÉLECTRIQUE','ETI','78 Boulevard de la Technologie, 38000 Grenoble',18500000,142,'2016-03-28',1,0,1,0,1,1,0,1,1,0),
('028741963','02874196300099','ÉNERGIE SOLAIRE SUD','Installation de panneaux solaires','ÉNERGIE SOLAIRE SUD','PME','234 Route du Soleil, 84000 Avignon',5200000,41,'2015-09-17',1,1,0,0,0,1,1,1,1,1),
('029963741','02996374100102','COSMÉTIQUES NATURELS','Cosmétiques bio et naturels','COSMÉTIQUES NATURELS','PME','56 Rue de la Beauté, 33000 Bordeaux',2900000,24,'2019-01-11',1,0,1,1,1,0,0,1,1,0),
('030159753','03015975300115','PACKAGING ÉCOLOGIQUE','Emballages biodégradables','PACKAGING ÉCOLOGIQUE','PME','89 Avenue de l\'Innovation, 44000 Nantes',4100000,33,'2017-05-23',1,1,1,0,0,1,0,0,1,1),
('031357951','03135795100128','SMART CITY SOLUTIONS','Solutions pour villes intelligentes','SMART CITY SOLUTIONS','ETI','167 Boulevard du Futur, 34000 Montpellier',14200000,108,'2014-11-09',0,1,1,1,1,1,0,1,1,1),
('032456123','03245612300131','TEXTILE RECYCLÉ','Recyclage de textiles','TEXTILE RECYCLÉ','PME','45 Rue du Recyclage, 68000 Mulhouse',3300000,27,'2018-12-20',1,1,1,1,0,0,0,1,1,0),
('033789456','03378945600144','ÉOLIEN OFFSHORE','Énergie éolienne maritime','ÉOLIEN OFFSHORE','GE','456 Port Maritime, 29200 Brest',85000000,520,'2010-08-14',1,1,1,0,1,1,1,1,1,1),
('034012789','03401278900157','AGRICULTURE URBAINE','Production agricole en milieu urbain','AGRICULTURE URBAINE','PME','123 Rue Verte, 69002 Lyon',2800000,22,'2020-02-28',1,0,1,1,1,1,0,0,1,1),
('035654987','03565498700160','GESTION DURABLE EAU','Traitement et gestion de l\'eau','GESTION DURABLE EAU','ETI','234 Avenue de l\'Eau, 21000 Dijon',16800000,125,'2013-07-16',1,1,1,0,0,1,1,1,1,1),
('036321654','03632165400173','BIOTECHNOLOGIES VERTES','Biotechnologies environnementales','BIOTECHNOLOGIES VERTES','PME','78 Rue de la Science, 54000 Nancy',5900000,47,'2016-04-03',0,1,1,1,1,0,0,1,1,1),
('037987321','03798732100186','ÉCONOMIE CIRCULAIRE','Conseil en économie circulaire','ÉCONOMIE CIRCULAIRE','PME','89 Boulevard Circulaire, 76000 Rouen',3700000,31,'2019-06-12',0,1,1,1,0,1,0,1,1,0),
('038147963','03814796300199','ISOLATION ÉCOLOGIQUE','Matériaux d\'isolation naturels','ISOLATION ÉCOLOGIQUE','PME','156 Rue de l\'Habitat, 25000 Besançon',4400000,36,'2015-10-07',1,1,0,0,0,1,1,1,1,0),
('039258741','03925874100202','MOBILITY AS SERVICE','Services de mobilité partagée','MOBILITY AS SERVICE','ETI','267 Avenue de la Mobilité, 57000 Metz',11900000,89,'2017-08-25',0,0,1,1,1,1,0,1,1,1),
('040369852','04036985200215','TRAITEMENT BIOMASSE','Valorisation de la biomasse','TRAITEMENT BIOMASSE','PME','345 Route de la Forêt, 88000 Épinal',5100000,39,'2014-01-30',1,1,1,0,0,1,0,0,1,1),
('041753159','04175315900228','SMART AGRICULTURE','Agriculture de précision','SMART AGRICULTURE','PME','123 Chemin des Champs, 02000 Laon',4600000,37,'2018-09-18',0,1,1,1,0,1,0,1,1,0),
('042864271','04286427100231','ÉCLAIRAGE LED','Solutions d\'éclairage efficace','ÉCLAIRAGE LED','PME','78 Boulevard de la Lumière, 51000 Reims',3900000,32,'2016-12-04',1,0,1,0,1,1,0,1,1,1),
('043951684','04395168400244','TRANSPORT HYDROGÈNE','Véhicules à hydrogène','TRANSPORT HYDROGÈNE','ETI','189 Avenue du Futur, 87000 Limoges',19200000,146,'2019-03-21',1,1,1,1,1,1,1,1,1,1),
('044062795','04406279500257','ECO BUREAUTIQUE','Fournitures de bureau écologiques','ECO BUREAUTIQUE','PME','234 Rue du Bureau, 36000 Châteauroux',2600000,21,'2017-11-13',1,1,1,1,0,0,0,0,1,0),
('045173806','04517380600260','RÉNOVATION ÉNERGÉTIQUE','Rénovation thermique des bâtiments','RÉNOVATION ÉNERGÉTIQUE','PME','156 Avenue de l\'Efficacité, 18000 Bourges',5800000,46,'2015-05-29',0,1,0,0,0,1,1,1,1,0),
('046284917','04628491700273','FORESTERIE DURABLE','Gestion forestière responsable','FORESTERIE DURABLE','PME','267 Route de la Forêt, 23000 Guéret',4300000,34,'2014-08-06',1,1,1,0,1,1,0,0,1,1),
('047395028','04739502800286','CHIMIE VERTE','Chimie respectueuse de l\'environnement','CHIMIE VERTE','ETI','345 Boulevard de la Chimie, 03000 Moulins',13700000,104,'2013-02-19',1,1,1,1,0,1,0,1,1,1),
('048406139','04840613900299','SERVICES ENVIRONNEMENTAUX','Conseil et audit environnemental','SERVICES ENVIRONNEMENTAUX','PME','78 Rue de l\'Environnement, 43000 Le Puy-en-Velay',3400000,28,'2018-04-15',0,1,1,1,1,1,0,1,1,0),
('049517240','04951724000302','AQUACULTURE DURABLE','Élevage aquacole responsable','AQUACULTURE DURABLE','PME','189 Port de Pêche, 85000 La Roche-sur-Yon',4800000,38,'2016-07-22',1,0,1,0,0,1,0,0,1,1),
('050628351','05062835100315','GÉOTHERMIE FRANCE','Énergie géothermique','GÉOTHERMIE FRANCE','ETI','234 Avenue Souterraine, 63000 Clermont-Ferrand',15600000,118,'2012-12-11',1,1,1,0,1,1,1,1,1,1),
('051739462','05173946200328','MATÉRIAUX BIOSOURCÉS','Matériaux de construction naturels','MATÉRIAUX BIOSOURCÉS','PME','123 Rue Naturelle, 15000 Aurillac',3800000,31,'2019-08-08',1,1,0,1,0,1,1,1,1,0),
('052840573','05284057300331','MICRO-MOBILITÉ','Vélos et trottinettes électriques','MICRO-MOBILITÉ','PME','78 Boulevard de la Mobilité, 19000 Tulle',2700000,23,'2020-01-16',0,0,1,1,1,0,0,1,1,1),
('053951684','05395168400344','CAPTAGE CARBONE','Technologies de capture du CO2','CAPTAGE CARBONE','ETI','189 Avenue Innovation, 48000 Mende',21400000,162,'2017-06-30',1,1,1,1,1,1,0,1,1,1),
('054062795','05406279500357','AGRICULTURE VERTICALE','Production agricole en vertical','AGRICULTURE VERTICALE','PME','234 Tour Verte, 12000 Rodez',5300000,42,'2018-10-24',1,0,1,1,0,1,0,1,1,0),
('055173806','05517380600360','STOCKAGE ÉNERGIE','Solutions de stockage énergétique','STOCKAGE ÉNERGIE','ETI','123 Rue de l\'Énergie, 46000 Cahors',17300000,131,'2015-03-17',0,1,1,0,1,1,1,1,1,1),
('056284917','05628491700373','BIO-EMBALLAGES','Emballages compostables','BIO-EMBALLAGES','PME','78 Avenue Verte, 82000 Montauban',3100000,26,'2019-09-02',1,1,1,1,1,0,0,0,1,1),
('057395028','05739502800386','PURIFICATION AIR','Technologies de purification de l\'air','PURIFICATION AIR','PME','189 Boulevard de l\'Air, 81000 Albi',4500000,36,'2016-11-19',1,0,1,0,0,1,0,1,1,0),
('058406139','05840613900399','ECO-TOURISME','Tourisme durable et écologique','ECO-TOURISME','PME','234 Route des Vacances, 32000 Auch',3500000,29,'2017-05-08',0,1,1,1,1,1,0,0,1,1),
('059517240','05951724000402','TEXTILES TECHNIQUES','Textiles haute performance écologiques','TEXTILES TECHNIQUES','PME','123 Rue de l\'Innovation, 65000 Tarbes',4200000,34,'2018-02-26',1,1,0,0,1,1,0,1,1,0),
('060628351','06062835100415','MONITORING ENVIRONNEMENTAL','Surveillance environnementale IoT','MONITORING ENVIRONNEMENTAL','PME','78 Avenue Numérique, 09000 Foix',5700000,44,'2019-12-05',0,0,1,1,0,1,0,1,1,1),
('061739462','06173946200428','BATTERIES VERTES','Batteries écologiques et recyclables','BATTERIES VERTES','ETI','189 Boulevard Électrique, 11000 Carcassonne',22800000,175,'2014-07-13',1,1,1,1,1,1,1,1,1,1),
('062840573','06284057300431','POLLUTION SONORE','Solutions anti-bruit écologiques','POLLUTION SONORE','PME','234 Rue du Silence, 66000 Perpignan',3200000,27,'2020-04-21',0,1,1,0,0,1,0,0,1,0),
('063951684','06395168400444','RESTAURATION ÉCOSYSTÈMES','Restauration d\'écosystèmes dégradés','RESTAURATION ÉCOSYSTÈMES','PME','123 Chemin de la Nature, 34000 Montpellier',4900000,39,'2016-08-17',1,1,1,1,0,1,0,1,1,1),
('064062795','06406279500457','ÉCONOMIE BLEUE','Exploitation durable des ressources marines','ÉCONOMIE BLEUE','ETI','78 Port Maritime, 30000 Nîmes',16200000,122,'2013-10-03',1,1,1,0,1,1,1,0,1,1);
