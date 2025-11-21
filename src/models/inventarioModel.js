import pool from "../../db/config.js"
import format from "pg-format"

//GET
// export const getInventarioModel = async()=>{
//     const {rows} = await pool.query ("select * from inventario")
//     return rows
// }

export const getInventarioModel = async({order_by = 'id_asc', limit = 3, page = 1})=>{
    const [atribute, direccion] = order_by.split('_')
    const offset = (page - 1) * limit
    const formatQuery = format(
        'select * from inventario order by %s %s limit %s offset %s',
        atribute,
        direccion,
        limit,
        offset
    )
    console.log(formatQuery)
    const response = await pool.query (formatQuery)
    return response.rows
}

export const getFiltroModel = async({precio_min, precio_max, categoria, metal}) =>{
    const filtros =[]
    if (precio_min){
        filtros.push(`precio >= ${precio_min}`)
    }

    if (precio_max){
        filtros.push(`precio <= ${precio_max}`)
    }

    if (categoria){
        filtros.push(`categoria = '${categoria}'`)
    }

    if (metal){
        filtros.push(`metal = '${metal}'`)
    }

    let consulta = 'Select * from inventario'
    if (filtros.length>0){
        consulta +=' where '+ filtros.join(' and ')
    }

    console.log(consulta)
    const result = await pool.query(consulta)
    return result.rows
}