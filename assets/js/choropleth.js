var choroplethPlot = document.getElementById("choroplethDiv")

Plotly.d3.csv('assets/data/Median_Listing_Price_201904.csv', function(err, rows){
  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }

  var data = [{
    type: 'choropleth',
    locationmode: 'USA-states',
    locations: unpack(rows, 'StateID'),
    z: unpack(rows, 'Median_Listing_Price'),
    text: unpack(rows, 'StateName'),

    hoverlabel: {
      font: {
        color: 'white',
        size: 20}
    },

    // Color Scale 
    colorscale: "YlOrRd",
    autocolorscale: false,
    reversescale: true,

    // Colorbar
    colorbar: {
      x: 0.85,
      ticks: "inside",
      ticklen: 12,
      tickwidth: 2,
      tickprefix: '$',
      title: {
        text: 'US dollar',
        font:{size: 20},
      },
      tickfont: {size: 20}
    },


    marker: {line:{width: 2}}
  }];

  var layout = {
    title: {
      text: 'Latest Median Listing Price (2019-04)',
      font: {size: 28},
    },

    geo:{
      scope: 'usa',
      countrycolor: 'rgb(255, 255, 255)',
      showland: true,
      landcolor: 'rgb(217, 217, 217)',
      subunitcolor: 'rgb(255, 255, 255)',
    }
  };
  Plotly.newPlot(choroplethDiv, data, layout, {showLink: false});

  // choroplethPlot.on('plotly_click', function(data){
  //   alert('You clicked this Plotly chart!');
  // });
}); 

