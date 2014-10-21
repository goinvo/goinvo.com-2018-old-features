goinvo.com
==========

Website for goinvo.com

To view this site via a local middleman server, open up your favorite shell, `cd` to this directory and install the dependencies via:

	$ bundle install && bundle update

Then run
	$ middleman
-OR-
	$ middleman server
  
Then visit `http://localhost:4567` in your favorite browser.


### Generate Static Site

To build a version of the site, which compiles all resources and consolidates all files into the `/build` folder, run:

	$ `bundle exec middleman build`


### Deploy

#### Redirections

Before deploying, verify that these two settings are set as follows in `config.rb`

	`s3_sync.bucket                     = 'www.goinvo.com'`
	`config.bucket                      = 'www.goinvo.com'`

To modify and update redirect rules, append new rules to the `config.rb` file with the following format:

	`redirect '/path1', 'url or path'`
  
Then run
	$ `middleman s3_redirect`

to apply generated objects to the server.


#### Staged Deployments

To deploy the build to the staging server, be sure the following lines are set as follows in `config.rb`:

	`s3_sync.bucket                     = 'staging.goinvo.com'`
	`config.bucket                      = 'staging.goinvo.com'`

Then run
	$ `middleman s3_sync`
-OR-
	$ `middleman s3_sync --force`


#### Live Deployments

To deploy the build to the live server, be sure the following lines are set as follows in `config.rb`:

	`s3_sync.bucket                     = 'www.goinvo.com'`
	`config.bucket                      = 'www.goinvo.com'`

Then run
	$ `middleman s3_sync`
-OR-
	$ `middleman s3_sync --force`
