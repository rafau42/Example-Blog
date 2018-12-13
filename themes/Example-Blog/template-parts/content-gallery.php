<?php $image = get_field('photo_medium'); ?>
  
<div class = "page-gallery__wrap-image">
<img class = "page-gallery__image" src = "<?php echo $image['url']; ?>" alt = "<?php echo $image['alt']; ?>">
</div>