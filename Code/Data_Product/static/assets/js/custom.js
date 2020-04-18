 $(function() { $('a').bind('click', function(event) { $('#dataTable').empty(); $.getJSON($SCRIPT_ROOT +
  '/_add_numbers' , { a: event.currentTarget.innerText, }, function(data) { $('#dataTable').empty(); $("#dataTable").append("<thead><tr><th>Date</th><th>Open</th><th>High</th><th>Low</th><th>Close</th><th>Volume</th><th>Accuracy</th><th>Value</th><th>Price Signal</th></tr></thead><tbody >");


      $.each(data.result, function (index, value) {


      var cols = "<tr>";
        cols += '<td>'+value.created_utc+'</td>'
        cols += '<td>'+value.open.toFixed(2)+'</td>'
        cols += '<td>'+value.high.toFixed(2)+'</td>'
        cols += '<td>'+value.low.toFixed(2)+'</td>'
        cols += '<td>'+value.close.toFixed(2)+'</td>'
        cols += '<td>'+value.volume+'</td>'
        cols += '<td>'+value.accuracy.toFixed(2)+' %</td>'
      if (value.predicted == 'Sell') {
        cols += '<td><span class="badge-success badge-pill">'+value.value+'</span></td>';
    cols += '<td><span class="badge-success badge-pill">'+value.predicted+'</span></td>';
  }
  else{
    cols += '<td><span class="badge-danger badge-pill">'+value.value+'</span></td>';
    cols += '<td><span class="badge-danger badge-pill">'+value.value+'</span></td>';
  }
cols += '</tr>';

              $("#dataTable").append(cols);



});
$("#dataTable").append("</tbody ><tfoot><tr><th>Date</th><th>Open</th><th>High</th><th>Low</th><th>Close</th><th>Volume</th><th>Accuracy</th><th>Value</th><th>Price Signal</th></tr></tfoot>");

    });
    return false;
  });
});

