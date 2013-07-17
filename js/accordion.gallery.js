/*
	jQuery based Accordion Photo Gallery
	v1.0
	Sean X. Luo
	
	TODO:
		> multiple galleries
		> add support for divs in the gallery with html content
		> image/video anchoring:
			- give options for anchoring like BGStretcher?
			- CSS background position type options:
				1) top left
				2) top center
				3) top right
				4) center left
				5) center center
				6) center right
				7) bottom left
				8) bottom center
				9) bottom right
		> extend support for multiple video types
	
	FEATURES:
		Accordion style photo gallery
		Maintains aspect ratios
		Full Screen/Specific size gallery
		Custom sized accordion gutters
		Dragging interaction
		Video support (.flv only at the moment)
		Touch support
		Main elements easily stylable through CSS
	
	GOTCHAS:
	
	REQUIRES:
		jQuery: //ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
		jQuery UI: //ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js
		jQuery Easing: http://gsgd.co.uk/sandbox/jquery/easing/
		jQuery UI Touch Punch: http://touchpunch.furf.com/
		jPlayer: http://www.jplayer.org/
	
	DEFAULT/SETTABLE OPTIONS:
		width: 1024, // set to view port width if not full screen
		height: 768, // set to view port height if not full screen
		full_screen: false, // full screen gallery mode
		auto: false, // auto slideshow
		draggable: false, // enable dragging interaction to switch slides
		delay: 5000, // delay in ms for auto slideshow
		indicator_controls: false, // whether or not to show a play/pause indicator for the slideshow
		pause_text: "pause", // text for the pause indicator control state, feel free to pass nothing and style w/ pure css
		play_text: "play", // text for the pla indicator control state, feel free to pass nothing and style w/ pure css
		gutter: 50, // amount of gutters to show for accordion
		easing: "easeOutCubic", // what easing to use for slide show animations
		description_wrap: "p", // what to wrap the overlay descriptions in
		manual_click_callback: null, // callback function to pass to the manual click function
		swf_source: "swf", // path to swf file for jPlayer
		overlay_pause: true, // whether or not to pause the slideshow on overlay hover
		
		// try not to modify the following options as that'll mean the default css selectors won't work anymore
		// they are user settable in case you absolutely NEED to override them for some reason...
		target: $("#accordion-gallery"), // feel free to change, but at least leave the class selector the same to maintain existing css definitions
		indicator_class: "accordion-gallery-indicator", // best not to override in options otherwise css selectors will need to be changed
		indicator_inner_class: "accordion-gallery-indicator-inner", // best not to override in options otherwise css selectors will need to be changed
		indicator_control_class: "accordion-gallery-indicator-control", // best not to override in options otherwise css selectors will need to be changed
		slide_class: "accordion-gallery-slide", // best not to override in options otherwise css selectors will need to be changed
		overlay_class: "accordion-gallery-overlay", // best not to override in options otherwise css selectors will need to be changed
		overlay_title_class: "accordion-gallery-overlay-title", // best not to override in options otherwise css selectors will need to be changed
		overlay_description_class: "accordion-gallery-overlay-description", // best not to override in options otherwise css selectors will need to be changed
		slide_element_class: "accordion-gallery-element", // best not to override in options otherwise css selectors will need to be changed
		video_slide_element_class: "accordion-gallery-video-element", // best not to override in options otherwise css selectors will need to be changed
		video_slide_poster_class: "accordion-gallery-video-poster", // best not to override in options otherwise css selectors will need to be changed
		loading_class: "accordion-gallery-loading", // best not to override in options otherwise css selectors will need to be changed
		body_loading_class: "body-accordion-gallery-loading", // best not to override in options otherwise css selectors will need to be changed
		active_class: "accordion-gallery-active", // best not to override in options otherwise css selectors will need to be changed
		body_full_screen_class: "full-screen-accordion-gallery", // best not to override in options otherwise css selectors will need to be changed
		body_view_port_class: "view-port-accordion-gallery", // best not to override in options otherwise css selectors will need to be changed
		drag_class: "accordion-gallery-drag" // best not to override in options otherwise css selectors will need to be changed
	
	EXAMPLES:
		<div class="accordion-gallery" id="accordion-gallery">
			<img src="path/to/image" title="overlay title" alt="overlay description" />
			<video width="width" height="height" src="source" poster="poster"></video>
			<!-- invalid slide elements, will be automatically removed -->
			<div>...</div>
			<p>...</p>
			<span>...</span>
			<table>...</table>
			<form>...</form>
		</div>
		
		$(document).ready(function() {
			// full screen, auto, draggable
			var gallery_options = {
				target: $("#accordion-gallery"),
				full_screen: true,
				auto: true,
				draggable: true
			}
			
			// viewported, auto, draggable
			var gallery_options = {
				target: $("#accordion-gallery"),
				full_screen: false,
				width: 1000,
				height: 600,
				auto: true,
				draggable: true
			}
			
			accordion_gallery.init(gallery_options);
		});
*/

