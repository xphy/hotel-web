$(function(){
    		var vue = new Vue({
    			el:'#app',
    			data:{
    				url:'http://localhost:8080/hotel/',
    				param:{kid:0,beds:0,page:1,rows:10},
    				ps:{},
                    id:0,
    				pages:1,
    				kinds:[],
    				houses:[],
    				house:{}
    			},
    			methods:{
                    updata:function(id){
                        window.location="house.html?id="+id;
                    },
    				getKinds:function(){
    					var that=this;
    					$.getJSON(that.url+'kind/query',function(data){
                           that.kinds=data;
    					})
    				},
                    caution:function(id){
                        this.id=id;
                        $('#myModal').modal('show');
                    },
                    remove:function(){
                        var that = this;
                        id=that.id;
						$.get(that.url+'house/remove/'+id,function(data){
							if(data){
								that.query();
								$('#myModal').modal('hide');
								that.id=0;
							}else{
                               console.log("删除失败");
							}
                        })  
                    },
                    //查询所有客房信息
    				query:function(){
    					var that=this;
    					that.ps ={
    						page:that.param.page,
    						rows:that.param.rows
    					}
    					if(that.param.kid > 0){
    						that.ps.kid = that.param.kid;
    					}
    					if(that.param.beds > 0){
    						that.ps.beds = that.param.beds;
    					}
    							
    					$.getJSON(that.url+'house/query',that.ps,function(data){
                           that.houses=data.list;
                           that.pages=data.pages;
                           var pa =data.page +1;
                           $(".pagination li").removeAttr("class");
                           $(".pagination li:eq("+pa+") ").attr("class","active");
    					})
    				},
    				setpage:function(page){
                        if(page < 1){
                            page = 1;
                            this.param.page
                        }
                        if(page > this.param.pages){
                            page = this.param.pages;
                        }
                        this.param.page = page;
                        this.query();
                    },
                    reset:function(){
                    	this.param.kid =0 ;
                    	this.param.beds= 0;
                    	this.query();
                    },
                    state:function(house){
                    	var that=this;
                    	var ps={
                    		id:house.id
                    	}
                    	if(house.status==0){
                    		ps.status=1;
                    	}
                    	if(house.status==1){
                    		ps.status=0;
                    	}
                    	$.get(that.url+"house/state/"+ps.id+"/"+ps.status,function(data){
                    		if(data){
                                that.query();
                            }else{
                                console.log('客房状态修改失败');
                            }
                    	})
                    }
    			}
    		})
    		vue.query();
    		vue.getKinds();
            $("#header").load("header.html");
            $("#left").load("left.html");
    	})