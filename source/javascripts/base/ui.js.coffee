# This is all old code from a previous version of the navigation menu... I don't believe we are using this anywhere
window.showMenu = ->
  $('#main-menu').fadeIn(100)
  $('#main-menu').addClass('shown')
  $('#menu-button').addClass('active')

window.hideMenu = ->
  $('#main-menu').fadeOut(100)
  $('#main-menu').removeClass('shown')
  $('#menu-button').removeClass('active')

$ ->
  # Close flash messages when the 'x' is clicked
  $('.message a.close').click (event) ->
    event.preventDefault()
    $(this).parents('.message').fadeOut()


  ##
  ## Main Menu
  ##

  # Show / hide the menu
  $('#menu-button').click (event) ->
    event.stopPropagation()
    if $('#main-menu').is(':visible')
      window.hideMenu()
    else
      window.showMenu()

  # Show / hide the menu
  $('body').click ->
    if $('#main-menu').is(':visible')
      window.hideMenu()

  #$(window).scroll ->
    if $('#main-menu').is(':visible')
      window.hideMenu()

  # # Clicking anywhere within an article in the main menu takes you to the article
  $('#main-menu li.article').click ->
    window.location = $(this).find('.title a').attr('href')

  $mainHeader = $('#main-header')
  $fullNavItems = $('#nav-full a')

  fadeInNavItems = () ->
    setTimeout(() ->
      $.each($fullNavItems, (i, el) ->
        setTimeout(() ->
            $(el).addClass('nav-visible')
          (i + 1) * 50))
      200)

  $('#nav-hamburger').click ->
    $mainHeader.toggleClass('mobile-nav-open')

    if !($mainHeader.hasClass('mobile-nav-open')) and $($fullNavItems).hasClass('nav-visible')
      $fullNavItems.removeClass('nav-visible')
    else
      if $mainHeader.hasClass('mobile-nav-open')
        $fullNavItems.removeClass('nav-visible')
        fadeInNavItems()


  $(window).resize ->
    if $(window).width() >= 768
      $mainHeader.removeClass('mobile-nav-open')
