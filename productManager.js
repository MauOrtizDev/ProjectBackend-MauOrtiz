const fs = require('fs');
class ProductManager {

    #products;
    #path;

    constructor() {
        this.#products = [];
        this.#path = './product.json';
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const products = this.getProducts();
        const product = {
            id: products.reduce((max, prod) => max > prod.id ? max : prod.id, 0) + 1 || 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        const existsCode = products.find((el) => {
            return el.code == code
        })

        if (existsCode) {
            console.log(`Product code ${code} already added`);
        } else {
            const isEmpty = Object.values(product).some(x => !x);
            isEmpty ? console.log('There are empty properties in the product. Product not added') : products.push(product);
            try {
                fs.writeFileSync(this.#path, JSON.stringify(products));
            } catch (error) {
                return `Writing error while adding product: ${error}`;
            }
        }
    }

    getProducts() {
        if (!fs.existsSync(this.#path)) {
            try {
                fs.writeFileSync(this.#path, JSON.stringify(this.#products));
            } catch (error) {
                return `Writing error while getting products: ${error}`;
            }
        }

        try {
            const dataArray = JSON.parse(fs.readFileSync(this.#path, "utf8"));
            return dataArray;
        } catch (error) {
            return `Reading error while getting products: ${error}`;
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        return products.find((el) => el.id == id) || `Id ${id} not found`;
    }

    updateProduct(id, attr, value) {
        const products = this.getProducts();
        const product = products.find((product) => product.id === id);
        
        if (!product) {
            return console.log(`Product not found with ID ${id}`);
        } else if (!(attr in product)) {
            return console.log(`Attribute "${attr}" not found in product ${id}`);
        } else if (attr == 'id') {
            return console.log(`Attribute ID can't be updated`);
        } else if (!value) {
            return console.log(`Value ${value} can't be used to update product.`);
        } else {
            product[attr] = value;

            if (attr == 'code') {
                const uniqueValues = new Set(
                    products.map(el => {
                        return el.code;
                    }),
                );
                const hasDuplicates = uniqueValues.size < products.length;
                if (hasDuplicates) {
                    return console.log(`Can't update product code ${value}, is already added`);
                }
            }
            try {
                fs.writeFileSync(this.#path, JSON.stringify(products));
            } catch (error) {
                return `Error while updating the product: ${error}`;
            }

        }
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const productIndex = products.findIndex((product) => product.id === id);

        // Validar ID:
        if (productIndex !== -1) {
            products.splice(productIndex, 1);
            try {
                fs.writeFileSync(this.#path, JSON.stringify(products));
            } catch (error) {
                return `Error deleting the product: ${error}`;
            }
        } else {
            return `There's no product with ID: ${id}`;
        }
    }
}

// Creación del productManager
const productManager = new ProductManager;

// Se llama a getProducts la primera vez, debe mostrar array vacío
console.log(productManager.getProducts());

// Se crean 3 productos correctamente
productManager.addProduct('Samsung Galaxy A33', 'Samsung Galaxy A33 Phone', 350, 'assets/samsung-a-33.png', '1020', 12);
productManager.addProduct('Samsung Galaxy A52', 'Samsung Galaxy A52 Phone', 450, 'assets/samsung-a-52.png', '1021', 5);
productManager.addProduct('Samsung Galaxy Note 5', 'Samsung Galaxy Note 5 Phone', 250, 'assets/samsung-galaxy-note-5.png', '1022', 10);

// Se crea 1 producto con el mismo código, arroja error
productManager.addProduct('Xiaomi Redmi Note 11', 'Xiaomi Redmi Note 11', 550, 'assets/xiaomi-redmi-11.png', '1021', 8);

// Se crea producto que no tiene todos los campos diligenciados, arroja error
productManager.addProduct('', 'Xiaomi Redmi Note 11', 550, 'assets/xiaomi-redmi-11.png', '1022', 8);

// Se vuelve a llamar a products, muestra los 3 productos creados
console.log(productManager.getProducts());

// Llama al producto con ID creado, correctamente
console.log(productManager.getProductById(1));

// Llama al producto con ID no creado aún, arroja error
console.log(productManager.getProductById(4));

// Llama a updateProduct correctamente
productManager.updateProduct(2, 'stock', 35);

// Llama al producto con ID 2 para chequear update
console.log(productManager.getProductById(2));

// Llama a updateProduct y cambia a un codigo de producto que ya existe, arroja error
productManager.updateProduct(2, 'code', "1020");

// Se llamará al método “deleteProduct”
productManager.deleteProduct(3)

// Se vuelve a llamar a products, muestra los 2 productos que quedan
console.log(productManager.getProducts());

