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
      var self = this;
            
      var Stripe = StripeAPI(Meteor.settings.private.stripe);
      
      var metadata = args;
          metadata.message = message;

      /* wrapAsynch the stripe charges.create */
      var synchResult;
      var synchCharge = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);     
      
      Stripe.charges.create({
         
        amount: 500,
        currency: 'GBP',        
        source: stripeToken,
        metadata: metadata
      }, function(err, charge) {
        /* asynch callback */
        
        /* build result document */

        var res = {
          success: false,
          message: ""
        }

        if (err) {

          res.message = err.message;

        } else if (charge) {

          res.success = true;
          res.message = charge.status;

        }

        // delete all objects in the collction
        // Transaction.remove({}, (err) => {console.log(err)});
        // add new result
        // Transaction.insert(res, (err) => {console.log(err)});

        // self.added('tweets', Random.id(), value);
        // self.ready();
        console.log('===================');
        console.log(err);
        console.log('**********');
        console.log(charge);
      });
    }
  });
}