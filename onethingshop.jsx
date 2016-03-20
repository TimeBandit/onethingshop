/*===========================================
=            Client + Sever Code            =
===========================================*/

/**

  TODO:
  - move twitter keys to settings file
  - Second todo item

 */


/**
 *
 * init collections
 * render components
 */

if (Meteor.isClient) {

  /* hold fetched tweets */  
  Tweets = new Mongo.Collection('tweets');
  
  /* hold stripe transaction result */  
  StripeOutcome = new Mongo.Collection('stripeOutcome');
  
  Meteor.startup(function () {

      console.info('IN CLIENT o_0');
          
      /* render components */    
      ReactDOM.render(<Tweetpics />, document.getElementById("tweets"));
      ReactDOM.render(<Carousel />, document.getElementById("carousel"));
      ReactDOM.render(<Buy maxlength="70"/>, document.getElementById("buy"));
    
  });
}

/**
 *
 * server side code to fetch tweets from timeline
 *
 */

if (Meteor.isServer) {

  console.log('IN SERVER o_0');

  Meteor.publish('tweets', function(){

    var self = this;

    var T = new Twit({
      consumer_key:         'fdSe5vUc99welC30DOp2ltaca',
      consumer_secret:      'XpOLMlhxLydmdF1qjQKPqF7sqI9iYpuBRY1E2Jhp0ZkZkQGrtd', 
      access_token:         '610359512-xCEh6tFIt14lP1ouZ6TFo2PKPR4FJ4N8XxiMlXfQ', 
      access_token_secret:  '39boff7gryzbzB1cWOAwvZ0w9RY47Wu5Uqih5RnIbEo69'
    });

    var args = {
      count: 20,
      user_id: 'FoodPornPhotos',
      screen_name: 'FoodPornPhotos'
    };

    /* fetch tweets */    
    res = T.get('statuses/user_timeline', args,  function (err, tweets, response) {

      console.log('TWEETS RECEIVED');
      
      _.each(tweets, function(value, key, list){
          
          if (value.entities.media != undefined) {
            /* add each tweet to the collection */
            
            self.added('tweets', Random.id(), value);
          };
          
      });
      /* inform the client that the subscription is ready */
      
      console.log('PUBLICATION READY o_0');
      self.ready();
    });
  });
}