var Accordion = {

  init: function() {
    Accordion.bindUIActions();
    Accordion.closeAllAccordions();
  },

  bindUIActions: function() {
    $('.accordion-btn--toggle').on('click', function() {
      Accordion.toggleSingleAccordion(this);
    });

    $('.accordion-btn--close').on('click', function() {
      Accordion.closeSingleAccordion(this);
    });
  },

  closeAllAccordions: function() {
    $('.accordion').addClass('is-closed');
  },

  closeSingleAccordion: function(el) {
    $(el).closest('.accordion').addClass('is-closed');
  },

  toggleSingleAccordion: function(el) {
    $(el).closest('.accordion').toggleClass('is-closed');
  }
}