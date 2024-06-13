class productsModel {
  productId = null;
  productName = null;
  productCode=null;
  price=null;
  productStatus = null;
  createdDate = null;
  updatedDate = null;

  fill(
    productId,
    productName,
    productCode,
    price,
    productStatus,   
    createdDate,
    updatedDate,
   
  ) {
    this.productId = productId;
    this.productName = productName;
    this.productCode =productCode;
    this.price=price;
    this.productStatus = productStatus; 
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;

  }
}

module.exports = { productsModel };
