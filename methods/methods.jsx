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

      // Meteor.wrapAsync doesn't return the error object correctly #2774
      // https://stackoverflow.com/questions/26226583/meteor-proper-use-of-meteor-wrapasync-on-server
      var charge = Meteor.makeAsync(Stripe.charges.create, Stripe.charges);
      
      try{
        console.log('trying');

        // Stripe.charges.create
        var result = charge(options);
        // console.log("result : ", result);
        return result        
        }

      catch(error){
        console.log('catching');
        // console.log("error",error.message);
      }
    }
  });
}