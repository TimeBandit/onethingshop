if (Meteor.isServer){
  Meteor.methods({
    'chargeCard': function(stripeToken, message) {
      var Stripe = StripeAPI(Meteor.settings.private.stripe);

      Stripe.charges.create({
        amount: 500,
        currency: 'GBP',        
        source: stripeToken,
        metadata: {'message': message}
      }, function(err, charge) {
        console.log('in the method call');
        console.log(err);
      });
    }
  });
}