<span class="post-meta">
	<?php
	$author = "<a href='" . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . "'>" . esc_html( get_the_author() ) . "</a>";
	$date   = get_the_date(get_option('date_format'));
	?>
	<?php printf( _x( 'Published by %1$s on %2$s', 'This blog post was published by some author on some date', 'author' ), $author, $date ); ?>
</span>