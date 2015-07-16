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

### Developing

The following is the git convention we are following...

1. All feature or development branches should branch off of the `develop` branch
2. To merge, issue a pull request to merge your dev branch into `develop`
3. Then to view on staging server, issue a pull request to merge `develop` into the `staging` branch
4. Likewise, to push to production server, issue a pull request to merge `staging` into `master`
5. Any pushes to `staging` or `master` will automatically build and deploy code to the corresponding Amazon S3 buckets (staging.goinvo.com and www.goinvo.com)
6. You should follow this process for any development work, testing changes in `staging` before merging to `master`
7. If you need to fix a bug in `master`, and `development` is ahead in commits, use the `hot-fixes` branch
	- Checkout the `hot-fixes` branch and merge in most recent `master`
	- Follow steps 3 and 4 except use `hot-fixes` instead of `develop`
	- After fixes are made, also merge those fixes back into `develop` from `master`


### Generate Static Site

To build a version of the site, which compiles all resources and consolidates all files into the `/build` folder, run:

	$ bundle exec middleman build


### Deploying `build` Folder

### Codeship

Codeship now handles deployment to Amazon S3. Any push to `master` branch will automatically build and sync to the `www.goinvo.com` bucket on s3. Any push to `staging` branch will automatically build and sync to the `staging.goinvo.com` bucket.

If you for some reason need to sync manually (Codeship runs out of builds for the month or isn't working), you can still use the s3_sync gem as described below. The appropriate s3 bucket can be targeted with the `s3_bucket` variable in `config.rb`.  

### AWS Setup

To deploy, you'll first need to add a `.s3_sync` file to the root directory. This file should contain the `aws_access_key_id` and `aws_secret_access_key` both of which a team member can provide, just ask. This file should be ignored.


#### Redirections

Before deploying, verify that this variable is set as follows in `config.rb`

	`s3_bucket = 'www.goinvo.com'`

To modify and update redirect rules, append new rules to the `config.rb` file with the following format:

	redirect '/path1', 'url or path'

Then run

	$ middleman s3_redirect

to apply generated objects to the server.


#### Staged Deployments

To deploy the build to the staging server, be sure the following line is set as follows in `config.rb`:

	`s3_bucket = 'staging.goinvo.com'`

Then run

	$ middleman s3_sync

-OR-

	$ middleman s3_sync --force

-OR to build and deploy in one fell swoop-

	$ bundle exec middleman build && middleman s3_sync


Before running any of these commands, you should make sure that you have all of the assets on your local computer. As of Dec 10th 2014, there are 8 videos (4 .mp4’s and 4 .webm’s).  that need to be in the .../source/videos/ folder. They are in the dropbox at .../Invo_Projects/Goinvo.com/NEW goinvo.com/artwork/videos . Since they are already uploaded to the server, not having them on your local computer shouldn't be a problem. But I highly recommend having them locally as a precaution.



#### Live Deployments

To deploy the build to the live server, be sure the following line is set as follows in `config.rb`:

	`s3_bucket = 'www.goinvo.com'`

Then run

	$ middleman s3_sync
	
-OR-

	$ middleman s3_sync --force

-OR to build and deploy in one fell swoop-

	$ bundle exec middleman build && middleman s3_sync
