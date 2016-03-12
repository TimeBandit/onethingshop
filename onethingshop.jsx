Tweets = new Mongo.Collection('tweets');

// only on client
if (Meteor.isClient) {  
  
  // This code is executed on the client only
    Meteor.startup(function () {
      console.log('awake! o_0');
      smoothScroll.init(
      {
        selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
        selectorHeader: '[data-scroll-header]', // Selector for fixed headers (must be a valid CSS selector)
        speed: 500, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
        offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
        callback: function ( toggle, anchor ) {} // Function to run after scrolling
      });

      setTimeout(function() {
        var $grid = $('.grid').masonry({
                // options
                itemSelector: '.grid-item',
                columnWidth: 200,
                gutter: 10
            });
      }, 5000);

      
    // Use Meteor.startup to render the component after the page is ready
    // render the component called APP on startup
    // ReactDOM.render(<App />, document.getElementById("render-target"));    
  });
}

if (Meteor.isServer) {
  console.log('im in server');
  Meteor.publish('tweets', function(){
    console.log('im in publish');
    var T = new Twit({
      consumer_key:         'fdSe5vUc99welC30DOp2ltaca',
      consumer_secret:      'XpOLMlhxLydmdF1qjQKPqF7sqI9iYpuBRY1E2Jhp0ZkZkQGrtd', 
      access_token:         '610359512-xCEh6tFIt14lP1ouZ6TFo2PKPR4FJ4N8XxiMlXfQ', 
      access_token_secret:  '39boff7gryzbzB1cWOAwvZ0w9RY47Wu5Uqih5RnIbEo69'
    });

    var args = {
      count: 20,
      user_id: 'MagnumPhotos',
      screen_name: 'MagnumPhotos'
    };

    res = T.get('statuses/user_timeline', args,  function (err, tweets, response) {

      console.log(tweets);

      _.each(tweets, function(value, key, list){
          var {created_at, text, ...other} = value;
          
          let node = null;

          if (value.entities.media != undefined) {
              // has image
              // console.info(value.entities.media[0].media_url.toString());
              // let imgPath = value.entities.media[0].media_url.toString();
              console.log(value.entities.media[0].media_url);
              node = (
                  <div className="grid-item tweet" key={key} onClick={this.imgClicked}>
                      <div style={styles.tw_text} className="tw_text">{text}</div>
                      <img style={styles.tw_img} className="tw_img" src={value.entities.media[0].media_url} alt=""/>                            
                  </div>                        
              );
              
          };
          // console.info(node);
          // res.push(node);
          self.added('tweets', Random.id(), node);
      });

      self.ready();
    });
  });
}