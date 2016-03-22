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

    'test': function(){
      return 10
    },

    /**
     *
     * Charge a payment card
     *
     */
    
    'chargeCard': function(stripeToken, message, args) {
      var self = this;
            
      var Stripe = StripeAPI(Meteor.settings.private.stripe);
      // var Stripe = StripeSync(Meteor.settings.private.stripe);
      var charge = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);
      
      var metadata = args;
          metadata.message = message;

      try {

        // Stripe.charges.create
        var res =  charge({         
          amount: 500,
          currency: 'GBP',        
          source: stripeToken,
          metadata: metadata
        })

        return res;

      } catch(error) {
        // statements
        throw new Meteor.Error(1001, error.message);
      }

    }
  });
}