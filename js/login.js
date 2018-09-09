$(function(){
        var vcode = false;
        var code;
        $('#code').slideVerify({
                type : 1,   //类型
                vOffset : 5,  //误差量，根据需求自行调整
                barSize : {width:'100%',height:'40px'},
                success : function(obj) {
                    vcode = true;
                    code = obj;
                },
                error : function() {
                    vcode = false;
                }
            });
       $("#btnlogin").click(function(){
           var uname = $("#uname input").val();
           var pwd = $("#pwd input").val();
           var reg = /^[0-9a-zA-Z]{4,8}$/;
           if(reg.test(uname)){
                $("#uname").removeClass("has-error");
                $("#uname").addClass("has-success");
            }else{
               $("#uname").removeClass("has-success");
               $("#uname").addClass("has-error");
               return;
            }
           if(reg.test(pwd)){
               $("#pwd").removeClass("has-error");
                    $("#pwd").addClass("has-success");
            }else{
                $("#pwd").removeClass("has-success");
                $("#pwd").addClass("has-error");
                 return;
            }
             if(vcode){
                  var ps ={
                     uname:uname,
                     password:pwd
                   }
                }
           var addr ="http://localhost:8080/hotel/user/login";
           $.post(addr,ps,function(data){
              if(data){
                var s = JSON.stringify(data);
                 sessionStorage.setItem("user",s);
                 location.href="page/index.html"
              }else{
                  vcode = false;
                  code.refresh();
                  $(".msg").text("用户名或密码不正确，请重新输入！");
                  $(".msg").css("color","darkred");
              }
           }) 
       })
      })