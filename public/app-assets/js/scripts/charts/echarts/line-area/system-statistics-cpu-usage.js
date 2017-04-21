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
            var myChart = ec.init(document.getElementById('area-chart'));

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
                color: ['#4ddad6', '#7582da'],
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
                        max : 100
                    }
                ],
                series : [
                    {
                        name:'sys.local.1',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[
                            11.97,15.96,10.96,60.95,0.95,72.94,33.94,45.94,52.94,22.94
                        ]
                    },
                    {
                        name:'sys.local.2',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[
                            5.0,10.12,9.0,34.0,12.0,22.0,11.0,54.0,22.0,12.0
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
