// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  let date = req.params.date;
  let unix;
  let utc;

  if (!date) {
    const now = new Date();
    unix = now.getTime();
    utc = now.toUTCString();
  } else if (/^\d+$/.test(date)) {
    unix = parseInt(date);
    const parsedDate = new Date(unix);
    if (isNaN(parsedDate)) {
      res.json({ error: "Invalid Date" });
      return;
    }
    utc = parsedDate.toUTCString();
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      res.json({ error: "Invalid Date" });
      return;
    }
    unix = parsedDate.getTime();
    utc = parsedDate.toUTCString();
  } else {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      res.json({ error: "Invalid Date" });
      return;
    }
    unix = parsedDate.getTime();
    utc = parsedDate.toUTCString();
  }
  res.json({ unix, utc });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
