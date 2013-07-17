// JavaScript Document

var source_app = {
	gallery_options: {},
	header: null,
	footer: null,
	header_hover: null,
	footer_hover: null,
	header_tab: null,
	footer_tab: null,
	indicator: null,
	indicator_init: "",
	indicator_move: "",
	overlays: null,
	overlays_init: "",
	overlays_move: "",
	gallery_promos: null,
	logo_left: 0,
	overlay_left: 0,
	overlay_init: "",
	overlay_move: 0,
	
	init: function() {
		source_app.init_gallery();
	},
	
	init_gallery: function() {
		source_app.gallery_options = {
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
		accordion_gallery.init(source_app.gallery_options);
	}
}

$(document).ready(function() {
	source_app.init();
});