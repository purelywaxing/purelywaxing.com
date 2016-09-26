$('.pricing-tab').click( function() {
  $('.price-list').toggleClass('hidden');
  $('.pricing-tab').parent().toggleClass('active');
})

$('.image-selector input').change(function(e) {
  $(e.target).closest('.waxing-treatment').find('img.view').toggle();
})