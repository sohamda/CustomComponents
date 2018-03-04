"use strict"

var log4js = require('log4js');
var logger = log4js.getLogger();

function detectLanguage(textToDetect, callBackFunction) {
	logger.info('DetectLanguage: textToDetect =' + textToDetect);
	var request = require("request");
	var options = { method: 'GET',
	  url: 'https://translate.yandex.net/api/v1.5/tr.json/detect',
	  qs: 
	   { key: 'trnsl.1.1.20180302T143212Z.b3049b78d70bb0af.d05714a99eb21eed39a4b024f86b30591be042f3',
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

