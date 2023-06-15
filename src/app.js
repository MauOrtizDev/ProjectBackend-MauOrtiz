import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import products from "./data/products.json" assert { type: "json" };

const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});

const socketServer = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use('/', viewsRouter);

socketServer.on("connection", (socket) => {
	console.log("A user connected");

	socket.on('message', data =>{
		console.log(data);
	})

	socket.emit('products',products);
	/*
	socket.broadcast.emit('evento_para_todos_menos_elactual','explicito');

	socketServer.emit('evento_para_todos','todos los sockets');
	*/
	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
})


