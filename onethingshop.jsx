// only on client
if (Meteor.isClient) {

  // This code is executed on the client only
    Meteor.startup(function () {
      smoothScroll.init({
        selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
        selectorHeader: '[data-scroll-header]', // Selector for fixed headers (must be a valid CSS selector)
        speed: 500, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
        offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
        callback: function ( toggle, anchor ) {} // Function to run after scrolling
    });
    // Use Meteor.startup to render the component after the page is ready
    // render the component called APP on startup
    // ReactDOM.render(<App />, document.getElementById("render-target"));    
  });
}