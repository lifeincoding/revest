class salesOrderProducts {
    salesOrderProductsId = null;
    orderId = null;
    productId = null;
    quantity = null;
    createdDate = null;    
    updatedDate = null;
   
  
    fill(
      salesOrderProductsId,
      orderId,
      productId,
      quantity,
      createdDate,      
      updatedDate,
     
    ) {
      this.salesOrderProductsId = salesOrderProductsId;
      this.orderId = orderId;
      this.productId = productId;
      this.quantity = quantity;
      this.createdDate = createdDate;      
      this.updatedDate = updatedDate;
     
    }
  }
  
  module.exports = { salesOrderProducts };
  