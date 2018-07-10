source "https://rubygems.org"

ruby "2.5.1"

gem 'colorize','0.7.4'
gem "middleman", '3.3.7'
gem "middleman-livereload"
gem "middleman-smusher"
gem "haml"
git 'https://github.com/ably-forks/compass', branch: 'sass-deprecation-warning-fix' do
  # This bit fixes some warnings from Compass, no fix/PR has been merged yet
  # https://github.com/Compass/compass/issues/2052
  gem 'compass-core'
end
gem "middleman-autoprefixer"
gem "middleman-s3_redirect"
gem "middleman-dotenv"
gem "fog-core", "=1.32"

require 'rbconfig'

gem 'listen'

gem "wdm", "~> 0.1.0", :platforms => [:mswin, :mingw]
