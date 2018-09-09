     var parma=null;
     var prompt="";
     
   //添加提示
     function prom(str){
    	 $("#ts").empty();
    	 var $p=$("<p>"+str+"</P>");
    	 $p.appendTo($("#ts"));
     }
   //获得js对象
     function getparma(){    	 
    	 prompt="";
    	 var name = $("#name").val();
    	 var pw =$("#password").val();
    	 var yz = $("#yz").val();
    	 if(name==""){
    		 prompt="用户名不能为空! ";
    	 }
    	 if(pw==""){
    		 prompt+=" 密码不能为空! ";
    	 }
    	 if(yz==""){
    		 prompt+=" 验证码不能为空!";
    	 }
    	 prom(prompt);
    	 
    	 parma={name:name,password:pw,yz:yz};
     }

     //主要js
     $(function(){
    	
    	 $(".pass span").click(function(){
    		var a ="image.jsp?code="+Math.random();
    		 $(".pass img").attr("src" ,a);
    	 })
    	 $("#login").click(function(){
    		 
    		 getparma();
    		 if(prompt==""){
    			 $.post("index.do",parma,function(data){
    				 var datajs=JSON.parse(data);
    				 var dat=datajs.flag;
    				 var a="mainPage/log.jsp?uid="+datajs.uid+"";
    				 if(dat == "success"){    					 
    					 window.location.href=a;
    				 }
    				 if(dat == "user is null"){    				 
    					 prompt =" 用户不存在!";
    					 prom(prompt);    				 
    				 } 
    				 if(dat == "failure"){    				 
    					 prompt =" 密码输入错误!";
    					 prom(prompt);    				 
    				 } 
    				 if(dat == "yzerror"){    				 
    					 prompt =" 验证码输入错误!";
    					 prom(prompt);    				 
    				 } 
    			 })
    		 }
          })
    	 
    	 
    	 $("#register").click(function(){
    		 window.location.href='register.jsp';    		 
    	 })
     })