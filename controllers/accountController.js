const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controlador = {
    index: (req, res) => {
		let user = users.find(user => user.id === "u1");
		res.render('AppHome', {view: 'account', accountView: 'configuration', user});
	},
    myproducts: (req, res) => {
		let userProducts = products.filter(product=> product.userId === "u1");
		res.render('AppHome', {view: 'account', accountView: 'myproducts', userProducts});
	},
	new: (req, res) => {
		res.render('AppHome', {view: 'account', accountView: 'new'});
	},
	store: (req, res) => {
		let newProduct = {
			id: products[products.length - 1].id + 1,
			userId: "u1",
			...req.body,
			section: parseInt(req.body.section),
			stars: 0,
			sales: 0,
			top: false,
        	url: ""
		};
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/account/myproducts');
	},
	edit: (req, res) => {
		let id = req.params.id;
		let product = products.find(product=> product.id == id);
		res.render('AppHome', {view: 'account', accountView: 'edit', product});
	},
	updateProduct: (req, res) => {
		let id = req.params.id;
		let product = products.find(product => product.id == id);

		productToEdit = {
			id: product.id,
			userId: product.userId,
			...req.body,
			stars: product.stars,
			sales: product.sales,
			top: product.top,
        	url: product.url
		};

		let newProducts = products.map(product =>{
			if(product.id == productToEdit.id){
				return productToEdit;
			}
			return product;
		});

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/account/myproducts');
	},
	deleteProduct: (req, res) => {
		let id = req.params.id;
		let productos = products.filter(product => product.id != id);
		fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '));
		res.redirect('/account/myproducts');
	},

	updateUser: (req, res) => {
		let id = req.params.id;
		let user = users.find(user => user.id == id);

		userToEdit = {
			id: user.id,
			avatar: user.avatar,
			...req.body
		};

		let newUsers = users.map(user =>{
			if(user.id == userToEdit.id){
				return userToEdit;
			}
			return user;
		});

		fs.writeFileSync(usersFilePath, JSON.stringify(newUsers, null, ' '));
		res.redirect('/account');
	},
	deleteUser: (req, res) => {
		let id = req.params.id;
		let usuarios = users.filter(user => user.id != id);
		fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, ' '));
		res.redirect('/account');
	}
}

module.exports = controlador;