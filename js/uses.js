$(function(){
            var vue = new Vue({
                el:'#app',
                data:{
                    url:'http://localhost:8080/hotel/user',
                    users:[],
                    uid:0
                },
                methods:{
                    query : function () {
                        var that = this;
                        $.getJSON(that.url+'/query',function (data) {
                            that.users = data;
                        })
                    },
                    forward : function (uid) {
                        location.href = "user.html?uid="+uid;
                    },
                    caution:function(uid){
                        this.uid=uid;
                        $('#myModal').modal('show');
    				},
    				remove:function(){
    					var that = this;
    					uid = that.uid;
    					$.get(that.url+'/remove/'+uid,function(data){
    						if(data){
    							$('#myModal').modal('hide');
    							that.query();
								that.uid=0;
    						}else{
    							console.log("删除失败");

    						}
    					})
    				},
                }
            })
            vue.query();
            $("#header").load("header.html");
            $("#left").load("left.html");
        })