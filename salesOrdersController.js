const {
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
} = require("./repository");


const createProductController = async (req, res) => {
    try {
    
      const data = {
        productId: req.body.productId,
        productName: req.body.productName,
        productCode: req.body.productCode,
        price: req.body.price,
        productStatus: req.body.productStatus,
        createdDate : new Date().toISOString()        
      };
  
      const newProduct = await createProductsRepository(data);
  
      res.status(201).json({
        message: 'Product created successfully',
        product: newProduct
      });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(400).json({
        message: 'Bad request',
        error: error.message
      });
    }
  };


const updateProductController = async (req, res) => {
    try {
      
      const data = {
        productId: req.params.productId,
        productName: req.body.productName,
        productCode: req.body.productCode,
        price: req.body.price,
        productStatus: req.body.productStatus,
        updatedDate: new Date().toISOString() 
      };
      
      
      const updateResult = await updateProductsRepository(data);
  
      if (updateResult.success) {
        res.status(200).json(updateResult);
    } else {
        throw new Error(updateResult.message);
    }
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(400).json({
        message: 'Bad request',
        error: error.message
      });
    }
  };


const deleteProductController = async (req, res) => {
    try {
      const productId = req.params.productId; 
  
     
      const result = await deleteProductRepository(productId);
      if(result.success) {
      res.status(200).json(result);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(400).json({
        message: 'Bad request',
        error: error.message
      });
    }
  };


const getAllProductsController = async(req,res)=>{
    try {
       const products = await getAllProductsRepository();

        if (products.length === 0) {
            return res.status(404).json({
                message: 'No products found'
            });
        }

        res.status(200).json({
            message: 'Products fetched successfully',
            products: products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

const getProductsByIdController = async (req, res) => {
    const productId = req.params.productId; 

    try {
        
        const product = await getProductById(productId);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json({
            message: 'Product fetched successfully',
            product: product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

//orders controller

const getOrdersByIdController = async (req, res) => {
    const orderId = req.params.orderId; 

    try {
       
        const order = await getOrdersByIdRepository(orderId);

        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }

        res.status(200).json({
            message: 'Order fetched successfully',
            order: order
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};


const getAllOrdersController = async (req, res) => {
    try {
        const orders = await getAllOrdersRepository();

        if (orders.length === 0) {
            return res.status(404).json({
                message: 'No orders found'
            });
        }

        res.status(200).json({
            message: 'Orders fetched successfully',
            orders: orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

const createOrdersController = async (req, res) => {
    try {
        const { custName, email, phone, status, orderValue } = req.body;
        const data = {
            custName,
            email,
            phone,
            status,
            orderValue
        };
        const newOrder = await createOrdersRepository(data);
        res.status(201).json({
            message: 'Order created successfully',
            order: newOrder
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(400).json({
            message: 'Bad request',
            error: error.message
        });
    }
};


const updateOrdersController = async (req, res) => {
    try {
        const orderId = req.params.orderId; 
        const { custName, email, phone, status, orderValue } = req.body; 
        const existingOrder = await getOrdersByIdRepository(orderId);
        if (!existingOrder) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        const data = {
            orderId,
            custName,
            email,
            phone,
            status,
            orderValue
        };
        const updatedOrder = await updateOrdersRepository(data);
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(400).json({
            message: 'Bad request',
            error: error.message
        });
    }
};


const deleteOrdersController = async (req, res) => {
    try {
        const orderId = req.params.orderId; 
        const existingOrder = await getOrdersByIdRepository(orderId);
        if (!existingOrder) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        await deleteOrderRepository(orderId);

       
        res.status(200).json({
            message: 'Order deleted successfully',
            orderId: orderId
        });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(400).json({
            message: 'Bad request',
            error: error.message
        });
    }
};


//sales orders products controller

const createNewSalesOrderController = async (req, res) => {
    try {
        const { custName, email, phone, status, orderValue, products } = req.body;

        // Step 1: Create the order
        const newOrder = await createOrdersRepository({ custName, email, phone, status, orderValue });

        // Step 2: Attach products with  order id
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                message: 'Invalid products data'
            });
        }

        const attachedProducts = await attachProductsToSalesOrderRepository(newOrder, products);

        // Respond with the created order and attached products
        res.status(201).json({
            message: 'Sales order created successfully',
            order: newOrder,
            products: attachedProducts
        });
    } catch (error) {
        console.error('Error creating sales order:', error);
        res.status(400).json({
            message: 'Bad request',
            error: error.message
        });
    }
};



const getSalesOrderProductsByIdController = async (req, res) => {
    const { orderId } = req.params; // Assuming orderId is part of the URL params
  
    try {
      const salesOrderProducts = await getSalesOrderProductsById(orderId);
  
      if (salesOrderProducts.length === 0) {
        return res.status(404).json({
          message: 'No sales order products found for the specified order ID'
        });
      }
  
      res.status(200).json({
        message: 'Sales order products fetched successfully',
        salesOrderProducts: salesOrderProducts
      });
  
    } catch (error) {
      console.error('Error fetching sales order products:', error);
      res.status(500).json({
        message: 'Internal server error',
        error: error.message
      });
    }
  };



  const getAllSalesOrderProductsController = async (req, res) => {
    try {
      const { orderId, name, email, phone, status ,date} = req.query;
  
      const filters = { orderId, name, email, phone ,status,date};
      
      const results = await getAllSalesOrderProductsRepository(filters);
                
      if (results.length === 0) {
        return res.status(404).json({
          message: 'No sales orders found'
        });
      }
  
      const formattedResponse = results.reduce((acc, curr) => {
        // Check if the order already exists in the accumulator
        const existingOrder = acc.find(order => order.orderId === curr.orderId);
  
        // If not, add it to the accumulator
        if (!existingOrder) {
          acc.push({
            orderId: curr.orderId,
            customerName: curr.customerName,
            email: curr.email,
            phone: curr.phone,
            orderDate : curr.OrderDate,
            status:curr.status,            
            products: [
              {
                productId: curr.productId,
                productName: curr.productName,
                quantity: curr.quantity,
                unitPrice: curr.unitPrice,
                totalPrice: curr.quantity * curr.unitPrice
              }
            ]
          });
        } else {
          // If exists, append to existing products array
          existingOrder.products.push({
            productId: curr.productId,
            productName: curr.productName,
            quantity: curr.quantity,
            unitPrice: curr.unitPrice,
            totalPrice: curr.quantity * curr.unitPrice
          });
        }
  
        return acc;
      }, []);
  
      res.status(200).json({
        message: 'Sales orders fetched successfully',
        salesOrders: formattedResponse
      });
  
    } catch (error) {
      console.error('Error fetching sales orders:', error);
      res.status(500).json({
        message: 'Internal server error',
        error: error.message
      });
    }
  };

  module.exports={
    getAllProductsController,
    getProductsByIdController,
    createProductController,
    updateProductController,
    deleteProductController,
    getOrdersByIdController,
    getAllOrdersController,
    createOrdersController,
    updateOrdersController,
    deleteOrdersController,
    createNewSalesOrderController,
    getSalesOrderProductsByIdController,
    getAllSalesOrderProductsController,
  }