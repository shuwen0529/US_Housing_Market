var correlationPlot = document.getElementById('correlationDiv')

// Submit Button handler
function CRSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();
  // Select the input value from the form
  var StateID = d3.select("#FactorInput").node().value;
  // clear the input value
  d3.select("#FactorInput").node().value = "";
  // Build the plot with the new StateID
  buildPlot(StateID);
}


function buildPlot(StateID) {
   Plotly.d3.csv(`assets/data/csv_Factors_byStates/${StateID}.csv`, function(err, rows){
      function unpack(rows, key) {
         return rows.map(function(row) { return row[key]; });
       }

       var trace1 = {
         x: unpack(rows, 'Year'),
         y: unpack(rows, 'Median Listing Price'),
         mode: "lines+markers",
         type: 'scatter',
         name: "Median Listing Price",
         line: {color: '#17BECF'}
         };
      
       var trace2 = {
            x: unpack(rows, 'Year'),
            y: unpack(rows, 'Total Crime Rate'),
            mode: "lines+markers",
            type: 'scatter',
            yaxis: 'y2',
            name: 'Total Crime Rate',
            line: {color: 'orange'}
         };

      var trace3 = {
         x: unpack(rows, 'Year'),
         y: unpack(rows, 'Poverty Percent'),
         mode: "lines+markers",
         type: 'scatter',
         yaxis: 'y3',
         name: "Poverty Percent",
         line: {color: '#9467bd'}
      }

      var data = [trace1, trace2, trace3];
      
      var layout = {

         width: 1200,  
         xaxis: {domain: [0.05, 0.8]},

         yaxis: {
            title: {
               text: `Median Listing Price`,
               font: {size: 16, color: '#17BECF'},
            },
            showgrid: false,
            tickfont: {
               size: 16,
               color: '#17BECF'
            }
         },

         yaxis2: {
            title: {
               text: `Total Crime`,
               font: {size: 16, color:'orange'}
            },
            showgrid: true,
            tickfont: {
               size: 16,
               color: 'orange'
            },
            overlaying: 'y',
            side: 'right'
         },

         yaxis3: {
            title: {
               text: `Poverty Percentage`,
               font: {size: 16, color:'#9467bd'}
            },
            showgrid: true,
            tickfont: {
               size: 16,
               color: '#9467bd'
            },
            overlaying: 'y',
            side: 'right',
            position: 0.9
         },

            
         hoverlabel: {
            font: {
            color: 'white',
            size: 20}
         },
      
};

Plotly.newPlot(timeseriesDiv, data, layout, {showLink: false});
});
}

d3.select("#CRsubmit").on("click", CRSubmit);
