const {reduceDatas,readOrders,readByOrderCode,makeOrder} = require('../../controllers/orders/app') 

const route = ({router,makeExpressCallback}) => {
    //configure route and attached callbacks with controller

    //Update the stocks
    router.post('/orders/',makeExpressCallback(reduceDatas)) 
    //fetch Order details
    router.get('/orders/product',makeExpressCallback(readOrders)) 
    //fetch Order details with id
    router.get('/orders/product/:id',makeExpressCallback(readOrders))
    //save orders
    router.post('/orders/save',makeExpressCallback(makeOrder)) 
    //fetch Orders
    router.get('/orders/all/',makeExpressCallback(readByOrderCode)) 
    return router
}

module.exports = route