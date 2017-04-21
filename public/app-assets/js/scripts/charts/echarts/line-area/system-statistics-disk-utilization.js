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
            var myChart = ec.init(document.getElementById('area-chart-disk-utilization'));

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
                    data:['/dev','/', '/home', '/net', '/tmp'],
                    x: 'center'
                },
                color: ['#3BAFDA', '#1D7A9C', '#da093e', '#1fda00', '#da6f56'],
                dataZoom : {
                    show : true,
                    realtime : true,
                    start : 0,
                    end : 70
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
                        max : 200
                    }
                ],
                series : [
                    {
                        name:'/dev',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[
                            100,100,100,100,100,100,100,100,100,100
                        ]
                    },
                    {
                        name:'/',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[
                            190,190,190,190,190,190,190,190,190,190
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
                    },
                    {
                        name:'/home',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[
                            0,0,10,5,10,20,12,15,5,20
                        ]
                    },
                    {
                        name:'/net',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[
                            10,23,6,5,1,5,10,11,12,12
                        ]
                    },
                    {
                        name:'/tmp',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[
                            0,0,0,5,10,10,2,5,5,2
                        ]
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
