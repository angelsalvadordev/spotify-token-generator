const express = require("express");
const axios = require("axios").default;
const qs = require("qs");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/spotify/:client_id/:client_secret", (req, res) => {
  let client_id = req.params.client_id;
  let client_secret = req.params.client_secret;
  let generateTokenUrl = "https://accounts.spotify.com/api/token";

  const authOptions = {
    method: "post",
    url: generateTokenUrl,
    data: qs.stringify({
      grant_type: "client_credentials",
      client_id,
      client_secret,
    }),
    json: true,
  };

  axios(authOptions)
    .then((resp) => {
      res.json(resp.data);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: err.response.status,
        message: err.response.data.error,
      });
    });
});

app.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Server running in port ${port}`);
});
