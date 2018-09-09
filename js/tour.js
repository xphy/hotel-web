        $(function(){
            var href =location.href;
            var tour_id = 0;
            if(href.indexOf("id")>0){
                var id = href.split("?")[1];
                tour_id= id.split("=")[1];
            }
            var dt =new Date();
            var year = dt.getFullYear();
            var month =dt.getMonth() +1 ;
            var date = dt.getDate();
            var vue = new Vue({
                el:'#app',
                data:{
                    url:'http://localhost:8080/hotel/tour/',
                    tour:{}
                },
                methods:{
                    getTour:function(){
                        var that =this;
                        $.getJSON(that.url+'find/'+tour_id,function(data){
                            that.tour =data;
                        })
                    },
                    save:function(){
                        var html = ue.getContent("info");
                        var that =this;
                        var ps ={
                            id:tour_id,
                            title:that.tour.title,
                            date:year+'-'+month+'-'+date,
                            info:html
                        }
                        $.post(that.url+'save',ps,function(data){

                            console.log(data);
                            if(data){
                                $(".msg").html("<span style='color:arkgreen'>旅游攻略保存成功！<span>");
                            }else{
                                $(".msg").html("<span style='color:red'>旅游攻略保存失败！<span>");
                            }
                        })
                    }
                }
            });
            vue.getTour();
            $("#header").load("header.html");
            $("#left").load("left.html");
            var ue = UE.getEditor("info");
        })