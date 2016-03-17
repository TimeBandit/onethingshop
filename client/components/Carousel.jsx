Carousel = React.createClass({

	componentDidMount: function() {
		$('.slider').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: false,
          draggable: false,
          fade: true,
          mobileFirst: true
		});

        console.log('carousel starting');
	},

	render: function() {
		return (
			<div className="slider">
				<div className="demo-card-image1">
	                <div className="mdl-card__actions">
	                    <span className="demo-card-image__filename">
	                    Tired of sending cards?</span>
	                </div>
	            </div>
	            <div className="demo-card-image2">
	                <div className="mdl-card__actions">
	                    <span className="demo-card-image__filename">
	                    Surprise someone.</span>
	                </div>
	            </div>
	            <div className="demo-card-image4">
	                <div className="mdl-card__actions">
	                    <span className="demo-card-image__filename">
	                    100% Anonymous.</span>
	                </div>
	            </div>
			</div>
		);
	}

});