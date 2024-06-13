const { connectDatabase, runQuery } = require("./database");
const  {productsModel}  = require("./models/products")
const {ordersModel } = require("./models/orders")
const {salesOrdersProductsModel} = require("./models/salesOrderProducts")

// Initialize database connection
connectDatabase().catch(error => {
  console.error('Database connection failed. Exiting application.');
  process.exit(1); // Exit application if database connection fails
});


//products Repositories
//1. Get All Products 
const getAllProductsRepository = async ()=>{
    try {
        let array = [];
    let query = "select * from `products` where 1=1  ";
    let results = await runQuery(query);
    let count = results.length;
    if (count != 0) {
      for (let i = 0; i < count; i++) {
        let model = new productsModel();
        let result = results[i];
        model.fill(
          (productId = result.product_id),
          (productName = result.product_name),
          (productCode = result.product_code),
          (price = result.price),
          (productStatus = result.product_status),
          (createdDate = result.created_date),
          (updatedDate = result.updated_date)
        );
        array.push(model);
      }
        
    } 

    return array;
    }
    catch (error) {
        throw error;
    }

}

const createProductsRepository = async(data)=>{
try {
  const query = `
  INSERT INTO products (product_name, product_code, price, product_status,created_date)
  VALUES (?, ?, ?, ?,?);
`;
    const values = [     
      data.productName,
      data.productCode,
      data.price,
      data.productStatus,
      data.createdDate
      
    ];

    const result = await runQuery(query, values);  
     return result.insertId;
} catch (error) {
 
    throw error;
}
}


const getProductById = async (productId) => {
    try {
      const query = `
        SELECT * FROM products
        WHERE product_id = ?
      `;
      const values = [productId];
  
      const result = await runQuery(query, values);
      return result;
      
    } catch (error) {
      throw error;
    }
  };
  
  const updateProductsRepository = async (data) => {
    try {
      //record check
   
      const existingProduct = await getProductById(data.productId);
      if (!existingProduct) {
        throw new Error('Product not found');
      }
  
      // If the product exists then updeate
      const query = `
        UPDATE products
        SET product_name = ?,
            product_code = ?,
            price = ?,
            product_status = ?,
            updated_date = ?
        WHERE product_id = ?        ;
      `;
      const values = [
        data.productName,
        data.productCode,
        data.price,
        data.productStatus,
        data.updatedDate,
        data.productId
      ];
  
      const result = await runQuery(query, values);
        if (result && result.affectedRows > 0) {
            return { success: true, message: 'Product updated successfully' };
        } else {
            throw new Error('Failed to update product');
        }
    } catch (error) {
      throw error;
    }
  };


  const deleteProductRepository = async (productId) => {
    try {
     
      const existingProduct = await getProductById(productId);
      if (!existingProduct) {
        throw new Error('Product not found');
      }
      const query = `
        DELETE FROM products
        WHERE product_id = ?
      `;
      const values = [productId];
  
      const  result = await runQuery(query, values);
      if (result && result.affectedRows > 0) {
        return { success: true, message: 'Product deleted successfully' };
    } else {
        throw new Error('Failed to delete product');
    }
    } catch (error) {
      throw error;
    }
  };


//Orders Repositories  

const getAllOrdersRepository = async()=>{
    try {
        let array =[];
        let query = "select * from orders where 1=1";
        let results = await runQuery(query);
        let count = results.length;
        if (count != 0) {
        for (let i = 0; i < count; i++) {
            let model = new ordersModel();
            let result = results[i];
            model.fill(
                result.orderId,
                result.custName,
                result.email,
                result.phone,
                result.status,
                result.createdDate,
                result.orderValue,
                result.updatedDate
            );
            array.push(model);
        }
            
        }
        

        return array;

    } catch (error) {
        throw error;

    }
}


const getOrdersByIdRepository = async (orderId) => {
    try {
        let query = `SELECT * FROM orders WHERE order_id = ?`;
        let result = await runQuery(query, [orderId]);        
        if (result.length === 0) {
            return null; 
        }        
        let orderData = result[0];        
        let order = new ordersModel();
        order.fill(
            orderData.orderId,
            orderData.custName,
            orderData.email,
            orderData.phone,
            orderData.status,
            orderData.createdDate,
            orderData.orderValue,
            orderData.updatedDate
        );

        return order;
    } catch (error) {
        throw error;
    }
};

