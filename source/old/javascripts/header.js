$(document).ready(function() {
  var headerElem = $('.twenty-eighteen .header-nav');

  function toggleMobileNav() {
    document.body.classList.toggle('has-overlay');
    headerElem.toggleClass('header-nav--mobile-nav-open');
  }

  headerElem.find('.header-nav__hamburger').click(toggleMobileNav);
  headerElem.find('.mobile-nav__close').click(toggleMobileNav);
  headerElem.find('.mobile-nav-overlay').click(toggleMobileNav);
  headerElem.find('.mobile-nav__link').click(toggleMobileNav);
});
