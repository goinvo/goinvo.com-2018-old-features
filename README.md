goinvo.com
==========

Website for goinvo.com

To see the site locally in development mode open up your favorite shell, cd to this directory and type:

  * `bundle install`
  * `middleman` -OR- `middleman server`
  
And visit http://localhost:4567 in your favorite browser.


### Generate Static Site

`bundle exec middleman build` -OR- `middleman build`

### Deploy

To modify and update redirect rules, append new rules to the `config.rb` file with the following format:

  redirect '/path1', 'url or path'
  
Then run `middleman s3_redirect`

To push files to the server, run `middleman s3_sync` -OR- `middleman s3_sync --force`