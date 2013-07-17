accordion-gallery
================

jQuery based accordion photo gallery.<br />
Highly customizable accordion style photo gallery with a wide assortment of options.

FEATURES:
=========
* Accordion style photo gallery
* Maintains image/video aspect ratios
* Full Screen or Specific size gallery
* Custom sized accordion gutters
* Dragging interaction
* Video support (.flv only at the moment)
* Touch support
* Main elements easily stylable through CSS

DEMO:
=====
http://one-off.textures-tones.com/accordion/

CREDITS:
========
CSS Reset: http://meyerweb.com/eric/tools/css/reset/<br />
jQuery Easing: http://gsgd.co.uk/sandbox/jquery/easing/<br />
jQuery UI Touch Punch: http://touchpunch.furf.com/<br />
jPlayer: http://www.jplayer.org/

HOW TO USE:
===========

Include the JS files:<br />
```
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="js/jquery.ui.touch-punch.min.js"></script>
<script type="text/javascript" src="js/jquery.jplayer.min.js"></script>
<script type="text/javascript" src="js/accordion.gallery.js"></script>
```

Include the CSS files:<br />
```
<link rel="stylesheet" type="text/css" media="all" href="css/reset.css">
<link rel="stylesheet" type="text/css" media="all" href="css/accordion.gallery.css">
```

Generate the markup:<br />
```
<div class="accordion-gallery" id="accordion-gallery">
	<img src="[PATH/TO/IMAGE]" title="[IMAGE TITLE]" alt="[IMAGE DESCRIPTION (CAN/SHOULD INCLUDE HTML)]" />
	<video src="[PATH/TO/VIDEO]" title="[VIDEO TITLE]" alt="[VIDEO DESCRIPTION (CAN/SHOULD INCLUDE HTML)]" width="[VIDEO WIDTH]" height="[VIDEO HEIGHT]" poster="[PATH/TO/VIDEO/POSTER/IMAGE]"></video>
	<!-- AS MANY AS YOU LIKE, REPEAT AD NAUSEUM, ETC. -->
</div>
```

Run the Javascript:<br />
```
//	at minimum, no extra options
$(document).ready(function() {
	accordion_gallery.init();
});

//	to generate a fancy, auto sliding, full screen, gallery like the one in the demo:
$(document).ready(function() {
	var gallery_options = {
		target: $("#accordion-gallery"),
		full_screen: true,
		width: 1024,
		height: 600,
		auto: true,
		draggable: true,
		indicator_controls: true,
		pause_text: "",
		play_text: "",
		description_wrap: "div",
		gutter: 25
	}
	accordion_gallery.init(gallery_options);
});
```

Gallery options:<br />
(You can find these in the included accordion.gallery.js file)
```
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
```

NOTES:
======
By default, some styling is REQUIRED to get everything working properly.<br />
At its base, this plugin is designed to be highly customizable.<br />
It should be pretty straightforward to figure out how to customize the styling to get everything displaying properly.<br />
For inspiration, see the demo (http://one-off.textures-tones.com/accordion/) and go through the source or peruse through the included files in this repository.
