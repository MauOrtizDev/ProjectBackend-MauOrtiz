import express from "express";
const app = express();
const port = 3000;

import ProductManager from "./productManager.js";
const productManager = new ProductManager("products");

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
	try {
		const { limit } = req.query;
		const products = await productManager.getProducts();
		if (limit) {
			const limitedProducts = products.slice(0, limit);
			return res.json(limitedProducts);
		}
		res.json(products);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

app.get("/products/:pid", async (req, res) => {
	try {
		const { pid } = req.params;
		const productId = parseInt(pid);
		const product = await productManager.getProductById(productId);
		return res.json(product);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});