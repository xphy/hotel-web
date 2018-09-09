    	$(function(){
    		var vue = new Vue({
    			el:'#app',
    			data:{
    				url:'http://localhost:8080/hotel/power/',
    				powers:[],
    				id:0
    			},
    			methods:{
    				getPowers:function(){
    					var that = this;
    					$.getJSON(that.url+'query1',function(data){
    						that.powers = data;
    						console.log(data);
    					})
    				},
    				caution:function(id){
                        this.id=id;
                        $('#myModal').modal('show');
    				},
    				remove:function(){
    					var that = this;
    					id = that.id;
    					$.get(that.url+'remove/'+id,function(data){
    						if(data){
    							that.getPowers();
    							$('#myModal').modal('hide');
								that.id=0;
    						}else{
    							console.log("删除失败");

    						}
    					})
    				},
    				update:function(id){
                          window.location="power.html?id="+id;
    				},
    				upxh:function(id,flag){
                        var that = this;
                        $.get(that.url+'/savexh',{id:id,flag:flag},function (data) {
                            if(data){
                                that.query();
                            }
                        })
                    }
    			}
    		});
    		vue.getPowers();
    		$("#header").load("header.html");
    		$("#left").load("left.html");
    	})