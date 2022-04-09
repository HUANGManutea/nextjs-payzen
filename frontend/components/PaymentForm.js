import dynamic from 'next/dynamic'
import React from 'react'

export default class PaymentForm extends React.Component {

  async componentDidMount() {
    // la lib payzenjs utilise window en test pour afficher des erreurs dans la console => import après que le component soit mount
    const PayzenJS = require('PayzenJS/payzenjs');
    PayzenJS.go({		
      // plateforme Payzen à utiliser, ne pas changer
      target: "secure.osb.pf",
      // données du canvas où l'iframe sera intégré
      canvas: {
            id: "paymentCanvas", // id de la div cible
            width: "1000px",
            height: "1000px"
      },
      /* données du formulaire,
      * cf. doc : https://secure.osb.pf/doc/fr-FR/form-payment/standard-payment/creer-un-paiement-comptant-immediat.html
      * cf. doc : https://secure.osb.pf/doc/fr-FR/form-payment/standard-payment/gerer-les-moyens-de-paiement-proposes-a-l-acheteur.html
      */
      orderData: {
          vads_site_id: "12345678",
          vads_ctx_mode: "TEST",
          vads_amount: "100",
          vads_currency: "953",
          vads_language: "fr" // laisser 'fr' car par défaut c'est la langue 'en'
      },
      // endpoint retournant la signature du formulaire, cf. dossier backend
      credentials : {
          source: "http://localhost:3001/credentials"
      }
    });
  }

  render() {
    return <div id="paymentCanvas"/>;
  }
}