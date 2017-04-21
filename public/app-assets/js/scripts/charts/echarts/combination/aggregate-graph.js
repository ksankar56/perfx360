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


        function (ec) {
            // Initialize chart
            // ------------------------------
            var myChart = ec.init(document.getElementById('aggregate-graph'));

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
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // Axis indicator axis trigger effective
                        type : 'shadow'        // The default is a straight line, optionally: 'line' | 'shadow'
                    }
                },

                // Add legend
                legend: {
                    data: [ 'Average', 'Median', '90% Line', '95% Line', '99% Line', 'Min']
                },

                // Add custom colors
                color: ['#F05053', '#5A5050', '#547A82', '#3EACA8', '#A2D4AB', '#016CA5'],

                toolbox: {
                    show: true,
                    orient: 'vertical',
                    x: 'right',
                    y: 70,
                    feature: {
                        mark: {
                            show: true,
                            title: {
                                mark: 'Markline switch',
                                markUndo: 'Undo markline',
                                markClear: 'Clear markline'
                            }
                        },
                        dataView: {
                            show: true,
                            readOnly: false,
                            title: 'View data',
                            lang: ['View chart data', 'Close', 'Update']
                        },
                        magicType: {
                            show: true,
                            title: {
                                line: 'Switch to line chart',
                                bar: 'Switch to bar chart',
                                stack: 'Switch to stack',
                                tiled: 'Switch to tiled'
                            },
                            type: ['line', 'bar', 'stack', 'tiled']
                        },
                        restore: {
                            show: true,
                            title: 'Restore'
                        },
                        saveAsImage: {
                            show: true,
                            title: 'Same as image',
                            lang: ['Save']
                        }
                    }
                },

                // Enable drag recalculate
                calculable: true,

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    data: ['Home Page', 'Listing Page', 'Product Page', 'Cart Page', 'Checkout Page', 'Overview Page']
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                }],

                // Add series
                series : [
                    {
                        name:'Average',
                        type:'bar',
                        data:[141, 116, 210, 334, 240, 304, 99]
                    },
                    {
                        name:'Median',
                        type:'bar',
                        data:[176, 145, 237, 134, 364, 909, 115]
                    },
                    {
                        name:'90% Line',
                        type:'bar',
                        data:[290, 276, 373, 234, 373, 406, 236]
                    },
                    {
                        name:'95% Line',
                        type:'bar',
                        data:[210, 198, 300, 154, 340, 510, 222]
                    },
                    {
                        name:'99% Line',
                        type:'bar',
                        barWidth : 12,
                        data:[222, 210, 280, 185, 330, 490, 205]
                    },
                    {
                        name:'Min',
                        type:'bar',
                        barWidth : 12,
                        data:[322, 220, 290, 195, 340, 495, 215]
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