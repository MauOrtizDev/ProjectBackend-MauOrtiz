import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    let test = {
		name: "Mauro"
	};
	res.render('index', {
        name: test.name,
        style:'index.css'
    });
});

export default router;