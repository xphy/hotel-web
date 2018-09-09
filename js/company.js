 $(function(){
      
            var vue = new Vue({
                el:'#app',
                data:{
                    url:'http://localhost:8080/hotel/company/',
                    company:{},
                    text:''
                },
                methods:{
                   query:function(){
                      var that=this;
                      $.getJSON(that.url+'find',function(data){
                        that.company = data;
                        if(that.company.hot=='有'){
                                $("#hot").bootstrapSwitch("state",true);
                            }else{
                                $("#hot").bootstrapSwitch("state",false);
                            }
                            if(that.company.wifi=='有'){
                                $("#wifi").bootstrapSwitch("state",true);
                            }else{
                                $("#wifi").bootstrapSwitch("state",false);
                            }
                            if(that.company.tv=='有'){
                                $("#tv").bootstrapSwitch("state",true);
                            }else{
                                $("#tv").bootstrapSwitch("state",false);
                            }
                            if(that.company.air=='有'){
                                $("#air").bootstrapSwitch("state",true);
                            }else{
                                $("#air").bootstrapSwitch("state",false);
                            }
                            if(that.company.fcar=='有'){
                                $("#fcar").bootstrapSwitch("state",true);
                            }else{
                                $("#fcar").bootstrapSwitch("state",false);
                            }

                            if(data.pica) {
                                  $(".thumbnail>img:eq(0)").attr("src", that.url + "../imgs/company/" + data.pica);
                              }
                              if(data.picb) {
                                  $(".thumbnail>img:eq(1)").attr("src", that.url + "../imgs/company/" + data.picb);
                              }
                              if(data.picc) {
                                  $(".thumbnail>img:eq(2)").attr("src", that.url + "../imgs/company/" + data.picc);
                              }
                              if(data.picd) {
                                  $(".thumbnail>img:eq(3)").attr("src", that.url + "../imgs/company/" + data.picd);
                              }
                              if(data.pice) {
                                  $(".thumbnail>img:eq(3)").attr("src", that.url + "../imgs/company/" + data.pice);
                              }
                              if(data.picf) {
                                  $(".thumbnail>img:eq(3)").attr("src", that.url + "../imgs/company/" + data.picf);
                              }
                      })
                   },
                   save:function(){
                      var that = this;
                      var html = ue.getContent();
                        var ps = {
                            name:that.company.name,
                            money:that.company.money,
                            phone:that.company.phone,
                            tel:that.company.tel,
                            co:that.company.co,
                            addr:that.company.addr,
                            info:html
                        }
                        if($("#hot").bootstrapSwitch("state")){
                            ps.hot = "有";
                        }else{
                            ps.hot = "无";
                        }
                        if($("#wifi").bootstrapSwitch("state")){
                            ps.wifi = "有";
                        }else{
                            ps.wifi = "无";
                        }
                        if($("#tv").bootstrapSwitch("state")){
                            ps.tv = "有";
                        }else{
                            ps.tv = "无";
                        }
                        if($("#air").bootstrapSwitch("state")){
                            ps.air = "有";
                        }else{
                            ps.air = "无";
                        }
                        if($("#fcar").bootstrapSwitch("state")){
                            ps.fcar = "有";
                        }else{
                            ps.fcar = "无";
                        }
                        $.post(that.url+"save",ps,function (data) {
                            if(data){
                                $(".msg").html("<span style='color:darkgreen'>酒店基本信息保存成功！<span>");
                            }else{
                                $(".msg").html("<span style='color:red'>酒店基本信息保存失败，请重试！<span>");
                            }
                        })
                   }

                }
            });
            $(".sw>label:gt(0)").css("margin-left","30px");
            vue.query();
           $("#header").load("header.html");
           $("#left").load("left.html");
           $("#hot, #wifi,#tv,#air,#fcar").bootstrapSwitch({
                onText:'有',
                offText:'无',
                onColor:'success',
                offColor:'info',
                size:'small'
           });
           //绑定事件
            $("#messages .thumbnail").click(function(){
                var f = $(this).parent().find(".file");
                f.click();
            })
            //图片预览
            $(".file").change(function(){
                var $img = $(this).parent().find("img");
                var file =this.files[0];
                var reader = new FileReader();
                reader.onloadend = function(){
                    $img.attr("src",reader.result);
                    $img.css({width:'220px',height:'220px' });
                }
                if(file){
                    reader.readAsDataURL(file);
                }else{
                    $img.attr('src','imgs/house/root.png');
                }
            });
            //上传图片
            $("#btnup").click(function(){
                var fd = new FormData();
                $(".file").each(function () {
                    fd.append("files[]",this.files[0]);
                })
                //将FormData对象发送到服务器的控制器
                 $.ajax({
                    url:'http://localhost:8080/hotel/company/uploads',
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
            });
       var ue = UE.getEditor("info");
       
           
        })