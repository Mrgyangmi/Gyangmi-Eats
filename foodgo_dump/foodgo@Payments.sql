-- MySQLShell dump 2.0.1  Distrib Ver 26.7.1 for macos15 on arm64 - for MySQL 26.7.0 (MySQL Community Server (GPL)), for macos15 (arm64)
--
-- Host: localhost    Database: foodgo    Table: Payments
-- ------------------------------------------------------
-- Server version	26.7.0

--
-- Current Database: `foodgo`
--

USE `foodgo`;

--
-- Table structure for table `Payments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `Payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `method` varchar(50) NOT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `paid_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
