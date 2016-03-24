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

 */

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
            image: 'img/icon.png',
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
		 }else {
		 	this.setState({
			 		disabled: false
			 	});
		 }
	},

	/**
	 * handlePayment()
	 * Fetch token from stripe, charge card using token via method call on server
	 *
	 */
	
	handlePayment: function(e){

		var self = this;
		var handler = this.state.sh;

		

		e.preventDefault();
		
		handler.open({

            token: function(res, args) {

            	handler.close()

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
          					metadata.message = message;

            			var options =  {         
							          amount: 500,
							          currency: 'GBP',        
							          source: stripeToken,
							          metadata: metadata
							        };			

            			Meteor.call('chargeCard', options , function(error, result){
            				console.log('back from call');

            				if (result.data) {
								
								self.setState({
									message: '' 
								});

								let msg = 'Thank you ! \
									Your surprise is on its \
									way to ' + args.shipping_name + '!';

								swal({
								  title: "Sweet!",
								  text: msg,
								  imageUrl: "img/icon.png",
								  imageSize: "80x80"
								});
		        				
		        				} else {
		        				
	        					
	        					let msg = 'Oops your card provider \
	        						declined this transaction. \
	        						You have not been charged';

	        					swal({
								  title: "Oops!",
								  text: msg,
								  imageUrl: "img/icon.png",
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
            <div className="buy">
            	<div className="mdl-textfield mdl-js-textfield">
				    <textarea className="mdl-textfield__input" 
				    	type="text" 
				    	rows= "3" 
				    	id="message" 
				    	onChange={this.onChange} 
						value={this.state.message} 
						maxLength={parseInt(this.props.maxlength)} 
						placeholder="Your message here...">
					</textarea>
			    	<label className="mdl-textfield__label" 
			    		htmlFor="sample5">
			    	</label>
				</div>			
				<div className="mdl-card__supporting-text">
					<h4>{parseInt(this.props.maxlength - this.state.message.length)} characters left</h4>
				</div>
					<div className="mdl-card__actions mdl-card--border">	
					<a className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={this.handlePayment} disabled={this.state.disabled}>
						  BUY £5
					</a>			    	
						
				  </div>
				  
			</div>
        );
    }
});
