const valFinalOrders = ({}) => {
    return async function make({ fullname, contact, address } = {}) {

        if (!fullname) { throw new Error("Please complete your Fullname!!") }
        if (!contact) { throw new Error("Please provide Contact Number!!") }
        if (!address) { throw new Error("Please put your Address!!") }
        return Object.freeze({
            
            getF:()=> fullname, 
            getC:()=> contact,
            getA:()=> address, 
             
        })
    }
}

module.exports = valFinalOrders