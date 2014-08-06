###
# Compass
###

# Change Compass configuration
compass_config do |config|
	# Require any additional compass plugins here.
	config.output_style = :compact
end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page "robots.txt", :layout => false
page "humans.txt", :layout => false

#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Livereload
activate :livereload

# Take care of all them prefixes
activate :autoprefixer

# Enable cache buster
activate :cache_buster

# S3 Sync
activate :s3_sync do |s3_sync|
  s3_sync.bucket                     = 'staging.goinvo.com' # The name of the S3 bucket you are targetting. This is globally unique.
  s3_sync.region                     = 'us-east-1'     # The AWS region for your bucket.
  s3_sync.delete                     = true # We delete stray files by default.
  s3_sync.after_build                = false # We do not chain after the build step by default.
  s3_sync.prefer_gzip                = true
  s3_sync.path_style                 = true
  s3_sync.reduced_redundancy_storage = false
  s3_sync.acl                        = 'public-read'
  s3_sync.encryption                 = false
  s3_sync.version_bucket             = false
end

# Manage all them redirects
activate :s3_redirect do |config|
  config.bucket                = 'staging.goinvo.com' # The name of the S3 bucket you are targetting. This is globally unique.
  config.region                = 'us-east-1'     # The AWS region for your bucket.
  config.after_build           = false # We chain after the build step by default. This may not be your desired behavior...
end

