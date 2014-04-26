(function($) {
  $(function(){
    var $noProjects = $('.no-projects-match');
    $noProjects.hide();

    $(function() {
      var $practiceAreas = $('[name="practice_area"]')
        , $budget = $('[name="budget"]');
      
      function matchesBudget(rangeOrFalse, projectBudget) {
        return rangeOrFalse && _.contains(rangeOrFalse, projectBudget);
      }
      
      function matchesPracticeArea(practiceArea, projectPracticeAreas) {
        return (practiceArea && _.contains(projectPracticeAreas, practiceArea))
      }
      
      function filterProjects(event) {
        event.preventDefault(); // derp?
        
        var $projects = $('[data-project]')
          criterion = {
              budget: (_.isEmpty($budget.val()) ? false : $budget.val())
            , practiceAreas: (_.isEmpty($practiceAreas.val()) ? false : $practiceAreas.val())
          };
        
        // if budget selected we need to create a lodash _.range of values (i.e.: $100-199K)
        if(criterion.budget) {
          var values = _.map(criterion.budget.split(','), function(number) { return parseInt(number); })
          criterion.budget = _.range(values[0], values[1]);
        }
        
        // build Array of animation functions to execute in parallel
        var animations = _.map($projects, function(project) {
          return function(callback) {
            var $project = $(this)
              , budgetMatched = matchesBudget(criterion.budget, $project.data('project-budget'))
              , practiceAreaMatched = matchesPracticeArea(criterion.practiceAreas, $project.data('project-practice-areas'));
            
            if((!criterion.budget && !criterion.practiceAreas) || // "all" for both
               (!criterion.practiceAreas && budgetMatched) || // only budget selected
               (!criterion.budget && practiceAreaMatched) || // only practice areas selected
               (budgetMatched && practiceAreaMatched) // matched both
              ) {
              _.defer(function() {
                this.slideDown('fast');
              }.bind($project));
              callback(null, "down");
            } else {
              _.defer(function() {
                this.slideUp('fast');
              }.bind($project));
              callback(null, "up");
            }
          }.bind(project);
        });
        
        async.parallel(animations, function(err, animationsResults) {
          if("up" == _.uniq(animationsResults))
            $noProjects.show();
          else
            $noProjects.hide();
        });
      }
      
      $practiceAreas.on('change', filterProjects);
      $budget.on('change', filterProjects);
    })
  })
})(jQuery);
