/*=========================================
=            Tweets Components            =
=========================================*/

/**

	TODO:
	- First todo item
	- Second todo item

 */

Tweetpics = React.createClass({
	/**
	 *
	 * Fetches tweets from timeline and displayes images using Masonry.js
	 *
	 */

	 componentDidMount: function() {

	 	setTimeout(function() {
               
			var $grid = $('.grid').imagesLoaded( function() {
				// init Masonry after all images have loaded
				$grid.masonry({	 		
					// options...
					itemSelector: '.grid-item',
					columnWidth: 200
				});
			});
		}, 300);
	 },
	
	/* This mixin makes the getMeteordata method work */	
  	mixins: [ReactMeteorData],

  	/**
  	 * getMeteorData()
  	 * Loads items from the Tasks collection and puts on this.data.task
  	 *
  	 */
  	
  	getMeteorData() {

  		var handle = Meteor.subscribe("tweets");
  		
  		handle.ready() ? console.log('receiving new data') : console.log('waiting...');

  		/* access the data via this.data */  		
	    return {
	    	tweets: Tweets.find({}).fetch(),
	    	ready: handle.ready()
	    };
	  },

	/**
	 *
	 * makeTweets()
	 * strip images from feed, compose DOM for each
	 */
	
	makeTweets(){

		var tw;

		/* compose array of react elements */		
		var res = _.map(this.data.tweets, function(value, key, list){
			
			var {created_at, text, ...other} = value;
			var url = value.entities.media[0].url;
			var img_src = value.entities.media[0].media_url;
			var alt = text.split('http', 1)[0];
			
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

	/**
	 *
	 * alternative display whilst images load
	 *
	 */
	
	loading() {
		res = (<img src="img/tail-spin.svg" alt="Loading tweets..."/>)
		return res
	},

	/**
	 *
	 * conditionaly display loading svg or images once loaded
	 *
	 */
	
	render: function() {
		return (
			<div className="grid">
				{this.data.ready ? this.makeTweets() : this.loading()}
			</div>
		);
	}

});