/*=========================================================
=            'Buy' Component - Integrates Stripe            =
=========================================================*/

/**

	TODO:
	- First todo item
	- Second todo item
	- possible ways to report transaction result back to client
		- use session > this is client side only
		- use a client side db > can be done and would be reactive but needs a 
		subscription and db queeies
		- use send a callback function sent to the serverside that update a reactive var
		on the client > dont know if you can do this, most complicated of the three
		- create a collections transation, the user subscribes to the reult of only their
		transaction. on the server the id's of all transactions are added to a common collection
		- fetch the transaction status via the API
	- disable and clear form after all pass/fail transactions

 */


import React from 'react';

Buy = React.createClass({
	/**
	 *
	 * Configure Stripe checkout
	 *
	 */
	
	componentDidMount: function() {
		/* Create a Stripe handler and stoe it to state */
		
		var handler = StripeCheckout.configure({
			key: Meteor.settings.public.stripe,
            image: 'img/spatula-256px-500pxcv.png',
            name: 'Post a Spatula',
        	description: 'Enter the recipents adress to send',
        	amount: 500,
        	locale: 'auto',
        	currency: 'GBP',
        	panelLabel: 'Pay Now',
        	zipCode: true,
        	billingAddress: false, 
        	shippingAddress: true        		    
		});

		this.setState({
				sh: handler 
			});
	},

	/**
	 * getInitialState()
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
	 * onChange()
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
		 } else {
		 	this.setState({
			 		disabled: false
			 	});
		 }
	},

	handlePayment: function(e){

		var self = this;
		var handler = this.state.sh;

		

		e.preventDefault();
		
		handler.open({

            token: function(res, args) {

            	/* extract token */            	
            	var stripeToken = res.id;

            	/* validate that postcode is in the UK */            	
            	var url = 'https://api.postcodes.io/postcodes/' + args.shipping_address_zip + '/validate';
            	
            	HTTP.get(url, function(error, result){

            		/* extract the validation flag */            		
            		var isUKAdress = JSON.parse(result.content).result;

            		if ((error || !isUKAdress)) {

            			console.log('error in post code');

            			handler.close();
            			// raise an error flag, we do not deliver to the UK

            		} else {

            			var metadata = args;
          					metadata.message =  self.state.message;

            			var options =  {         
							          amount: 500,
							          currency: 'GBP',        
							          source: stripeToken,
							          metadata: metadata
							        };			

            			Meteor.call('chargeCard', options , function(error, result){
            				
            				console.log('back from call');
            				// result.data.status = "succeeded"
            				// result.error.message = "Your card was declined."
            				if (result.data) {
            					
								
								self.setState({
									message: '' 
								});

								let msg = 'Thank you ! \
									Your surprise is on its \
									way to ' + args.shipping_name + '!';

								swal({
								  title: result.data.status,
								  text: msg,
								  type: "success",
								  imageSize: "80x80"
								});
		        				
		        				} else {
		        				
	        					self.setState({
									message: '' 
								});

	        					let msg = 'Oops your card provider \
	        						declined this transaction. \
	        						You have not been charged';

	        					swal({
								  title: result.error.message,
								  text: msg,
								  type: "error",
								  imageSize: "80x80"
								});
	        				}
	        			});
            		}
            	});
            }
		});
	},	

    render: function() {
        return (
        	<div id="message" className="mdl-card">
				<div className="mdl-card__title">
				    <h3 className="mdl-card__title-text"></h3>
				</div>
				<div className="mdl-card__supporting-text">
					<div className="mdl-textfield mdl-js-textfield">
						<textarea className="mdl-textfield__input" 
							type="text" 
					    	rows= "5" 
					    	id="message" 
					    	onChange={this.onChange} 
							value={this.state.message} 
							maxLength={parseInt(this.props.maxlength)} 
							placeholder="Your message here...">
						</textarea>
						<label className="mdl-textfield__label" htmlFor="sample5"></label>
					</div>					
				</div>
				<div className="mdl-card__actions mdl-card--border">
					<a className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.handlePayment} disabled={this.state.disabled}>
						ORDER NOW £5						
					</a>		
				</div>
				<div id="charCount" className="mdl-card__menu">
					<span className="mdl-badge" data-badge={parseInt(this.props.maxlength - this.state.message.length)}></span>					
				</div>
			</div>
        );
    }
});
