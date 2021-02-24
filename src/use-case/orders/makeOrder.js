const postedOrders = ({ query, valFinalOrder }) => {
    return async function select(info) {

        const datas = await valFinalOrder(info)
        let data = {
            fullname: datas.getF(),
            contact: datas.getC(),
            address: datas.getA(),
        }

        //get date
        let date_ob = new Date();
        let todaydate = ("0" + date_ob.getDate()).slice(-2);
        let todaymonth = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let todayyear = date_ob.getFullYear();
        //unique 
        let time = [data.fullname, todaydate, todaymonth, todayyear,]
        const unique = time.join("-")
        let order_code = unique + '__' + 1;
        const fetchCode = await query.checkUniqueIdLimited()
        const DataArray = info.DataArray
        const TotalAll = info.Total
        const systRes = fetchCode.rows[0]['order_code']
        let splitted = systRes.split('__')[0]
        let numSplit = parseInt(systRes.split('__')[1])


        if (splitted == unique) {
            let Numsub = numSplit++
            const newCode = splitted + '__' + Numsub
            //insert customer first
            const customersQuery = await query.addOrderCustomer({ fullname: data.fullname, contact: data.contact, address: data.address })
            //create order here and update product table 
            for (let i = 0; i < DataArray.length; i++) {
                const element = DataArray[i];
                //update item
                const reducedQty = await query.fetchProductOrderusingCode(newCode)
                const reducedInf = reducedQty[i]
                //update data
                const reduced = await query.UpdateProduct({ product_id: reducedInf.original_product_id, stocks: reducedInf.product_quantity, product_barcode: element })
                //create Order
            }
            const res = await query.AddOrders({ order_code: order_code, order_date: date_ob, total_payment:TotalAll, customer_name: data.fullname })
            //create order here and update product table 
            return res
        }
        else {
            //insert customer first
            const customersQuery = await query.addOrderCustomer({ fullname: data.fullname, contact: data.contact, address: data.address })
            //create order here and update product table 
            for (let i = 0; i < DataArray.length; i++) {
                const element = DataArray[i];
                //update item
                const reducedQty = await query.fetchProductOrderusingCode(order_code)
                const reducedInf = reducedQty[i]
                //update data
                const reduced = await query.UpdateProduct({ product_id: reducedInf.original_product_id, stocks: reducedInf.product_quantity, product_barcode: element })
                //create Order
            }
            const res = await query.AddOrders({ order_code: order_code, order_date: date_ob, total_payment:TotalAll, customer_name: data.fullname })
            //create order here and update product table 
            return res
        }
    }
}

module.exports = postedOrders 