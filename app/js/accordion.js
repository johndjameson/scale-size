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
    $(el).parent().addClass('is-closed');
  },

  toggleSingleAccordion: function(el) {
    $(el).parent().toggleClass('is-closed');
  }
}