CREATE DATABASE  IF NOT EXISTS `AskBid` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `AskBid`;
-- MySQL dump 10.13  Distrib 8.0.14, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: AskBid
-- ------------------------------------------------------
-- Server version	8.0.13

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
-- Table structure for table `Item`
--

DROP TABLE IF EXISTS `Item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Item` (
  `ItemID` int(11) NOT NULL AUTO_INCREMENT,
  `ItemImage` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ItemBrand` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ItemDesc` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ItemColor` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ItemReleased` datetime NOT NULL,
  `ItemClicked` int(11) NOT NULL,
  PRIMARY KEY (`ItemID`),
  UNIQUE KEY `ItemID_UNIQUE` (`ItemID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Item`
--

LOCK TABLES `Item` WRITE;
/*!40000 ALTER TABLE `Item` DISABLE KEYS */;
INSERT INTO `Item` VALUES (1,'sneaker1.jpg','Nike','Jordan 1 Retro High','Neutral Grey Hyper Crimson','2019-01-24 00:00:00',14),(2,'sneaker2.jpg','Nike','Jordan 1 Retro High Camo 3M','Wolf Grey','2017-08-01 00:00:00',3),(3,'sneaker3.jpg','Adidas ','Yeezy Wave Runner 700','Solid Grey','2017-11-01 00:00:00',10),(4,'sneaker4.jpg','Nike','Zoom Fly Off-White','Black Silver','2018-10-13 00:00:00',22),(5,'sneaker5.jpg','Adidas','Yeezy Boost 350 V2','Static','2018-12-27 00:00:00',13),(6,'sneaker6.jpg','Converse','Chuck Taylor All-Star 70s Hi Off-White','White','2018-10-08 00:00:00',15),(7,'sneaker7.jpg','Vans','Old Skool NASA Space Voyager','True White','2018-11-02 00:00:00',7),(8,'sneaker8.jpg','Adidas ','Yeezy Boost 500','Utility Black','2018-07-07 00:00:00',33),(9,'sneaker9.jpg','Adidas ','Yeezy Boost 350','Pirate Black','2015-08-22 00:00:00',27),(10,'sneaker10.jpg','Nike','Air Vapormax Off White','White','2018-04-14 00:00:00',27);
/*!40000 ALTER TABLE `Item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `User` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `FullName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Password` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Tel` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Balance` float DEFAULT NULL,
  `BankNo` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Verified` tinyint(4) NOT NULL,
  `Salt` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `UserID_UNIQUE` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'Ask Bid','askbid.se@gmail.com','$2b$10$Qt8/kgV2RbITq9K8P1tbOerngULYzOSjnE7vYcP6VKoC2BeeNRj/6',NULL,NULL,NULL,NULL,2,'$2b$10$Qt8/kgV2RbITq9K8P1tbOe'),(2,'Test UpdateP','testz@gmail.com','$2b$10$lOpAvaQqjG5P/fXLpORAsOjPSsJMQjvkg2rbCF2ckzd75OGtm8TDq','Italy','1234',1500.5,'99999',1,'$2b$10$lOpAvaQqjG5P/fXLpORAsO'),(3,'Testx','testx@gmail.com','$2b$10$neRuYs41N8flFYlVnzVgPeCZMaO.rJPGdJca.UnoAu6RLe2rVgFzy',NULL,NULL,NULL,NULL,0,'$2b$10$neRuYs41N8flFYlVnzVgPe');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-10 20:13:36
