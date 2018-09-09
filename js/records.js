$(function(){

			$("#header").load("header.html");
            $("#left").load("left.html");
			
			var dt = new Date();
			var month=dt.getMonth()+1;
	        var year=dt.getFullYear();
	        var date =dt.getDate();
            
	        var vue = new Vue({
	        	el:"#app",
	        	data:{
	        	   url:'http://localhost:8080/hotel',
                   records:[],
                   kinds:[],
                   pages:1,
                   page:1,
                   rows:10,
                   id:0
	        	},
	        	methods:{
	        		setpage:function(p){
	        			if(page < 1){
                            page = 1;
                            this.page = 1;
                        }
                        if(page > this.pages){
                            this.page = this.pages;
                        }
                        this.query();
	        		},
	        		reset:function(){
                        custom:$("#custom").val('');
                        sdate:$("#sdate").val('');
                        edate:$("#edate").val('');
                        phone:$("#phone").val('');
                        kid:$("#kid").val(0);
                        this.query();
                    },
	        		getkinds : function(){
                       var that = this;
                       $.getJSON(that.url+"/kind/query",function(data){
                           that.kinds = data;
                       })
                   },
                   caution:function(id){
                        this.id = id;
                        $("#myModal").modal("show");
                    },
                    checkOut:function(){
                        var that = this;
                        id=that.id;
                        $.get(that.url+'record/checkOut/'+id,function(data){
                            if(data){
                                that.query();
                                $('#myModal').modal('hide');

                                that.id=0;
                            }else{
                               console.log("退房失败");
                            }
                        })  
                    },
	        		query:function(){
	        			var that = this;
	        			var ps = {
	        				pages:that.pages,
	        				rows:that.rows
	        			}
	        			if($("#custom").val()!=null){
                            ps.custom = $("#custom").val();
                        }
                        if($("#sdate").val()!=null){
                            ps.sdate = $("#sdate").val();
                        }
                        if($("#edate").val()!=null){
                            ps.edate = $("#edate").val();
                        }
                        if($("#phone").val()!=null){
                            ps.phone = $("#phone").val();
                        }
                        if($("#kid").val()!=0){
                            ps.kid = $("#kid").val();
                        }
	        			$.getJSON(that.url+"/record/query",ps,function(data){
	        				that.records = data.list;
	        				that.pages = data.pages;
	        				var pa = data.page+1;
                            $(".pagination li").removeAttr("class");
                            $(".pagination li:eq("+pa+") ").attr("class","active");
	        			} )
	        		}
	        	}
	        });
	        vue.query();
	        vue.getkinds();

			$("#qdate input").datepicker({
				autoclose:true,
				language:'zh-CN',
				format:'yyyy-mm-dd',
				todayHighLight:true,
				startDate:year+'-'+month+'-'+date,
				todayBtn:'linked',
				clearBtn:true
			});
		})