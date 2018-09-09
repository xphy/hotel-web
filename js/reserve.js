$(function(){
    		var href = location.href;
    		var reserve_id = 0 ;
    		if(href.indexOf("id")>0){
    			var id = href.split("?")[1];
    			reserve_id = id.split("=")[1];
    		}
    		var dt = new Date();
			var month=dt.getMonth()+1;
	        var year=dt.getFullYear();
	        var date =dt.getDate();
	        var nowdate= year+'-'+month+'-'+date;
    		var vue = new Vue({
    		   el:'#app',
               data:{
                   url:'http://localhost:8080/hotel',
                   kinds:[],
                   reserve:{kid:0,wx:null},
                   kind:{},
                   houses : [],
                   hprice : {},
                   house:{}
               },
               methods:{
               		getreserve:function(){
               			var that = this;

          					if(reserve_id > 0){
          						$.getJSON(that.url+"/reserve/get/"+reserve_id,function(data){
      	               				that.reserve = data;
        	               				if(data.rdate){
        	               					$("#rdate").val(data.rdate);
        	               				}
                                if(data.ldate){
                                  $("#ldate").val(data.ldate);
                                }
                                if(data.hname){
                                  $("#hname").val(data.hname);
                                }
                                if(data.price){
                                  $("#price").val(data.price);
                                }
                                if(data.cid){
                                   that.reserve.kid = data.cid;
                                }
                                if(data.wxnick){
                                  that.reserve.wx = data.wxnick;
                                }
                     			   })
          					}
               			
               		},
                   choose:function(h){
                       this.house = h;
                       $("#hname").val(h.hname);
                       $("#persons").val(h.beds);
                       $("#dialog").modal('hide');
                   },
                   getdate:function(date1,date2){
                        var date1= new Date($("#rdate").val()).getTime();
						            var date2= new Date($("#rdate").val()).getTime();
            						if(date1 < date2){
            							$(".msg").html("<span style='color:red'>预订离店日期不能小于住店日期！！</span>");
            							return false;
            				        }
                   },
                   getkinds : function(){
                       var that = this;
                       $.getJSON(that.url+"/kind/query",function(data){
                           that.kinds = data;
                       })
                   },
                   getkind:function(k){
                       $("#hname").val('');
                       var that = this;
                       var ps = {
                           kid: k.id,
                           date: nowdate
                       }
                       that.kind.kprice = k.kprice;
                       $("#price").val(k.kprice);
                       $.getJSON(that.url+'/hprice/get',ps,function(data){
                            $("#price").val(data.price * data.dis);
                          })
                   },
                   gethouses : function(){
                       var that = this;
                       var ps = {
                           kid: that.reserve.kid,
                           rdate: $("#rdate").val(),
                           ldate: $("#ldate").val()
                       }
                       $.getJSON(that.url+'/house/list',ps,function(data){
                           that.houses = data;
                           $("#dialog").modal('show');
                       })
                   },
                   save:function(){
                   		var that = this;
                   		var ps={
                   		   id:reserve_id,
                   		   custom:that.reserve.custom,
                           phone:that.reserve.phone,
                           wxnick:that.reserve.wx,
                           rdate:$("#rdate").val(),
                           ldate:$("#ldate").val(),
                           hid:that.house.id,
                           price:$("#price").val(),
                           total:0
                   		}
                       if(that.reserve.persons){
                          ps.persons = that.reserve.persons;
                       }else{
                          ps.persons = $("#persons").val();
                       }
                   	   var t1 = new Date(ps.rdate).getTime();
                       var t2 = new Date(ps.ldate).getTime();
                       var days = (t2 - t1)/1000/60/60/24;
                       ps.total = ps.price * days;
                       $.post(that.url+'/reserve/save',ps,function(data){
                           if(data){
                              $(".msg").html("<span style='color:darkgreen'>客房预订记录保存成功！</span>");
                           }else{
                               $(".msg").html("<span style='color:darkred'>客房预订记录保存失败，请重试！</span>");
                           }
                       })
                   }
               }
    		});
    		vue.getkinds();
    		vue.getreserve();
    		$("#header").load("header.html");
    		$("#left").load("left.html");
    		
			$("#rdate").datepicker({
				autoclose:true,
				language:'zh-CN',
				format:'yyyy-mm-dd',
				startDate:'year-month-data',
				todayHighLight:true,
				todayBtn:'linked',
				clearBtn:true
			});
			$("#ldate").datepicker({
				autoclose:true,
				language:'zh-CN',
				format:'yyyy-mm-dd',
				todayHighLight:true,
				startDate:'year-month-data',
				todayBtn:'linked',
				clearBtn:true
			});		
    	})