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
-- Table structure for table `Bill`
--

DROP TABLE IF EXISTS `Bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Bill` (
  `BillID` int(11) NOT NULL AUTO_INCREMENT,
  `BillUserID` int(11) NOT NULL,
  `BillMatchID` int(11) NOT NULL,
  `Cost` float NOT NULL,
  PRIMARY KEY (`BillID`),
  UNIQUE KEY `PayID_UNIQUE` (`BillID`),
  KEY `PayUserID_idx` (`BillUserID`),
  KEY `PayMatchID_idx` (`BillMatchID`),
  CONSTRAINT `BillMatchID` FOREIGN KEY (`BillMatchID`) REFERENCES `match` (`MatchID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `BillUserID` FOREIGN KEY (`BillUserID`) REFERENCES `user` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bill`
--

LOCK TABLES `Bill` WRITE;
/*!40000 ALTER TABLE `Bill` DISABLE KEYS */;
/*!40000 ALTER TABLE `Bill` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `Item` VALUES (1,'sneaker1.jpg','Nike','Jordan 1 Retro High','Neutral Grey Hyper Crimson','2019-01-24 00:00:00',14),(2,'sneaker2.jpg','Nike','Jordan 1 Retro High Camo 3M','Wolf Grey','2017-08-01 00:00:00',3),(3,'sneaker3.jpg','Adidas ','Yeezy Wave Runner 700','Solid Grey','2017-11-01 00:00:00',10),(4,'sneaker4.jpg','Nike','Zoom Fly Off-White','Black Silver','2018-10-13 00:00:00',22),(5,'sneaker5.jpg','Adidas','Yeezy Boost 350 V2','Static','2018-12-27 00:00:00',13),(6,'sneaker6.jpg','Converse','Chuck Taylor All-Star 70s Hi Off-White','White','2018-10-08 00:00:00',15),(7,'sneaker7.jpg','Vans','Old Skool NASA Space Voyager','True White','2018-11-02 00:00:00',7),(8,'sneaker8.jpg','Adidas ','Yeezy Boost 500','Utility Black','2018-07-07 00:00:00',36),(9,'sneaker9.jpg','Adidas ','Yeezy Boost 350','Pirate Black','2015-08-22 00:00:00',27),(10,'sneaker10.jpg','Nike','Air Vapormax Off White','White','2018-04-14 00:00:00',29);
/*!40000 ALTER TABLE `Item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Match`
--

DROP TABLE IF EXISTS `Match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Match` (
  `MatchID` int(11) NOT NULL AUTO_INCREMENT,
  `MatchUserID` int(11) NOT NULL,
  `MatchOrderID` int(11) NOT NULL,
  `TotalAmount` int(11) NOT NULL,
  `TotalPrice` float NOT NULL,
  `Status` tinyint(4) NOT NULL,
  PRIMARY KEY (`MatchID`),
  UNIQUE KEY `MatchID_UNIQUE` (`MatchID`),
  KEY `UserID_idx` (`MatchUserID`),
  KEY `OrderID_idx` (`MatchOrderID`),
  CONSTRAINT `MatchOrderID` FOREIGN KEY (`MatchOrderID`) REFERENCES `order` (`OrderID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `MatchUserID` FOREIGN KEY (`MatchUserID`) REFERENCES `user` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Match`
--

LOCK TABLES `Match` WRITE;
/*!40000 ALTER TABLE `Match` DISABLE KEYS */;
/*!40000 ALTER TABLE `Match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notification`
--

DROP TABLE IF EXISTS `Notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Notification` (
  `NotifID` int(11) NOT NULL AUTO_INCREMENT,
  `NotifUserID` int(11) NOT NULL,
  `Content` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `FlagRN` tinyint(4) NOT NULL,
  PRIMARY KEY (`NotifID`),
  UNIQUE KEY `NotifID_UNIQUE` (`NotifID`),
  KEY `NotifUserID_idx` (`NotifUserID`),
  CONSTRAINT `NotifUserID` FOREIGN KEY (`NotifUserID`) REFERENCES `user` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notification`
--

LOCK TABLES `Notification` WRITE;
/*!40000 ALTER TABLE `Notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `Notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order`
--

DROP TABLE IF EXISTS `Order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Order` (
  `OrderID` int(11) NOT NULL AUTO_INCREMENT,
  `OrderUserID` int(11) NOT NULL,
  `OrderItemID` int(11) NOT NULL,
  `ItemSize` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `OrderAmount` int(11) NOT NULL,
  `OrderPrice` float NOT NULL,
  `FlagAB` tinyint(4) NOT NULL,
  PRIMARY KEY (`OrderID`),
  UNIQUE KEY `OrderID_UNIQUE` (`OrderID`),
  KEY `ItemID_idx` (`OrderItemID`),
  KEY `UserID_idx` (`OrderUserID`),
  CONSTRAINT `OrderItemID` FOREIGN KEY (`OrderItemID`) REFERENCES `item` (`ItemID`),
  CONSTRAINT `OrderUserID` FOREIGN KEY (`OrderUserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order`
--

LOCK TABLES `Order` WRITE;
/*!40000 ALTER TABLE `Order` DISABLE KEYS */;
INSERT INTO `Order` VALUES (1,2,5,'US10.5',1,11000,0),(2,3,5,'US10',1,13000,1),(3,2,1,'US9',1,7000.5,0),(4,2,3,'US7',1,5555.5,0),(5,3,2,'UK10',1,10000.5,1),(6,3,1,'UK9',1,9000,1),(7,2,2,'US5.5',1,6999,0);
/*!40000 ALTER TABLE `Order` ENABLE KEYS */;
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
  `IDCard` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Password` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Tel` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Balance` double DEFAULT NULL,
  `BankNo` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Verified` tinyint(4) NOT NULL,
  `Salt` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `UserID_UNIQUE` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'Ask Bid','9999999999999','askbid.se@gmail.com','$2b$10$Qt8/kgV2RbITq9K8P1tbOerngULYzOSjnE7vYcP6VKoC2BeeNRj/6','Thailand','1150',999999.9,'1234567890',2,'$2b$10$Qt8/kgV2RbITq9K8P1tbOe'),(2,'Demo Ask','1234567890123','demo.ask@gmail.com','$2b$10$lOpAvaQqjG5P/fXLpORAsOjPSsJMQjvkg2rbCF2ckzd75OGtm8TDq','Italy','1234',200000.5,'0000000000',1,'$2b$10$lOpAvaQqjG5P/fXLpORAsO'),(3,'Demo Bid','1021102110211','demo.bid@gmail.com','$2b$10$neRuYs41N8flFYlVnzVgPeCZMaO.rJPGdJca.UnoAu6RLe2rVgFzy','Norway','1021',150000.5,'1111111111',1,'$2b$10$neRuYs41N8flFYlVnzVgPe'),(4,'Demo NV','3333333333333','demo.nv@gmail.com','$2b$10$jz4OfDZOOc5/1BslSEj1uOWYvOU5ZUFcJj3asW/FdwFMka6e0OFhi',NULL,NULL,NULL,NULL,0,'$2b$10$jz4OfDZOOc5/1BslSEj1uO'),(5,'Demo ValE','5050505050505','demo.vale@gmail.com','$2b$10$YfIGljI7r9Opb1bt79Al7Og/Hq1LBQorowTKrtxcifq37UeAqV2zG',NULL,NULL,NULL,NULL,1,'$2b$10$YfIGljI7r9Opb1bt79Al7O');
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

-- Dump completed on 2019-02-20 23:50:03
