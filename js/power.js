$(function(){
            var href = location.href;
            var power_id = 0;
            if(href.indexOf("id")>0){
               var str = href.split("?")[1];
               power_id = str.split("=")[1];
             }
              var vue = new Vue({
                el:'#app',
                data:{
                    url:'http://localhost:8080/hotel/power',
                    powers:[],
                    power:{pid:0}
                },
                methods:{
                    query : function () {
                        var that = this;
                        $.getJSON(that.url+'/query2',function (data) {
                            that.powers = data;
                        })
                    },
                    find:function () {
                        var that = this;
                        if(power_id){
                            $.getJSON(that.url+'/find/'+ power_id,function (data) {
                                that.power = data;
                            })
                        }
                    },
                    save : function () {
                        var that = this;
                        var ps = {
                            id:that.power.id,
                            name:that.power.name,
                            pid:that.power.pid,
                            url:that.power.url,
                            icon:that.power.icon,
                            xh:that.power.xh
                        }
                        $.post(that.url+'/save',ps,function (data) {
                            if(data){
                                $(".msg").html("<span style='color:darkgreen'>权限信息保存成功！</span>");
                            }else{
                                $(".msg").html("<span style='color:red'>权限信息保存失败，请重试！</span>");
                            }
                        })
                    }
                }
            })
            vue.query();
            vue.find();
    		$("#header").load("header.html");
    		$("#left").load("left.html");
    	})