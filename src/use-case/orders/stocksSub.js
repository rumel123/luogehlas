
const reduceStocks = ({ valStock, query, randomstring }) => {
    return async function select(info) {
        const datas = await valStock(info)
        let dataArr = {
            product_id: datas.getproduct_barcode(),
            stocks: datas.getstocks(),
            fullname: datas.getF(),
            contact: datas.getC(),
            address: datas.getA(),
        }
        let ArrData = []
        let date_ob = new Date();

        //fetch data that will make  a reduction in stocks
        const results = await query.CheckProductStocks(dataArr)
        if (!results){throw new Error(`Data doesn't Exist`)}
        const DataVal = results.dataValues
        //throw error if there is no stock left
        const User_stocks = DataVal.stocks
        if (!User_stocks) { throw new Error(`There no stocks Left on this item!`) }
        else if //throw error if the stock is short
            (dataArr.stocks > User_stocks) { throw new Error(`Short of stocks please add`) }
        const total = dataArr.stocks * DataVal.price
        let product_id = DataVal.product_id
        //get date
        let todaydate = ("0" + date_ob.getDate()).slice(-2);
        let todaymonth = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let todayyear = date_ob.getFullYear();
        let time = [dataArr.fullname, todaydate, todaymonth, todayyear,]
        const unique = time.join("-")
        let order_code = unique + '__' + 1;
        const fetchCode = await query.checkUniqueIdLimited()



        const systRes = fetchCode.rows[0]['order_code']
        let splitted = systRes.split('__')[0]
        let numSplit = parseInt(systRes.split('__')[1])
        console.log(unique)
        if (splitted == unique) {
            let Numsub = numSplit++
            const newCode = splitted + '__' + Numsub
            //create product Order here
            const ArrData = { 
                product_id:product_id,
                product_barcode: DataVal.product_barcode,
                product_name: DataVal.product_name,
                product_quantity: dataArr.stocks,
                price: DataVal.price,
                order_code: newCode,
                product_total: total,
                product_customer: dataArr.fullname,
                product_description: DataVal.product_description,
                cost_unit: DataVal.cost_unit,
                order_date: date_ob,
                stocks: DataVal.stocks,
            } //record Product Orders
            const addProd_Orders = await query.AddProdOrders(ArrData)
            //fetch record
            const fetchres = await query.fetchProdOrders({product_id:product_id,order_code:order_code})
            return fetchres
        }
        else {
            //create Product Order here
            const ArrData = { 
                product_id:product_id,
                product_barcode: DataVal.product_barcode,
                product_name: DataVal.product_name,
                product_quantity: dataArr.stocks,
                price: DataVal.price,
                order_code: order_code,
                product_total: total,
                product_customer: dataArr.fullname,
                product_description: DataVal.product_description,
                cost_unit: DataVal.cost_unit,
                order_date: date_ob,
                stocks: DataVal.stocks,
            } //record Product Orders
            const addProd_Orders = await query.AddProdOrders(ArrData)
            //fetch record
            const fetchres = await query.fetchProdOrders({product_id:product_id,order_code:order_code})
            return fetchres
        }

    }
}

module.exports = reduceStocks 