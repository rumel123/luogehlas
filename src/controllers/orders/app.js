 const {reduceStock,fetchProd,fetchProdByCode,postedOrder} = require('../../use-case/orders/app')

 const reduceData = require('./reducestock')
 const readOrder = require('./readData')
 const readByOrderCodes = require('./readDataCode')
 const makeOrders = require('./insertOrder')
 
 const reduceDatas = reduceData({reduceStock})
 const readOrders = readOrder({fetchProd})
 const readByOrderCode = readByOrderCodes({fetchProdByCode})
 const makeOrder = makeOrders({postedOrder})
 
 const services = Object.freeze({
    reduceDatas,readOrders,readByOrderCode,makeOrder
})

module.exports = services
module.exports = {reduceDatas,readOrders,readByOrderCode,makeOrder}
