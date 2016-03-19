/*===========================================
=            Server-side methods            =
===========================================*/

/**

  TODO:
  - First todo item
  - Second todo item

 */

if (Meteor.isServer){
  Meteor.methods({
    /**
     *
     * Charge a payment card
     *
     */
    
    'chargeCard': function(stripeToken, message, args) {
            
      var Stripe = StripeAPI(Meteor.settings.private.stripe);
      var metadata = args;
          metadata.message = message;

      Stripe.charges.create({
         
        amount: 500,
        currency: 'GBP',        
        source: stripeToken,
        metadata: metadata
      }, function(err, charge) {

        console.log('Stripe.charges.create callback');
        console.log(err);
      });
    }
  });
}