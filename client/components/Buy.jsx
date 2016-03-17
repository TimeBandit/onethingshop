Buy = React.createClass({

    render: function() {
        return (
            <div className="buy">
            	<div className="mdl-textfield mdl-js-textfield">
				    <textarea className="mdl-textfield__input" type="text" rows= "3" id="message" ></textarea>
			    	<label className="mdl-textfield__label" for="sample5"></label>
				</div>			
				<div className="mdl-card__supporting-text">
					Enter your message above. Fewer words means we can write using bigger text.
				</div>
					<div className="mdl-card__actions mdl-card--border">				    	
						<button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" disabled>
						  Button
						</button>
				  </div>
			</div>
        );
    }
});
