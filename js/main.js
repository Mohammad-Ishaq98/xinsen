(function ($) {
"use strict";

// meanmenu
$('#mobile-menu').meanmenu({
	meanMenuContainer: '.mobile-menu',
	meanScreenWidth: "767"
});

// heder btn when viewport is 767px
$('.meanmenu-reveal').on('click',function() {
	$('.header_btn').toggleClass('header_btn_responsive');
});

// One Page Nav
var top_offset = $('.header-area').height() - 10;
$('.main-menu nav ul').onePageNav({
	currentClass: 'active',
	scrollOffset: top_offset,
});


$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 245) {
		$(".header-sticky").removeClass("sticky");
	} else {
		$(".header-sticky").addClass("sticky");
	}
});



// mainSlider
function mainSlider() {
	var BasicSlider = $('.slider-active');
	BasicSlider.on('init', function (e, slick) {
		var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
		doAnimations($firstAnimatingElements);
	});
	BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
		var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
		doAnimations($animatingElements);
	});
	BasicSlider.slick({
		autoplay: false,
		autoplaySpeed: 10000,
		dots: false,
		fade: true,
		arrows: true,
		prevArrow: '<i class="fa fa-arrow-left"></i>',
		nextArrow: '<i class="fa fa-arrow-right"></i>',
		responsive: [
			{ breakpoint: 767, settings: { dots: false, arrows: false } }
		]
	});

	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function () {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function () {
				$this.removeClass($animationType);
			});
		});
	}
}
mainSlider();


// slick slider
$('.testimonial_slick').slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	dots:true,
});
	


/* magnificPopup img view */
$('.port-manefic').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

/* magnificPopup video view */
$('.popup-video').magnificPopup({
	type: 'iframe'
});


// isotop
$('.grid').imagesLoaded( function() {
	
	$('.filter-button-group').on( 'click', 'button', function() {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
});


var $grid = $('.grid').isotope({
		itemSelector: '.grid-item',
		percentPosition: true,
		masonry: {
				// use outer width of grid-sizer for columnWidth
				columnWidth: '.grid-item'
		}
})
});



//for menu active class
$('.portfolio-menu button').on('click', function(event) {
	$(this).siblings('.active').removeClass('active');
	$(this).addClass('active');
	event.preventDefault();
});
//preloder
$(window).on('load', function(){
	$('#preloader').fadeOut(500);
})
// scrollToTop
$.scrollUp({
	scrollName: 'scrollUp', // Element ID
	topDistance: '300', // Distance from top before showing element (px)
	topSpeed: 300, // Speed back to top (ms)
	animation: 'fade', // Fade, slide, none
	animationInSpeed: 200, // Animation in speed (ms)
	animationOutSpeed: 200, // Animation out speed (ms)
	scrollText: '<i class="icofont icofont-long-arrow-up"></i>', // Text for element
	activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
});

// WOW active
new WOW().init();
 
})(jQuery);

//progress bar
$(function(){

	// Remove svg.radial-progress .complete inline styling
	$('svg.radial-progress').each(function( index, value ) { 
					$(this).find($('circle.complete')).removeAttr( 'style' );
	});

	// Activate progress animation on scroll
	$(window).scroll(function(){
					$('svg.radial-progress').each(function( index, value ) { 
									// If svg.radial-progress is approximately 25% vertically into the window when scrolling from the top or the bottom
									if ( 
													$(window).scrollTop() > $(this).offset().top - ($(window).height() * 0.75) &&
													$(window).scrollTop() < $(this).offset().top + $(this).height() - ($(window).height() * 0.25)
									) {
													// Get percentage of progress
													percent = $(value).data('percentage');
													// Get radius of the svg's circle.complete
													radius = $(this).find($('circle.complete')).attr('r');
													// Get circumference (2πr)
													circumference = 2 * Math.PI * radius;
													// Get stroke-dashoffset value based on the percentage of the circumference
													strokeDashOffset = circumference - ((percent * circumference) / 100);
													// Transition progress for 1.25 seconds
													$(this).find($('circle.complete')).animate({'stroke-dashoffset': strokeDashOffset}, 1250);
									}
					});
	}).trigger('scroll');

})