var accordion_gallery = {

	// variables
	
	// local non user settable variables
	valid_slide_selector: "img, video", // selector of valid child types when generating slides
	num_slides: 0, // number of slides in the gallery
	active_slide: 0, // current active slide index, 0 indexed
	slides: {}, // object store of all slides for reference
	has_videos: false, // if the gallery has videos in it
	videos: {}, // object store of all videos for reference
	loading_screen: null, // loading screen jquery object
	indicator: null, // slide progress indicator jquery object
	slideshow_interval: null, // interval store for auto advancing slideshow
	is_auto_click: false, // whether the gallery click navigation is triggered manually or automatically
	manually_stopped: false, // whether or not the gallery was ever manually stopped
	dragging: false, // whether or not we're dragging
	
	// user settable options
	options: {
		width: 1024, // set to view port width if not full screen
		height: 768, // set to view port height if not full screen
		full_screen: false, // full screen gallery mode
		auto: false, // auto slideshow
		draggable: false, // enable dragging interaction to switch slides
		delay: 5000, // delay in ms for auto slideshow
		indicator_controls: false, // whether or not to show a play/pause indicator for the slideshow
		pause_text: "pause", // text for the pause indicator control state, feel free to pass nothing and style w/ pure css
		play_text: "play", // text for the pla indicator control state, feel free to pass nothing and style w/ pure css
		gutter: 50, // amount of gutters to show for accordion
		easing: "easeOutCubic", // what easing to use for slide show animations
		description_wrap: "p", // what to wrap the overlay descriptions in
		manual_click_callback: null, // callback function to pass to the manual click function
		swf_source: "swf", // path to swf file for jPlayer
		overlay_pause: true, // whether or not to pause the slideshow on overlay hover
		
		// try not to modify the following options as that'll mean the default css selectors won't work anymore
		// they are user settable in case you absolutely NEED to override them for some reason...
		target: $("#accordion-gallery"), // feel free to change, but at least leave the class selector the same to maintain existing css definitions
		indicator_class: "accordion-gallery-indicator", // best not to override in options otherwise css selectors will need to be changed
		indicator_inner_class: "accordion-gallery-indicator-inner", // best not to override in options otherwise css selectors will need to be changed
		indicator_control_class: "accordion-gallery-indicator-control", // best not to override in options otherwise css selectors will need to be changed
		slide_class: "accordion-gallery-slide", // best not to override in options otherwise css selectors will need to be changed
		overlay_class: "accordion-gallery-overlay", // best not to override in options otherwise css selectors will need to be changed
		overlay_title_class: "accordion-gallery-overlay-title", // best not to override in options otherwise css selectors will need to be changed
		overlay_description_class: "accordion-gallery-overlay-description", // best not to override in options otherwise css selectors will need to be changed
		slide_element_class: "accordion-gallery-element", // best not to override in options otherwise css selectors will need to be changed
		video_slide_element_class: "accordion-gallery-video-element", // best not to override in options otherwise css selectors will need to be changed
		video_slide_poster_class: "accordion-gallery-video-poster", // best not to override in options otherwise css selectors will need to be changed
		loading_class: "accordion-gallery-loading", // best not to override in options otherwise css selectors will need to be changed
		body_loading_class: "body-accordion-gallery-loading", // best not to override in options otherwise css selectors will need to be changed
		active_class: "accordion-gallery-active", // best not to override in options otherwise css selectors will need to be changed
		body_full_screen_class: "full-screen-accordion-gallery", // best not to override in options otherwise css selectors will need to be changed
		body_view_port_class: "view-port-accordion-gallery", // best not to override in options otherwise css selectors will need to be changed
		drag_class: "accordion-gallery-drag" // best not to override in options otherwise css selectors will need to be changed
	},
	
	// initializes the gallery
	init: function(options) {
		// set all options
		accordion_gallery.set_options(options);
		// apply relevant classes to body
		if( accordion_gallery.options.full_screen ) {
			$("body").addClass(accordion_gallery.options.body_full_screen_class);
		} else {
			$("body").addClass(accordion_gallery.options.body_view_port_class);
		}
		// create loading screen overlay
		accordion_gallery.create_loading_screen();
		// generate slides html based on provided html
		accordion_gallery.create_slides();
		$(window).load(function() {
			// load up first slide
			accordion_gallery.set_first();
			// set up click events for slide navigation
			accordion_gallery.bind_manual_click();
			if( accordion_gallery.has_videos ) {
				// if there are videos, set video functionality
				accordion_gallery.bind_videos();
			}
		});
		// if slideshow is set to auto, generate progress indicator
		if( accordion_gallery.options.auto ) {
			accordion_gallery.create_indicator();
			$(window).load(function() {
				// start slide show
				accordion_gallery.set_slideshow();
				// bind clear slideshow options
				accordion_gallery.bind_clear_slideshow();
			});
		}
		// if the dragging interraction is enabled, set it
		if( accordion_gallery.options.draggable ) {
			$(window).load(function() {
				accordion_gallery.set_draggable();
			});
		}
		// if overlay pause is set, set it
		if( accordion_gallery.options.overlay_pause && accordion_gallery.options.auto ) {
			accordion_gallery.set_overlay_pause();
		}
	},
	
	// parses through provided options and overrides defaults
	set_options: function(options) {
		for( i in options ) {
			if( typeof accordion_gallery.options[i] !== "undefined" ) {
				accordion_gallery.options[i] = options[i];
			}
		}
	},
	
	// function wrapper to run callbacks
	run_callback: function(f, options) {
		f(options);
	},
	
	// first step in creating the loading screen: set body classes, create element in memory, add to html document
	create_loading_screen: function() {
		$("body").addClass(accordion_gallery.options.body_loading_class);
		accordion_gallery.loading_screen = $('<div class="' + accordion_gallery.options.loading_class + '" id="' + accordion_gallery.options.loading_class + '"></div>');
		accordion_gallery.add_loading_screen();
	},
	
	// seond set in creating the loading screen: actually displays it
	add_loading_screen: function() {
		$("body").append(accordion_gallery.loading_screen);
		accordion_gallery.set_loading_screen();
		$(window).load(function() {
			// when everything's loaded, remove loading screen
			accordion_gallery.hide_loading_screen();
			accordion_gallery.options.target.show();
		});
	},
	
	// sets dimensions of loading screen
	set_loading_screen: function() {
		accordion_gallery.loading_screen.css({
			width: $(window).width() + "px",
			height: $(window).height() + "px"
		});
		$(window).resize(function() {
			accordion_gallery.loading_screen.css({
				width: $(window).width() + "px",
				height: $(window).height() + "px"
			});
		});
	},
	
	// remove loading screen, remove loading screen body classes
	hide_loading_screen: function() {
		accordion_gallery.loading_screen.fadeOut(500, function() {
			$("body").removeClass(accordion_gallery.options.body_loading_class);	
			accordion_gallery.loading_screen.remove();
		});
	},
	
	// create slides from provided html
	create_slides: function() {
		// get number of slides
		accordion_gallery.num_slides = accordion_gallery.options.target.find(accordion_gallery.valid_slide_selector).length - 1;
		accordion_gallery.active_slide = accordion_gallery.num_slides;
		// loops through all provided elements and generates new slide html
		accordion_gallery.options.target.children().each(function() {
			if( $(this).is(accordion_gallery.valid_slide_selector) ) {
				var slide = '<div class="' + accordion_gallery.options.slide_class + ' inactive left-side" index="' + accordion_gallery.active_slide + '">';
					slide += '<div class="' + accordion_gallery.options.drag_class + '" style="width:' + ( 2 * accordion_gallery.options.gutter ) + 'px; left:-' + accordion_gallery.options.gutter + 'px;"></div>';
					slide += '<div class="' + accordion_gallery.options.active_class + '"></div>';
					slide += '<div class="' + accordion_gallery.options.overlay_class + '">';
						slide += '<h3 class="' + accordion_gallery.options.overlay_title_class + '">' + $(this).attr("title") + '</h3>';
						slide += '<' + accordion_gallery.options.description_wrap + ' class="' + accordion_gallery.options.overlay_description_class + '">' + $(this).attr("alt") + '</' + accordion_gallery.options.description_wrap + '>';
					slide += '</div>';
					if( $(this).is("img") ) {
						// if is image
						var type = "image";
						slide += '<img class="' + accordion_gallery.options.slide_element_class + '" src="' + $(this).attr("src") + '" alt="' + $(this).attr("title") + '" />';
					} else if( $(this).is("video") ) {
						// if is video
						var type = "video";
						slide += '<div class="' + accordion_gallery.options.slide_element_class + ' ' + accordion_gallery.options.video_slide_element_class + ' jp-video" id="jp_container_' + accordion_gallery.active_slide + '">';
							slide += '<img class="' + accordion_gallery.options.video_slide_poster_class + '" src="' + $(this).attr("poster") + '" alt="' + $(this).attr("title") + '" />';
							slide += '<div class="jp-type-single">';
								slide += '<div id="jquery_jplayer_' + accordion_gallery.active_slide + '" class="jp-player"></div>';
							slide += '</div>';
						slide += '</div>';
						// set video object variables and stores
						accordion_gallery.has_videos = true;
						accordion_gallery.videos[accordion_gallery.active_slide] = {
							id: "jquery_jplayer_" + accordion_gallery.active_slide,
							src: $(this).attr("src"),
							poster: $(this).attr("poster"),
							loaded: false
						}
					}
					var width = $(this).attr("width");
					var height = $(this).attr("height");
				slide += '</div>';
				slide = $(slide);
				slide.css({
					left: ( accordion_gallery.active_slide * accordion_gallery.options.gutter ) + "px",
					"z-index": accordion_gallery.active_slide
				});
				$(this).remove();
				// set slide object stores
				accordion_gallery.slides[accordion_gallery.active_slide] = {
					slide: slide,
					left: accordion_gallery.active_slide * accordion_gallery.options.gutter,
					type: type,
					width: width,
					height: height
				}
				accordion_gallery.options.target.append(slide);
				if( accordion_gallery.active_slide > 0 ) {
					accordion_gallery.active_slide--;
				}
			} else {
				$(this).remove();
			}
		});
		// depending on whether full screen is enabled or not, set slide dimensions appropriately
		if( accordion_gallery.options.full_screen ) {
			accordion_gallery.set_full_size_gallery();
			accordion_gallery.set_full_size_slide();
			$(window).resize(function() {
				accordion_gallery.set_full_size_gallery();
				accordion_gallery.set_full_size_slide();
				accordion_gallery.move_slides(false);
			});
		} else {
			accordion_gallery.set_fixed_gallery();
			accordion_gallery.set_fixed_slide();
		}
	},
	
	// we're generating full screen slides
	set_full_size_slide: function() {
		var window_width = $(window).width();
		var window_height = $(window).height();
		for( slide_index in accordion_gallery.slides ) {
			var ratio = accordion_gallery.slides[slide_index].width / accordion_gallery.slides[slide_index].height;
			var set_width = window_width - ( accordion_gallery.num_slides * accordion_gallery.options.gutter );
			var set_height = set_width / ratio;
			if( set_height < window_height ) {
				set_height = window_height;
				set_width = ratio * set_height;
			}
			accordion_gallery.slides[slide_index].slide.css({
				width: window_width - ( accordion_gallery.num_slides * accordion_gallery.options.gutter ) + "px",
				height: window_height + "px"
			});
			accordion_gallery.slides[slide_index].slide.find("." + accordion_gallery.options.slide_element_class).css({
				width: set_width + "px",
				height: set_height + "px"
			});
			accordion_gallery.slides[slide_index].slide.find("." + accordion_gallery.options.active_class).css({
				width: set_width + "px",
				height: window_height + "px"
			});
			accordion_gallery.slides[slide_index].slide.find("." + accordion_gallery.options.drag_class).css({
				height: window_height + "px"
			});
			if( accordion_gallery.slides[slide_index].type == "video" ) {
				accordion_gallery.slides[slide_index].slide.find("." + accordion_gallery.options.video_slide_poster_class).css({
					width: set_width + "px",
					height: set_height + "px"
				});
				$("#" + accordion_gallery.videos[slide_index].id).jPlayer("option", "size.width", set_width + "px");
				$("#" + accordion_gallery.videos[slide_index].id).jPlayer("option", "size.height", set_height + "px");
			}
		}
	},
	
	// we're generating full screen slides, so we need a full screen gallery
	set_full_size_gallery: function() {
		accordion_gallery.options.target.css({
			width: $(window).width() + "px",
			height: $(window).height() + "px"
		});
	},
	
	// we're generating fixed size slides
	set_fixed_slide: function() {
		for( slide_index in accordion_gallery.slides ) {
			var ratio = accordion_gallery.slides[slide_index].width / accordion_gallery.slides[slide_index].height;
			var set_width = accordion_gallery.options.width - ( accordion_gallery.num_slides * accordion_gallery.options.gutter );
			var set_height = set_width / ratio;
			if( set_height < accordion_gallery.options.height ) {
				set_height = accordion_gallery.options.height;
				set_width = ratio * set_height;
			}
			accordion_gallery.slides[slide_index].slide.css({
				width: accordion_gallery.options.width - ( accordion_gallery.num_slides * accordion_gallery.options.gutter ) + "px",
				height: accordion_gallery.options.height + "px"
			})
			accordion_gallery.slides[slide_index].slide.find("." + accordion_gallery.options.slide_element_class).css({
				width: set_width + "px",
				height: set_height + "px"
			})
			accordion_gallery.slides[slide_index].slide.find("." + accordion_gallery.options.active_class).css({
				width: accordion_gallery.options.width - ( accordion_gallery.num_slides * accordion_gallery.options.gutter ) + "px",
				height: accordion_gallery.options.height + "px"
			})
			accordion_gallery.slides[slide_index].slide.find("." + accordion_gallery.options.drag_class).css({
				height: accordion_gallery.options.height + "px"
			})
			if( accordion_gallery.slides[slide_index].type == "video" ) {
				accordion_gallery.slides[slide_index].slide.find("." + accordion_gallery.options.video_slide_poster_class).css({
					width: set_width + "px",
					height: set_height + "px"
				})
				$("#" + accordion_gallery.videos[slide_index].id).jPlayer("option", "size.width", set_width + "px");
				$("#" + accordion_gallery.videos[slide_index].id).jPlayer("option", "size.height", set_height + "px");
			}
		}
	},
	
	// we're generating fixed size slides, so we need a fixed size gallery
	set_fixed_gallery: function() {
		accordion_gallery.options.target.css({
			width: accordion_gallery.options.width + "px",
			height: accordion_gallery.options.height + "px"
		});
	},
	
	// load up, set, and show the first slide
	set_first: function() {
		accordion_gallery.active_slide = accordion_gallery.num_slides;
		accordion_gallery.show_slide(true);
		// manual click callback
		if( accordion_gallery.options.manual_click_callback != null && typeof accordion_gallery.options.manual_click_callback === "function" ) {
			accordion_gallery.run_callback(accordion_gallery.options.manual_click_callback, accordion_gallery.slides[accordion_gallery.active_slide].slide.find("." + accordion_gallery.options.overlay_class));
		}
	},
	
	// parses through all the slides and sets appropriate classes to determination animation and behaviors
	show_slide: function(first) {
		if( first) {
			// first time, load up the first slide
			for( slide_index in accordion_gallery.slides ) {
				accordion_gallery.slides[slide_index].slide.removeClass("active");
				accordion_gallery.slides[slide_index].slide.removeClass("inactive");
				if( slide_index == accordion_gallery.active_slide ) {
					accordion_gallery.slides[slide_index].slide.addClass("active");
				} else {
					accordion_gallery.slides[slide_index].slide.addClass("inactive");
				}
			}
		} else {
			// all other times, set slides based on active_slide (set elsewhere)
			for( slide_index in accordion_gallery.slides ) {
				accordion_gallery.slides[slide_index].slide.removeClass("active");
				accordion_gallery.slides[slide_index].slide.removeClass("inactive");
				accordion_gallery.slides[slide_index].slide.removeClass("left-side");
				accordion_gallery.slides[slide_index].slide.removeClass("right-side");
				if( slide_index == accordion_gallery.active_slide ) {
					accordion_gallery.slides[slide_index].slide.addClass("active");
				} else {
					accordion_gallery.slides[slide_index].slide.addClass("inactive");
				}
				if( slide_index > accordion_gallery.active_slide ) {
					accordion_gallery.slides[slide_index].slide.addClass("right-side");
					accordion_gallery.slides[slide_index].slide.find("." + accordion_gallery.options.drag_class).css({
						left: 0,
						width: accordion_gallery.options.gutter + "px"
					});
				} else {
					accordion_gallery.slides[slide_index].slide.addClass("left-side");
					accordion_gallery.slides[slide_index].slide.find("." + accordion_gallery.options.drag_class).css({
						left: "-" + accordion_gallery.options.gutter + "px",
						width: ( 2 * accordion_gallery.options.gutter ) + "px"
					});
				}
			}
			// actually animate slides
			accordion_gallery.move_slides(true);
		}
	},
	
	// binds manual click navigation of slides, active_slide is set here
	bind_manual_click: function() {
		$(document).on("click", "." + accordion_gallery.options.drag_class, function(event) {
			if( accordion_gallery.is_auto_click ) {
				// if is_auto_click (auto slideshow click), active_slide is set to what we clicked on
				accordion_gallery.is_auto_click = false;
				accordion_gallery.active_slide = $(this).parent().attr("index");
			} else {
				// if is not auto click
				if( $(this).parent().hasClass("active") || ( $(this).parent().hasClass("inactive") && $(this).parent().hasClass("left-side") ) ) {
					// if we're clicking on the currently active slide or any inactive slide on the left side
					if( typeof $(this).parent().next().attr("index") === "undefined" ) {
						// if we're at the last slide, active_slide is set to the first slide
						accordion_gallery.active_slide = accordion_gallery.num_slides;
					} else {
						// otherwise active_slide is set to the next slide
						accordion_gallery.active_slide = $(this).parent().next().attr("index");
					}
				} else {
					// active_slide is set to what we clicked on
					accordion_gallery.active_slide = $(this).parent().attr("index");
				}
			}
			// calls show_slide to parse through all the slide classes
			accordion_gallery.show_slide(false);
			// processes videos which loads up the video in case active_slide is a video slide
			accordion_gallery.process_video();
			// determine whether or not auto slide show should still run and how
			if( accordion_gallery.options.auto ) {
				if( !accordion_gallery.manually_stopped ) {
					accordion_gallery.clear_slideshow();
					accordion_gallery.set_slideshow();
				}
			}
		});
	},
	
	// actual function that animates the slideshow. 
	// it's all dependent on the classes set by show_slide(). 
	// there are 2 of these, 1 that's animted, and 1 that's just to maintain positions for full screen gallery window resizes
	move_slides: function(animate) {
		if( animate) {
			$("." + accordion_gallery.options.slide_class + ".right-side").each(function() {
				$(this).animate({
					left: $(this).width() + ( ( $(this).attr("index") - 1 ) * accordion_gallery.options.gutter ) + "px"
				}, 
					{ 
						queue: false, 
						duration: 1000, 
						easing: accordion_gallery.options.easing, 
						complete: function() {
							// manual click callback
							if( accordion_gallery.options.manual_click_callback != null && typeof accordion_gallery.options.manual_click_callback === "function" ) {
								accordion_gallery.run_callback(accordion_gallery.options.manual_click_callback, accordion_gallery.slides[accordion_gallery.active_slide].slide.find("." + accordion_gallery.options.overlay_class));
							}
						}
					}
				);
				accordion_gallery.slides[$(this).attr("index")].left = $(this).width() + ( ( $(this).attr("index") - 1 ) * accordion_gallery.options.gutter );
			});
			$("." + accordion_gallery.options.slide_class + ".left-side").each(function() {
				$(this).animate({
					left: ( $(this).attr("index") * accordion_gallery.options.gutter ) + "px"
				}, 
					{ 
						queue: false, 
						duration: 1000, 
						easing: accordion_gallery.options.easing, 
						complete: function() {
							// manual click callback
							if( accordion_gallery.options.manual_click_callback != null && typeof accordion_gallery.options.manual_click_callback === "function" ) {
								accordion_gallery.run_callback(accordion_gallery.options.manual_click_callback, accordion_gallery.slides[accordion_gallery.active_slide].slide.find("." + accordion_gallery.options.overlay_class));
							}
						}
					}
				);
				accordion_gallery.slides[$(this).attr("index")].left = $(this).attr("index") * accordion_gallery.options.gutter;
			});
		} else {
			$("." + accordion_gallery.options.slide_class + ".right-side").each(function() {
				$(this).css({
					left: $(this).width() + ( ( $(this).attr("index") - 1 ) * accordion_gallery.options.gutter ) + "px"
				});
				accordion_gallery.slides[$(this).attr("index")].left = $(this).width() + ( ( $(this).attr("index") - 1 ) * accordion_gallery.options.gutter );
			});
			$("." + accordion_gallery.options.slide_class + ".left-side").each(function() {
				$(this).css({
					left: ( $(this).attr("index") * accordion_gallery.options.gutter ) + "px"
				});
				accordion_gallery.slides[$(this).attr("index")].left = $(this).attr("index") * accordion_gallery.options.gutter;
			});
		}
	},
	
	// creates the indicator html and appends to the document
	create_indicator: function() {
		var indicator = '<div class="' + accordion_gallery.options.indicator_class + '" id="' + accordion_gallery.options.indicator_class + '">';
			indicator += '<div class="' + accordion_gallery.options.indicator_inner_class + '" id="' + accordion_gallery.options.indicator_inner_class + '"></div>';
			if( accordion_gallery.options.indicator_controls ) {
				indicator += '<div class="' + accordion_gallery.options.indicator_control_class + ' pause"></div>';
				accordion_gallery.bind_indicator_controls();
			}
		indicator += '</div>';
		accordion_gallery.indicator = $(indicator);
		accordion_gallery.options.target.append(accordion_gallery.indicator);
	},
	
	// starts up the automatic slideshow and stores the interval
	set_slideshow: function() {
		accordion_gallery.clear_slideshow();
		$("#" + accordion_gallery.options.indicator_class).show();
		// there are a number of things that needs to happen for the slideshow
		accordion_gallery.set_slideshow_functions(true);
		accordion_gallery.slideshow_interval = setInterval(function() { accordion_gallery.set_slideshow_functions(false); }, accordion_gallery.options.delay);
		if( accordion_gallery.options.indicator_controls ) {
			$("." + accordion_gallery.options.indicator_control_class).html(accordion_gallery.options.pause_text);
		}
	},
	
	// slideshow functions
	set_slideshow_functions: function(first) {
		// animate the indicator
		$("#" + accordion_gallery.options.indicator_inner_class).animate({
			width: "100%"
		}, accordion_gallery.options.delay, function() {
			$("#" + accordion_gallery.options.indicator_inner_class).css({
				width: "0px"
			});
		});
		if( !first ) {
			// switches the active_slide automatically and triggers a navigation click
			if( accordion_gallery.active_slide == 0 ) {
				accordion_gallery.active_slide = accordion_gallery.num_slides;
			} else {
				accordion_gallery.active_slide--;
			}
			accordion_gallery.is_auto_click = true;
			accordion_gallery.slides[accordion_gallery.active_slide].slide.find("." + accordion_gallery.options.drag_class).click();
		}
	},
	
	// sets element events that clears the slideshow
	bind_clear_slideshow: function() {
		// none so far?
	},
	
	// clears the slide show: hides progress indicator, clears interval
	clear_slideshow: function() {
		clearInterval(accordion_gallery.slideshow_interval);
		$("#" + accordion_gallery.options.indicator_inner_class).stop(true, true);
		$("#" + accordion_gallery.options.indicator_inner_class).css({
			width: "0px"
		});
	},
	
	// sets events for the slideshow indicator controls
	bind_indicator_controls: function() {
		$(document).on("click", "." + accordion_gallery.options.indicator_control_class, function() {
			if( $(this).hasClass("pause") ) {
				accordion_gallery.set_indicator_play(true, true);
			} else {
				accordion_gallery.set_indicator_pause(true, true);
			}
		});
	},
	
	// sets indicator to pause state, meaning the show is running
	set_indicator_pause: function(run, is_manual) {
		$("." + accordion_gallery.options.indicator_control_class).html(accordion_gallery.options.pause_text);
		$("." + accordion_gallery.options.indicator_control_class).removeClass("play");
		$("." + accordion_gallery.options.indicator_control_class).addClass("pause");
		if( is_manual ) {
			accordion_gallery.manually_stopped = false;
		}
		if( run ) {
			accordion_gallery.set_slideshow();
		}
	},
	
	// sets indicator to play state, which means the show is paused
	set_indicator_play: function(run, is_manual) {
		$("." + accordion_gallery.options.indicator_control_class).html(accordion_gallery.options.play_text);
		$("." + accordion_gallery.options.indicator_control_class).removeClass("pause");
		$("." + accordion_gallery.options.indicator_control_class).addClass("play");
		if( is_manual ) {
			accordion_gallery.manually_stopped = true;
		}
		if( run ) {
			accordion_gallery.clear_slideshow();
		}
	},
	
	// allows for dragging
	set_draggable: function() {
		for( slide_index in accordion_gallery.slides ) {
			accordion_gallery.slides[slide_index].slide.draggable({
				// only allow dragging along the horizontal axis
				axis: "x",
				// set drag handle
				handle: "." + accordion_gallery.options.drag_class,
				// the dragging functionality allows for moving of any one slide and animating all the other slides around it appropriately in a stack
				drag: function(event, ui) {
					accordion_gallery.dragging = true;
					accordion_gallery.set_indicator_play(true, false);
					var drag_amount = ui.originalPosition.left - ui.position.left;
					if( ui.helper.hasClass("left-side") ) {
						for( i = parseInt( ui.helper.attr("index") ) + 1; i <= accordion_gallery.num_slides; i++ ) {
							if( accordion_gallery.slides[i].slide.hasClass("left-side") ) {
								accordion_gallery.slides[i].slide.css({
									left: accordion_gallery.slides[i].left - drag_amount + "px"
								});
							}
						}
					}
					if( ui.helper.hasClass("right-side") ) {
						for( i = parseInt( ui.helper.attr("index") ) - 1; i >= 0; i-- ) {
							if( accordion_gallery.slides[i].slide.hasClass("right-side") ) {
								accordion_gallery.slides[i].slide.css({
									left: accordion_gallery.slides[i].left - drag_amount + "px"
								});
							}
						}
					}
				},
				// when dragging starts, stop any running slideshows
				start: function(event, ui) {
					accordion_gallery.dragging = true;
					accordion_gallery.set_indicator_play(true, false);
				},
				// when dragging finishes, trigger the appropriate navigation click to finish the animation
				stop: function(event, ui) {
					accordion_gallery.dragging = false;
					ui.helper.find("." + accordion_gallery.options.drag_class).click();
					if( accordion_gallery.options.auto ) {
						if( !accordion_gallery.manually_stopped ) {
							accordion_gallery.set_indicator_pause(true, false);
						}
					}
				}
			});
		}
	},
	
	// sets up all the videos
	bind_videos: function() {
		for( i in accordion_gallery.videos ) {
			$("#" + accordion_gallery.videos[i].id).jPlayer({
				loop: true,
				swfPath: accordion_gallery.options.swf_source,
				supplied: "flv",
				solution: "html, flash"
			});
		}
		// the video gets loaded after the gallery has been created already, so we need to re-size all elements appropriately
		if( accordion_gallery.options.full_screen ) {
			$(window).trigger("resize");
		} else {
			accordion_gallery.set_fixed_slide();
		}
	},
	
	// loads up a particular video slide: stops all videos, and sets the element to the video then plays (video defaults to poster)
	process_video: function() {
		accordion_gallery.stop_videos();
		if( typeof accordion_gallery.videos[accordion_gallery.active_slide] !== "undefined" ) {
			if( !accordion_gallery.videos[accordion_gallery.active_slide].loaded ) {
				$("#" + accordion_gallery.videos[accordion_gallery.active_slide].id).jPlayer("setMedia", {
					flv: accordion_gallery.videos[accordion_gallery.active_slide].src
				});
				accordion_gallery.videos[accordion_gallery.active_slide].loaded = true;
			}
			accordion_gallery.slides[accordion_gallery.active_slide].slide.find("." + accordion_gallery.options.video_slide_poster_class).hide();
			$("#" + accordion_gallery.videos[accordion_gallery.active_slide].id).jPlayer("play");
		}
	},
	
	// stops all videos: stop video, hides video, shows poster
	stop_videos: function() {
		for( i in accordion_gallery.videos ) {
			accordion_gallery.slides[i].slide.find("." + accordion_gallery.options.video_slide_poster_class).show();
			$("#" + accordion_gallery.videos[i].id).jPlayer("stop");
		}
	},
	
	// sets slideshow pause on overlay hover
	set_overlay_pause: function() {
		$("." + accordion_gallery.options.overlay_class).hover(
			function() {
				if( !accordion_gallery.dragging ) {
					accordion_gallery.set_indicator_play(true, false);
				}
			},
			function() {
				if( !accordion_gallery.dragging ) {
					if( !accordion_gallery.manually_stopped ) {
						accordion_gallery.set_indicator_pause(true, false);
					}
				}
			}
		);
	}

}