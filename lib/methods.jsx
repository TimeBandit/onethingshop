if (Meteor.isServer){
  Meteor.methods({
    'chargeCard': function(stripeToken) {
      var Stripe = StripeAPI(Meteor.settings.private.stripe);

      Stripe.charges.create({
        amount: 500,
        currency: 'gbp',
        source: stripeToken
      }, function(err, charge) {
        console.log('in the method call');
        console.log(err);
      });
    }
  });
}