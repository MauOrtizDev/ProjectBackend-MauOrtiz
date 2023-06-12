import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import carts from "./routes/carts.router.js";
import products from "./routes/products.router.js";

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

app.use("/api/products", products);
app.use("/api/carts", carts);
app.use('/', viewsRouter);

socketServer.on("connection", (socket) => {
	console.log("a user connected");
	socket.on('message', data =>{
		console.log(data);
	})

	socket.emit('evento_socket_individual','Mensaje solo para recibir el socket');

	socket.broadcast.emit('evento_para_todos_menos_elactual','explicito');

	socketServer.emit('evento_para_todos','todos los sockets');
})


