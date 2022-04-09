// modules serveur
const express = require("express");
const axios = require('axios').default;
const cors = require('cors');
const bodyParser = require('body-parser');

// modules signature
const hmacSHA512 = require('crypto-js/hmac-sha512');
const Base64 = require('crypto-js/enc-base64');

const app = express();
const port = 3001;

// middlewares
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

// clé de la boutique disponible dans le back office commerçant Payzen
const certificate = "00000000000";

app.post("/credentials", (req, res) => {
  var orderData = req.body;
  
  console.log("received orderData:");
  console.log(orderData);

  // transformer les données de orderData en chaine : "VALEUR_1+VALEUR_2+...+VALEUR_N+CERTIFICAT"
  let dataToSign = "";

  Object.keys(orderData).forEach((key) => {
    if(key.slice(0,6) === 'vads_') {
	    dataToSign += `${orderData[key]}+`;
	  }
  })
  dataToSign += `${certificate}`;

  // calcul de la signature, l'algorithme à utiliser est défini dans le back office commerçant Payzen
  // encodeURI pour encode correctement les caractères spéciaux
  let signature = encodeURI(Base64.stringify(hmacSHA512(dataToSign, certificate)));

  // retourner la signature
  res.send({signature: signature});
});

app.listen(port, () => {
  console.log(`Payzen credential backend server listening on port ${port}`);
});
