-- MySQLShell dump 2.0.1  Distrib Ver 26.7.1 for macos15 on arm64 - for MySQL 26.7.0 (MySQL Community Server (GPL)), for macos15 (arm64)
--
-- Host: localhost    Database: foodgo    Table: CartItems
-- ------------------------------------------------------
-- Server version	26.7.0

--
-- Current Database: `foodgo`
--

USE `foodgo`;

--
-- Table structure for table `CartItems`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `CartItems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `menu_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_id` (`cart_id`),
  KEY `menu_id` (`menu_id`),
  CONSTRAINT `cartitems_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `Cart` (`id`),
  CONSTRAINT `cartitems_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `Menus` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
