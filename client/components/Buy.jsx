/*=========================================================
=            Buy Component - Integrates Stripe            =
=========================================================*/

/**

	TODO:
	- First todo item
	- Second todo item

 */

Buy = React.createClass({
	/**
	 *
	 * message - customization message
	 * disabled - applies to the BUY button
	 */
	
	getInitialState: function() {
		return {
			message: "",
			disabled: true
		};
	},

	/**
	 *
	 * Manage this.state.message, control when the BUY button is enables
	 *
	 */
	
	onChange: function (e) {
		 e.preventDefault();
		 var message = e.target.value;

		 this.setState({
			 		message: e.target.value
		 		});
		 
		 if (message === "") {
		 	this.setState({
			 		disabled: true
			 	}); 	
		 }else {
		 	this.setState({
			 		disabled: false
			 	});
		 }
	},

	/**
	 *
	 * Fetch token from stripe, charge card using token via method call on server
	 *
	 */
	
	handlePayment: function(e){

		var self = this;
		e.preventDefault();
		
		StripeCheckout.open({
            key: Meteor.settings.public.stripe,
            image: 'img/icon.png',
            name: 'Post a Spatula',
        	description: 'Enter the recipents adress to send',
        	currency: 'GBP',
        	billingAddress: false, 
        	shippingAddress: true,        	          
        	panelLabel: 'Pay Now',
	        zipCode: true,
	        shippingAddress: true,          
            token: function(res, args) {

            	/* validate that postcode is in the UK */            	
            	var url = 'https://api.postcodes.io/postcodes/' + args.shipping_address_zip + '/validate';
            	HTTP.get(url, function(error, result){

            		/* extract the validation flag */            		
            		var res = JSON.parse(result.content).result;
            		if ((error || !res)) {
            			console.log('error in post code');
            			StripeCheckout.close();
            			// raise an error flag, we do not deliver to the UK
            		} else {
            			Meteor.call('chargeCard', stripeToken, self.state.message, args);		
            		}
            	});
            }
          });
	},

    render: function() {
        return (
            <div className="buy">
            	<div className="mdl-textfield mdl-js-textfield">
				    <textarea className="mdl-textfield__input" type="text" rows= "3" id="message" onChange={this.onChange} 
				value={this.state.message} maxLength={parseInt(this.props.maxlength)} placeholder="You message here..."></textarea>
			    	<label className="mdl-textfield__label" htmlFor="sample5"></label>
				</div>			
				<div className="mdl-card__supporting-text">
					Your have <strong>{parseInt(this.props.maxlength - this.state.message.length)}</strong> characters left.
					Enter your message above. Fewer words means we can write using bigger text.
				</div>
					<div className="mdl-card__actions mdl-card--border">				    	
						<button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={this.handlePayment} disabled={this.state.disabled}>
						  BUY £5
						</button>
				  </div>
			</div>
        );
    }
});