redirect '/about/', '/team/'
redirect '/about/code-of-ethics/', '/team/'
redirect '/about/techtalks/', '/'
redirect '/careers/studio-life/', '/careers/'
redirect '/careers/internships-apprenticeships/', '/careers/'
redirect '/practice-area/enterprise/', '/work/'
redirect '/practice-area/healthcare/', '/work/'
redirect '/practice-area/big-data-infovis/', '/work/'
redirect '/practice-area/social-software/', '/work/'
redirect '/work/3m-natural-language-processing-application/', '/work/3m/'
redirect '/work/mcafee-total-protection-ui-design-and-development/', '/work/mcafee/'
redirect '/work/oracle-agile-plm-ui-design-and-development/', '/work/oracle/'
redirect '/work/microsoft-expression-studio-redesign/', '/work/microsoft/'
redirect '/work/affinnova-concept-studio-software-design/', '/work/affinnova/'
redirect '/work/hgraph-dares-to-revolutionize-health-and-healthcare-with-big-data-analytics/', '/work/hgraph/'
redirect '/work/raptr-gaming-platform-ui-design/', '/work/'
redirect '/work/yahoo-site-solution-ui-design/', '/work/'
redirect '/work/democratic-national-committee-voter-registration-ui-design/', '/work/dnc/'
redirect '/work/personal-genome-project-open-humans/', '/work/personalgenomeproject/'
redirect '/work/curl-gapminder-style-information-visualization-ui-design/', '/work/scskcorporation/'
redirect '/work/shutterfly-studio-photo-management-ui-design/', '/work/'
redirect '/work/lithium-social-crm-ui-design/', '/work/'
redirect '/work/measured-health-social-fitness-app-design/', '/work/numera/'
redirect '/work/nomee-social-network-aggregator-ui-design/', '/work/'
redirect '/category/events/', 'http://yes.goinvo.com/articles/topic/events'
redirect '/category/analysis/', 'http://yes.goinvo.com/articles/topic/analysis'
redirect '/category/design/', 'http://yes.goinvo.com/articles/topic/design'
redirect '/category/healthcare/', 'http://yes.goinvo.com/articles/topic/healthcare'
redirect '/category/ideas/', 'http://yes.goinvo.com/articles/topic/ideas'
redirect '/category/information-visualization/', 'http://yes.goinvo.com/articles/topic/information-visualization'
redirect '/category/news/', 'http://yes.goinvo.com/articles/topic/news'
redirect '/category/podcast/', 'http://yes.goinvo.com/articles/topic/podcast'
redirect '/category/uncategorized/', 'http://yes.goinvo.com/articles/topic/uncategorized'
redirect '/blog/all-posts/', 'http://yes.goinvo.com/involution-studio-article-archive'
redirect '/involution-master-academy-announces-winter-2008-semester', 'http://yes.goinvo.com/articles/involution-master-academy-announces-winter-2008-semester'
redirect '/yahoo-small-business-product-wins-prestigious-pc-magazine-editor%e2%80%99s-choice-award', 'http://yes.goinvo.com/articles/yahoo-small-business-product-wins-prestigious-pc-magazine-editor%e2%80%99s-choice-award'
redirect '/raptr-a-social-platform-for-gamers-developed-in-conjunction-with-involution-studios-debuts', 'http://yes.goinvo.com/articles/raptr-a-social-platform-for-gamers-developed-in-conjunction-with-involution-studios-debuts'
redirect '/involution-establishes-operations-on-the-u-s-east-coast', 'http://yes.goinvo.com/articles/involution-establishes-operations-on-the-u-s-east-coast'
redirect '/involution-to-host-free-industry-event-for-boston-community', 'http://yes.goinvo.com/articles/involution-to-host-free-industry-event-for-boston-community'
redirect '/involution-studios-leads-redesign-of-the-mcafee-total-protection-suite-recently-released-to-beta', 'http://yes.goinvo.com/articles/involution-studios-leads-redesign-of-the-mcafee-total-protection-suite-recently-released-to-beta'
redirect '/adrift-in-a-ubicomp-world', 'http://yes.goinvo.com/articles/adrift-in-a-ubicomp-world'
redirect '/your-software-is-going-to-take-longer-than-you-think', 'http://yes.goinvo.com/articles/your-software-is-going-to-take-longer-than-you-think'
redirect '/why-mobile-is-magical', 'http://yes.goinvo.com/articles/why-mobile-is-magical'
redirect '/keep-online-surveys-short', 'http://yes.goinvo.com/articles/keep-online-surveys-short'
redirect '/the-trouble-with-twitter', 'http://yes.goinvo.com/articles/the-trouble-with-twitter'
redirect '/system-engineering-should-be-integral-to-the-design-of-your-applications', 'http://yes.goinvo.com/articles/system-engineering-should-be-integral-to-the-design-of-your-applications'
redirect '/the-rise-of-google-part-i-a-history-lesson', 'http://yes.goinvo.com/articles/the-rise-of-google-part-i-a-history-lesson'
redirect '/involution-principal-speaking-at-mobile-health-conference', 'http://yes.goinvo.com/articles/involution-principal-speaking-at-mobile-health-conference'
redirect '/the-apple-%e2%80%9ctablet%e2%80%9d-what-to-expect', 'http://yes.goinvo.com/articles/the-apple-%e2%80%9ctablet%e2%80%9d-what-to-expect'
redirect '/involution-designed-mcafee-2010-product-suites-released', 'http://yes.goinvo.com/articles/involution-designed-mcafee-2010-product-suites-released'
redirect '/the-rise-of-google-part-ii-from-start-up-to-superpower', 'http://yes.goinvo.com/articles/the-rise-of-google-part-ii-from-start-up-to-superpower'
redirect '/where-is-technology-taking-us', 'http://yes.goinvo.com/articles/where-is-technology-taking-us'
redirect '/the-rise-of-google-part-iii-a-decade-of-leadership-awaits', 'http://yes.goinvo.com/articles/the-rise-of-google-part-iii-a-decade-of-leadership-awaits'
redirect '/a-most-unholy-testament-the-crusade-of-patient-centered-design', 'http://yes.goinvo.com/articles/a-most-unholy-testament-the-crusade-of-patient-centered-design'
redirect '/facebook%e2%80%99s-ascenion-reflects-general-ignorance-of-the-web-today', 'http://yes.goinvo.com/articles/facebook%e2%80%99s-ascenion-reflects-general-ignorance-of-the-web-today'
redirect '/apple-and-microsoft-need-a-love-child-the-real-future-of-portable-computing', 'http://yes.goinvo.com/articles/apple-and-microsoft-need-a-love-child-the-real-future-of-portable-computing'
redirect '/open-vs-closed-a-tale-of-idealists-vs-realists', 'http://yes.goinvo.com/articles/open-vs-closed-a-tale-of-idealists-vs-realists'
redirect '/involution-absorbs-boston-company-hot-knife-design', 'http://yes.goinvo.com/articles/involution-absorbs-boston-company-hot-knife-design'
redirect '/app-design-the-shiny-new-toy-for-web-and-user-experience-designers', 'http://yes.goinvo.com/articles/app-design-the-shiny-new-toy-for-web-and-user-experience-designers'
redirect '/google-app-inventor-an-interesting-little-app', 'http://yes.goinvo.com/articles/google-app-inventor-an-interesting-little-app'
redirect '/apples-real-iphone-vulnerability', 'http://yes.goinvo.com/articles/apples-real-iphone-vulnerability'
redirect '/crowdsourcing-creative-cannibalism', 'http://yes.goinvo.com/articles/crowdsourcing-creative-cannibalism'
redirect '/involution-client-raptr-leaves-beta-to-rave-reviews', 'http://yes.goinvo.com/articles/involution-client-raptr-leaves-beta-to-rave-reviews'
redirect '/the-end-of-the-mouse', 'http://yes.goinvo.com/articles/the-end-of-the-mouse'
redirect '/losing-faith-in-ux', 'http://yes.goinvo.com/articles/losing-faith-in-ux'
redirect '/implications-of-a-desktop-ipad', 'http://yes.goinvo.com/articles/implications-of-a-desktop-ipad'
redirect '/point-n-click-bon-voyage', 'http://yes.goinvo.com/articles/point-n-click-bon-voyage'
redirect '/a-new-era-of-it-consolidation', 'http://yes.goinvo.com/articles/a-new-era-of-it-consolidation'
redirect '/community-vs-connection', 'http://yes.goinvo.com/articles/community-vs-connection'
redirect '/being-online-means-exposing-yourself', 'http://yes.goinvo.com/articles/being-online-means-exposing-yourself'
redirect '/business-and-treating-others-with-humanity-belong-together', 'http://yes.goinvo.com/articles/business-and-treating-others-with-humanity-belong-together'
redirect '/the-digital-life-episode-1', 'http://yes.goinvo.com/articles/the-digital-life-episode-1'
redirect '/how-the-internet-made-fantasy-football-stoopid', 'http://yes.goinvo.com/articles/how-the-internet-made-fantasy-football-stoopid'
redirect '/welcome-anne-hjortshoj-to-involution', 'http://yes.goinvo.com/articles/welcome-anne-hjortshoj-to-involution'
redirect '/the-digital-life-episode-2', 'http://yes.goinvo.com/articles/the-digital-life-episode-2'
redirect '/tdl-episode-3', 'http://yes.goinvo.com/articles/tdl-episode-3'
redirect '/knowledge-comes-from-depth-not-breadth', 'http://yes.goinvo.com/articles/knowledge-comes-from-depth-not-breadth'
redirect '/someday-soon-your-os-and-browser-will-be-the-same-thing', 'http://yes.goinvo.com/articles/someday-soon-your-os-and-browser-will-be-the-same-thing'
redirect '/tdl-episode-4', 'http://yes.goinvo.com/articles/tdl-episode-4'
redirect '/tdl-episode-5', 'http://yes.goinvo.com/articles/tdl-episode-5'
redirect '/tdl-episode-6', 'http://yes.goinvo.com/articles/tdl-episode-6'
redirect '/tdl-episode-7', 'http://yes.goinvo.com/articles/tdl-episode-7'
redirect '/the-digital-life-out-of-the-nest', 'http://yes.goinvo.com/articles/the-digital-life-out-of-the-nest'
redirect '/involution-principal-juhan-sonin-announced-as-featured-speaker-at-tti-vanguard-design-as-strategy-conference', 'http://yes.goinvo.com/articles/involution-principal-juhan-sonin-announced-as-featured-speaker-at-tti-vanguard-design-as-strategy-conference'
redirect '/facebook-game-design-is-an-embarrassment', 'http://yes.goinvo.com/articles/facebook-game-design-is-an-embarrassment'
redirect '/check-out-our-fresh-boston-digs', 'http://yes.goinvo.com/articles/check-out-our-fresh-boston-digs'
redirect '/africa-the-next-frontier', 'http://yes.goinvo.com/articles/africa-the-next-frontier'
redirect '/get-over-it-silicon-valley-remains-the-international-capitol-of-software', 'http://yes.goinvo.com/articles/get-over-it-silicon-valley-remains-the-international-capitol-of-software'
redirect '/from-olpc-to-vc-africa-leapfrogs-the-digital-divide', 'http://yes.goinvo.com/articles/from-olpc-to-vc-africa-leapfrogs-the-digital-divide'
redirect '/challenges-present-opportunities-innovation-in-africa', 'http://yes.goinvo.com/articles/challenges-present-opportunities-innovation-in-africa'
redirect '/mobile-in-africa-from-sms-to-android', 'http://yes.goinvo.com/articles/mobile-in-africa-from-sms-to-android'
redirect '/software-in-africa-more-better-different', 'http://yes.goinvo.com/articles/software-in-africa-more-better-different'
redirect '/involution-principal-to-present-workshop-for-incubator', 'http://yes.goinvo.com/articles/involution-principal-to-present-workshop-for-incubator'
redirect '/investing-in-africa-challenges-and-constraints', 'http://yes.goinvo.com/articles/investing-in-africa-challenges-and-constraints'
redirect '/get-immersed-in-african-tech-opportunities', 'http://yes.goinvo.com/articles/get-immersed-in-african-tech-opportunities'
redirect '/involution-principal-a-respected-advisor-to-nextgenhealth', 'http://yes.goinvo.com/articles/involution-principal-a-respected-advisor-to-nextgenhealth'
redirect '/considering-transhumanism', 'http://yes.goinvo.com/articles/considering-transhumanism'
redirect '/involution-client-raptr-featured-on-techcrunch', 'http://yes.goinvo.com/articles/involution-client-raptr-featured-on-techcrunch'
redirect '/planting-seeds-and-tilling-soil', 'http://yes.goinvo.com/articles/planting-seeds-and-tilling-soil'
redirect '/law-and-order-and-social-media', 'http://yes.goinvo.com/articles/law-and-order-and-social-media'
redirect '/the-digital-life-turns-30', 'http://yes.goinvo.com/articles/the-digital-life-turns-30'
redirect '/gesturing-towards-the-future', 'http://yes.goinvo.com/articles/gesturing-towards-the-future'
redirect '/from-the-archives-applied-empathy', 'http://yes.goinvo.com/articles/from-the-archives-applied-empathy'
redirect '/talent-wars-typography-and-standing-up', 'http://yes.goinvo.com/articles/talent-wars-typography-and-standing-up'
redirect '/where-are-you-edward-tufte', 'http://yes.goinvo.com/articles/where-are-you-edward-tufte'
redirect '/design-lessons-home-health-and-killing-the-rfp', 'http://yes.goinvo.com/articles/design-lessons-home-health-and-killing-the-rfp'
redirect '/seven-and-seven-a-look-back-on-involutions-history', 'http://yes.goinvo.com/articles/seven-and-seven-a-look-back-on-involutions-history'
redirect '/facebook-domination-driving-distracted-and-nasa-tv', 'http://yes.goinvo.com/articles/facebook-domination-driving-distracted-and-nasa-tv'
redirect '/five-reasons-to-sketch-your-user-interface', 'http://yes.goinvo.com/articles/five-reasons-to-sketch-your-user-interface'
redirect '/lion-roars-google-labs-shuts-its-doors-and-math-gets-a-new-ui', 'http://yes.goinvo.com/articles/lion-roars-google-labs-shuts-its-doors-and-math-gets-a-new-ui'
redirect '/practical-tips-for-producing-a-professional-podcast', 'http://yes.goinvo.com/articles/practical-tips-for-producing-a-professional-podcast'
redirect '/technology-health-and-our-memory-of-art-in-the-internet-age', 'http://yes.goinvo.com/articles/technology-health-and-our-memory-of-art-in-the-internet-age'
redirect '/pushing-pixels-and-carving-bits', 'http://yes.goinvo.com/articles/pushing-pixels-and-carving-bits'
redirect '/boston-talent-wars-iphone-facial-recognition-and-freedom-of-tweets', 'http://yes.goinvo.com/articles/boston-talent-wars-iphone-facial-recognition-and-freedom-of-tweets'
redirect '/the-trouble-with-tracking', 'http://yes.goinvo.com/articles/the-trouble-with-tracking'
redirect '/visualizing-data', 'http://yes.goinvo.com/articles/visualizing-data'
redirect '/console-game-memories-low-cost-internet-and-facial-recognition', 'http://yes.goinvo.com/articles/console-game-memories-low-cost-internet-and-facial-recognition'
redirect '/on-talent-war-and-devastation', 'http://yes.goinvo.com/articles/on-talent-war-and-devastation'
redirect '/on-open-work-spaces', 'http://yes.goinvo.com/articles/on-open-work-spaces'
redirect '/car-sharing-comic-book-art-and-intellectual-jazz', 'http://yes.goinvo.com/articles/car-sharing-comic-book-art-and-intellectual-jazz'
redirect '/wearable-health-tech-beautiful-subway-stations-and-democratizing-data-analysis', 'http://yes.goinvo.com/articles/wearable-health-tech-beautiful-subway-stations-and-democratizing-data-analysis'
redirect '/from-the-archives-working-virtually', 'http://yes.goinvo.com/articles/from-the-archives-working-virtually'
redirect '/authenticity-and-the-digital-life', 'http://yes.goinvo.com/articles/authenticity-and-the-digital-life'
redirect '/cloud-co-opetition-hurricane-irene-infovis-and-nokias-new-design-emphasis', 'http://yes.goinvo.com/articles/cloud-co-opetition-hurricane-irene-infovis-and-nokias-new-design-emphasis'
redirect '/the-new-age-of-software', 'http://yes.goinvo.com/articles/the-new-age-of-software'
redirect '/dahl-joins-involution-as-director-of-design-strategy', 'http://yes.goinvo.com/articles/dahl-joins-involution-as-director-of-design-strategy'
redirect '/whats-next', 'http://yes.goinvo.com/articles/whats-next'
redirect '/software-design-is-a-team-sport', 'http://yes.goinvo.com/articles/software-design-is-a-team-sport'
redirect '/laptop-music-kinected-hacking-and-supply-chain-design', 'http://yes.goinvo.com/articles/laptop-music-kinected-hacking-and-supply-chain-design'
redirect '/involution-principal-announced-as-speaker-at-himss12-healthcare-and-technology-conference', 'http://yes.goinvo.com/articles/involution-principal-announced-as-speaker-at-himss12-healthcare-and-technology-conference'
redirect '/a-2012-invo-preview', 'http://yes.goinvo.com/articles/a-2012-invo-preview'
redirect '/sopa-job-innovation-and-creativity-in-isolation', 'http://yes.goinvo.com/articles/sopa-job-innovation-and-creativity-in-isolation'
redirect '/the-ui-is-the-hero', 'http://yes.goinvo.com/articles/the-ui-is-the-hero'
redirect '/involution-principal-announced-as-speaker-at-nextgenhealth-healthcare-innovation-conference', 'http://yes.goinvo.com/articles/involution-principal-announced-as-speaker-at-nextgenhealth-healthcare-innovation-conference'
redirect '/the-new-frontiers-of-interaction-design-understanding-ourselves-and-culture', 'http://yes.goinvo.com/articles/the-new-frontiers-of-interaction-design-understanding-ourselves-and-culture'
redirect '/involution-studios-leads-design-of-recently-launched-affinnova-concept-studio', 'http://yes.goinvo.com/articles/involution-studios-leads-design-of-recently-launched-affinnova-concept-studio'
redirect '/involution-principal-to-conduct-applied-ux-methods-workshop-and-expert-session-at-himss12-healthcare-and-technology-conference', 'http://yes.goinvo.com/articles/involution-principal-to-conduct-applied-ux-methods-workshop-and-expert-session-at-himss12-healthcare-and-technology-conference'
redirect '/big-data-in-boston', 'http://yes.goinvo.com/articles/big-data-in-boston'
redirect '/the-internet-of-things-seeding-boston-start-ups-and-one-user-experience-for-all', 'http://yes.goinvo.com/articles/the-internet-of-things-seeding-boston-start-ups-and-one-user-experience-for-all'
redirect '/internships-at-involution', 'http://yes.goinvo.com/articles/internships-at-involution'
redirect '/online-privacy-needs-product-design', 'http://yes.goinvo.com/articles/online-privacy-needs-product-design'
redirect '/five-ways-to-make-learning-a-part-of-your-company-culture', 'http://yes.goinvo.com/articles/five-ways-to-make-learning-a-part-of-your-company-culture'
redirect '/what-the-ipad-retina-display-means-for-designers', 'http://yes.goinvo.com/articles/what-the-ipad-retina-display-means-for-designers'
redirect '/risk-taking-and-accelerating-the-next-technology-revolution-in-boston', 'http://yes.goinvo.com/articles/risk-taking-and-accelerating-the-next-technology-revolution-in-boston'
redirect '/infovis-breakdown-predicting-major-league-baseball-2012', 'http://yes.goinvo.com/articles/infovis-breakdown-predicting-major-league-baseball-2012'
redirect '/boston-is-a-hub-of-marketing-software-the-next-big-tech-sector', 'http://yes.goinvo.com/articles/boston-is-a-hub-of-marketing-software-the-next-big-tech-sector'
redirect '/discovering-boston-innovation-globally', 'http://yes.goinvo.com/articles/discovering-boston-innovation-globally'
redirect '/crowdfunding-and-common-sense', 'http://yes.goinvo.com/articles/crowdfunding-and-common-sense'
redirect '/nine-principles-of-great-companies', 'http://yes.goinvo.com/articles/nine-principles-of-great-companies'
redirect '/involution-studios-designs-user-experience-for-coderytes-natural-language-processing-health-system-coding-software', 'http://yes.goinvo.com/articles/involution-studios-designs-user-experience-for-coderytes-natural-language-processing-health-system-coding-software'
redirect '/health-technology-and-design', 'http://yes.goinvo.com/articles/health-technology-and-design'
redirect '/involution-client-coderyte-purchased-by-3m', 'http://yes.goinvo.com/articles/involution-client-coderyte-purchased-by-3m'
redirect '/health-reform-2-0-envisioning-a-patient-centered-system', 'http://yes.goinvo.com/articles/health-reform-2-0-envisioning-a-patient-centered-system'
redirect '/rethinking-work', 'http://yes.goinvo.com/articles/rethinking-work'
redirect '/the-software-revolution-will-be-televised', 'http://yes.goinvo.com/articles/the-software-revolution-will-be-televised'
redirect '/microsoft-surface-and-the-unified-user-experience', 'http://yes.goinvo.com/articles/microsoft-surface-and-the-unified-user-experience'
redirect '/insidetracker-software-designed-by-involution-provides-olympic-athletes-with-bloodwork-analytics', 'http://yes.goinvo.com/articles/insidetracker-software-designed-by-involution-provides-olympic-athletes-with-bloodwork-analytics'
redirect '/mobile-content-and-the-divergent-ecosystem', 'http://yes.goinvo.com/articles/mobile-content-and-the-divergent-ecosystem'
redirect '/open-office-hours-at-involution-studios-boston', 'http://yes.goinvo.com/articles/open-office-hours-at-involution-studios-boston'
redirect '/energy-and-software', 'http://yes.goinvo.com/articles/energy-and-software'
redirect '/involution-establishes-operations-in-the-u-s-midwest', 'http://yes.goinvo.com/articles/involution-establishes-operations-in-the-u-s-midwest'
redirect '/the-university-a-catalyst-for-bostons-innovation-economy', 'http://yes.goinvo.com/articles/the-university-a-catalyst-for-bostons-innovation-economy'
redirect '/understanding-our-virtual-connections', 'http://yes.goinvo.com/articles/understanding-our-virtual-connections'
redirect '/designing-business-collaboration-for-a-knowledge-economy', 'http://yes.goinvo.com/articles/designing-business-collaboration-for-a-knowledge-economy'
redirect '/involution-principal-announced-as-speaker-at-the-oreilly-strata-conference-on-big-data', 'http://yes.goinvo.com/articles/involution-principal-announced-as-speaker-at-the-oreilly-strata-conference-on-big-data'
redirect '/the-decay-of-good-products', 'http://yes.goinvo.com/articles/the-decay-of-good-products'
redirect '/get-your-design-axioms-card-deck-today', 'http://yes.goinvo.com/articles/get-your-design-axioms-card-deck-today'
redirect '/insidetracker-designed-by-involution-helps-olympian-win-two-silver-medals-video', 'http://yes.goinvo.com/articles/insidetracker-designed-by-involution-helps-olympian-win-two-silver-medals-video'
redirect '/always-on-will-start-to-turn-off', 'http://yes.goinvo.com/articles/always-on-will-start-to-turn-off'
redirect '/hgraph-designed-by-involution-places-second-at-the-new-england-health-datapalooza-advances-to-national-competition', 'http://yes.goinvo.com/articles/hgraph-designed-by-involution-places-second-at-the-new-england-health-datapalooza-advances-to-national-competition'
redirect '/involution-client-neumitra-wins-demo-award-for-anti-stress-product-bandu', 'http://yes.goinvo.com/articles/involution-client-neumitra-wins-demo-award-for-anti-stress-product-bandu'
redirect '/involution-studios%e2%80%99-hgraph-selected-as-a-2012-mitx-interactive-awards-finalist', 'http://yes.goinvo.com/articles/involution-studios%e2%80%99-hgraph-selected-as-a-2012-mitx-interactive-awards-finalist'
redirect '/code-for-america-brigade-at-involution-this-thursday', 'http://yes.goinvo.com/articles/code-for-america-brigade-at-involution-this-thursday'
redirect '/involution-studios-design-axioms-at-harvard-business-school', 'http://yes.goinvo.com/articles/involution-studios-design-axioms-at-harvard-business-school'
redirect '/studio-axioms-at-refresh-boston', 'http://yes.goinvo.com/articles/studio-axioms-at-refresh-boston'
redirect '/involution-at-the-mhealth-summit', 'http://yes.goinvo.com/articles/involution-at-the-mhealth-summit'
redirect '/design-axioms-app-now-available-at-the-itunes-store', 'http://yes.goinvo.com/articles/design-axioms-app-now-available-at-the-itunes-store'
redirect '/rethinking-the-patient-medical-record', 'http://yes.goinvo.com/articles/rethinking-the-patient-medical-record'
redirect '/mit-2-009-product-engineering-processes-prototype-launch-event', 'http://yes.goinvo.com/articles/mit-2-009-product-engineering-processes-prototype-launch-event'
redirect '/involution-client-geneinsight-leads-genetic-testing-revolution', 'http://yes.goinvo.com/articles/involution-client-geneinsight-leads-genetic-testing-revolution'
redirect '/hgraph-selected-for-national-patient-record-redesign-showcase', 'http://yes.goinvo.com/articles/hgraph-selected-for-national-patient-record-redesign-showcase'
redirect '/mhealth-zone', 'http://yes.goinvo.com/articles/mhealth-zone'
redirect '/interaction13-design-conference-to-feature-three-speakers-from-involution', 'http://yes.goinvo.com/articles/interaction13-design-conference-to-feature-three-speakers-from-involution'
redirect '/invo-poster-featured-in-massart%e2%80%99s-graphic-advocacy-exhibit', 'http://yes.goinvo.com/articles/invo-poster-featured-in-massart%e2%80%99s-graphic-advocacy-exhibit'
redirect '/utest-launches-app-analytics-tool-applause-designed-by-involution', 'http://yes.goinvo.com/articles/utest-launches-app-analytics-tool-applause-designed-by-involution'
redirect '/involution%e2%80%99s-design-axioms-applauded-in-the-designer%e2%80%99s-review-of-books', 'http://yes.goinvo.com/articles/involution%e2%80%99s-design-axioms-applauded-in-the-designer%e2%80%99s-review-of-books'
redirect '/involutions-hgraph-featured-in-wired-and-health-it-buzz', 'http://yes.goinvo.com/articles/involutions-hgraph-featured-in-wired-and-health-it-buzz'
redirect '/get-conference', 'http://yes.goinvo.com/articles/get-conference'
redirect '/code-palousa', 'http://yes.goinvo.com/articles/code-palousa'
redirect '/stir-trek', 'http://yes.goinvo.com/articles/stir-trek'
redirect '/uxpa-boston-conference', 'http://yes.goinvo.com/articles/uxpa-boston-conference'
redirect '/health-datapalooza-conference', 'http://yes.goinvo.com/articles/health-datapalooza-conference'
redirect '/governor-patricks-misguided-tax-on-software-design-and-development', 'http://yes.goinvo.com/articles/governor-patricks-misguided-tax-on-software-design-and-development'
redirect '/the-digital-life-turns-50-involution%e2%80%99s-design-podcast-re-launches', 'http://yes.goinvo.com/articles/the-digital-life-turns-50-involution%e2%80%99s-design-podcast-re-launches'
redirect '/bytes-and-atoms-unveiled-conference-speakers-announced', 'http://yes.goinvo.com/articles/bytes-and-atoms-unveiled-conference-speakers-announced'
redirect '/laying-foundation-for-internet-of-things-devices', 'http://yes.goinvo.com/articles/laying-foundation-for-internet-of-things-devices'
redirect '/scott-sullivan-delivers-a-one-two-punch-with-designers-learn-to-code-published-in-fast-co-design', 'http://yes.goinvo.com/articles/scott-sullivan-delivers-a-one-two-punch-with-designers-learn-to-code-published-in-fast-co-design'
redirect '/uxpa-2013', 'http://yes.goinvo.com/articles/uxpa-2013'
redirect '/ixda-workshop-by-scott-sullivan', 'http://yes.goinvo.com/articles/ixda-workshop-by-scott-sullivan'
redirect '/hgraph-featured-in-econtent-article-digital-diagnosis-a-new-generation-of-healthcare-technology', 'http://yes.goinvo.com/articles/hgraph-featured-in-econtent-article-digital-diagnosis-a-new-generation-of-healthcare-technology'
redirect '/will-big-data-save-healthcare', 'http://yes.goinvo.com/articles/will-big-data-save-healthcare'
redirect '/introducing-involutions-newest-game-%e2%80%94-runnan', 'http://yes.goinvo.com/articles/introducing-involutions-newest-game-%e2%80%94-runnan'
redirect '/involution-at-code-for-boston%e2%80%99s-demo-night', 'http://yes.goinvo.com/articles/involution-at-code-for-boston%e2%80%99s-demo-night'
redirect '/open-studio-hours', 'http://yes.goinvo.com/articles/open-studio-hours'
redirect '/consumer-genetics-conference', 'http://yes.goinvo.com/articles/consumer-genetics-conference'
redirect '/designing-arlington-visual-budget', 'http://yes.goinvo.com/articles/designing-arlington-visual-budget'
redirect '/involution-principal-discusses-design-for-emerging-technology-on-oreilly-radar-podcast', 'http://yes.goinvo.com/articles/involution-principal-discusses-design-for-emerging-technology-on-oreilly-radar-podcast'
redirect '/involutions-health-axioms-now-on-indiegogo', 'http://yes.goinvo.com/articles/involutions-health-axioms-now-on-indiegogo'
redirect '/guiding-ehr-design', 'http://yes.goinvo.com/articles/guiding-ehr-design'
redirect '/software-interface-design-process-and-principles', 'http://yes.goinvo.com/articles/software-interface-design-process-and-principles'
redirect '/own-the-experience-co-design-with-your-engineers', 'http://yes.goinvo.com/articles/own-the-experience-co-design-with-your-engineers'
redirect '/ux-axioms-lesson-learned-and-observations', 'http://yes.goinvo.com/articles/ux-axioms-lesson-learned-and-observations'
redirect '/midwest-ux', 'http://yes.goinvo.com/articles/midwest-ux'
redirect '/uxcamp-ottawa', 'http://yes.goinvo.com/articles/uxcamp-ottawa'
redirect '/creative-mornings-lecture-series', 'http://yes.goinvo.com/articles/creative-mornings-lecture-series'
redirect '/arlington-releases-online-budget-visualization-tool', 'http://yes.goinvo.com/articles/arlington-releases-online-budget-visualization-tool'
redirect '/creating-the-health-axioms', 'http://yes.goinvo.com/articles/creating-the-health-axioms'
redirect '/involution-principal-selected-for-ixda-board-of-directors', 'http://yes.goinvo.com/articles/involution-principal-selected-for-ixda-board-of-directors'
redirect '/a-ux-podcast-playlist-for-your-thanksgiving-travels', 'http://yes.goinvo.com/articles/a-ux-podcast-playlist-for-your-thanksgiving-travels'
redirect '/involution-columbus-teams-up-with-testdouble-for-open-office-hours', 'http://yes.goinvo.com/articles/involution-columbus-teams-up-with-testdouble-for-open-office-hours'
redirect '/health-axioms-mass-innovation-nights', 'http://yes.goinvo.com/articles/health-axioms-mass-innovation-nights'
redirect '/product-development-and-applied-ux-at-codemash', 'http://yes.goinvo.com/articles/product-development-and-applied-ux-at-codemash'
redirect '/involution%e2%80%99s-arlington-visual-budget-wins-mma-innovation-award', 'http://yes.goinvo.com/articles/involution%e2%80%99s-arlington-visual-budget-wins-mma-innovation-award'
redirect '/open-humans-project-wins-knight-foundation-health-award', 'http://yes.goinvo.com/articles/open-humans-project-wins-knight-foundation-health-award'
redirect '/involution-studios-releases-the-health-axioms', 'http://yes.goinvo.com/articles/involution-studios-releases-the-health-axioms'
redirect '/involution%e2%80%99s-arlington-visual-budget-wins-2014-if-communication-design-gold-award', 'http://yes.goinvo.com/articles/involution%e2%80%99s-arlington-visual-budget-wins-2014-if-communication-design-gold-award'
redirect '/utopia-in-our-pocket-at-tedxdenisonu', 'http://yes.goinvo.com/articles/utopia-in-our-pocket-at-tedxdenisonu'
redirect '/design-for-life-on-untether-tv', 'http://yes.goinvo.com/articles/design-for-life-on-untether-tv'
redirect '/involution-principal-selected-to-judge-37-billion-mile-data-challenge', 'http://yes.goinvo.com/articles/involution-principal-selected-to-judge-37-billion-mile-data-challenge'
redirect '/involution-studios-sponsors-2014-get-conference', 'http://yes.goinvo.com/articles/involution-studios-sponsors-2014-get-conference'
redirect '/information-design-amateur-hour-on-cnn', 'http://yes.goinvo.com/articles/information-design-amateur-hour-on-cnn'
redirect '/designing-with-data-at-uxpa-boston-2014', 'http://yes.goinvo.com/articles/designing-with-data-at-uxpa-boston-2014'
redirect '/involutions-health-axioms-featured-on-npr', 'http://yes.goinvo.com/articles/involutions-health-axioms-featured-on-npr'
redirect '/involution-studios-arlington-visual-budget-selected-as-a-2014-mitx-whats-next-awards-finalist', 'http://yes.goinvo.com/articles/involution-studios-arlington-visual-budget-selected-as-a-2014-mitx-whats-next-awards-finalist'
redirect '/oscon-2014-design-is-medicine', 'http://yes.goinvo.com/articles/oscon-2014-design-is-medicine'
redirect '/involution-principal-to-speak-at-stanford-medicine-x-2014', 'http://yes.goinvo.com/articles/involution-principal-to-speak-at-stanford-medicine-x-2014'
redirect '/apple%e2%80%99s-healthbook-is-visionaryand-parochial', 'http://yes.goinvo.com/articles/apple%e2%80%99s-healthbook-is-visionaryand-parochial'
redirect '/talking-about-behavior-change-at-get-2014', 'http://yes.goinvo.com/articles/talking-about-behavior-change-at-get-2014'
redirect '/the-different-postures-of-knowledge-work', 'http://yes.goinvo.com/articles/the-different-postures-of-knowledge-work'
redirect '/utopia-in-our-pocket', 'http://yes.goinvo.com/articles/utopia-in-our-pocket'
redirect '/invo-design-featured-in-fastcompany-co-exist', 'http://yes.goinvo.com/articles/invo-design-featured-in-fastcompany-co-exist'
redirect '/on-the-digital-life-health-axioms-and-designing-for-behavior-change', 'http://yes.goinvo.com/articles/on-the-digital-life-health-axioms-and-designing-for-behavior-change'
redirect '/what-we%e2%80%99re-reading%e2%80%94friday-links', 'http://yes.goinvo.com/articles/what-we%e2%80%99re-reading%e2%80%94friday-links'
redirect '/google-fit-a-better-bet-than-apple-health', 'http://yes.goinvo.com/articles/google-fit-a-better-bet-than-apple-health'
redirect '/web-components-and-oh-behave%e2%80%94friday-links', 'http://yes.goinvo.com/articles/web-components-and-oh-behave%e2%80%94friday-links'
redirect '/the-digital-life-apple-googleand-the-state-of-mhealth', 'http://yes.goinvo.com/articles/the-digital-life-apple-googleand-the-state-of-mhealth'
redirect '/new-inspired-ehrs-e-book-features-involution-design', 'http://yes.goinvo.com/articles/new-inspired-ehrs-e-book-features-involution-design'
redirect '/the-war-on-self-understanding', 'http://yes.goinvo.com/articles/the-war-on-self-understanding'
redirect '/oscon-14-sneak-peek-involution-interview-on-opensource-com', 'http://yes.goinvo.com/articles/oscon-14-sneak-peek-involution-interview-on-opensource-com'

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Add bower's directory to sprockets asset path
after_configuration do
	@bower_config = JSON.parse(IO.read("#{root}/.bowerrc"))
	sprockets.append_path File.join "#{root}", @bower_config["directory"]
end


set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

# Build-specific configuration
configure :build do
	# For example, change the Compass output style for deployment
	activate :minify_css

	# Minify Javascript on build
	activate :minify_javascript

	# Use relative URLs
	activate :relative_assets

	# Compress PNGs after build
	# First: gem install middleman-smusher
	# require "middleman-smusher"
	#activate :smusher

	# Or use a different image path
	# set :http_path, "image"
end

require 'lib/link_formatters'
require 'lib/data_helper'

helpers DataHelper
helpers LinkFormatters
