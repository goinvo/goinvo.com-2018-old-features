[ ![Codeship Status for goinvo/goinvo.com](https://codeship.com/projects/f4e57f70-0df4-0133-b611-2ed139d2fe7b/status?branch=master)](https://codeship.com/projects/91543)

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

## Git Conventions
The following conventions should be strictly followed when developing in this repo.

### Main Branches
These two branches should ALWAYS exist in this repo.

#### Master
This branch is strictly used to deploy to the live version of the site. The ONLY branches to merge into master are the `develop` branch and `hotfix-` branches. NO OTHER BRANCHES SHOULD BE MERGED INTO `master`.

#### Develop
This branch is to be used similarly to how we've historically used the master branch. When the feature being developed in a `feature` branch is complete, you merge that branch into `develop`. Then, after testing, you merge `develop` into `master`.

### Sub-Branches
There can (and will) be many of these temporary branches.

#### Feature
Feature Branches are branched off of `develop`. A `feature` branch is where most of your time will be spent when adding some sort of functionality to the website (that includes feature articles). When you're at a point where you are done with your feature (and have tested it), merge back into the `develop` branch. Continue to test in the `develop` branch and when you are ready to go live, merge into `master`.

Naming Convention: `feature-[feature description]`

#### Hotfix
A hotfix is a (generally) small update that needs to happen immediatly. For instance, if the live version of the website has a javascript error you should make a new `hotfix` branch. A `hotfix` branch should be branched off of `master` (This is the only branch to ever do this). You then make all your updates in the `hotfix` branch and then merge this branch (individually) into both the `develop` and `master` branches. This ensures that they are both up to date.

Naming Convention: `hotfix-[hotfix description]`

### Git Scenarioes

#### Developing a Feature
1. Make a new `feature` branch by branching off of `develop`. The title of this branch should be in the format `feature-[feature description]`.
2. Do all of your development and testing in your `feature-[feature description]` branch. You may upload to stage at any point.
3. When you're done developing and have fully tested in your isolated branch, merge into `development`.
4. Do more testing in the `development` branch. You may want to upload to stage to perform more testing.
5. When you believe you're ready to push live, merge the `development` branch into the `master` branch. This will upload to S3 automatically and your feature is now live.
6. You can now delete your `feature-[feature description]` branch as its entire history is now in the `development` and `master` branches.

#### Making a Quick Fix
1. Make a new `hotfix` branch by branching off of `master`. The title of this branch should be in the format`hotfix-[hotfix description]`.
2. Do all of your development and testing in your `hotfix-[hotfix description]` branch. You may want to upload to stage at any point.
3. When you're done developing and have fully tested your fix (100% fully tested, we don't want bad code to go live), you will merge `hotfix-[hotfix description]` into `master` AND you will merge `hotfix-[hotfix description]` into `develop`.
4. You can now delete your `hotfix-[hotfix description]` branch as its entire history is now in the `development` and `master` branches.


## Generate Static Site

To build a version of the site, which compiles all resources and consolidates all files into the `/build` folder, run:

	$ bundle exec middleman build


## Deploying `build` Folder

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

To deploy the build to the live server simply merge the `deploy` branch into `master`. Everything in master will automatically be built and uploaded to the server.