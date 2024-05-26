const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/models')
const sequelize = require('sequelize');
const Op = db.Sequelize.Op;
const productsFilePath = path.join(__dirname, '../data/products.json');
//let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const {validationResult} = require('express-validator')
//const { log, error } = require('console');

// Función para eliminar la imagen anterior
async function deleteOldImage(imageName) {
    if (imageName !== 'default-image.png') {
        fs.unlinkSync(path.join(__dirname, '../../public/images/products/', imageName));
    }
}

async function brandsByCategory(category){
    try {
        // Consulta para obtener las marcas de los productos según una categoría dada
        
        // Ejecutar la consulta utilizando el modelo Producto
        const brandsByCategory = await db.Producto.findAll({
            // Seleccionar las columnas de marca y contar el número de productos por marca
            attributes: [
                [sequelize.literal('brand.id'), 'id'],
                [sequelize.literal('brand.name'), 'nombre'],
                [sequelize.fn('COUNT', sequelize.col('brand.name')), 'cantidad']
            ],
            // Incluir las asociaciones con la marca y la categoría
            include: [
                {
                    association: "brand", // Incluir la asociación con la marca
                    attributes: [] // No seleccionar ninguna columna adicional de la marca
                },
                { 
                    association: "category", // Incluir la asociación con la categoría
                    attributes: [], // No seleccionar ninguna columna adicional de la categoría
                    where: { name: category } // Filtrar por el nombre de la categoría proporcionado en la solicitud
                }
            ],
            // Agrupar por el nombre e ID de la marca para contar correctamente el número de productos por marca
            group: ['brand.name', 'brand.id'] 
        });

        if (brandsByCategory.length > 0) {
            return brandsByCategory.map(producto => ({
                id: producto.dataValues.id,
                nombre: producto.dataValues.nombre,
                cantidad: producto.dataValues.cantidad
            }));
        } else {
            throw new Error('No se encontraron marcas para esta categoría');
        }
    } catch (error) {
        throw error;
    }
}

