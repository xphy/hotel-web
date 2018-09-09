$(function(){
    		var href = location.href;
    		var house_id = 0;
    		if(href.indexOf("id")>0){
    			var id = href.split("?")[1];
    			house_id = id.split("=")[1];
    		}
    		var vue = new Vue({
    			el:'#app',
                data:{
                   url:'http://localhost:8080/hotel/',
                   kinds:[],
                   house:{},
                   pa:""
               },
               methods:{
               	 gethouse:function(){
                       var that = this;
                       if(house_id>0){
                           $.getJSON(that.url+"house/find/"+house_id,function(data){
                              that.house = data;
                              that.house.kid = data.kind.id;
                              if(data.pica) {
                                  $(".thumbnail>img:eq(0)").attr("src", that.url + "imgs/house/" + data.pica);
                              }
                              if(data.picb) {
                                  $(".thumbnail>img:eq(1)").attr("src", that.url + "imgs/house/" + data.picb);
                              }
                              if(data.picc) {
                                  $(".thumbnail>img:eq(2)").attr("src", that.url + "imgs/house/" + data.picc);
                              }
                              if(data.picd) {
                                  $(".thumbnail>img:eq(3)").attr("src", that.url + "imgs/house/" + data.picd);
                              }
                           });
                       }
                   },
               	getkinds:function(){
                       var that = this;
                       $.getJSON(that.url+"kind/query",function (data) {
                           that.kinds = data;
                       })
                   },
                   param:function(){
                      var pa = this.pa;
                      if(this.house.hname==null){
                          pa="客房名称未填！"
                      }
                      if(this.house.kid == null || this.house.kid == 0){
                          pa =pa+"客房类型未选！"
                      }
                      if(this.house.beds == null){
                          pa =pa+"客房床位数未选！"
                      }
                      if(this.house.beds > 5 || this.house.beds < 0 ){
                        pa = pa + "每个房间的床位数必须在0-5之间！"
                      }
                      if(this.house.size == null ){
                        pa +="房间大小未填！"
                      }
                      if(this.house.size <= 0 ){
                        pa +="房间大小不能为 0！"
                      }
                      if(this.house.price == null ){
                        pa +="基础价格在未填！"
                      }
                      if(this.house.price < 0 ){
                        pa +="基础价格在 0 以上！"
                      }
                      $("#msg").html("<span style='color:red'>"+pa+"</span>");
                      this.pa = pa;

                   },
                 save:function(){
                 	var that=this;
                    that.param();
                     console.log(that.pa);
                   if(that.pa != ""){
                       console.log("数据不正确");
                        return false;
                   }
                     var ps = {
                         id:house_id,
                         hname:that.house.hname,
                         size:that.house.size,
                         beds:that.house.beds,
                         price:that.house.price,
                         kid:that.house.kid,
                         info:that.house.info
                     }

                 	$.post(that.url+"house/save",ps,function(data){
                         if(data && data.id>0){
                         	that.house.id = data.id;
                         	$("#msg").html("<span style='color:darkgreen'>客房基本信息保存成功！</span>");
                         }else{
                         	$("#msg").html("<span style='color:red'>客房基本信息保存失败 请重新录入！</span>");
                         }
                 	})
                 }
               }
    		})
    		vue.getkinds();
    		vue.gethouse();
        $("#header").load("header.html");
        $("#left").load("left.html");
    		//绑定事件
    		$("#profile .thumbnail").click(function(){
                var f = $(this).parent().find(".file");
                f.click();
            })
    		//图片预览
    		$(".file").change(function(){
    			var $img = $(this).parent().find("img");                
                var file =this.files[0];
                var reader = new FileReader();
                reader.onloadend=function(){
                	$img.attr("src",reader.result);
                	$img.css({width:'220px',height:'220px' });
                }
                if(file){
                	reader.readAsDataURL(file);
                }else{
                	$img.attr('src','imgs/house/root.png');
                }

                
            })
            //上传图片
            $("#btnup").click(function(){
            //判断客房id是否存在（客房基本信息是否保存成功）
                if(!vue.house.id || vue.house.id<=0){
                    return false;
                }
             //构建FormData数据对象             
                var fd = new FormData();
                fd.append("id",vue.house.id);
             //获取文件框中的每一个文件
                pica = $(".file")[0].files[0];
                picb = $(".file")[1].files[0];
                picc = $(".file")[2].files[0];
                picd = $(".file")[3].files[0];
              //将获取到的文件保存到FormData对象中
                fd.append("pica",pica);
                fd.append("picb",picb);
                fd.append("picc",picc);
                fd.append("picd",picd);
              //将FormData对象发送到服务器的控制器
                 $.ajax({
                 	url:'http://localhost:8080/hotel/house/uploads',
                    type:'POST',
                    data:fd,
                    async: false,
                    cache: false,
                    contentType:false,
                    processData:false,
                    success:function(data){
                    	if(data){
                    		$(".msgup").html("<span style='color:darkgreen'>图片上传成功！</span>");
                    	}else{
                    		$(".msgup").html("<span style='color:red'>图片上传失败请重试！</span>");
                    	}
                    },
                    error:function(data){
                    	$(".msgup").html("<span style='color:red'>图片上传失败请重试！</span>");
                    }
                 })
            })

    	})