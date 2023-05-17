const fs = require('fs');
class ProductManager {

    #products;
    #path;

    constructor() {
        this.#products = [];
        this.#path = './product.json';
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const product = {
            id: this.#products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        const existsCode = this.#products.find((el) => {
            return el.code == code
        })
        if (existsCode) {
            console.log(`Product code ${code} already added`);
        } else {
            const isEmpty = Object.values(product).some(x => !x);
            isEmpty ? console.log('There are empty properties in the product. Product not added') : this.#products.push(product);
        }
    }

    getProducts() {
        return this.#products;
    }

    getProductById(id) {
        return this.#products.find((el) => el.id == id ) || 'Id not found';
    }
}

const productManager = new ProductManager;
productManager.addProduct('Samsung Galaxy A33', 'Samsung Galaxy A33 Phone', 350, 'assets/samsung-a-33.png', '1020', 12);
productManager.addProduct('Samsung Galaxy A52', 'Samsung Galaxy A52 Phone', 450, 'assets/samsung-a-52.png', '1021', 5);
productManager.addProduct('Xiaomi Redmi Note 11', 'Xiaomi Redmi Note 11', 550, 'assets/xiaomi-redmi-11.png', '1021', 8);
productManager.addProduct('', 'Xiaomi Redmi Note 11', 550, 'assets/xiaomi-redmi-11.png', '1022', 8);
const products = productManager.getProducts();
console.log(products);
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(3));
