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
		// var res = _.map(this.data.tweets, function(value, key, list){
		// 	var {created_at, text, ...other} = value;
          
		// 	let node = null;

		// 	if (value.entities.media != undefined) {
		// 	  // has image
			  
		// 	  console.log(value.entities.media[0].media_url);
		// 	  return (
		// 	  	<div className="grid-item tweet" key={key} onClick={this.imgClicked}>
		// 	  		<div style={styles.tw_text} className="tw_text">{text}</div>
		// 	  		<img style={styles.tw_img} className="tw_img" src={value.entities.media[0].media_url} alt=""/>                            
		// 	  	</div>                        
		// 	  );
			  
		// 	};
		
		// });

		var styles = {
            tweet: {
                margin: '5px',
                padding: '5px',
                width: '250px',
                boxShadow: '2px 2px 2px #777777'
            },
            tw_img: {
                margin: '0px 0px 10px 0px',
                backgroundRepeat: 'no-repeat',
                width: '200px'    
            },
            tw_text: {
                fontSize: '8pt',
                width: '150px',
                textAlign: 'center',
                position: 'absolute',
                top: '25px',
                left: '25px'
            },
            created_at: {
                marginTop: '5px',
                fontSize: '6pt'
            },
            grid_item: { 
                marginBottom: '10px',
                position: 'relative'
            }
        }
        
		var c;

		var res = _.map(this.data.tweets, function(value, key, list){
			var {created_at, text, ...other} = value;
			c = (
	                <div className="grid-item tweet" key={key} onClick={this.imgClicked}>
	                    <div style={styles.tw_text} className="tw_text">{text}</div>
	                    <img style={styles.tw_img} className="tw_img" src={value.entities.media[0].media_url} alt=""/>                            
	                </div>                        
                );

			return c;
		
		});

		return res
	}, 

	render: function() {
		var a = (<div key="1" className="one">
					<div className="two">aye</div>
				</div>);

		var b = (<div key="2" className="one">
					<div className="two">bee</div>
				</div>)
		
		console.log(this.makeTweets());
		return (
			<div className="grid">{this.makeTweets()}</div>
		);
	}

});