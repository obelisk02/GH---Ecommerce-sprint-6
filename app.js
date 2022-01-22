const express = require('express');
const app = express();
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE
const path = require('path');

//session cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser('DHpass'));
const cookieSession = require('cookie-session')

app.use(cookieSession({
    resave: false,
    saveUninitialized:true,
    name: "session",
    secret: "DHpass",
    cookie: { secure: true,
        httpOnly: true,
      },
    // Cookie Options
    maxAge: 1 * 60 * 60 * 1000 // 1 hours
  }))

//Middleware Multer
const multer = require('multer');

const storage = multer.diskStorage({
         destination: path.join(__dirname, 'public/images/avatar'),
         filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); //+"/"+ path.extname(file.originalname)
         }
     }); 

     app.use(multer({
         storage,
            dest: path.join(__dirname, 'public/images/avatar'),
           
             fileFilter: function (req, file, cb) {
        
                 let filetypes = /jpeg|jpg|png|JPEG|JPG|PNG/;
                 let mimetype = filetypes.test(file.mimetype);
                 let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
                 if (mimetype && extname) {
                     return cb(null, true);
                 }
                 cb("Error: Debe ser una imagen - " + filetypes);
             },
             limits: {fileSize: 1000000},
         }).single('avatar'));



const mainRoute = require('./routes/main');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const sectionsRouter = require('./routes/sections');
const carRouter = require('./routes/car');
const accountRouter = require('./routes/account');


app.use(express.urlencoded({ extended: true })); //Estas dos líneas permiten recibir datos por POST
app.use(express.json());
app.use(methodOverride('_method')); //Para poder usar el method="POST" en el formulario por PUT y DELETE



app.use('/', mainRoute); //El primer parámetro es el 'prefijo' (Por ejemplo, para ver el home se tiene que poner 'http://localhost:3000/'). Si hubiera puesto '/carrito', en la ruta tendria que haber puesto 'http://localhost:3000/carrito/' para ver el home
app.use('/products', productsRouter);
app.use('/section', sectionsRouter);
app.use('/car', carRouter);
app.use('/users', usersRouter);
app.use('/account', accountRouter);

app.set('view engine', 'ejs'); //Se configura EJS como el template engine de la app
app.set('views', './views');
app.use(express.static('views')); //Se define donde se encuentran los archivos estáticos ('public')



app.listen(3000, () => {
    console.log('Server running at port 3000 ');
});



