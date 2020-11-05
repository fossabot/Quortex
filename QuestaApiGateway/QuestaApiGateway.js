const express = require("express");
const util = require("util");
var cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
var beautify = require("json-beautify");
const port = 3000;
const serviceUrl = "https://questaapp.herokuapp.com";
// const serviceUrl = "localhost:9090";

app.use(cors());
app.use(bodyParser.json());
const debugMode = true;
app.post("*", async (request, response) => {
	var authtoken = request.headers.authorization;
	console.log("Incoming request for " + request.url);
	try {
		authtoken = authtoken.replace("Bearer", "").trim();
	} catch (e) {}
	var result = await forwardRequestTo(request.body, authtoken, request.url);
	response.json(result);
	// console.log("sent response as : " +beautify(result, null, 2, 100) +"\nSuccessfully Sent the response.");
});

forwardRequestTo = (reqdata, authToken, requrl) => {
	return new Promise(function (resolve, reject) {
		const axios = require("axios");
		var data = JSON.stringify(reqdata);
		var config = {
			method: "post",
			url: serviceUrl + requrl,
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + authToken,
			},
			data: data,
		};
		axios(config)
			.then(function (response) {
				resolve(response.data);
			})
			.catch(function (error) {
				reject(error.response.data);
			});
	}).then(
		(result) => {
			return result;
		},
		(error) => {
			return error;
		}
	);
};
app.listen(port);
