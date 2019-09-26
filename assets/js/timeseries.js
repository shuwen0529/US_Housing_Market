var timeseriesPlot = document.getElementById('timeseriesDiv')

// Submit Button handler
function TSSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();
  // Select the input value from the form
  var StateID = d3.select("#StateInput").node().value;
  // clear the input value
  d3.select("#StateInput").node().value = "";
  // Build the plot with the new StateID
  buildPlotTS(StateID);
}


function buildPlotTS(StateID) {
   Plotly.d3.csv(`assets/data/csv_House_byStates/${StateID}.csv`, function(err, rows){
      function unpack(rows, key) {
         return rows.map(function(row) { return row[key]; });
       }

      var trace1 = {
         x: unpack(rows, 'Month'),
         y: unpack(rows, 'Median Listing Price M/M'),
         mode: "lines+markers",
         type: 'scatter',
         name: "Median Listing Price Monthly Change",
         connectgaps: true,
         line: {color: '#17BECF'}
      }
      
      var trace2 = {
         x: unpack(rows, 'Month'),
         y: unpack(rows, 'Days on Market M/M'),
         mode: "lines+markers",
         type: 'scatter',
         name: "Days on Market Monthly Change",
         connectgaps: true,
         line: {color: 'orange'}
      }

      var trace3 = {
         x: unpack(rows, 'Month'),
         y: unpack(rows, 'New Listing Count M/M'),
         mode: "lines+markers",
         type: 'scatter',
         name: "New Listing on Market Monthly Change",
         connectgaps: true,
         line: {color: 'purple'}
      }

      var data = [trace1, trace2,trace3];
      
      var layout = {
         title: {
            text: `Monthly Change in ${StateID}`,
            font: {size: 28},
         },
         
      hoverlabel: {
         font: {
            color: 'white',
            size: 20}
         },
      
      xaxis: {
         showgrid: true,
         showline: true,
         mirror: 'ticks',
         range: ['2012-05-01', '2019-06-01'],
         rangeselector: {buttons: [
        {
          count: 12,
          label: '1Yr',
          step: 'month',
          stepmode: 'backward'
        },
        {
          count: 36,
          label: '3Yr',
          step: 'month',
          stepmode: 'backward'
        },
        {step: 'all'}
      ]},
      rangeslider: {range: ['2012-05-01', '2019-06-01']},
      tickfont: {
      size: 16,
      color: 'black'}
   },
   
   yaxis: {
    showgrid: true,
    showline: true,
    mirror: 'ticks',
   //  range: [-0.4, 0.4],
    type: 'linear',
    tickfont: {
      size: 16,
      color: 'black'
    }
  }
};

Plotly.newPlot(timeseriesDiv, data, layout, {showLink: false});
});
}

d3.select("#TSsubmit").on("click", TSSubmit);
