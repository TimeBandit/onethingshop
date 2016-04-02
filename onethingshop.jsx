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

import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';

function HowCard(props) {

var outer = {
  backgroundImage: "url(" + props.url + ")",
  backgroundPosition: "center",
  backgroundSize: "cover"
}

var desc =  {
  height: "52px",
  padding: "16px",
  background: "rgba(0, 0, 0, 0.2)"
}

var text = {
  color: "#fff",
  fontSize: "14px",
  fontWeight: "500"
}

  
  return (
    <div class="demo-card-image mdl-card mdl-shadow--2dp" style={outer}>
      <div class="mdl-card__title mdl-card--expand"></div>
      <div class="mdl-card__actions" style={desc}>
      <span class="demo-card-image__filename" style={text}>Image.jpg</span>
      </div>
    </div>
  )
};

if (Meteor.isClient) {  
  
  Meteor.startup(function () {   

    /* smooth scrolling */
    smoothScroll.init({
      selectorHeader: '[data-scroll-header]',
      callback: function ( toggle, anchor ) {
        console.log(anchor);
      } 
    });

    console.info('IN CLIENT o_0');

    /* hold fetched tweets */  
    Tweets = new Mongo.Collection('tweets');      
  
    /* render components */    
    render(<Tweetpics />, document.getElementById("tweets"));
    render(<Carousel />, document.getElementById("carousel"));
    render(<Buy maxlength="70"/>, document.getElementById("buy"));
    
    render(<HowCard url="img/pas-message2.png"
      stepnum="One"
      description="Enter a message of 70 characters or less into the box. Shorter 
       messages can be written in larger letters. Any expletives will be replaced 
        with ****'s." 
      />, document.getElementById("step1"));
    
    render(<HowCard url="img/pas-message.png"
      stepnum="Two"
      description="Press the 'BUY' button to enter your payment shipping &amp; details. Remember to enter the correct shipping details of the person you will send a spatula to. Enter your payment card details and pay."
      />, document.getElementById("step2"));
    
    render(<HowCard 
      stepnum="Three" 
      description="The payment will process. You will see a confirmation message. You will not be charged if the card is declined. Enjoy!" 
      />, document.getElementById("step3"));
    
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
      consumer_key:         Meteor.settings.public.consumer_key,
      consumer_secret:      Meteor.settings.private.consumer_secret, 
      access_token:         Meteor.settings.public.access_token, 
      access_token_secret:  Meteor.settings.private.access_token_secret
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
            // console.log(value);
            self.added('tweets', Random.id(), value);
          };
          
      });
      /* inform the client that the subscription is ready */
      
      console.log('PUBLICATION READY o_0');
      self.ready();
    });
  });
}