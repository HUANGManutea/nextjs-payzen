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
          vads_order_id: `TEST-${Math.round(Math.random() * 1000)}`,
          vads_site_id: process.env.NEXT_PUBLIC_PAYZEN_SITE_ID,
          vads_ctx_mode: "TEST",
          vads_amount: "100",
          vads_currency: "953",
          vads_capture_delay: "0",
          vads_payment_cards: "", // laisser vide
          vads_language: "fr", // laisser 'fr' car par défaut c'est la langue 'en'
          // vads_return_mode: "POST",
          vads_url_return: `http://${process.env.NEXT_PUBLIC_FRONTEND_HOST}:${process.env.NEXT_PUBLIC_FRONTEND_PORT}/payment-result`,
          vads_validation_mode: "1"
      },
      // endpoint retournant la signature du formulaire, cf. dossier backend
      credentials : {
          source: `http://${process.env.NEXT_PUBLIC_PAYMENT_WS_HOST}:${process.env.NEXT_PUBLIC_PAYMENT_WS_PORT}/credentials`
      }
    });
  }

  render() {
    return <div id="paymentCanvas"/>;
  }
}