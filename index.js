import  express  from "express";
import routes from "./routes/routes.js";
import bodyparser from "body-parser";
import bd from "./config/bd.js";

const app = express();
const port = 3000 || process.env.PORT;

//conexion bd
try {
    await bd.authenticate();
    bd.sync();
    console.log('Conectado a la base de datos.');
} catch (error) {
    console.error(error);
}


//configuraciones
app.set('view engine','pug'); //plantilla
app.set('views','./views');
app.use(bodyparser.urlencoded({extended: true})); // para enviar datos desde formularios
app.use(bodyparser.json()); // para enviar datos desde formularios
//app.use(express.static('public'));// servir archivos estaticos

app.use("/",routes); // rutas

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});