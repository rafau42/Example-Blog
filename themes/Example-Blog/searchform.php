<form class="header__search search-form" method="get" action="<?php echo esc_url(site_url('/')); ?>">
	<label class="sr-only" for="s">Perform a New Search:</label>
	<div class="search-form__form-row">
		<input placeholder="Search ..." class="search-form__input s" id="s" type="search" name="s" aria-label="search input" aria-controls="search form" >
		<span class="search-form__button-wrap">
      <input class="search-form__button btn btn--red" type="submit" value="" aria-label="Submit Search" aria-controls="search form" title="Submit search">
		</span>
	</div>
</form>