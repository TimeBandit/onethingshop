Tweetpics = React.createClass({
	
	// This mixin makes the getMeteordata method work
  	mixins: [ReactMeteorData],

  	// Loads items from the Tasks collection and puts on this.data.task
  	getMeteorData() {

  		var handle = Meteor.subscribe("tweets");
  		console.log(handle.ready());

  		// access the data via this.data
	    return {
	      tweets: Tweets.find({}).fetch()
	    };
	  },

	makeTweets(){		
		// });<div className="tw_text">{text}</div>

		var t;
		var res = _.map(this.data.tweets, function(value, key, list){
			var {created_at, text, ...other} = value;
			t = (
	                <div className="grid-item" key={key}>	                    
	                    <img src={value.entities.media[0].media_url} alt=""/>                            
	                </div>                        
                );

			return t;		
		});		
		return res
	}, 

	render: function() {		
		return (
			<div className="grid">
				{this.makeTweets()}
			</div>
		);
	}

});