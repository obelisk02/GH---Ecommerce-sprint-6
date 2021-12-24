const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    section: (req, res) => {
		let id = req.params.id;
		let section = (id === '1') ? 'Monitores' : (id === '2') ? 'Audífonos' : (id === '3') ? 'Teclados' : (id === '4') ? 'Mouse' : 'Bocinas';
		let sectionProducts = products.filter(product=> product.section == id);
		let marks = [...new Set(sectionProducts.map(item => item.mark))]; //['A', 'B']
		res.render('AppHome', {view: 'section', id, section, sectionProducts, marks});
	},
	filterSection: (req, res) => {
		let id = req.params.id;
		let ft = req.params.ft;
		let filter = req.params.filter;

		let section = (id === '1') ? 'Monitores' : (id === '2') ? 'Audífonos' : (id === '3') ? 'Teclados' : (id === '4') ? 'Mouse' : 'Bocinas';
		let sectionProducts = products.filter(product=> product.section == id);
		let marks = [...new Set(sectionProducts.map(item => item.mark))]; //['A', 'B']

		if(ft === 'pf'){
			filter = parseInt(filter);
			sectionProducts = sectionProducts.filter(product=> product.price <= filter);
		}else if(ft === 'mf'){
			sectionProducts = sectionProducts.filter(product=> product.mark === filter);
		}else{
			sectionProducts = sectionProducts.filter(product=> product.stars == filter);
		}

		res.render('AppHome', {view: 'section', id, section, sectionProducts, marks});
	}
};

module.exports = controller;