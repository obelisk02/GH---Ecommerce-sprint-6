const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
	detail: (req, res) => {
		let id = req.params.id;
		let product = products.find(product=> product.id == id);
		res.render('AppHome', {view: 'detail', product});
	},

	new: (req, res) => {
		res.render('AppHome', {view: 'new'});
	},
	store: (req, res) => {
		let newProduct = {
			id: products[products.length - 1].id + 1,
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