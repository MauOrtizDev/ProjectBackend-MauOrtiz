import fs from "fs";
export default class ProductManager {

    #products;
    #path;

    constructor(fileName) {
        this.#products = [];
        this.#path = `./src/${fileName}.json`;
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
