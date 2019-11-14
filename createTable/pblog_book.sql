-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: pblog
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
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `book` (
  `book_id` int(11) NOT NULL AUTO_INCREMENT,
  `book_name` varchar(20) NOT NULL,
  `book_author` varchar(20) NOT NULL,
  `book_publish` varchar(20) NOT NULL,
  `book_category` int(11) NOT NULL,
  `book_number` int(11) NOT NULL DEFAULT '0',
  `book_introduction` varchar(100) DEFAULT '无',
  PRIMARY KEY (`book_id`),
  KEY `book_category` (`book_category`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (2,'三体','刘慈欣','南京大学出版社',1,42,'科幻小说'),(6,'平凡的世界','路遥','上海文艺出版社',1,23,'孙少平和孙少安两兄弟...'),(15,'白鹿原','陈忠实','南京出版社',1,0,'当代小说'),(16,'计算机网络','谢希仁','电子工业出版社',3,23,'计算机专业书籍'),(17,'霍乱时期的爱情','加西亚·马尔克斯','译林出版社',9,13,'外国小说'),(18,'天才在左疯子在右','高铭','北京联合出版公司',1,21,'心理学'),(19,'废都','贾平凹','商务印书馆',8,52,'当代小说'),(20,'jQuery','Ryan','中国电力出版社',3,2,'js库'),(21,'慈善赌王晚年回忆录','张效骞','电子科技大学出版社',17,32,'富贵险中求'),(23,'磨锤子指导手册','许生','电子科技大学出版社',3,22,'技术总监·生 莅临指导'),(24,'臭猪成长手册','猪仔仔二零一九','臭猪幼儿园出版社',-1,3,'记录了一只猪的成长'),(45,'毛概','htt','电子科技大学出版社',3,5,'无'),(46,'营养与健康','yxz','电子科技大学出版社',3,2,'无');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-13 23:24:26
