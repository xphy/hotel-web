$(function(){
    		$("#header").load("header.html");
    		$("#left").load("left.html");
    		var kinds = new Array();
            var values = new Array();

    	    $.getJSON("http://localhost:8080/hotel/house/houseTu",function(data){
    	    	$.each(data,function(){
    	    		kinds.push(this.name);
                    values.push({value:this.num,name:this.name})
    	    	});
    	    	console.log(values);
    		//生成Dom对象
    		var main = $("#main")[0];
    		//初始化
    		var myChart = echarts.init(main);
    		option = {
				    title : {
				        text: '本酒店客房类型统计图',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				        data: kinds
				    },
				    series : [
				        {
				            name: '客房类型',
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:values,
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
				};

    			myChart.setOption(option);
    	    });
    	})