import express from "express";
import carts from "./routes/carts.router.js";
import products from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";

const app = express();
const port = 8080;

app.engine("handlebars", handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use("/api/products", products);
app.use("/api/carts", carts);
app.use('/', viewsRouter);

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});

