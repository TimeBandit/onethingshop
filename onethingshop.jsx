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
// adad

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