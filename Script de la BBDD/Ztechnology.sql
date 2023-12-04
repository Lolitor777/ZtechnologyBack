-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.31 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para ztechnology
DROP DATABASE IF EXISTS `ztechnology`;
CREATE DATABASE IF NOT EXISTS `ztechnology` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ztechnology`;

-- Volcando estructura para tabla ztechnology.customers
DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `document_number` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) NOT NULL,
  `state` bit(1) NOT NULL DEFAULT (1),
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `document_number` (`document_number`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ztechnology.customers: 8 rows
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
REPLACE INTO `customers` (`id`, `name`, `document_number`, `email`, `state`, `createdAt`, `updatedAt`) VALUES
	(1, 'pepito', '1006452412', 'pepitoelbandido@gmail.com', b'1', '2023-10-25 22:08:26', '2023-11-02 16:08:20'),
	(2, 'Melendi', '12345616', 'melendi@gmail.com', b'1', '2023-10-25 22:08:26', '2023-10-26 14:44:42'),
	(3, 'Dalto', '122334223', 'daltodev@gmail.com', b'1', '2023-10-25 22:08:26', '2023-11-29 16:59:44'),
	(4, 'Rocío', '232211233', 'rociocanta@gmail.com', b'1', '2023-10-25 22:08:26', '2023-10-26 14:45:11'),
	(5, 'Cepeda', '1234567892', 'microcepeda@gmail.com', b'1', '2023-10-26 15:47:51', '2023-10-26 15:47:51'),
	(6, 'Milena', '100645', 'milenita19@gmail.com', b'1', '2023-10-28 14:29:04', '2023-10-30 18:00:44'),
	(7, 'jose', '100645123', 'josejose@gmail.com', b'1', '2023-10-28 14:32:19', '2023-10-28 14:32:19'),
	(14, 'steve', '123456789', 'steven@gmai.com', b'1', '2023-11-29 13:27:55', '2023-11-29 13:27:55');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;

-- Volcando estructura para tabla ztechnology.products
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `code` varchar(6) NOT NULL,
  `price` int NOT NULL,
  `amount` int DEFAULT NULL,
  `state` bit(1) DEFAULT (1),
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ztechnology.products: 6 rows
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
REPLACE INTO `products` (`id`, `type`, `description`, `code`, `price`, `amount`, `state`, `createdAt`, `updatedAt`) VALUES
	(1, 'Celular', 'Iphone 15 pro max', '001', 40000000, 7, b'1', '2023-10-25 22:04:05', '2023-11-29 19:05:12'),
	(2, 'Pc', 'Computador master race', '002', 6000000, 4, b'1', '2023-10-25 22:04:05', '2023-10-26 15:16:14'),
	(3, 'Impresora', 'Epson L510', '003', 600000, 17, b'1', '2023-10-25 22:04:05', '2023-10-26 15:16:17'),
	(4, 'Teclado', 'Mecánico con luz RGB', '004', 280000, 7, b'1', '2023-10-25 22:04:05', '2023-10-26 15:16:23'),
	(5, 'Cámara', 'Go pro hero 10', '005', 640000, 3, b'1', '2023-10-26 15:51:13', '2023-10-26 15:51:13'),
	(6, 'teclado', 'teclado mecanico rgb', '006', 25000, 4, b'1', '2023-11-29 17:29:45', '2023-11-29 17:29:45');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

-- Volcando estructura para tabla ztechnology.quotes
DROP TABLE IF EXISTS `quotes`;
CREATE TABLE IF NOT EXISTS `quotes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `numeration` int unsigned NOT NULL,
  `shipping_price` int NOT NULL,
  `sub_total` int NOT NULL,
  `total` int NOT NULL,
  `state` bit(1) NOT NULL DEFAULT (1),
  `amount_discount` int NOT NULL,
  `porcentage_discount` int NOT NULL,
  `id_product` int NOT NULL,
  `id_user` int NOT NULL,
  `id_customer` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_product` (`id_product`),
  KEY `id_user` (`id_user`),
  KEY `id_customer` (`id_customer`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ztechnology.quotes: 9 rows
/*!40000 ALTER TABLE `quotes` DISABLE KEYS */;
REPLACE INTO `quotes` (`id`, `numeration`, `shipping_price`, `sub_total`, `total`, `state`, `amount_discount`, `porcentage_discount`, `id_product`, `id_user`, `id_customer`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 21000, 0, 0, b'1', 0, 0, 2, 4, 3, '2023-10-25 22:14:12', '2023-10-27 22:03:03'),
	(2, 2, 8000, 0, 0, b'1', 0, 0, 1, 1, 2, '2023-10-25 22:14:12', '2023-10-26 16:19:57'),
	(3, 3, 8000, 0, 0, b'1', 0, 0, 3, 1, 2, '2023-10-25 22:14:12', '2023-10-26 16:19:59'),
	(4, 4, 12000, 0, 0, b'1', 0, 0, 4, 8, 1, '2023-10-25 22:14:12', '2023-10-26 16:20:00'),
	(5, 5, 18000, 0, 0, b'1', 0, 0, 1, 4, 4, '2023-10-25 22:14:12', '2023-10-26 16:20:01'),
	(6, 6, 2000, 0, 0, b'1', 0, 0, 1, 2, 3, '2023-10-30 21:19:45', '2023-10-30 21:19:45'),
	(7, 6, 2000, 0, 0, b'1', 0, 0, 1, 2, 3, '2023-10-30 21:21:14', '2023-10-30 21:21:14'),
	(8, 0, 8000, 0, 23000, b'1', 0, 0, 2, 3, 1, '2023-11-30 13:05:31', '2023-11-30 13:05:31'),
	(9, 0, 7000, 0, 4000, b'1', 0, 0, 1, 2, 1, '2023-12-04 13:12:35', '2023-12-04 17:08:27');
/*!40000 ALTER TABLE `quotes` ENABLE KEYS */;

-- Volcando estructura para tabla ztechnology.roles
DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `state` int DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ztechnology.roles: 2 rows
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
REPLACE INTO `roles` (`id`, `name`, `state`, `createdAt`, `updatedAt`) VALUES
	(1, 'Administrador', 1, '2023-10-25 21:41:55', '2023-10-25 21:41:55'),
	(2, 'Gestor', 1, '2023-10-25 21:41:55', '2023-10-25 21:41:55');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Volcando estructura para tabla ztechnology.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `names` varchar(50) NOT NULL,
  `nameUser` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `state` bit(1) NOT NULL DEFAULT (1),
  `id_rol` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `nameUser` (`nameUser`),
  KEY `id_rol` (`id_rol`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ztechnology.users: 11 rows
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
REPLACE INTO `users` (`id`, `names`, `nameUser`, `email`, `password`, `state`, `id_rol`, `createdAt`, `updatedAt`) VALUES
	(1, 'Victor Manuel', 'Lolitor7', 'carvajal@gmail.com', 'Victor57685', b'1', 2, '2023-10-25 21:48:56', '2023-12-02 13:57:31'),
	(2, 'Oscar', 'Oscar02', 'oscar@gmail.com', '$2a$10$BmXXAqpRXK1TuV7Q4ounl.gcci3om2zscO0I/som0nVAdWfu4FfTa', b'1', 1, '2023-10-25 21:48:56', '2023-12-02 13:57:41'),
	(3, 'Carlos antonio', 'Carlitos', 'carlitoselmejor@outlook.com', '$2a$10$IuHT15iPatCz2Qp0O28OYe.53Y0zfZGG3aZeM8.Csr9OMsKFdJ.D.', b'1', 1, '2023-10-25 21:48:56', '2023-11-29 16:59:53'),
	(4, 'Jose Miguel', 'Miguelito', 'miguel23@gmail.com', '$2a$10$Z85u6YKj9vu3fya.Qz4u.O9EmIG3K8kuJYfCu0xqtHV2eZXGjIPX6', b'1', 2, '2023-10-25 21:48:56', '2023-10-31 19:35:24'),
	(5, 'Juan Jose', 'Juanjo', 'josegutierrez@gmail.com', '$2a$10$SQwbOY3wXY.Rbw2MIMKJmOGv8/mPwz4QVltTEn3tQVjqCe5UEgiKi', b'1', 1, '2023-10-25 21:48:56', '2023-10-31 19:35:25'),
	(6, 'Esteban Perez', 'EstebanP', 'estebanperez@gmail.com', '$2a$10$BHtKRz19hgNib9z44kqUvOko..L0zCRPGVF/DPXYhP9WHRI1oXS.q', b'1', 1, '2023-10-25 21:48:56', '2023-10-31 19:35:26'),
	(7, 'Isabela Bolivar', 'Isatrol', 'isabolivar@gmail.com', '$2a$10$AV8nfo9PoEZxpE9KEoX3YOK0AOwl033k/moPbG2acRJVCIgmGQAQm', b'1', 1, '2023-10-25 21:48:56', '2023-10-31 19:35:27'),
	(8, 'Valentina Dussan', 'Valenduwu', 'dussan@gmail.com', '$2a$10$luV.w5BNXifXlZKlSrQlwefw3kzDBqkoIOnvtEfuXWfYdeEdEzVyq', b'1', 1, '2023-10-25 21:48:56', '2023-12-01 00:36:43'),
	(43, 'rodrigo', 'rodri', 'rodri@gmail.com', '$2a$10$rhAmdP71vbKB/xPV19lsdu8c1WiqTXrD1CXWVfhhhXrxCv4.bhOWC', b'1', 2, '2023-11-30 20:34:06', '2023-12-04 19:34:44'),
	(41, 'camila', 'camz', 'camz@gmail.com', '$2a$10$1YXbsYEEnfH9s5kw4zFKHOPSdXtb0F0DsGJGLDAMIj4eHNfmi10PK', b'1', 1, '2023-11-27 21:41:20', '2023-12-04 19:53:41'),
	(42, 'cesar', 'ciwi', 'cesar@gmail.com', '$2a$10$pHEfIy10og1rnCP3YxKx2ufsmqz9V8uPlnRlwOkoeEP9Dw.guYRue', b'1', 1, '2023-11-29 13:08:49', '2023-11-29 13:08:49');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
