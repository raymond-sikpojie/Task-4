// Sending an HTTP Request from a NodeJS server

const http = require("http");
const https = require("https");

// const Stream = require("stream").Transform;
// const fs = require("fs");

// create a server
const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url} by method: ${req.method}`);
});

https
  .get(
    "https://api.openweathermap.org/data/2.5/weather?q=London&appid=4ff2ad9a8c64852f9b757c9af917f216",
    (resp) => {
      let data = "";

      // A chunk of data has been recieved.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        let url = JSON.parse(data);
        console.log(url);
      });
    }
  )
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });

// Listen for server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
