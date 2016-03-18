Buy = React.createClass({
	getInitialState: function() {
		return {
			message: "",
			disabled: true
		};
	},

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

	handlePayment: function(e){
		var self = this;

		e.preventDefault();
		console.log(this);
		StripeCheckout.open({
            key: Meteor.settings.public.stripe,
            image: 'img/icon.png',
            name: 'Post a Spatula',
        	description: 'Enter the recipents adress to send',
        	currency: 'GBP',        
        	shippingAddress: true,        	          
        	panelLabel: 'Pay Now',
	        zipCode: true,
	        shippingAddress: true,          
            token: function(res, args) {
            	stripeToken = res.id;
              	console.info('the Stripe token ', res);
              	console.log('The args ', args);
              	Meteor.call('chargeCard', stripeToken, self.state.message);
              	// if the method return successfull
              	// store the customer details + message in the db
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
