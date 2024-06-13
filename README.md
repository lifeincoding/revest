# revest
# revest
In this Assignment Module  Slaes Orders , products CRUD APis are created 
1. Followed MVC Structure
2. created Models for Orders and products
3. Index.js as the main file used for  server setup and clustered with maximum avilable CPUS
4. Routes.js : file to hgandle all the hhtp requests 
5. salesOrdersController   : managed all the controller functions for navigating the endpoint URLs Business Logics
6. repository.js : All the database quieries are handled   within the file to get and insert data
7. Database.js file is  configured with mysql connections
8. morgan dev dependency package is used for monitoring the API Requests
9. Cors is configured & enabled
10. Postman Api Testing collection  is Attached to the email

Functionalities:
1.Create, get, getall ,update and delete Products
2. create orders mapping with products
3. get All Sales orders with common filters like name email ophone status etc

Framework Used : Express 
Database : Mysql 
 API Documentation Link : https://documenter.getpostman.com/view/28044575/2sA3XPCNFz 

Database Schema :

 Database: `revest_salesorders`


-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `cust_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created_date` date NOT NULL,
  `order_value` varchar(255) NOT NULL,
  `updated_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `cust_name`, `email`, `phone`, `status`, `created_date`, `order_value`, `updated_date`) VALUES
(1, 'John Doe', 'john.doe@example.com', 123, 1, '2024-06-13', '150.25', '0000-00-00'),
(2, 'Rahul', 'rahul@gmail.com', 1234567890, 2, '2024-06-13', '150.25', '2024-06-13'),
(3, 'Ajay', 'john.doe@example.com', 123, 1, '2024-06-13', '150.25', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_code` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `product_status` tinyint(4) NOT NULL COMMENT '1.Active\r\n2.Inactive\r\n',
  `created_date` date DEFAULT NULL,
  `updated_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_code`, `price`, `product_status`, `created_date`, `updated_date`) VALUES
(1, 'Study Table', 'ST', '29.99', 1, '2024-06-13', NULL),
(2, 'Updated Product Name', 'UPD123', '49.99', 2, '2024-06-13', '2024-06-12'),
(3, 'Study Table with chair', 'STWC', '29.99', 1, '2024-06-13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sales_orders_products`
--

CREATE TABLE `sales_orders_products` (
  `sales_order_product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_date` date NOT NULL,
  `updated_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales_orders_products`
--

INSERT INTO `sales_orders_products` (`sales_order_product_id`, `order_id`, `product_id`, `quantity`, `created_date`, `updated_date`) VALUES
(1, 2, 1, 2, '2024-06-13', '0000-00-00'),
(2, 2, 3, 1, '2024-06-13', '0000-00-00'),
(3, 3, 1, 2, '2024-06-13', '0000-00-00'),
(4, 3, 3, 1, '2024-06-13', '0000-00-00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `sales_orders_products`
--
ALTER TABLE `sales_orders_products`
  ADD PRIMARY KEY (`sales_order_product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sales_orders_products`
--
ALTER TABLE `sales_orders_products`
  MODIFY `sales_order_product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;





