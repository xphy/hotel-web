    var s=sessionStorage.getItem("user");
	var user=null;
	if(s){
		user = JSON.parse(s);
		$("#loginUserName").text(user.uname);
	}else{
		location.href="../login.html"
	}
	$("#BtnLoginOut").click(function(){
        sessionStorage.removeItem("admin");
        user = null;
        location.href = "../login.html";
    })