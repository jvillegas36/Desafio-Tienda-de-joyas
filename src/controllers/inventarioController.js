import { getFiltroModel, getInventarioModel } from "../models/inventarioModel.js"

const prepararHATEOAS = (consulta) => {
    const results = consulta.map((m) => {
    return {
        name: m.nombre,
        href: `/joyas/joya/${m.id}`,
    }}).slice(0, 4)
    
    const stockTotal = consulta.reduce((acc, item) => acc + Number(item.stock), 0);

    const totalJoyas = consulta.length
    const HATEOAS = {
    totalJoyas,
    stockTotal: stockTotal,
    results
    }
    return HATEOAS
}

export const getAllInventario = async(req, res) =>{
    try {
        const filters = req.query
        const joyas = await getInventarioModel(filters)
        const hateoas = prepararHATEOAS(joyas)
        
      return res.json(hateoas)
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
}

export const inventarioFilter = async(req, res)=>{
    try {
        const filters = req.query
        const result = await getFiltroModel(filters)
        res.status(200).json({travel: result})
    } catch (error) {
                 res.status(500).send({error:'Error al procesar la solicitud'})
         console.error('Error =>', error)
    }
}
