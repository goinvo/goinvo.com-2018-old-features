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

	$ bundle exec middleman build


### Deploying `build` Folder

### AWS Setup

To deploy, you'll first need to add a `.s3_sync` file to the root directory. This file should contain the `aws_access_key_id` and `aws_secret_access_key` both of which a team member can provide, just ask. This file should be ignored. 


#### Redirections

Before deploying, verify that these two settings are set as follows in `config.rb`

	s3_sync.bucket                     = 'www.goinvo.com'
	config.bucket                      = 'www.goinvo.com'

To modify and update redirect rules, append new rules to the `config.rb` file with the following format:

	redirect '/path1', 'url or path'
  
Then run

	$ middleman s3_redirect

to apply generated objects to the server.


#### Staged Deployments

To deploy the build to the staging server, be sure the following lines are set as follows in `config.rb`:

	s3_sync.bucket                     = 'staging.goinvo.com'
	config.bucket                      = 'staging.goinvo.com'

Then run

	$ middleman s3_sync
-OR-

	$ middleman s3_sync --force
	
-OR to build and deploy in one fell swoop-

	$ bundle exec middleman build && middleman s3_sync
	

Before running any of these commands, you should make sure that you have all of the assets on your local computer. As of Dec 10th 2014, there are 8 videos (4 .mp4’s and 4 .webm’s).  that need to be in the .../source/vidoes/ folder. They are in the dropbox at .../Invo_Projects/Goinvo.com/NEW goinvo.com/artwork/videos . Since they are already uploaded to the server, not having them on your local computer shouldn't be a problem. But I highly recommend having them locally as a precaution.



#### Live Deployments

To deploy the build to the live server, be sure the following lines are set as follows in `config.rb`:

	s3_sync.bucket                     = 'www.goinvo.com'
	config.bucket                      = 'www.goinvo.com'

Then run

	$ middleman s3_sync
-OR-

	$ middleman s3_sync --force

-OR to build and deploy in one fell swoop-

	$ bundle exec middleman build && middleman s3_sync
