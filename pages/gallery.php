<div class="accordion-gallery" id="accordion-gallery">
	<?php $s = 1; ?>
	<?php foreach( $SLIDES as $slide ) { ?>
		<?php if( $s <= $MAX_SLIDES ) { ?>
			<?php if( $slide['type'] == "image" ) { ?>
				<img src="<?php echo $slide['src']; ?>" title="<?php echo $slide['title']; ?>" alt="<p><?php echo $slide['description']; ?></p><p class='overlay-description-link'><a href='<?php echo $slide['link']; ?>' title='<?php echo $slide['link-text']; ?>' class='blue italic left no-hover'><?php echo $slide['link-text']; ?></a><span class='blue-link-arrow left'></span></p><div class='clear'></div>" width="<?php echo $slide['width']; ?>" height="<?php echo $slide['height']; ?>" />
				<?php $s++; ?>
			<?php } elseif( $slide['type'] == "video" && $SHOW_VIDEOS ) { ?>
				<video src="<?php echo $slide['src']; ?>" title="<?php echo $slide['title']; ?>" alt="<p><?php echo $slide['description']; ?></p><p class='overlay-description-link'><a href='<?php echo $slide['link']; ?>' title='<?php echo $slide['link-text']; ?>' class='blue italic left no-hover'><?php echo $slide['link-text']; ?></a><span class='blue-link-arrow left'></span></p><div class='clear'></div>" width="<?php echo $slide['width']; ?>" height="<?php echo $slide['height']; ?>" poster="<?php echo $slide['poster']; ?>"></video>
				<?php $s++; ?>
			<?php } ?>
		<?php } ?>
	<?php } ?>
	<!-- invalid slide elements, will be automatically removed -->
	<div></div>
	<p></p>
	<span></span>
	<table></table>
	<form></form>
</div>