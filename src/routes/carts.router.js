import { Router } from "express";
import CartsManager from "../managers/carts.manager.js";
import ProductsManager from "../managers/products.manager.js";


const cartsManager = new CartsManager("carts");
const productsManager = new ProductsManager("products");
const carts = Router();

carts.post("/", async (req, res) => {
	try {
		const postResponse = cartsManager.addCart();
		return res.status(200).send(postResponse);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});
carts.get("/:cid", async (req, res) => {
	try {
		const { cid } = req.params;
		const cartId = parseInt(cid);

		const cart = await cartsManager.getCartById(cartId);
		return res.status(200).json(cart);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

carts.post("/:cid/product/:pid", async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const cartId = parseInt(cid);
		const productId = parseInt(pid);

		const product = productsManager.getProductById(productId);

		if (typeof product === "string") {
			return res.status(200).send(product);
		}

		cartsManager.addProductToCart(cartId, productId);

		const cart = await cartsManager.getCartById(cartId);
		return res.status(200).json(cart);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

carts.delete("/:cid/product/:pid", async (req, res) => {
	try {

		const { cid, pid } = req.params;
		const cartId = parseInt(cid);
		const productId = parseInt(pid);

		const deleteResponse = cartsManager.deleteCart(cartId, productId);
		return res.status(200).send(deleteResponse);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

export default carts;