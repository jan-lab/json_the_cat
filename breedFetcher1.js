const request = require('request');
const args = process.argv.slice(2);
const api = `https://api.thecatapi.com/v1/breeds/search?q=${args[0]}`;
//const api = `https://api.thecatapi.123456/brokenv1/breeds/search?q=${args[0]}`;  //broken link which the 1st if statement responds to
//const api = `https://api.thecatapi.com/v1/breeds123/search?q=${args[0]}`; //broken link which the 2nd if statement responds to


request(api, (error, response, body) => {
  if (error !== null) { //when the server doesn't respond
    return console.log(error);
  }

  const data = JSON.parse(body);
  if (response.statusCode >= 300) {
    return console.log(data.message);
  }

  if (data.length === 0) { //data is an array
    //if (data[0] === undefined) { //data[0] is an object
    return console.log("Breed Not Found");
  }

  return console.log(data[0].description);
});

// Expected output on terminal
// > node breedFetcher.js Chartreux
// The Chartreux is generally silent but communicative. Short play sessions, mixed with naps and meals are their perfect day. Whilst appreciating any attention you give them, they are not demanding, content instead to follow you around devotedly, sleep on your bed and snuggle with you if you’re not feeling well.

