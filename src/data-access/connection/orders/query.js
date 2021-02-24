const Query = ({ connections, models }) => {
    return Object.freeze({
        CheckProductStocks,
        UpdateProduct,
        addOrderCustomer,
        AddProdOrders,
        AddOrders,
        fetchProdOrders,
        fetchAllProdOrders,
        fetchOrdersByOrderCode,
        checkProductCodeinOrders,
        checkUniqueIdLimited,
        fetchProductOrderusingCode,
    });
    //check the stock level
    async function CheckProductStocks(info) {
        try {
            const Product = await models.product
            const res = await Product.findOne({ where: { product_barcode: info.product_id } })  
            return res
        } catch (error) {
            console.log(error.message)
        }
    }
    // update Product stocks
    async function UpdateProduct(info) {
        try {
            const { product_id, stocks,product_barcode } = info
            const pool = await connections()
            const res = await new Promise((resolve) => {
                pool.query(`UPDATE public.products
            SET stocks= stocks - ${stocks}
            WHERE product_id = $1 AND product_barcode = $2`, [product_id,product_barcode], (err, res) => {
                    if (err) resolve(err)
                    resolve(res)
                })
            })
            return res
        } catch (error) {
            console.log(error.message)
        }
    }
    //add customer
    async function addOrderCustomer(info) {
        try {
            const Customer = await models.customers
            const result = await Customer.create({
                fullname: info.fullname,
                contact: info.contact,
                address: info.address
            })
            return result
        }
        catch (e) {
            console.log("Error: ", e)
        }
    }

    //insert product Orders

    async function AddProdOrders(info) {
        try {
            const Orders = await models.product_orders
            const res = await Orders.create({ 
                original_product_id:info.product_id,
                product_barcode:info.product_barcode,
                product_barcode:info.product_barcode,
                product_name: info.product_name,
                product_quantity: info.product_quantity,
                product_price: info.price,
                order_code: info.order_code,
                product_total: info.product_total,
                product_customer: info.product_customer,
            });
            return res
        } catch (error) {
            console.log(error.message)
        }
    }

    //insert Orders

    async function AddOrders(info) {
        try {
            const Orders = await models.orders
            const res = await Orders.create({
                order_code: info.order_code,
                order_date: info.order_date,
                total_payment: info.price,
                customer_name: info.product_customer,
            });
            return res
        } catch (error) {
            console.log(error.message)
        }
    }
    //fetch Order Products based from order code
    async function fetchProdOrders( info ) {
        try {
            const Orders = await models.product_orders
            console.log(info)
            const res = await Orders.findAll({ where: { order_code: info.order_code } });
            const data = []; 
            if (res) {
              
                for (let i = 0; i < res.length; i++) {
                    const array = res[i];
                       data.push({
                        product_id:info.product_id,
                        product_barcode: array.dataValues.product_barcode,
                        product_name: array.dataValues.product_name,
                        product_quantity: array.dataValues.product_quantity,
                        product_price: array.dataValues.product_price,
                        order_code: array.dataValues.order_code,
                        product_total: array.dataValues.product_total,
                        product_customer: array.dataValues.product_customer,
                       
                    });
                } 
            }
            return data
        } catch (error) {
            console.log(error.message)
        }
    }

    //fetch all Order Products 
    async function fetchAllProdOrders() {
        try {
            const Orders = await models.product_orders
            const res = await Orders.findAll();
            const data = [];
            if (res) {
                for (let i = 0; i < res.length; i++) {
                    const array = res[i];
                    data.push({
                        product_barcode: array.dataValues.product_barcode,
                        product_name: array.dataValues.product_name,
                        product_quantity: array.dataValues.product_quantity,
                        product_price: array.dataValues.product_price,
                        order_code: array.dataValues.order_code,
                        product_total: array.dataValues.product_total,
                        product_customer: array.dataValues.product_customer,
                    });
                }
                
            }
           return data
        } catch (error) {
            console.log(error.message)
        }
    } 
 //fetch the order and group by orderID
 async function fetchOrdersByOrderCode() {
    try {
        const pool = await connections()
        const res = await new Promise((resolve) => {
            pool.query(`SELECT order_id, order_code, order_date, total_payment, customer_name 
            FROM public.orders GROUP BY order_code, order_id`, (err, res) => {
                if (err) resolve(err)
                resolve(res)
            })
        })
        return res
    } catch (error) {
        console.log(error.message)
    }
    } 
    //find if there is existing product_code
    async function checkProductCodeinOrders(info) {
        try {
            const Orders = await models.orders
            
            const res = await Orders.findAll({ where: { order_code: info } }) 
             
            return res
        } catch (error) {
            console.log(error.message)
        }
        } 
        //find if there is existing product_code
      async function fetchProductOrderusingCode(info) {
            try {
                const Orders = await models.product_orders 
                const res = await Orders.findAll({ where: { order_code: info } })  
                const data = [];
            if (res) {
                for (let i = 0; i < res.length; i++) {
                    const array = res[i];
                    data.push({
                        original_product_id: array.dataValues.original_product_id,
                        product_barcode: array.dataValues.product_barcode, 
                        product_quantity: array.dataValues.product_quantity,
                        product_price: array.dataValues.product_price, 
                        product_total: array.dataValues.product_total, 
                    });
                } 
            }
                return data
            } catch (error) {
                console.log(error.message)
            }
            }  
             //find if there is existing product_code
    async function checkUniqueIdLimited() {
        try {
            const pool = await connections()
        const res = await new Promise((resolve) => {
            pool.query(`SELECT order_code FROM public.product_orders ORDER BY order_code ASC LIMIT 1 ;`, (err, res) => {
                if (err) resolve(err)
                resolve(res)
            })
        })
        return res
        } catch (error) {
            console.log(error.message)
        }
        }


}
module.exports = Query