$(function() {
  $( document ).ready(function() {
    $.getJSON($SCRIPT_ROOT + '/_add_numbers', {
      a: 'The Coca-Cola Co',
    }, function(data) {
      $('#dataTable').empty();
        $("#dataTable").append("<thead><tr><th>Date</th><th>Open</th><th>High</th><th>Low</th><th>Close</th><th>Volume</th><th>Accuracy</th><th>Value</th><th>Price Signal</th></tr></thead><tbody >");


      $.each(data.result, function (index, value) {


        var cols = "<tr>";
        cols += '<td>'+value.created_utc+'</td>'
        cols += '<td>'+value.open.toFixed(2)+'</td>'
        cols += '<td>'+value.high.toFixed(2)+'</td>'
        cols += '<td>'+value.low.toFixed(2)+'</td>'
        cols += '<td>'+value.close.toFixed(2)+'</td>'
        cols += '<td>'+value.volume+'</td>'
        cols += '<td>'+value.accuracy.toFixed(2)+' %</td>'
        if (value.predicted == 'Sell') {
          cols += '<td><span class="badge-success badge-pill">'+value.value+'</span></td>';
      cols += '<td><span class="badge-success badge-pill">'+value.predicted+'</span></td>';
    }
    else{
      cols += '<td><span class="badge-danger badge-pill">'+value.value+'</span></td>';
      cols += '<td><span class="badge-danger badge-pill">'+value.value+'</span></td>';
    }
cols += '</tr>';


              $("#dataTable").append(cols);



});
$("#dataTable").append("</tbody ><tfoot><tr><th>Date</th><th>Open</th><th>High</th><th>Low</th><th>Close</th><th>Volume</th><th>Accuracy</th><th>Value</th><th>Price Signal</th></tr></tfoot>");

    });
    return false;
  });
});
  (function(window, document, $, undefined) {
    $(function() {
      var chartJS = jQuery(".chartjs-wrapper");
      if (chartJS.length > 0) {
        /* Utils */
        window.chartColors = {
          red: 'rgb(233, 84, 84)',
          orange: 'rgb(253, 153, 68)',
          yellow: 'rgb(255, 188, 29)',
          green: 'rgb(37, 208, 154)',
          blue: 'rgb(71, 118, 230)',
          purple: 'rgb(142, 84, 233)',
          grey: 'rgb(148, 148, 148)'
        };

        (function(global) {
          var Months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ];

          var COLORS = [
            '#4dc9f6',
            '#f67019',
            '#f53794',
            '#537bc4',
            '#acc236',
            '#166a8f',
            '#00a950',
            '#58595b',
            '#8549ba'
          ];

          var Samples = global.Samples || (global.Samples = {});
          var Color = global.Color;
          Samples.utils = {
            // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
            srand: function(seed) {
              this._seed = seed;
            },

            rand: function(min, max) {
              var seed = this._seed;
              min = min === undefined ? 0 : min;
              max = max === undefined ? 1 : max;
              this._seed = (seed * 9301 + 49297) % 233280;
              return min + (this._seed / 233280) * (max - min);
            },

            numbers: function(config) {
              var cfg = config || {};
              var min = cfg.min || 0;
              var max = cfg.max || 1;
              var from = cfg.from || [];
              var count = cfg.count || 8;
              var decimals = cfg.decimals || 8;
              var continuity = cfg.continuity || 1;
              var dfactor = Math.pow(10, decimals) || 0;
              var data = [];
              var i, value;

              for (i = 0; i < count; ++i) {
                value = (from[i] || 0) + this.rand(min, max);
                if (this.rand() <= continuity) {
                  data.push(Math.round(dfactor * value) / dfactor);
                } else {
                  data.push(null);
                }
              }

              return data;
            },

            labels: function(config) {
              var cfg = config || {};
              var min = cfg.min || 0;
              var max = cfg.max || 100;
              var count = cfg.count || 8;
              var step = (max - min) / count;
              var decimals = cfg.decimals || 8;
              var dfactor = Math.pow(10, decimals) || 0;
              var prefix = cfg.prefix || '';
              var values = [];
              var i;

              for (i = min; i < max; i += step) {
                values.push(prefix + Math.round(dfactor * i) / dfactor);
              }

              return values;
            },

            months: function(config) {
              var cfg = config || {};
              var count = cfg.count || 12;
              var section = cfg.section;
              var values = [];
              var i, value;

              for (i = 0; i < count; ++i) {
                value = Months[Math.ceil(i) % 12];
                values.push(value.substring(0, section));
              }

              return values;
            },

            color: function(index) {
              return COLORS[index % COLORS.length];
            },

            transparentize: function(color, opacity) {
              var alpha = opacity === undefined ? 0.5 : 1 - opacity;
              return Color(color).alpha(alpha).rgbString();
            }
          };

          // DEPRECATED
          window.randomScalingFactor = function() {
            return Math.round(Samples.utils.rand(-100, 100));
          };

          // INITIALIZATION

          Samples.utils.srand(Date.now());

        }(this));
        /*Custom Points*/



        var customTooltips = function(tooltip) {
          $(this._chart.canvas).css("cursor", "pointer");
          var positionY = this._chart.canvas.offsetTop;
          var positionX = this._chart.canvas.offsetLeft;
          $(".chartjs-tooltip").css({
            opacity: 0,
          });
          if (!tooltip || !tooltip.opacity) {
            return;
          }
          if (tooltip.dataPoints.length > 0) {
            tooltip.dataPoints.forEach(function(dataPoint) {
              var content = [dataPoint.xLabel, dataPoint.yLabel].join(": ");
              var $tooltip = $("#tooltip-" + dataPoint.datasetIndex);

              $tooltip.html(content);
              $tooltip.css({
                opacity: 1,
                top: positionY + dataPoint.y + "px",
                left: positionX + dataPoint.x + "px",
              });
            });
          }
        };
        var color = Chart.helpers.color;
        var lineChartData = {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [{
            label: "My First dataset",
            backgroundColor: color(window.chartColors.purple).alpha(0.2).rgbString(),
            borderColor: window.chartColors.purple,
            pointBackgroundColor: window.chartColors.purple,
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          }, {
            label: "My Second dataset",
            backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
            borderColor: window.chartColors.blue,
            pointBackgroundColor: window.chartColors.blue,
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          }]
        };
        //simple line chart
        var chartjsdemo1 = jQuery("#chartjsdemo1");
        if (chartjsdemo1.length > 0) {
          var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          var config = {
            type: 'line',
            data: {
              labels: ["January", "February", "March", "April", "May", "June", "July"],
              datasets: [{
                label: "Facebook",
                borderColor: window.chartColors.blue,
                backgroundColor: window.chartColors.blue,
                data: [
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor()
                ],
              }, {
                label: "Twitter",
                borderColor: window.chartColors.green,
                backgroundColor: window.chartColors.green,
                data: [
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor()
                ],
              }, {
                label: "LinkedIn",
                borderColor: window.chartColors.purple,
                backgroundColor: window.chartColors.purple,
                data: [
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor()
                ],
              }, {
                label: "Google+",
                borderColor: window.chartColors.yellow,
                backgroundColor: window.chartColors.yellow,
                data: [
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor()
                ],
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: false,
                text: "Line Chart - Stacked Area"
              },
              tooltips: {
                mode: 'index',
              },
              hover: {
                mode: 'index'
              },
              legend: {
                labels: {
                  fontColor: color(window.chartColors.grey).alpha(0.8).rgbString(),
                  fontFamily: 'Roboto',
                  fontSize: 12,
                }
              },
              scales: {
                xAxes: [{
                  scaleLabel: {
                    display: false,
                    labelString: 'Month',
                    fontColor: color(window.chartColors.grey).alpha(1).rgbString(),
                    fontFamily: 'Roboto',
                    fontSize: 14
                  },
                  ticks: {
                    fontColor: color(window.chartColors.grey).alpha(0.8).rgbString(),
                    fontFamily: 'Roboto',
                    fontSize: 12,
                    stepSize: 1,
                    beginAtZero: true
                  }
                }],
                yAxes: [{
                  stacked: true,
                  scaleLabel: {
                    display: false,
                    labelString: 'Price',
                    fontColor: color(window.chartColors.grey).alpha(1).rgbString(),
                    fontFamily: 'Roboto',
                    fontSize: 14
                  },
                  ticks: {
                    fontColor: color(window.chartColors.grey).alpha(0.8).rgbString(),
                    fontFamily: 'Roboto',
                    fontSize: 12
                  }
                }]
              }
            }
          };
          var ctx1 = document.getElementById("chartjsdemo1").getContext("2d");
          window.myLine1 = new Chart(ctx1, config);
        }
        var chartjsdemo2 = jQuery("#chartjsdemo2");
        if (chartjsdemo2.length > 0) {
          // Line chart
          var config2 = {
            type: 'line',
            data: {
              labels: ["January", "February", "March", "April", "May", "June", "July"],
              datasets: [{
                label: "Unfilled",
                fill: false,
                backgroundColor: window.chartColors.yellow,
                borderColor: window.chartColors.yellow,
                data: [
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor()
                ],
              }, {
                label: "Dashed",
                fill: false,
                backgroundColor: window.chartColors.blue,
                borderColor: window.chartColors.blue,
                borderDash: [5, 5],
                data: [
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor()
                ],
              }, {
                label: "Filled",
                backgroundColor: window.chartColors.purple,
                borderColor: window.chartColors.purple,
                data: [
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor()
                ],
                fill: true,
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: false,
                text: 'Line Chart - Line styles'
              },
              tooltips: {
                mode: 'index',
                intersect: false,
              },
              hover: {
                mode: 'nearest',
                intersect: true
              },
              legend: {
                labels: {
                  fontColor: color(window.chartColors.grey).alpha(0.8).rgbString(),
                  fontFamily: 'Roboto',
                  fontSize: 12
                }
              },
              scales: {
                xAxes: [{
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: 'Month',
                    fontColor: color(window.chartColors.grey).alpha(1).rgbString(),
                    fontFamily: 'Roboto',
                    fontSize: 14
                  },
                  ticks: {
                    fontColor: color(window.chartColors.grey).alpha(0.8).rgbString(),
                    fontFamily: 'Roboto',
                    fontSize: 12,
                    stepSize: 1,
                    beginAtZero: true
                  }
                }],
                yAxes: [{
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: 'Value',
                    fontColor: color(window.chartColors.grey).alpha(1).rgbString(),
                    fontFamily: 'Roboto',
                    fontSize: 14
                  },
                  ticks: {
                    fontColor: color(window.chartColors.grey).alpha(0.8).rgbString(),
                    fontFamily: 'Roboto',
                    fontSize: 12
                  }
                }]
              }
            }
          };
          var ctx2 = document.getElementById("chartjsdemo2").getContext("2d");
          window.myLine2 = new Chart(ctx2, config2);
        }
        var chartjsdemo3 = jQuery("#chartjsdemo3");
        if (chartjsdemo3.length > 0) {
          // Donut chart
          var config3 = {
            type: 'doughnut',
            data: {
              datasets: [{
                data: [
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                ],
                backgroundColor: [
                  window.chartColors.red,
                  window.chartColors.purple,
                  window.chartColors.yellow,
                  window.chartColors.green,
                  window.chartColors.blue,
                ],
                label: 'Dataset 1'
              }],
              labels: [
                "Red",
                "Purple",
                "Yellow",
                "Green",
                "Blue"
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                position: 'bottom',
                labels: {
                  fontColor: color(window.chartColors.grey).alpha(0.8).rgbString(),
                  fontFamily: 'Roboto',
                  fontSize: 12
                }
              },
              title: {
                display: false,
                text: 'Doughnut Chart'
              },
              animation: {
                animateScale: true,
                animateRotate: true
              }
            }
          };
          var ctx3 = document.getElementById("chartjsdemo3").getContext("2d");
          window.myLine3 = new Chart(ctx3, config3);
        }
        var chartjsdemo4 = jQuery("#chartjsdemo4");
        var json_raw = {
          {
            plot1 | tojson
          }
        }
        var jsonfile = $.grep(json_raw, function(n, i) {
          return n.asset_name === 'The Coca-Cola Co';
        });
        var created_utc = $.map(jsonfile, function(n) {
          return n['created_utc']; // Here 'this' points to an 'item' in 'items'
        })
        var max = 0;
        var open = $.map(jsonfile, function(n) {
          if (n['open'] > max) {
            max = n['open'];
          }
          return String(n['open']); // Here 'this' points to an 'item' in 'items'
        })
        var sell_predicted = $.map(jsonfile, function(n) {
          return String(n['sell_predicted'] * (max + 10)); // Here 'this' points to an 'item' in 'items'
        })
        var buy_predicted = $.map(jsonfile, function(n) {
          return String(n['buy_predicted'] * (max + 10)); // Here 'this' points to an 'item' in 'items'
        })
        var news_combined_tile = $.map(jsonfile, function(n) {
          return String(n['news_combined_tile']); // Here 'this' points to an 'item' in 'items'
        })

        if (chartjsdemo4.length > 0) {
          // Combo
          var timeFormat = 'YYYY-MM-DD HH:mm:ss';

          function newDateString(days) {
            return moment().add(days, 'd').format(timeFormat);
          }
          var color = Chart.helpers.color;
          var config4 = {
            type: 'bar',
            data: {
              labels: created_utc,
              datasets: [{
                type: 'bar',
                label: 'Sell Signal',
                backgroundColor: '#c62828',
                borderColor: '#c62828',
                data: sell_predicted,
                toolTipContent: "hello",
              }, {
                type: 'bar',
                label: 'Buy Signal',
                backgroundColor: '#8bc34a',
                borderColor: '#8bc34a',
                data: buy_predicted,
              }, {
                type: 'line',
                label: 'Open Price',
                backgroundColor: '#46C5AD',
                borderColor: '#46C5AD',
                fill: false,
                data: open,
              }, {
                label: 'News',
                data: news_combined_tile,
              }, ]
            },
            options: {
              maintainAspectRatio: false,
              responsive: true,

              title: {
                display: false,
                text: "Combo Time Scale"
              },

              tooltips: {


                tooltipEvents: ["click"],
                callbacks: {
                  titleFontStyle: 'bold',
                  titleFontSize: 24,
                  title: function(open, data) {
                    return data['labels'][open['index']];
                  },
                  label: function(tooltipItem, data) {
                    return 'Closing Price : ' + data['datasets'][2]['data'][tooltipItem['index']] + '\n';
                  },
                  afterLabel: function(tooltipItem, data) {
                    var dataset = data['datasets'][3];
                    var buyorsell = data['datasets'][1]['data'][tooltipItem['index']];
                    var prediction = '';
                    if (buyorsell == 0) {
                      prediction = 'Sell Asset';
                    } else {
                      prediction = 'Buy Asset';
                    }
                    var percent = dataset['data'][tooltipItem['index']];
                    tooltip = 'Signal Prediction: ' + prediction + '\n' + 'Most Impacted News Article: ' + percent + '';
                    return tooltip;
                  },

                },

              },
              legend: {
                labels: {
                  fontColor: 'white',
                  fontFamily: 'Poppins',
                  fontSize: 12

                }
              },
              scales: {
                xAxes: [{
                  type: "time",
                  display: true,
                  time: {
                    format: timeFormat
                  },
                  ticks: {
                    fontColor: 'white',
                    fontFamily: 'Poppins',
                    fontSize: 12
                  }
                }],
                yAxes: [{
                  ticks: {
                    fontColor: 'white',
                    fontFamily: 'Poppins',
                    fontSize: 12
                  }
                }]
              },
            }
          };
          var ctx4 = document.getElementById("chartjsdemo4").getContext("2d");
          window.myLine4 = new Chart(ctx4, config4);
        }
        var chartjsdemo5 = jQuery("#chartjsdemo5");
        if (chartjsdemo5.length > 0) {
          var chartEl = document.getElementById("chartjsdemo5");
          var chart = new Chart(chartEl, {
            type: "line",
            data: lineChartData,
            options: {
              maintainAspectRatio: false,
              responsive: true,
              title: {
                display: false,
                text: "Custom Tooltips using Data Points"
              },
              legend: {
                labels: {
                  fontColor: 'white',
                  fontFamily: 'Roboto',
                  fontSize: 12
                }
              },
              tooltips: {
                enabled: false,
                mode: 'index',
                intersect: false,
                custom: customTooltips
              },
              scales: {
                xAxes: [{
                  ticks: {
                    fontColor: color(window.chartColors.grey).alpha(0.8).rgbString(),
                    fontFamily: 'Roboto',
                    fontSize: 12
                  }
                }],
                yAxes: [{
                  ticks: {
                    fontColor: color(window.chartColors.grey).alpha(0.8).rgbString(),
                    fontFamily: 'Roboto',
                    fontSize: 12
                  }
                }]
              },
            }
          });
        }
        


      }
    });

  })(window, document, window.jQuery);
