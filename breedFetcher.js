const request = require('request');

const fetchBreedDescription = function(breedName, callback) {
  
  const api = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;
 
  request(api, (error, response, body) => { //this is an async function

    
    if (error !== null) { //when the server doesn't respond
      // return console.log(error);
      callback(error, null);
      return error;
    }
    
    const data = JSON.parse(body);
    if (response.statusCode >= 300) {
      //return console.log(data.message);
      callback(error, data.message);
      return data.message;
    }
    
    if (data.length === 0) { //data is an array  //if (data[0] === undefined) { //data[0] is an object
      //return console.log("Breed Not Found");
      //callback(error, "Breed Not Found");
      callback("Breed Not Found", null);
      return "Breed Not Found";
    }
    //console.log('I should not see this');
    callback(error, data[0].description);
  
  });
  
};

module.exports = { fetchBreedDescription };


