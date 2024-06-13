class ordersModel {
  orderId = null;
  custName = null;
  email = null;
  phone = null;
  status = null;
  createdDate =null;
  orderValue= null;
  updatedDate =null;

  fill(orderId, 
    custName, 
    email,
    phone,
    status,
    createdDate,
    orderValue,updatedDate
  ){
    (this.orderId = orderId),
      (this.custName = custName),
      (this.email = email),
      (this.phone = phone),
      (this.status = status);
      this.createdDate =createdDate;
      (this.orderValue=orderValue);
      this.updatedDate =updatedDate;
  }
}
module.exports = {ordersModel};
