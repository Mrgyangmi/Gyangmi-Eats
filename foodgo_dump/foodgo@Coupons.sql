-- MySQLShell dump 2.0.1  Distrib Ver 26.7.1 for macos15 on arm64 - for MySQL 26.7.0 (MySQL Community Server (GPL)), for macos15 (arm64)
--
-- Host: localhost    Database: foodgo    Table: Coupons
-- ------------------------------------------------------
-- Server version	26.7.0

--
-- Current Database: `foodgo`
--

USE `foodgo`;

--
-- Table structure for table `Coupons`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `Coupons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `discount_type` varchar(20) NOT NULL,
  `discount_value` decimal(10,2) NOT NULL,
  `min_order_amount` decimal(10,2) DEFAULT '0.00',
  `expiry_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
