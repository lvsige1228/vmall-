<template>
  <div>
    <!--      ECharts 图表  基于canvas 封装的图表插件  数据可视化-->
    <div id="main">
    </div>
  </div>
</template>

<script>
    var echarts = require('echarts');
    export default {
        name: "ECharts",
        data(){
            return{
                myChart:{}
            }
        },
        methods: {
            initData() {
                // 绘制图表
                const option = {
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'line',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                };
                this.myChart.setOption(option)
            }
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(document.getElementById('main'));
            this.initData();
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../Scss/index";

  #main{
    @include Size(600px, 500px);
  }



</style>
