
// eslint-disable-next-line no-unused-vars

window.onload = function() {
    var hu = window.location.search.substring(1);
    var gy = hu.split("&");
    var ji = "state"
    var state = "";

    for (i=0;i<gy.length;i++) {
        ft = gy[i].split("=");
        if (ft[0] == ji) {
            state = ft[1];
            state = state.replace("%20", " ")
            document.getElementById('stateName').innerHTML = state;           
            break;
        }
    }

    if(state==""){
        this.alert('Something went wrong! No State was selected');
        return;
    }

    var url = 'http://localhost:3000/rankings/' + state;

    d3.json(url).then(function(rankData){
        rankData.forEach(function(data) {
            data.state = data.state;
            data.year = +data.year;
            data.education = +data.education;
            data.economy = +data.economy;
            data.quality_of_life = +data.quality_of_life;
            data.cost_of_living = +data.cost_of_living;
            data.interest_rate = +data.interest_rate;
            data.purchase_price = +data.purchase_price;                   
        });

        function getArray(data,f){
            var r = [];
            for(var i in data){
                if(f=='year') r.push(data[i].year);
                if(f=='interestrate') r.push(data[i].interest_rate);
                if(f=='purchaseprice') r.push(data[i].purchase_price);
                if(f=='education') r.push(data[i].education);
                if(f=='economy') r.push(data[i].economy);
                if(f=='qualityoflife') r.push(data[i].quality_of_life);
                if(f=='costofliving') r.push(data[i].cost_of_living);
            }
            return r;
        }

        var chartDataMain = {
            labels: getArray(rankData,'year'),
            datasets: [{
                type: 'line',
                label: 'Interest Rate',
                borderColor: window.chartColors.blue,
                borderWidth: 2,
                fill: false,
                data: getArray(rankData,'interestrate'),
                yAxisID: 'y-axis-2'
            },   
            {
                type: 'bar',
                label: 'Purchase Price',
                backgroundColor: window.chartColors.red,
                data: getArray(rankData,'purchaseprice'),
                yAxisID: 'y-axis-1',                
                borderColor: 'white',
                borderWidth: 2
            }]        
        };

        var chartDataEducation = {
            labels: getArray(rankData,'year'),
            datasets: [{
                type: 'line',
                label: 'Education Ranking',
                borderColor: window.chartColors.red,
                borderWidth: 2,
                fill: false,
                data: getArray(rankData,'education'),
            }]         
        };

        var chartDataEconomy = {
            labels: getArray(rankData,'year'),
            datasets: [{
                type: 'line',
                label: 'Economy Ranking',
                borderColor: window.chartColors.blue,
                borderWidth: 2,
                fill: false,
                data: getArray(rankData,'economy'),
            }]        
        };

        var chartDataQualityOfLife = {
            labels: getArray(rankData,'year'),
            datasets: [{
                type: 'line',
                label: 'Quality-of-life Ranking',
                borderColor: window.chartColors.purple,
                borderWidth: 2,
                fill: false,
                data: getArray(rankData,'qualityoflife'),
            }]        
        };
        
        var chartDataCostOfLiving = {
            labels: getArray(rankData,'year'),
            datasets: [{
                type: 'line',
                label: 'Cost-of-living Ranking',
                borderColor: window.chartColors.orange,
                borderWidth: 2,
                fill: false,
                data: getArray(rankData,'costofliving'),
            }]        
        };        
        var ctx = document.getElementById('canvas').getContext('2d');
        window.myMixedChart = new Chart(ctx, {
            type: 'bar',
            data: chartDataMain,
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: state + "'s Sales Prices & Interest Rates"
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Year'
                        }
                    }],
                    yAxes: [{
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                        scaleLabel: {
                            display: true,
                            labelString: 'Sales Price'
                        },
                        ticks: {
                            callback: function(label, index, labels) {
                                label = label.toString();
                                label = label.split(/(?=(?:...)*$)/);
                                label = label.join(',');
                                return '$' + label;
                            }
                        },
                        
                        // grid line settings
                        gridLines: {
                            drawOnChartArea: false,
                        }

                    }, {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        id: 'y-axis-2',
                        scaleLabel: {
                            display: true,
                            labelString: 'Interest Rate'
                        },
                    }],
                }
            }
        });
        var ctx = document.getElementById('chart-0').getContext('2d');
        window.myMixedChart = new Chart(ctx, {
            type: 'bar',
            data: chartDataEducation,
            options: {
                responsive: true,
                legend: {
                    labels: {
                        boxWidth: 20
                    }
                },                
                title: {
                    display: true,
                    text: state + "'s education rank by year"
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Year'
                        }
                    }],
                    yAxes: [{
                        type: 'linear',
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Rank'
                        },
                        ticks: {
                            reverse: 'true'
                        }
                    }]
                },                              
            }
        });

        var ctx = document.getElementById('chart-1').getContext('2d');
        window.myMixedChart = new Chart(ctx, {
            type: 'bar',
            data: chartDataEconomy,
            options: {
                responsive: true,
                legend: {
                    labels: {
                        boxWidth: 20
                    }
                },                
                title: {
                    display: true,
                    text: state + "'s economy rank by year"
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Year'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Rank'
                        },
                        ticks: {
                            reverse: 'true'
                        }
                    }]
                },                
            }
        });
        
        var ctx = document.getElementById('chart-2').getContext('2d');
        window.myMixedChart = new Chart(ctx, {
            type: 'bar',
            data: chartDataQualityOfLife,
            options: {
                responsive: true,
                legend: {
                    labels: {
                        boxWidth: 20
                    }
                },                
                title: {
                    display: true,
                    text: state + "'s Quality-of-life by year"
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Year'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Rank'
                        },
                        ticks: {
                            reverse: 'true'
                        }
                    }]
                },                               
            }
        });

        var ctx = document.getElementById('chart-3').getContext('2d');
        window.myMixedChart = new Chart(ctx, {
            type: 'bar',
            data: chartDataCostOfLiving,
            options: {
                responsive: true,
                legend: {
                    labels: {
                        boxWidth: 20
                    }
                },                
                title: {
                    display: true,
                    text: state + "'s Cost-of-living rank by year"
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Year'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Rank'
                        },
                        ticks: {
                            reverse: 'true'
                        }
                    }]
                },                                 
            }
        });        


    });    

    var url2 = 'http://localhost:3000/population/' + state;

    d3.json(url2).then(function(populationData){
        populationData.forEach(function(data) {
            data.state = data.state;
            data.year = +data.year;
            data.education = +data.education;
            data.economy = +data.economy;
            data.quality_of_life = +data.quality_of_life;
            data.cost_of_living = +data.cost_of_living;
            data.interest_rate = +data.interest_rate;
            data.purchase_price = +data.purchase_price;                   
        });

        function getArray(data,f){
            var r = [];
            for(var i in data){
                if(f=='year') r.push(data[i].year);
                if(f=='popEstimate') r.push(data[i].pop_estimate);
                if(f=='popChange') r.push(data[i].pop_change);
                if(f=='births') r.push(data[i].births);
                if(f=='deaths') r.push(data[i].deaths);
                if(f=='internationalMig') r.push(data[i].international_mig);
                if(f=='domesticMig') r.push(data[i].domestic_mig);
                if(f=='netMig') r.push(data[i].net_mig);
                if(f=='interestrate') r.push(data[i].interest_rate);
                if(f=='purchaseprice') r.push(data[i].purchase_price);
            }
            return r;
        }

        var chartDataPopEstimate = {
            labels: getArray(populationData,'year'),
            datasets: [{
                type: 'line',
                label: 'Population',
                borderColor: window.chartColors.red,
                borderWidth: 2,
                fill: false,
                data: getArray(populationData,'popEstimate'),
            }]         
        };

        var chartDataNetMig = {
            labels: getArray(populationData,'year'),
            datasets: [
            {
                type: 'line',
                label: 'International',
                borderColor: window.chartColors.blue,
                backgroundColor: window.chartColors.gray,
                borderWidth: 2,
                fill: false,
                data: getArray(populationData,'internationalMig'),
            },
            {
                type: 'line',
                label: ' Domestic',
                borderColor: window.chartColors.yellow,
                backgroundColor: window.chartColors.gray,
                borderWidth: 2,
                fill: false,
                data: getArray(populationData,'domesticMig'),
            },
            {
                type: 'line',
                label: 'Net',
                borderColor: window.chartColors.red,
                backgroundColor: window.chartColors.gray,
                borderWidth: 2,
                fill: true,
                data: getArray(populationData,'netMig'),
            }]       
        };

        var chartDataBirths = {
            labels: getArray(populationData,'year'),
            datasets: [{
                type: 'line',
                label: 'Births',
                borderColor: window.chartColors.purple,
                borderWidth: 2,
                fill: false,
                data: getArray(populationData,'births'),
            }]        
        };
        
        var chartDataDeaths = {
            labels: getArray(populationData,'year'),
            datasets: [{
                type: 'line',
                label: 'Deaths',
                borderColor: window.chartColors.orange,
                borderWidth: 2,
                fill: false,
                data: getArray(populationData,'deaths'),
            }]        
        };        

        var ctx = document.getElementById('chart-4').getContext('2d');
        window.myMixedChart = new Chart(ctx, {
            type: 'line',
            data: chartDataPopEstimate,
            options: {
                responsive: true,
                legend: {
                    labels: {
                        boxWidth: 20
                    }
                },                
                title: {
                    display: true,
                    text: state + "'s population by year"
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Year',
                            padding: 0
                        }
                    }],
                    yAxes: [{
                        display: true, 
                        ticks: {
                            callback: function(label, index, labels) {
                                label = label.toString();
                                label = label.split(/(?=(?:...)*$)/);
                                label = label.join(',');
                                return label;
                            }
                        },                     
                        scaleLabel: {
                            display: true,
                            labelString: 'Population'
                        }
                    }]
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                }                
            }
        });

        var ctx = document.getElementById('chart-5').getContext('2d');
        window.myMixedChart = new Chart(ctx, {
            type: 'box',
            data: chartDataNetMig,
            options: {
                responsive: true,
                legend: {
                    labels: {
                        boxWidth: 20
                    }
                },
                title: {
                    display: true,
                    text: state + "'s migration by year"
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Year'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            callback: function(label, index, labels) {
                                label = label.toString();
                                label = label.split(/(?=(?:...)*$)/);
                                label = label.join(',');
                                return label;
                            }
                        },                        
                        scaleLabel: {
                            display: true,
                            labelString: 'Migration'
                        }
                    }]
                },                                 
            }
        });
        
        var ctx = document.getElementById('chart-6').getContext('2d');
        window.myMixedChart = new Chart(ctx, {
            type: 'bar',
            data: chartDataBirths,
            options: {
                responsive: true,
                legend: {
                    labels: {
                        boxWidth: 20
                    }
                },                
                title: {
                    display: true,
                    text: "Births in " + state + " by year"
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Year'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            callback: function(label, index, labels) {
                                label = label.toString();
                                label = label.split(/(?=(?:...)*$)/);
                                label = label.join(',');
                                return label;
                            }
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Births'
                        }
                    }]
                },                                
            }
        });

        var ctx = document.getElementById('chart-7').getContext('2d');
        window.myMixedChart = new Chart(ctx, {
            type: 'bar',
            data: chartDataDeaths,
            options: {
                responsive: true,
                legend: {
                    labels: {
                        boxWidth: 20
                    }
                },                
                title: {
                    display: true,
                    text: "Deaths in " + state + " by year"
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Year'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            callback: function(label, index, labels) {
                                label = label.toString();
                                label = label.split(/(?=(?:...)*$)/);
                                label = label.join(',');
                                return label;
                            }
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Deaths'
                        }
                    }]
                },                                 
            }
        });        


    });
};

