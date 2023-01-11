CREATE TABLE `categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_name` (`category_name`)
);

CREATE TABLE `order_lists` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int unsigned DEFAULT NULL,
  `product_id` int unsigned NOT NULL,
  `quantity` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_lists_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_lists_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
);

CREATE TABLE `order_statuses` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `status_name` varchar(13) DEFAULT 'NOT CONFIRMED',
  PRIMARY KEY (`id`),
  CONSTRAINT `check_status` CHECK ((`status_name` in (_utf8mb4'NOT CONFIRMED',_utf8mb4'CONFIRMED',_utf8mb4'CANCELED',_utf8mb4'COMPLETED')))
);

CREATE TABLE `orders` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_date` date DEFAULT NULL,
  `status_id` int unsigned DEFAULT '1',
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_ibfk_1` (`status_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `order_statuses` (`id`)
);

CREATE TABLE `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` double unsigned NOT NULL,
  `weight` double unsigned NOT NULL,
  `category_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
);

INSERT INTO order_statuses(status_name) values ('NOT CONFIRMED');
INSERT INTO order_statuses(status_name) values ('CONFIRMED');
INSERT INTO order_statuses(status_name) values ('CANCELED');
INSERT INTO order_statuses(status_name) values ('COMPLETED');