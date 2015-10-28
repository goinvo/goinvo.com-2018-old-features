
module LinkFormatters
    # Builds a URL to the Dribbble profile for the given username
  def dribbble_url_for(username)
    "http://dribbble.com/#{username}"
  end

  # Builds a URL to the Flickr profile for the given username
  def flickr_url_for(username)
    "http://www.flickr.com/photos/#{username}"
  end

  # Builds a URL to a GitHub profile for the given username
  def github_url_for(username)
    "http://github.com/#{username}"
  end

  # Builds a URL to the Last.fm profile for the given username
  def lastfm_url_for(username)
    "http://last.fm/user/#{username}"
  end

  # Builds a URL to a Twitter profile for the given username
  def twitter_url_for(username)
    "http://twitter.com/#{username}"
  end

  def email_url_for(address)
    "mailto:#{address}"
  end

  # Greets a user
  def greeting_for(user)
    greetings = {
      'English' => 'Hello'
      # 'Arabic' => 'Salām',
      # 'Austiran' => 'Grüßgott',
      # 'French' => 'Salut',
      # 'German' => 'Guten Tag',
      # 'French' => 'Bonjour',
      # 'Bengali' => 'Nomoshkar',
      # 'Portuguese' => 'Olá',
      # 'Russian' => 'Privet',
      # 'Klingon' => 'nuqneH',
      # 'Danish' => 'Hej',
      # 'Spanish' => 'Hola',
      # 'Finnish' => 'Hyvää päivää',
      # 'Greek' => 'Γεια σας',
      # 'Icelandic' => 'Góðan dag',
      # 'Italian' => 'Ciào',
      # 'Korean' => '안녕하세요',
      # 'Japanese' => '今日は',
      # 'Chinese' => '你好',
      # 'Hindi' => 'नमस्ते',
      # 'Romanian' => 'Salut',
      # 'Vietnamese' => 'Xin chào'
    }

    greeting = greetings.to_a.sample

    result = "<p class=\"greeting\" title=\"That's #{greeting[0]} for Hello.\">"
    if user
      result << "#{greeting[1]}, #{user.first_name}."
    else
      result << "#{greeting[1]}."
    end
    result << '</p>'
    result.html_safe
  end
end
