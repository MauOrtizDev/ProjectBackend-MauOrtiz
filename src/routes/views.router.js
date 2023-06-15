import express from "express";
import products from "../data/products.json" assert { type: "json" };

const router = express.Router();

router.get("/", (req, res) => {

	res.render('', {
        style:'style.css',
        title: "Home",
        products
    });
});

router.get("/realtimeproducts", (req, res) => {
	res.render("realTimeProducts", {
		style: "style.css",
		documentTitle: "Socket",
	});
});

export default router;