const createOrdersRepository = async (data) => {
    try {
        const { custName, email, phone, status, orderValue } = data;
        const query = `
            INSERT INTO orders (cust_name, email, phone, status, order_value, created_date)
            VALUES (?, ?, ?, ?, ?, NOW())`;

        
        const values = [custName, email, phone, status, orderValue];
        const result = await runQuery(query, values);

        if (result.length === 0) {
            throw new Error('Failed to create order');
        }

        return result.insertId; // Return the newly created order
    } catch (error) {
        throw error;
    }
};


const updateOrdersRepository = async (data) => {
    try {
        const { orderId, custName, email, phone, status, orderValue } = data;
        const existingOrder = await getOrdersByIdRepository(orderId);
        if (!existingOrder) {
            throw new Error('Order not found');
        }
        const updateQuery = `
            UPDATE orders
            SET cust_name = ?,
                email = ?,
                phone = ?,
                status = ?,
                order_value = ?,
                updated_date = NOW()
            WHERE order_id = ?`;
        const updateValues = [custName, email, phone, status, orderValue, orderId];
        const updateResult = await runQuery(updateQuery, updateValues);

        if (updateResult && updateResult.affectedRows > 0) {
          return { success: true, message: 'Order updated successfully' };
        } 
        else {
          throw new Error('Failed to update Order');
        }

        
    } catch (error) {
        throw error;
    }
};

const deleteOrderRepository = async(orderId)=>{
    try {
        
    } catch (error) {
        throw error;
    }
}
//Sales Orders Products Repositories

const attachProductsToSalesOrderRepository = async (salesOrderId, products) => {
    try {
        const queries = products.map(product => {
            return {
                query: `
                    INSERT INTO sales_orders_products (order_id, product_id, quantity,created_date)
                    VALUES (?, ?, ?,NOW())`,
                values: [salesOrderId, product.productId, product.quantity]
            };
        });

        const results = await Promise.all(queries.map(q => runQuery(q.query, q.values)));
        return results.map(result => result.insertId);
    } catch (error) {
        throw error;
    }
};



const getSalesOrderProductsById= async(orderId)=>{
try {
    let array =[];
    let query = "select * from sales_orders_products where order_id = ?";
    let results = await runQuery(query,[orderId]);
    let count = results.length;
    if (count != 0) {
        for (let i = 0; i < count; i++) {
            let model = new salesOrdersProductsModel();
            let result = results[i];
            model.fill(
                results.salesOrderProductsId,
                results.orderId,
                results.productId,
                results.quantity,
                results.createdDate,      
                results.updatedDate,
            );
            array.push(model);
        }
            
    }
    return array;
    
} catch (error) {
    throw error;

}
}

  const getAllSalesOrderProductsRepository = async (filters) => {
    try {
      let values = [];
      let filterClauses = [];
      console.log(filters);
  
      // add the filters
      if (filters.orderId) {
        filterClauses.push('sop.order_id = ?');
        values.push(filters.orderId);
      }
      if (filters.name) {
        filterClauses.push('o.cust_name LIKE ?'); 
        values.push(`%${filters.name}%`);
      }
      if (filters.email) {
        filterClauses.push('o.email LIKE ?');
        values.push(`%${filters.email}%`);
      }
      if (filters.phone) {
        filterClauses.push('o.phone LIKE ?');
        values.push(`%${filters.phone}%`);
      }

      if (filters.status) {
        filterClauses.push('o.status = ?');
        values.push(filters.status);
      }

      if (filters.date) {
      
        filterClauses.push('o.created_date >= ?');
        values.push(filters.date);

        
      }
  
      
      let query = `
        SELECT 
            o.order_id AS orderId,           
            o.cust_name AS customerName,
            o.email,
            o.phone,
            o.status,
            o.created_date AS OrderDate,
            o.order_value AS totalPrice,
            p.product_id AS productId,
            p.product_name AS productName,
            p.price AS unitPrice,
            sop.quantity
        FROM 
           orders o
        JOIN 
           sales_orders_products sop ON sop.order_id = o.order_id
        JOIN 
           products p ON sop.product_id = p.product_id
      `;
  
      if (filterClauses.length > 0) {
        query += ' WHERE ' + filterClauses.join(' AND ');
      }
      
      console.log(query);
      const results = await runQuery(query, values);
      return results;
  
    } catch (error) {
      throw error;
    }
  };



module.exports={
    getAllProductsRepository,
    getProductById,
    createProductsRepository,
    updateProductsRepository,
    deleteProductRepository,
    getOrdersByIdRepository,
    getAllOrdersRepository,   
    createOrdersRepository,
    updateOrdersRepository,
    deleteOrderRepository,
    attachProductsToSalesOrderRepository,
    getSalesOrderProductsById,
    getAllSalesOrderProductsRepository,
}