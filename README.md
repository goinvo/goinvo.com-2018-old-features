[ ![Codeship Status for goinvo/goinvo.com](https://codeship.com/projects/f4e57f70-0df4-0133-b611-2ed139d2fe7b/status?branch=master)](https://codeship.com/projects/91543)

goinvo.com
==========

Website for goinvo.com

To view this site via a local middleman server, open up your favorite shell, `cd` to this directory and install the dependencies via:

	$ bundle install

Then run

	$ middleman

-OR-

	$ middleman server

Then visit `http://localhost:4567` in your favorite browser.

## Git Conventions
The following conventions should be followed strictly when developing in this repo.

### Main Branches
These two branches should ALWAYS exist in this repo. For the most part, you will not do any development inside of these branches. You will only merge into/from them.

#### Master
This branch is strictly used to deploy to `www.goinvo.com`. The ONLY branches to merge into master are the `develop` branch and `hotfix-` branches.

#### Develop
This branch is to be used similarly to how we've historically used the master branch. All final products will be merged into the `develop` branch before being merged into `master`.

e.g. When the feature being developed in a `feature` branch is complete (and tested), you merge that branch into `develop`. Then, after more testing, you merge `develop` into `master`.

### Sub-Branches
There can (and will) be many instances of these temporary branches. These branches are where you will do a majority of your development.

#### Feature
Feature Branches must be branched off of the `develop` branch.

A `feature` branch is where most of your time will be spent. You should create a new `feature` branch when adding some sort of functionality to the website (that includes feature articles). When you are done with your feature (and have tested it), merge 'develop' (make sure it's up to date) into your 'feature' branch then merge the 'feature' branch back into the `develop` branch. Continue to test in the `develop` branch and when you are ready to go live, merge into `master`.

Naming Convention: `feature-[feature-description]`

#### Hotfix
A `hotfix` branch must be branched off of the `master` branch.

A hotfix is a (generally) small update that needs to happen immediatly. For instance, if the live version of the website has a javascript error, you should make a new `hotfix` branch. A `hotfix` branch should be branched off of the `master` branch (note: `hotfix` branches are the only branches allowed do this). You then make all your updates/bug fixes in the `hotfix` branch and then merge this branch (individually) into both the `develop` and `master` branches. This ensures that they are both up to date.

Naming Convention: `hotfix-[hotfix description]`

### Git Scenarioes

#### Developing a Feature Article
1. Make a new `feature` branch by branching off of `develop`. The title of this branch should be in the format `feature-[feature-description]`.
2. Do all of your development and testing in your `feature-[feature-description]` branch. You may upload to stage at any point.
3. When you're done developing and have fully tested in your isolated branch, merge into `develop`.
4. Do more testing in the `develop` branch. You may want to upload to stage to perform more testing.
5. When you believe you're ready to push live, merge the `develop` branch into the `master` branch. This will upload to S3 automatically and your feature is now live.
6. You can now delete your `feature-[feature-description]` branch as its entire history is now in the `develop` and `master` branches.

#### Making a Quick Fix
1. Make a new `hotfix` branch by branching off of `master`. The title of this branch should be in the format`hotfix-[hotfix-description]`.
2. Do all of your development and testing in your `hotfix-[hotfix-description]` branch. You may want to upload to stage at any point.
3. When you're done developing and have fully tested your fix (100% fully tested, we don't want bad code to go live), you will merge `hotfix-[hotfix-description]` into `master` AND you will merge `hotfix-[hotfix-description]` into `develop`.
4. You can now delete your `hotfix-[hotfix-description]` branch as its entire history is now in the `develop` and `master` branches.


## Generate Static Site

To build a version of the site, which compiles all resources and consolidates all files into the `/build` folder, run:

	$ bundle exec middleman build


## Deploying `build` Folder

### Codeship

Codeship now handles deployment to Amazon S3 for the live site. Any push to `master` branch will automatically build and sync to the `www.goinvo.com` bucket on s3.

If you for some reason need to sync manually (Codeship runs out of builds for the month or isn't working), you can still use the s3_wesbite gem as described below.

Codeship does not sync to `staging.goinvo.com`. That must be done manually.

### AWS Setup

To deploy, you'll first need to add a `.env` file to the root directory. This file should contain the environment variables below, which a team member can help procure for you, just ask. This file should be ignored by git, so it's something you must create manually.

Note that the AWS IAM account must have the appropriate access for S3 and Cloudfront.

```
GOINVO_AWS_ACCESS_KEY_ID=<your-aws-access-key>
GOINVO_AWS_SECRET_KEY=<your-aws-secret-key>
GOINVO_S3_BUCKET=staging.goinvo.com
GOINVO_CF_DISTRIBUTION_ID=<cloudfront-distribution-id>
```

If you run into a permissions error while attempting to deploy to staging, check that you do not have conflicting environment variables declared in other files that may take precedence over the values in `.env`.

#### Redirections

To modify and update redirect rules, append new rules to the bottom of `config.rb` file with the following format:

	redirect '/path1/', 'url or path'


Redirects will be built on successful Codeship deployments. If for some reason you need to manually trigger redirects build, you can run the below command (which also utilizes `.env` file as specified above).

$ bundle exec middleman s3_redirect


#### Staged Deployments

First you need the s3_website gem installed: `$ gem install s3_website`.

Ensure your `.env` variable `S3_BUCKET` is set to `staging.goinvo.com`.

Make sure you've built the website with `$ bundle exec middleman build`

Then run

`$ s3_website push`


Before running any of these commands, you should make sure that you have all of the assets on your local computer.



#### Live Deployments

To deploy the build to the live server simply merge the `deploy` branch into `master`. Everything in master will automatically be built and uploaded to the server.


#### Image Compression

When saving images to go onto the website, always be sure to save small files.

When you can, use SVGs for your vector images.

When saving JPGs, open the file in Photoshop and change the image size:
* If the resolution is currently greater than 72ppi, then do not resample the image and change the resolution
* Go back in and allow PS to resample, and resize the document to 200% larger than it's maximum size needs to be (this is so that the image can retain enough quality when compressed even on retina devices)
* When saving as JPG, select progressive and reduce the quality as low as possible before degradation is apparent. 2-6 are recommended
* Upload files to https://kraken.io/ and make them even smaller
* Aim for around < 150KB
* Now you're ready to rock!
