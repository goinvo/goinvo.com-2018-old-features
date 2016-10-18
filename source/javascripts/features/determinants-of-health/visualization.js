$(document).ready(function() {






  var $loading = $('#contact_form_loader').hide();
  $(document)
    .ajaxStart(function () {
      $loading.show();
    })
    .ajaxStop(function () {
      $loading.hide();
    });

  $("#contact_form").submit(function(e) {
    $("#contact_form :input").attr('readonly', 'true').css('background-color:#eee');

    $.ajax({
           type: "POST",
           url: "mail.php",
           data: $("#contact_form").serialize(), // serializes the form's elements.
           success: function(data) {
               $("#contact_form").slideUp(200);
               if (data == "1") {
                   $("#contact_form").html('<p>Thank you for getting in touch!</p>').fadeIn(200);
               } else {
                   $("#contact_form").prepend('<p>Something went wrong with the form. If submitting again does not work, please email us at info@goinvo.com. We apologize for the error.</p>').fadeIn(200);
               }
           }
         });

    e.preventDefault(); // avoid to execute the actual submit of the form.
  });












  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(getChartData);

  var $chartContainer = $('#determinants-chart');
  var chartData = [];
  var currentSelection = 0;

  function formatData(data) {
    // Grab the keys for the google charts data column titles
    var keys = Object.keys(data[0]);
    // Add the column titles as the first row
    var chartDeterminants = [keys];
    // Add rows for each determinant
    _.each(data, function(determinant, i) {
      chartDeterminants.push([]);
      _.each(keys, function(key) {
        chartDeterminants[i + 1].push(determinant[key]);
      });
    });
    return google.visualization.arrayToDataTable(chartDeterminants);
  }

  function getChartData() {
    $.getJSON( "determinants-of-health/visualization-data.json", function( data ) {
      chartData = formatData(data);

      drawChart();
    });
  }

  function drawChart() {

    // Resize the container div
    var chartdiv = $("#determinants-chart");
    var factor = Math.max(Math.min(.55, (chartdiv.width()-600)/800), .4);
    chartdiv.height(chartdiv.width()*factor + "px");

    var options = {
      chartArea: { left: 10, top: 10, width: '90%', height: '90%' },
      legend: { position: "labeled" },
      pieHole: 0.25,
      pieSliceText: 'none',
      pieSliceTextStyle: { 'color': '#444', 'font-size': '10px' },
      fontName: "Lucida Grande",
      fontColor: "#444",
      tooltip: {"trigger":"none"},
      //pieStartAngle: 64.8,
      // colors: ['#FACC8B', '#33BAC9', '#E7EC9D', '#F3917E', '#90EED4']
      colors: ['#F9D7A7', '#B2E5E9', '#E8ED9D', '#F8CBC5', '#90EED4']
    };

    var chart = new google.visualization.PieChart($chartContainer[0]);

    chart.draw(chartData, options);

    var template = $("#determinant-info-template").html();
    var template = _.template(template);

    $("#determinant-info").html(template({determinantIndex: currentSelection, data: chartData}));

    google.visualization.events.addListener(chart, 'select', selectHandler);
    selectHandlerApplied = true;

    function selectHandler(e) {
      var selectedItem = chart.getSelection()[0];
      console.log(selectedItem);

      if (selectedItem) {
        currentSelection = selectedItem.row;
        $("#determinant-info").html(template({determinantIndex: currentSelection, data: chartData}));
      }
    }


    google.visualization.events.addListener(chart, 'ready', function() {
        // set the selection to the first row in the chart
        chart.setSelection([{"row": 3}]);
        $("#determinant-info").html(template({determinantIndex: 3, data: chartData}));
    });

  }

  $(window).resize(function(){
    drawChart();
  });









});
