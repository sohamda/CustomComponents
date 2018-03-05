"use strict"

/**
 * Custom  Component to Detect User language using Yandex API.
 * Author : Soham Dasgupta
 * @blog : http://adfjava.blogspot.in/2018/03/detect-user-language-oracle-bots.html
 */

var log4js = require('log4js');
var logger = log4js.getLogger();

function detectLanguage(textToDetect, callBackFunction) {
	logger.info('DetectLanguage: textToDetect =' + textToDetect);
	var request = require("request");
	var options = { method: 'GET',
	  url: 'https://translate.yandex.net/api/v1.5/tr.json/detect',
	  qs: 
	   { key: 'YOUR_KEY',
		 text: textToDetect },
	  headers: 
	   { 'content-type': 'application/json' }};
	
	request(options, function (error, response, body) {
	  if (error) throw new Error(error);
	  console.log(body);
	  callBackFunction((JSON.parse(body)).lang);
	});
};

module.exports = {

    metadata: () => ({
        "name": "DetectLanguage"
    }),

    invoke: (conversation, done) => {
        const text = conversation.text();
        if (text){
			detectLanguage(text, function(language) {
				logger.info('DetectLanguage: returned language =' + language);
				conversation.variable("detectedLocale", language);
				conversation.transition();
				done();
			});
        }
    }
	
	
};

