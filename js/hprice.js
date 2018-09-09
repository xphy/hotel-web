$(function(){
			var href = location.href;
    		var hp_id = 0;
    		if(href.indexOf("?")>0){
    			var id = href.split("?")[1];
    			hp_id = id.split("=")[1];
    		}
			var vue = new Vue({
				el:'#app',
				data:{
					url:'http://localhost:8080/hotel/',
					kinds:[],
					hprice:{kid:0},
					disprice:0,
					pa:""
				},
				methods:{
					gethprice:function(){
						var that = this;
						if(hp_id > 0 ){
							$.getJSON(that.url+'hprice/find/'+hp_id,function(data){
								that.hprice = data;
								that.hprice.kid = data.kind.id;
								that.hprice.sdate = $("#sdate").val(data.sdate);
						        that.hprice.edate = $("#edate").val(data.edate);
						        that.disprice =data.price *data.dis;
							})

						}
					},
					getkinds:function(){
						var that=this;
						$.getJSON(that.url+'kind/query',function(data){
							that.kinds=data;
						})
					},
					calc:function(){
						var d = this.hprice.dis;
						if(!d||d < 0 || d > 1){
							d = 1;
							this.hprice.dis = 1;
						}
						this.disprice = this.hprice.price * d;
					},
					today:function(date){
						var arr = date.split("-");
						var time = arr[0]+arr[1]+arr[2];
                        return time;
					},
					param:function(){
                       if(this.hprice.kid == null ||this.hprice.kid==  0 ){
                       		this.pa ="客房类型未选！ "
                       }
                       if(this.hprice.sdate == "" ){
                       		this.pa +="起始日期未填！ "
                       }
                       if(this.hprice.edate == "" ){
                       		this.pa +="结束日期未填！ "
                       }
                       if(this.today(this.hprice.edate) < this.today(this.hprice.sdate) ){
                       		this.pa +="结束日期必须在开始日期之后！ "
                       }
                       if(this.hprice.price < 0 ||this.hprice.price == 0 ){
                       		this.hprice.price = 0;
                       		this.pa +="客房价格必须是0以上！ "
                       }
                       if(this.hprice.dis ==null ){
                       	   this.pa +="折扣未填！ "
                       }
                       $(".msg").html("<span style='color:red'>"+this.pa+"</span>");
					},
					save:function(){
						var that = this;
						that.hprice.sdate = $("#sdate").val();
						that.hprice.edate = $("#edate").val();
						that.param();
		                if(that.pa !=null||that.pa!=""){
		                	that.pa ="";
		                    //return false;
		                 }
		                 var ps={
		                 	id:that.hprice.id,
		                 	kid:that.hprice.kid,
		                 	sdate:that.hprice.sdate,
		                 	edate:that.hprice.edate,
		                 	price:that.hprice.price,
		                 	dis:that.hprice.dis
		                 }
		                 console.log(that.hprice);
						$.post(that.url+'hprice/save',ps,function(data){
							if(data){
								$(".msg").html("<span style='color:green'>客房基本信息保存成功！</span>");
							}else{
								$(".msg").html("<span style='color:red'>客房基本信息保存失败 请重新录入！</span>");
							}
						})
					}
				}
			});
			vue.getkinds();
			vue.gethprice();
			$("#header").load("header.html");
            $("#left").load("left.html");
			var dt = new Date();
			var month=dt.getMonth()+1;
	        var year=dt.getFullYear();
	        var date =dt.getDate();
			$(".date").datepicker({
				autoclose:true,
				language:'zh-CN',
				format:'yyyy-mm-dd',
				startDate:'year-month-data',
				todayHighLight:true,
				todayBtn:'linked',
				clearBtn:true
			});
		})