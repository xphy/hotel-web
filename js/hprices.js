$(function(){
    		const vue = new Vue({
    			el:'#app',
    			data:{
    				url:'http://localhost:8080/hotel/',
    				hprices:[],
    				pages:1,
    				page:1,
                    rows:10,
                    id:0
    			},
    			methods:{
    				setPage:function(p){
    					if(p<1) p=1 ;
    					if(p>this.pages) p = this.pages;
    					this.page=p;
    				},
    				getHPrices:function(){
    					var that=this;
    					var ps ={
    						page:that.page,
    						rows:that.rows
    					}
    					$.getJSON(that.url+'hprice/query',ps,function(data){
    						that.hprices=data.list;
    						that.pages =data.pages;
    						var pa = data.page + 1;

    						$(".pagination li").removeAttr("class");
    						$(".pagination li:eq("+pa+") ").attr("class","active");
    					})
    				},
    				caution:function(id){
    					this.id=id;
                        $('#myModal').modal('show');
    				},
    				remove:function(){
    					var that = this;
    					id = that.id;
    					$.get(that.url+'hprice/remove/'+id,function(data){
    						if(data){
    							that.getHPrices();
    							$('#myModal').modal('hide');
								that.id=0;
    						}else{
    							console.log("删除失败");

    						}
    					})
    				},
    				update:function(id){
                          window.location="hprice.html?id="+id;
    				}
    			}

    		});
    		vue.getHPrices();
    		$("#header").load("header.html");
        	$("#left").load("left.html");
    	})