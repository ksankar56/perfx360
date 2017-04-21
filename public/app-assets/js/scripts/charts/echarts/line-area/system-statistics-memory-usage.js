/*=========================================================================================
 File Name: irregular-line-time-axis.js
 Description: google irregular line time axis chart
 ----------------------------------------------------------------------------------------
 Item Name: Robust - Responsive Admin Theme
 Version: 1.2
 Author: PIXINVENT
 Author URL: http://www.themeforest.net/user/pixinvent
 ==========================================================================================*/

// Rrregular line time axis chart
// ------------------------------

$( document ).ready(function() {

    // Set paths
    // ------------------------------

    require.config({
        paths: {
            echarts: 'app-assets/vendors/js/charts/echarts'
        }
    });


    // Configuration
    // ------------------------------

    require(
        [
            'echarts',
            'echarts/chart/bar',
            'echarts/chart/line'
        ],


        // Charts setup
        function (ec) {
            // Initialize chart
            // ------------------------------
            var myChart = ec.init(document.getElementById('area-chart-memory-usage'));

            // Chart Options
            // ------------------------------
            chartOptions = option = {
                title : {
                    x: 'center'
                },
                tooltip : {
                    trigger: 'axis',
                    formatter: function(params) {
                        return params[0].name + '<br/>'
                            + params[0].seriesName + ' : ' + params[0].value + ' (%)<br/>'
                            + params[1].seriesName + ' : ' + -params[1].value + ' ';
                    }
                },
                legend: {
                    data:['sys.local.1','sys.local.2'],
                    x: 'center'
                },
                color: ['#DA4453', '#8c8c8c'],
                dataZoom : {
                    show : true,
                    realtime : true,
                    start : 0,
                    end : 100
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        axisLine: {onZero: false},
                        data : [
                            '11:00',
                            '11:05',
                            '11:10',
                            '11:15',
                            '11:20',
                            '11:25',
                            '11:30',
                            '11:35',
                            '11:40',
                            '11:45'
                        ]
                    }
                ],
                yAxis : [
                    {
                        name : 'Percentage %',
                        type : 'value',
                        max : 120
                    }
                ],
                series : [
                    {
                        name:'sys.local.1',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[
                            81.97,82.96,80.96,83.95,82.95,88.94,87.94,90.94,91.94,92.94
                        ]
                    },
                    {
                        name:'sys.local.2',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[
                            99.0,98.12,98.0,99.0,97.0,96.0,100.0,101.0,101.0,102.0
                        ]
                        /*data: (function(){
                            var oriData = [
                                5.0,10.12,9.0,34.0,12.0,22.0,11.0,54.0,22.0,12.0
                            ];
                            var len = oriData.length;
                            while(len--) {
                                oriData[len] *= -1;
                            }
                            return oriData;
                        })()*/
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
