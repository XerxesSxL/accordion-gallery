<?php
	$ROOT_PATH = "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	$MAX_SLIDES = 7;
	$SHOW_VIDEOS = true;
	
	$SLIDES = array(
		1 => array(
			"type" => "image",
			"title" => "image 1",
			"description" => "image 1 - lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />mauris sit amet sagittis quam.<br />fusce risus ante, imperdiet ut auctor ac, commodo eu velit.",
			"src" => $ROOT_PATH . "images/1.jpg",
			"width" => 1440,
			"height" => 1080,
			"link" => "#",
			"link-text" => "link text here"
		),
		2 => array(
			"type" => "video",
			"title" => "video 1",
			"description" => "video 1 - lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />mauris sit amet sagittis quam.<br />fusce risus ante, imperdiet ut auctor ac, commodo eu velit.",
			"src" => $ROOT_PATH . "videos/1.m4v",
			"width" => 640,
			"height" => 360,
			"link" => "#",
			"link-text" => "link text here",
			"poster" => $ROOT_PATH . "videos/1.png"
		),
		3 => array(
			"type" => "image",
			"title" => "image 2",
			"description" => "image 2 - lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />mauris sit amet sagittis quam.<br />fusce risus ante, imperdiet ut auctor ac, commodo eu velit.",
			"src" => $ROOT_PATH . "images/2.jpg",
			"width" => 1440,
			"height" => 1080,
			"link" => "#",
			"link-text" => "link text here"
		),
		4 => array(
			"type" => "video",
			"title" => "video 2",
			"description" => "video 2 - lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />mauris sit amet sagittis quam.<br />fusce risus ante, imperdiet ut auctor ac, commodo eu velit.",
			"src" => $ROOT_PATH . "videos/2.m4v",
			"width" => 640,
			"height" => 360,
			"link" => "#",
			"link-text" => "link text here",
			"poster" => $ROOT_PATH . "videos/2.png"
		),
		5 => array(
			"type" => "image",
			"title" => "image 3",
			"description" => "image 3 - lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />mauris sit amet sagittis quam.<br />fusce risus ante, imperdiet ut auctor ac, commodo eu velit.",
			"src" => $ROOT_PATH . "images/3.jpg",
			"width" => 1440,
			"height" => 1080,
			"link" => "#",
			"link-text" => "link text here"
		),
		6 => array(
			"type" => "image",
			"title" => "image 4",
			"description" => "image 4 - lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />mauris sit amet sagittis quam.<br />fusce risus ante, imperdiet ut auctor ac, commodo eu velit.",
			"src" => $ROOT_PATH . "images/4.jpg",
			"width" => 1440,
			"height" => 1080,
			"link" => "#",
			"link-text" => "link text here"
		),
		7 => array(
			"type" => "image",
			"title" => "image 5",
			"description" => "image 5 - lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />mauris sit amet sagittis quam.<br />fusce risus ante, imperdiet ut auctor ac, commodo eu velit.",
			"src" => $ROOT_PATH . "images/5.jpg",
			"width" => 1440,
			"height" => 1080,
			"link" => "#",
			"link-text" => "link text here"
		),
	);
	
	include_once("modules/header.php");
	include_once("pages/gallery.php");
	include_once("modules/footer.php");
?>