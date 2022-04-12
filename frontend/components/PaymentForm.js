import React from 'react'

let PayzenJS;

export default class PaymentForm extends React.Component {

  async componentDidMount() {
    // la lib payzenjs utilise window en test pour afficher des erreurs dans la console => import après que le component soit mount
    PayzenJS = require('PayzenJS/payzenjs');
  }

  async pay(event) {
    PayzenJS.go({
      // plateforme Payzen à utiliser, ne pas changer
      target: "secure.osb.pf",
      // données du canvas où l'iframe sera intégré
      canvas: {
            id: "paymentCanvas", // id de la div cible
            width: "1000px", // largeur de l'iframe
            height: "1000px" // hauteur de l'iframe
      },
      /* données du formulaire,
      * cf. doc : https://secure.osb.pf/doc/fr-FR/form-payment/standard-payment/creer-un-paiement-comptant-immediat.html
      * cf. doc : https://secure.osb.pf/doc/fr-FR/form-payment/standard-payment/gerer-les-moyens-de-paiement-proposes-a-l-acheteur.html
      */
      orderData: {
          vads_action_mode: "INTERACTIVE",
          vads_order_id: `TEST-${Math.round(Math.random() * 1000)}`,
          vads_site_id: process.env.NEXT_PUBLIC_PAYZEN_SITE_ID,
          vads_ctx_mode: "TEST",
          vads_amount: "100",
          vads_currency: "953", // XPF
          vads_payment_cards: "", // laisser vide pour afficher tous les types de cartes
          vads_language: "fr", // laisser 'fr' car par défaut c'est la langue 'en'
          vads_theme_config: 'MODE_IFRAME=false;FORM_TARGET=_top', // affichage et comportement du theme, MODE_IFRAME=false => affichage complet, FORM_TARGET=_top => navigation
          vads_redirect_success_timeout: 5, // timeout du redirect après paiement accepté
          vads_redirect_error_timeout: 3, // timeout du redirect après paiement refusé
          vads_url_success: `http://${process.env.NEXT_PUBLIC_FRONTEND_HOST}:${process.env.NEXT_PUBLIC_FRONTEND_PORT}/payment-result/success`, // url retour paiement accepté
          vads_url_return: `http://${process.env.NEXT_PUBLIC_FRONTEND_HOST}:${process.env.NEXT_PUBLIC_FRONTEND_PORT}/payment-result/fail`, // url retour paiement refusé
          vads_return_mode: "POST"
      },
      
      credentials : {
          // endpoint retournant la signature du formulaire, cf. dossier backend
          source: `http://${process.env.NEXT_PUBLIC_PAYMENT_WS_HOST}:${process.env.NEXT_PUBLIC_PAYMENT_WS_PORT}/credentials`
      }
    });
  }

  render() {
    return <div>
      <button onClick={this.pay}>Payer</button>
      <div id="paymentCanvas"/>
    </div>;
  }
}