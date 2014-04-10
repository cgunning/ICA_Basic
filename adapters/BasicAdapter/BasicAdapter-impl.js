/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 *  WL.Server.invokeHttp(parameters) accepts the following json object as an argument:
 *  
 *  {
 *  	// Mandatory 
 *  	method : 'get' , 'post', 'delete' , 'put' or 'head' 
 *  	path: value,
 *  	
 *  	// Optional 
 *  	returnedContentType: any known mime-type or one of "json", "css", "csv", "javascript", "plain", "xml", "html"  
 *  	returnedContentEncoding : 'encoding', 
 *  	parameters: {name1: value1, ... }, 
 *  	headers: {name1: value1, ... }, 
 *  	cookies: {name1: value1, ... }, 
 *  	body: { 
 *  		contentType: 'text/xml; charset=utf-8' or similar value, 
 *  		content: stringValue 
 *  	}, 
 *  	transformation: { 
 *  		type: 'default', or 'xslFile', 
 *  		xslFile: fileName 
 *  	} 
 *  } 
 */
/**
 * Classes
 */

var products = new Array();
products[0] = new Product(0, "Köttfärs", "GOTT");
products[1] = new Product(1, "Toalettrullar", "INTE GOTT");
products[2] = new Product(2, "Hundmat", "KAN VARA JÄVLA GOTT");
products[3] = new Product(3, "Godis", "OCKSÅ JÄTTEGOTT");
var index = 4;

function Product(name, description, votecount, id) {
	this.name = name;
	this.description = description;
	this.votecount = votecount;
	this.vote = vote;
	this.getVoteCount = getVoteCount;
	this.id = id;
}

function vote(plus) {
	if(plus)
		this.votecount += 1;
	else
		this.votecount -= 1;
}

function getVoteCount() {
	return this.votecount;
}

function getProducts() {
	return products;
}

function vote(id, plus) {
	for(var i = 0; i < products.length; i++) {
		if(products[i].id === id) {
			products[i].vote(plus);
			return {votecount: products[i].votecount};
		}
	}
}

function createProduct(name, description, id) {
	var product = new Product(name, description, 0, id);
	
	products[index] = product; index++;
	
	return product;
}

/**
 * @param interest
 *            must be one of the following: world, africa, sport, technology, ...
 *            (The list can be found in http://edition.cnn.com/services/rss/)
 * @returns json list of items
 */
function getStories(interest) {
	path = getPath(interest);
	
	var input = {
	    method : 'get',
	    returnedContentType : 'xml',
	    path : path
	};
	
	
	return WL.Server.invokeHttp(input);
}
/**
 * 
 * @param interest
 *            must be one of the following: world, africa, sport, technology, ...
 *            (The list can be found in http://edition.cnn.com/services/rss/)
 * @returns json list of items
 */
function getStoriesFiltered(interest) {
	path = getPath(interest);
	
	var input = {
	    method : 'get',
	    returnedContentType : 'xml',
	    path : path,
	    transformation : {
		    type : 'xslFile',
		    xslFile : 'filtered.xsl'
	    }
	};
	
	return WL.Server.invokeHttp(input);
}



function getPath(interest) {
	if (interest == undefined || interest == '') {
		interest = '';
	}else {
		interest = '_' + interest;
	}
	return 'rss/edition' + interest + '.rss';
}

