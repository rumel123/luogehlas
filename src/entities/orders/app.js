
const randomstring = require('randomstring')

const valStocks = require('./valStocks') 
const valFinalOrders = require('./finalOrders')
 
const valStock = valStocks({randomstring}) 
const valFinalOrder = valFinalOrders({})
 
const services =  Object.freeze({
    valStock,valFinalOrder
    })
 module.exports = services
 module.exports = {valStock,valFinalOrder}