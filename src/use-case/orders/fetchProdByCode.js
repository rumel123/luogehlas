const fetchProdByCodes = ({query}) => {
    return async function select(info) {
        let data = [] 
          //fetch if have id
        const res = await query.fetchOrdersByOrderCode()
        //fetch rows
        console.log(res.rows)
        const msg = `There is nothing to fetch!`;
        if (res.rowCount > 0) return res.rows
         return msg
      }  
}

module.exports = fetchProdByCodes