import {categoria}  from "../modelos/categoria_modelo.js";

export const createCategoria =async(categoriaData,res) =>{
   
    try {
        const categoria2=  await categoria.create(categoriaData);
        return categoria2;
    } catch (error) {
        res.status(400).json({ message: 'ERROR!!!!' });
    }
}