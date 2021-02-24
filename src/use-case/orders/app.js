const {valStock,valFinalOrder} = require('../../entities/orders/app')
const query = require('../../data-access/connection/orders/app')
const randomstring = require('randomstring')

const fetchProdByCodes = require('./fetchProdByCode')
const reduceStocks = require('./stocksSub')
const fetchProdOrders = require('./fetchProdOrders')
const postedOrders = require('./makeOrder')

const fetchProdByCode = fetchProdByCodes({query})
const reduceStock = reduceStocks({valStock,query,randomstring})
const fetchProd = fetchProdOrders({query})
const postedOrder = postedOrders({query,valFinalOrder})


const services = Object.freeze({
    reduceStock,fetchProd,fetchProdByCode,postedOrder
})

module.exports = services
module.exports = {reduceStock,fetchProd,fetchProdByCode,postedOrder}