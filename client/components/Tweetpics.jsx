Tweetpics = React.createClass({
	
	// This mixin makes the getMeteordata method work
  	mixins: [ReactMeteorData],

  	// Loads items from the Tasks collection and puts on this.data.task
  	getMeteorData() {

  		var handle = Meteor.subscribe("tweets");
  		console.log(handle.ready());

  		// access the data via this.data
	    return {
	    	tweets: Tweets.find({}).fetch(),
	    	ready: handle.ready()
	    };
	  },

	makeTweets(){

		var tw;
		var res = _.map(this.data.tweets, function(value, key, list){
			
			var {created_at, text, ...other} = value;
			var url = value.entities.media[0].url;
			var img_src = value.entities.media[0].media_url;
			var alt = text.split('http', 1)[0];
			console.log(alt);
			
			tw = (
	                <div className="grid-item" key={key}>
	                	<a href={url} target="_blank">
	                		<img src={img_src} alt={alt}/>
	                	</a>	                                                
	                </div>                        
                );

			return tw;		
		});		
		return res
	},

	loading() {
		res = (<img src="img/tail-spin.svg" alt="Loading tweets..."/>)
		return res
	},

	render: function() {
		return (
			<div className="grid">
				{this.data.ready ? this.makeTweets() : this.loading()}
			</div>
		);
	}

});