
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


  # Populate and render GitHub commit sparklines
  # $('.github-commits.sparkline .graph').each (i,el) ->
  #   el = $(el)
  #   id = el.data('member-id')
  #   $.ajax
  #     url: "/team/#{id}/github/commit_history",
  #     success: (data) ->
  #       totalCommits = 0
  #       $.each data, ->
  #         totalCommits += parseInt(this) || 0
  #
  #       el.html(data.join(','))
  #       el.siblings('label').html("#{totalCommits} commits in the last 30d")
  #       el.sparkline('html', {type: 'bar', barColor: '#EBEBEB', barWidth: 3} )
  #       el.show()
