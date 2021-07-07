const fs = require ('fs');
const path = require ('path');

const productsFilePath = path.join(__dirname, '../dataBase/productsDb.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const userFilePath = path.join(__dirname, '../dataBase/usersDb.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const productController = {
    
    //Para mostrar todo el listado de productos

    listado: (req,res) => {
      res.render ('products/producto',{products:products,users:users});
    },

    //Para mostrar el detalle de uno de los productos 
    // producto: (req,res) => {
    //     res.render ('products/producto');
    // },

    carrito: (req,res) => {
        let idPack = req.params.id -1;
        let packBuscado = products[idPack]
       
       res.render ('products/carrito', {packBuscado:packBuscado});
    },
    carga: (req,res) => {     //create
        res.render ('products/cargaProducto');
    },

    edicion:  (req,res) => {
        // res.render ('products/edicionProducto', {products:products,users:users});
    
    let idProductoEditado = req.params.id;	

    for(let i=0;i<products.length;i++){
        if (products[i].id==idProductoEditado){
            var productoEncontrado = products[i];
        }
        res.render('products/edicionProducto',{products: productoEncontrado});  // puedo llamar a products como productoPorModificar y cambiarlo en edicionProducto?
        break
    }
    },

    actualizar:  (req,res) => {
    
        let valoresNuevos = req.body;
		let idProductoEditado = req.params.id;	


		for(let i=0;i<products.length;i++){
			if (products[i].id==idProductoEditado){

				products[i].nombre = valoresNuevos.nombre;
				products[i].descripcion = valoresNuevos.descripcion;
				//products[i].imagen = valoresNuevos.imagen;
				products[i].radio = valoresNuevos.radio;
                products[i].superficie = valoresNuevos.superficie;
				products[i].precio = valoresNuevos.precio;

				var productoActualizado = products[i];

				break;
			}
		}

		fs.writeFileSync(productsFilePath, JSON.stringify(products,null, ' '));

		res.render('products/edicionProducto',{products: productoActualizado})  //confirmar si renderizamos esta vista
    
    },

    store: (req, res) => {
        let nombreImagen=req.file.filename;
		let idNuevo = products[products.length-1].id + 1;
		let nuevoObjeto =  Object.assign({id: idNuevo},req.body,{image:nombreImagen});
		products.push(nuevoObjeto);
   	    fs.writeFileSync(productsFilePath, JSON.stringify(products,null, ' '));
		res.render('index');
	},
};

module.exports = productController; 
