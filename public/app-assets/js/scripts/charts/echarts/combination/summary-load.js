/**
 * Created by senthil on 15/04/17.
 */
/*=========================================================================================
 File Name: column-line.js
 Description: echarts column line chart
 ----------------------------------------------------------------------------------------
 Item Name: Robust - Responsive Admin Theme
 Version: 1.2
 Author: PIXINVENT
 Author URL: http://www.themeforest.net/user/pixinvent
 ==========================================================================================*/

// Column line chart
// ------------------------------

$( document ).ready(function() {

    // Set paths
    // ------------------------------

    require.config({
        paths: {
            echarts: '/app-assets/vendors/js/charts/echarts'
        }
    });


    // Configuration
    // ------------------------------

    require(
        [
            'echarts',
            'echarts/chart/bar',
            'echarts/chart/line',
            'echarts/chart/scatter',
            'echarts/chart/pie'
        ],


        // Charts setup
        function (ec) {

            // Initialize chart
            // ------------------------------
            var myChart = ec.init(document.getElementById('summary-load'));

            // Chart Options
            // ------------------------------
            chartOptions = {

                // Setup grid
                grid: {
                    x: 40,
                    x2: 40,
                    y: 45,
                    y2: 25
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis'
                },

                // Add legend
                legend: {
                    data: ['Users', 'Error', 'Hits/s']
                },

                // Add custom colors
                color: ['#016ca5', '#FF847C', '#EC407A'],

                // Enable drag recalculate
                calculable: true,

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    data: ['11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45']
                }],

                // Vertical axis
                yAxis : [
                    {
                        type : 'value',
                        name : 'Virtual Users',
                        axisLabel : {
                            formatter: '{value} vu'
                        }
                    },
                    {
                        type : 'value',
                        name : 'Hits Per Second',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    }
                ],

                // Add series
                series : [
                    {
                        name:'Users',
                        type:'line',
                        data:[2.0, 6.0, 12.0, 24.0, 100.0, 180.0, 180.0, 180.0, 180.0, 180.02]
                    },
                    {
                        name:'Error',
                        type:'line',
                        data:[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
                    },
                    {
                        name:'Hits/s',
                        type:'line',
                        yAxisIndex: 1,
                        data:[2.6, 5.9, 9.0, 9.0, 9.0, 9.0, 9.0, 9.0, 9.0, 8.0]
                    }
                ]
            };

            // Apply options
            // ------------------------------

            myChart.setOption(chartOptions);


            // Resize chart
            // ------------------------------

            $(function () {

                // Resize chart on menu width change and window resize
                $(window).on('resize', resize);
                $(".menu-toggle").on('click', resize);

                // Resize function
                function resize() {
                    setTimeout(function() {

                        // Resize chart
                        myChart.resize();
                    }, 200);
                }
            });
        }
    );
});