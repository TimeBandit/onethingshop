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

    'chargeCard': function(options) {
      console.log('inside chargeCard');

      var self = this;            
      
      var Stripe = StripeAPI(Meteor.settings.private.stripe);

      var response = Async.runSync(function(done) {
        Stripe.charges.create(options, function(err, charge){
          
          done(err, charge);
          
        })        
      });
      return response;

    }
  });
}