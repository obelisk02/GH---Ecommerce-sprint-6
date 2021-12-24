const fs = require('fs');
const path = require('path');


const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
	new: (req, res) => {
		res.render('AppLogin');
	},
	store: (req, res) => {
		let newProduct = {
			id: users[products.length - 1].id + 1,
			...req.body
		};
		users.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');
	},

	edit: (req, res) => {
		let id = req.params.id;
		let product = products.find(product=> product.id == id);
		res.render('AppHome', {view: 'edit', product});
	},
	update: (req, res) => {
		let id = req.params.id;
		let product = products.find(product => product.id == id)

		productToEdit = {
			id: product.id,
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
		res.redirect('/');
	},

	delete: (req, res) => {
		let id = req.params.id;
		let productos = products.filter(product => product.id != id);
		fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '));
		res.redirect('/');
	}
};

module.exports = controller;