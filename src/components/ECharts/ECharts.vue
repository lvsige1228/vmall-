<template>
  <div>

    <span>{{nowWeek}}</span> &nbsp; &nbsp;
    <span>{{nowDate}}</span> &nbsp; &nbsp;
    <span>{{nowTime}}</span><br>
    总数：{{total}} <br>
    商品管理总个数：{{GoodsTotal}} <br>
    订单总量：{{orderTotal}} <br>
    <div id="main">
    </div>

  </div>
</template>

<script>
    import {mapState} from 'vuex'

    var echarts = require('echarts');
    export default {
        data() {
            return {
                myChart: {},
                timer: null,
                nowWeek: '',
                nowDate: '',
                nowTime: '',
            }
        },
        //从vuex中获取展示数据
        computed: {
            ...mapState(['total']),
            ...mapState(['GoodsTotal']),
            ...mapState(['orderTotal']),
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(document.getElementById('main'));
            this.initData();
            //展示当前时间
            this.timer = setInterval(() => {
                this.setNowTimes()
            }, 1000)

        },
        methods: {
            initData() {
                // 绘制图表
                const option = {
                    title: {
                        text: '走势图'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['总数', '商品管理总个数', '订单总量']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: { // 工具箱
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['bar', 'line']},
                            restore: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '总数',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '商品管理总个数',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '订单总量',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },

                    ]
                };
                this.myChart.setOption(option)
            },
            //展示时间
            setNowTimes() {
                let myDate = new Date()
                // console.log(myDate)
                let wk = myDate.getDay();
                let yy = String(myDate.getFullYear());
                let mm = myDate.getMonth() + 1;
                let dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
                let hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
                let min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
                let sec = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())
                let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                let week = weeks[wk]
                this.nowDate = yy + '-' + mm + '-' + dd
                this.nowTime = hou + ':' + min + ':' + sec
                this.nowWeek = week;

            },

        },

    }
</script>
<style lang="scss" scoped>
  @import "../../Scss/index";
  // div的大小 不能省略
  #main {
    @include Size(600px, 400px);
  }


</style>
