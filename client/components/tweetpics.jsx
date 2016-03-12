Tweetpics = React.createClass({
	
	// This mixin makes the getMeteordata method work
  	mixins: [ReactMeteorData],

  	// Loads items from the Tasks collection and puts on this.data.task
  	getMeteorData() {

  		Meteor.subscribe("tweets");

  		// access the data via this.data
	    return {
	      tweets: Tweets.find()
	    };
	  },

	render: function() {
		return (
			<div className="grid">{this.data.tweets}</div>
		);
	}

});