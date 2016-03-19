if (Meteor.isServer){
  Meteor.methods({
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
        console.log('in the method call');
        console.log(err);
      });
    }
  });
}