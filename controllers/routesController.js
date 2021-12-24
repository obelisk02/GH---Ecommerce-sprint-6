const fs = require('fs');
const path = require('path');
const session = require('express-session');

const bcrypt = require('bcrypt');



const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

//const cookiesFilePath = path.join(__dirname, '../data/cookie-session.json');
//const cookiespath = JSON.parse(fs.readFileSync(cookiesFilePath, 'utf-8'));

const controlador = {
    index: (req, res) => {/*Se muestran los productos top (6 de cada categoría)*/
		const topMonitors = products.filter(product => product.section===1 && product.top);
		const topHeadphones = products.filter(product => product.section===2 && product.top);
		const topKeyboards = products.filter(product => product.section===3 && product.top);
		const topMouse = products.filter(product => product.section===4 && product.top);
		const topSpeakers = products.filter(product => product.section===5 && product.top);
		res.render('AppHome', {view: 'home', topMonitors, topHeadphones, topKeyboards, topMouse, topSpeakers});
	},
    isUser: async (req, res) => {
        const {email, pass} = req.body;
       // let usua= users.find(user=> user.email===email && user.password===pass);;

       

        //Buscar usuario por email
        function getPass(email) {
            return users.filter(
              function(users) {
               return users.email == email; 
              }
            );
          }
          
          let found = getPass(email);
          console.log(found);
        // Hashea comparado para verificar la password
        const validPassword = await bcrypt.compare(pass, found[0].password);
      if (validPassword) {

             // Cookie REMEMBER ME
       if (req.body.interests =="a"){
        res.cookie("session",[found[0].email,found[0].firstname] , { expires: null, httpOnly: true, secure: true ,signed:true});
        res.status(200).json({ message: "Valid password" });
       }

         // COOKIE 20min
      else{
        res.cookie("session",[found[0].email,found[0].firstname] , { expires: new Date(Date.now() + (20 * 60 * 1000)), httpOnly: true, secure: true ,signed:true});
        res.status(200).json({ message: "Valid password" });
      }

   
       // console.log(req.session);
        //console.log(req.sessionID);

      } else {
        res.status(400).json({ error: "Invalid Password" });
        res.render('AppLogin');
      }
    
   
    // res.redirect('/');      
        
        
    },
    login: (req, res) => {
       // console.log(req.signedCookies.session);

       
      if (req.signedCookies.session){
        res.redirect('/');
       }

       else {
        res.render('AppLogin'); /*login*/  
       }
       
    },
    register: (req, res) => {
   
      if (req.signedCookies.session){
        res.redirect('/');
       }

       else {
        res.render("AppRegister"); /*register*/ 
       }
    },
    
    saveUser: async (req, res) => {      // Guardar usuario register

      // Checker Email - NO REPETIDO
      function getPass(email) {
        return users.filter(
          function(users) {
           return users.email == email; 
          }
        );
      }
      
      let found = getPass(req.body.email);
      if(found!=""){
        res.status(400).json({ error: "Email ya existe" });
      }
 //***************** */

      //MULTER 
      console.log(req.file);

        //HASH
        const salt = await bcrypt.genSalt(10);
        let passhash = await bcrypt.hash(req.body.password, salt);

        
            // Store hash in your password DB.
            let newUser = {
                id: "u" + (users.length + 1).toString(),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: passhash,
                rol: req.body.rol,
                avatar: req.file.filename
            };
            users.push(newUser);
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
            res.redirect('/');
       

            
    },

    logout: (req,res) => {
        /*req.session.destroy (function (err) {//req.session.destroy () destruir sesión
            if(err){
                            console.log ('Error de cierre de sesión')
         }
      }) */
      res.clearCookie("session");
      res.redirect('/');
    }
}

module.exports = controlador;