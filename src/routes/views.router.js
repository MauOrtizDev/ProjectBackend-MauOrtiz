import express from "express";
import products from "../data/products.json" assert { type: "json" };

const router = express.Router();

router.get("/", (req, res) => {

	res.render('home', {
        style:'style.css',
        title: "Home",
        products
    });
});

router.get("/realtimeproducts", (req, res) => {
	res.render("realTimeProducts", {
		style: "style.css",
		title: "Real Time Products",
        products
	});
});

router.get("/chat", (req, res) => {
	res.render("chat", {
		style: "style.css",
		title: "Chat",
        products
	});
});


export default router;