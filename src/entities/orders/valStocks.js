
const valStocks = ({randomstring}) => {
    return async function make({ product_barcode, stocks, fullname, contact, address,DataArray } = {}) {
        if (!product_barcode) { throw new Error(`Please provide a product barcode`) }
        if (!stocks) { throw new Error(`Please provide a Stocks!`) }
        //validate if the stocks is a number
        if (typeof stocks != "number") { throw new Error(`Stock must be a number`) }
        //validate all fields to insert
        if (!fullname) { throw new Error("Please complete your Fullname!!") }
        if (!contact) { throw new Error("Please provide Contact Number!!") }
        if (!address) { throw new Error("Please put your Address!!") }
        
        return Object.freeze({
            getproduct_barcode: () => product_barcode,
            getstocks: () => stocks,
            getF:()=> fullname, 
            getC:()=> contact,
            getA:()=> address, 
            getDataArray: () => DataArray,
        })
    }
}

module.exports = valStocks