const productsController = {

    list: async (req, res) => {
        try {
            let products = await db.Producto.findAll({attributes:{
                include:[
                  [
                    sequelize.literal(
                      `CONCAT('${req.protocol}://${req.get('host')}/images/products/', image)`
                    ),
                    "imageUrl",
                  ],]
              }});
            let categories = await db.Categoria.findAll(); // Añade esta línea
            let users = await db.Usuario.findAll();
    
            if (!products || products.length === 0) {
                return res.status(404).json({ error: "No se encontraron productos" });
            }

            // Función de comparación aleatoria para el método sort
            function compareRandom() {
                // Devuelve un número positivo o negativo aleatorio
                return Math.random() - 0.5;
            }

            // Desordena el array de productos utilizando la función de comparación aleatoria
            products.sort(compareRandom);

            // Obtén todas las categorías
            let countByCategory = [];

            categories.forEach(category => {
                let count = products.filter(product => product.id_category === category.id).length;
                countByCategory.push({name: category.name, count: count});
            });
        
            res.status(200).json({countProducts: products.length, countByCategory, products: products, categories, usersCount : users.length ,type:"success"});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Error al buscar productos" });
        }
    },   // FUNCIONAL

    /*SELECT p.id_product, p.name, SUM(od.amount) AS total_amount
FROM products AS p
JOIN order_details AS od ON p.id_product = od.id_product
JOIN purchase_orders AS po ON po.id_order = od.id_order
WHERE po.id_state = 3
GROUP BY p.id_product, p.name
ORDER BY total_amount desc; */
    listPurchasedProducts: async (req, res) => {
        try {
            let products = await db.Producto.findAll({
                include: [
                    {
                        model: db.DetalleOrden,
                        as: 'order_details',
                        attributes: [],
                        include: [
                            {
                                model: db.OrdenDeCompra,
                                as: 'purchase_orders',
                                attributes: [],
                                where: {
                                    id_state: 3
                                }
                            }
                        ]
                    }
                ],
                attributes: [
                    'id_product',
                    'name',
                    [sequelize.fn('SUM', sequelize.col('order_details.amount')), 'total_amount']
                ],
                group: ['Producto.id_product', 'Producto.name'],
                order: [[sequelize.literal('total_amount'), 'DESC']],
                limit: 10,  // Limitar a los 10 primeros productos
                subQuery: false, // Asegura que el limit se aplique correctamente
                raw: true
            });

            if (!products || products.length === 0) {
                return res.status(404).json({ error: "No se encontraron productos" });
            }

            let top = await db.Producto.findByPk(products[0].id_product);

            res.status(200).json({top, products: products, type: "success" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Error al buscar productos" });
        }
    },

    listByCategory: async (req, res) => {
        try {
            const productsByCategory = await db.Producto.findAll({
                include: [{ association: "brand" }, { association: "category" },],
                where: { '$category.name$': req.params.category }
            });

            //return res.json(productsByCategory);
            if(productsByCategory.length > 0){
                res.status(200).json({products:productsByCategory, type:"success"});
            } else {
                return res.status(404).json({ error: "No se encontraron productos" });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Error al buscar productos por categoría" });
        }
    },  // FUNCIONAL

    listBrandsByCategory: async (req, res) => {
        try {
            // Consulta para obtener las marcas de los productos según una categoría dada

            // Ejecutar la consulta utilizando el modelo Producto
            const brandsByCategory = await db.Producto.findAll({
                // Seleccionar las columnas de marca y contar el número de productos por marca
                attributes: [
                    [sequelize.literal('brand.name'), 'marca'],
                    [sequelize.fn('COUNT', sequelize.col('brand.name')), 'numero_productos']
                ],
                // Incluir las asociaciones con la marca y la categoría
                include: [
                    {
                        association: "brand", // Incluir la asociación con la marca
                        attributes: [] // No seleccionar ninguna columna adicional de la marca
                    },
                    {
                        association: "category", // Incluir la asociación con la categoría
                        attributes: [], // No seleccionar ninguna columna adicional de la categoría
                        where: { name: req.params.category } // Filtrar por el nombre de la categoría proporcionado en la solicitud
                    }
                ],
                // Agrupar por el nombre e ID de la marca para contar correctamente el número de productos por marca
                group: ['brand.name', 'brand.id']
            });

            // Verificar si se encontraron marcas para la categoría dada
            if (brandsByCategory.length > 0) {
                // Devolver los resultados como JSON si se encontraron marcas
                return res.status(200).json({brandsByCategory, type:"success"});
            } else {
                // Devolver un mensaje de error si no se encontraron marcas para la categoría dada
                return res.status(404).json({ error: 'No se encontraron marcas para esta categoría' });
            }
        } catch (error) {
            // Capturar y manejar cualquier error que ocurra durante la ejecución de la consulta
            console.log(error);
            return res.status(500).json({ error: 'Error al buscar marcas por categoría' });
        }
    },

    search: async (req, res) => {
        try {
            // Validar la existencia de palabras clave antes de realizar la búsqueda
            const keywords = req.query.keywords;
            if (!keywords) {
                return res.status(400).json({ error: 'Se requiere una palabra clave para realizar la búsqueda' });
            }
            //Buscar los productos que coincidan con la busqueda
            const resultSearch = await db.Producto.findAll({
                where: {
                    name: { [Op.like]: `%${keywords}%` }
                }
            });

            //Renderizar la vista con los productos encontrados
            if (resultSearch.length > 0) {
                return res.status(200).json({products: resultSearch, keywords: keywords , type:"success"});
            } else {
                return res.status(404).json({ error: { msg: 'No se encontraron productos que coincidan con tu búsqueda' } });
            }

        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    },    // FUNCIONAL

    detail: async (req, res) => {
        try {
            let result = await db.Producto.findByPk(req.params.id, {
                include: [{ association: "brand" }, { association: "category" }, { association: "product_statuses" }]
            });

            if (!result) {
                return res.status(404).json({ error: `No se encontró el producto con ID ${req.params.id}` });
            }

            return res.status(200).json({product: result, type:"success"});

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    },    // FUNCIONAL
    create: async (req,res) => {
        try{
            const categorias = await db.Categoria.findAll()
            const estados = await db.EstadoProducto.findAll()
            const marcas = await db.Marca.findAll()

            //res.json({categorias: categorias, estados: estados});
            return res.status(200).json({marcas,categorias,estados});
        } catch (error){
            console.log(error);
            return res.status(500).json({ error:"Error interno del ser"})
        }
    },

    keep: async (req, res) =>{

        try{
            let result = validationResult(req)

            if(result.isEmpty()){

                const result = await db.Producto.create({
                    id_product: uuidv4(), //para generar IDs únicos basados en estándares universales.
                    name: req.body.name,
                    id_brand: req.body.mark, //debe buscar si ya existe la marca pata guardar el id.
                    characteristics: req.body.characteristics,
                    price: req.body.price,
                    discount: req.body.discount,
                    warranty: req.body.warranty,
                    shipping: req.body.shipping,
                    stock: req.body.stock,
                    id_category: req.body.category,
                    id_state: req.body.state,
                    description: req.body.description,
                    visualizations: 0,
                    image: req.file?.filename || "default-image.png"
                })
                
                console.log(result,"Result")

                return res.status(200).json({product: result, type:"success"});

            } else{

                return res.status(404).json({
                    old: req.body,
                    error: result.mapped()
                })
            }
        }catch (error) {
            console.log(error);
            res.status(500).json({error:'Error interno del servidor'});
        }
    },

    update: async (req, res) => {
        try {

            let result = validationResult(req)

        if(result.isEmpty()){
            // Obtener los datos del producto a actualizar
            const productUpdate = await db.Producto.findByPk(req.params.id);

            if (!productUpdate) {
                return res.redirect('/product/list');
            }

            // Comprobar si hay una nueva imagen
            if (req.file) {
                await deleteOldImage(productUpdate.image);
                productUpdate.image = req.file.filename;
            }

            // Modificar el producto solo con los campos proporcionados
            const result = await productUpdate.update({
                name: req.body.name || productUpdate.name,
                id_brand: req.body.mark || productUpdate.mark,
                characteristics: req.body.characteristics || productUpdate.characteristics,
                price: req.body.price || productUpdate.price,
                discount: req.body.discount || productUpdate.discount,
                warranty: req.body.warranty || productUpdate.warranty,
                shipping: req.body.shipping || productUpdate.shipping,
                stock: req.body.stock || productUpdate.stock,
                id_category: req.body.category || productUpdate.category,
                id_state: req.body.state || productUpdate.state,
                description: req.body.description || productUpdate.description,
            });

            return res.status(200).json({product: result, type:"success"});

        } else{

            return res.status(404).json({
                old: req.body,
                error: result.mapped()
            })
        }
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'Error interno del servidor'});
        }
    },

    delete: async (req, res) => {
        try {
            const productToDelete = await db.Producto.findByPk(req.params.id);

            if (!productToDelete) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            // Verificar si la imagen no es la predeterminada antes de intentar eliminarla
            if (productToDelete.image !== 'default-image.png') {
                try {
                    // Eliminar la imagen del servidor
                    fs.unlinkSync(path.join(__dirname, '../../public/images/products/', productToDelete.image));
                } catch (error) {
                    // Manejar el error específico de eliminación de imagen
                    console.log(`Error al eliminar la imagen del producto: ${error.message}`);
                    return res.status(500).json({ error: 'Error interno del servidor al eliminar la imagen' });
                }
            }

            // Eliminar el producto de la base de datos
            const result = await db.Producto.destroy({
                where: {
                    id_product: req.params.id
                }
            });

            return res.status(200).json({product: result, type:"success"});
        } catch (error) {
            console.log(`Error al eliminar el producto: ${error.message}`);
            res.status(500).json({ error: 'Error interno del servidor al eliminar el producto' });
        }
    }

}

module.exports = productsController;