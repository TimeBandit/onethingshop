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
    width: "100%"
  }
  return (
  <div className="mdl-card mdl-shadow--2dp" style={outer}>
    <div className="mdl-card__media" style={{height:"320px", backgroundColor: "#ffffff"}}>
      <img src={props.url} width="200" height="auto" border="0" alt="" style={{padding:"10px", display: "block", margin: "0px auto"}} />
    </div>    
    <div className="mdl-card__supporting-text">
      {props.desc}
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
    
    render(<HowCard url="img/post-a-spatula-message-200px.png"
      stepnum="One"
      desc="Enter a message of 70 characters or less into the box. Swear words will be replaced 
        with ****'s." 
      />, document.getElementById("how1"));
    
    render(<HowCard url="img/post-a-spatula-shipping-200px.png"
      stepnum="Two"
      desc="Press 'BUY'. You will see a dialog appear. Enter the shipping details and payment information. Remember to enter the correct shipping details of the person you will send a spatula to."
      />, document.getElementById("how2"));
    
    render(<HowCard url="img/envelope2.png"
      stepnum="Three" 
      desc="The payment will process. You will see a confirmation message and we will post your spatula with proof of delivery. You will not be charged if the card is declined. Enjoy!" 
      />, document.getElementById("how3"));

    /* head code */
    console.log('comodoHead.js');
    var tlJsHost = ((window.location.protocol == "https:") ? "https://secure.comodo.com/" : "http://www.trustlogo.com/");

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = tlJsHost + "trustlogo/javascript/trustlogo.js";

    $("head").append(script);

    /* body code */
    
    var script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.url = '/scripts/comodoBody.js';
    $("body").append(script2);
    
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