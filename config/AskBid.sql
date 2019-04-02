CREATE DATABASE  IF NOT EXISTS `AskBid` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `AskBid`;
-- MySQL dump 10.13  Distrib 8.0.14, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: AskBid
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brand` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `desc` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `color` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `released_date` datetime NOT NULL,
  `image` varchar(45) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'default_image.jpg',
  `visited_count` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'Nike','Jordan 1 Retro High','Neutral Grey Hyper Crimson','2019-01-24 00:00:00','sneaker_1.jpg',3),(2,'Nike','Jordan 1 Retro High Camo 3M','Wolf Grey','2017-08-01 00:00:00','sneaker_2.jpg',5);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `size` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `price` float NOT NULL,
  `type` tinyint(4) NOT NULL,
  `published_date` datetime NOT NULL,
  `out_of_stock` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `fk_item_id_idx` (`item_id`),
  CONSTRAINT `fk_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `card_no` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tel_no` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `balance` float DEFAULT NULL,
  `bank_no` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avatar_image` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `card_image` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `level` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Admin AskBid','1234567890123','askbid.se@gmail.com','$2b$10$l8UyWSSOAAGSnm.aXHlKt.mgO6eScEajY9YADvfda.0Ss9zrDcFw2','CU TH','0812345678',123457000,'1234567890','avatar_1_41ro5s.jpg','card_1_sjkct7.jpg',2),(2,'Demo Ask','0000000000000','ask.se@gmail.com','$2b$10$kcgQaAnGDGH6StnCxKpO5OJV6UoiD6SgF.xlRAy9DW.jZUFHsg7t6',NULL,NULL,NULL,NULL,NULL,NULL,1),(3,'Demo Bid','1111111111111','bid.se@gmail.com','$2b$10$XxHM0I5.hnvSslxPeiLY/OKOTgnBtSwfw/lYTs0ZDDYbrf.VxYF52',NULL,NULL,NULL,NULL,NULL,NULL,1),(4,'Demo User01','0101010101010','user01.se@gmail.com','$2b$10$iD0moeHbPmxSNpC/AGVs2ew1LNR.XabAsRgQHvYR2GDVreUlIvKNi',NULL,NULL,NULL,NULL,NULL,NULL,-1),(5,'Demo User02','0202020202020','user02.se@gmail.com','$2b$10$9ppAO.PuZDxIM/2PxkfuzOpg7MLujPUA97DslAQe6OMIOiZNNvMme',NULL,NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-02  9:00:56
