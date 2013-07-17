ascensor-gallery
================

jQuery Ascensor based full screen photo gallery.<br />
Primarily based on jQuery Ascensor (http://kirkas.ch/ascensor/); all thanks to them!<br />
There's a bunch of other jQuery libraries that are included.<br />
All this plugin really does is centralize a whole lot of other plugin functionalities into one.<br />
It also includes my preferred CSS reset.<br />

DEMO:
=====
http://one-off.textures-tones.com/ascensor-gallery/

CREDITS:
========
CSS Reset: http://meyerweb.com/eric/tools/css/reset/<br />
jQuery Ascensor: http://kirkas.ch/ascensor/<br />
jQuery Easing: http://gsgd.co.uk/sandbox/jquery/easing/<br />
jQuery Mousewheel: https://github.com/brandonaaron/jquery-mousewheel<br />
jQuery TouchSwipe: https://github.com/mattbryson/TouchSwipe-Jquery-Plugin<br />
jQuery BackgroundSize: https://github.com/louisremi/jquery.backgroundSize.js<br />
jQuery jScrollPane: http://jscrollpane.kelvinluck.com/<br />

HOW TO USE:
===========

Include the JS files:<br />
```
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="js/jquery.ascensor.min.js"></script>
<script type="text/javascript" src="js/jquery.mousewheel.js"></script>
<script type="text/javascript" src="js/jquery.jscrollpane.min.js"></script>
<script type="text/javascript" src="js/jquery.touchSwipe.min.js"></script>
<script type="text/javascript" src="js/jquery.backgroundSize.js"></script>
<script type="text/javascript" src="js/ascensor_gallery.js"></script>
```

Include the CSS files:<br />
```
<link rel="stylesheet" type="text/css" media="all" href="css/normalize.css" />
<link rel="stylesheet" type="text/css" media="all" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/start/jquery-ui.css" />
<link rel="stylesheet" type="text/css" media="all" href="css/jquery.jscrollpane.css" />
<link rel="stylesheet" type="text/css" media="all" href="css/ascensor_gallery.css" />
```

Generate the markup:<br />
```
<div class="container" id="container">
	<div>
		<img src="[PATH/TO/IMAGE]" title="[IMAGE TITLE]" alt="[IMAGE ALT]" />
		<div>
			<h2>[IMAGE TITLE]</h2>
			[IMAGE DESCRIPTION]
		</div>
	</div>
	<!-- AS MANY AS YOU LIKE, REPEAT AD NAUSEUM, ETC. -->
</div>
```

Run the Javascript:<br />
```
//	at minimum, no extra options
$(document).ready(function() {
	ascensor_gallery.init();
	ascensor_gallery.set_loading();
});
```

Gallery options:<br />
(You can find these in the included ascensor_gallery.js file)
```
DEFAULT OPTIONS:
	//	target to initialize ascensor gallery in
	target: "container",
	//	instructions text
	loading_instructions: "you can use your arrow keys, a 2-finger directional swipe, or the navigation menu in the top right to move around",
	//	whether or not to override default tooltips
	tooltip: true,
	//	whether or not to load image thumbnail tooltips
	image_tooltips: false,
	//	whether or not to initialize touch functionality
	touch: true,
	//	whether or not to initialize swipe functionality
	swipe: true,
	//	how many rows of navigation indicators do you want
	rows: 5,
	//	how far apart do you want the navigation indictors to be
	gutter: 10,
	//	how wide do you want the navigation indicators to be
	link_width: 10,
	//	how tall do you want the navigation indicators to be
	link_height: 10,
	//	CLASSES, try not to override if possible
	//	class to initialize jscrollpane on
	fancy_scroll_class: "fancy-scroll",
	//	class to indicate if a jscrollpane initialised element is scrollable
	fancy_scrollable_class: "jspScrollable",
	//	internal ascensor gallery hide class
	hide_class: "ascensor-gallery-hide",
	//	class of elements to stretch background images for
	bg_stretch_class: "ascensor-gallery-stretch-bg",
	//	internal ascensor gallery loading class
	loading_class: "ascensor-gallery-loading",
	//	internal ascensor gallery loading instructions class
	loading_instruction_class: "ascensor-gallery-loading-instructions",
	//	internal ascensor gallery container class
	container_class: "ascensor-gallery-container",
	//	this is the ascensor link class, as referenced in ascensor
	ascensor_link_class: "ascensorLink",
	//	internal ascensor gallery overlay class to hold the overlay content
	image_overlay_class: "ascensor-gallery-image-overlay",
	//	internal ascensor gallery slide class to reference each ascensor slide
	slide_class: "ascensor-gallery-slide",
	//	internal ascensor gallery navigation wrapper class
	nav_class: "ascensor-gallery-navigation",
	//	ascensor movement speed
	ascensor_speed: 1000,
	//	ascensor easing
	ascensor_easing: "easeInOutCubic",
	//	reference to internal ascensor function to manually call movement, as referenced in ascensor:
	//	left
	ascensor_left: "ascensorLeft",
	//	right
	ascensor_right: "ascensorRight",
	//	up
	ascensor_up: "ascensorUp",
	//	down
	ascensor_down: "ascensorDown"
```

NOTES:
======
By default, some styling is REQUIRED to get everything working properly.<br />
At its base, this plugin is designed to be highly customizable.<br />
It should be pretty straightforward to figure out how to customize the styling to get everything displaying properly.<br />
For inspiration, see the demo (http://one-off.textures-tones.com/ascensor-gallery/) and go through the source or peruse through the included files in this repository.
