   	$(function(){
    		var user_uid = 0;
            var href = location.href;
            if(href.indexOf("uid")>0){
                var str = href.split("?")[1];
                user_uid = str.split("=")[1];
            }
            var vue = new Vue({
            	el:'#app',
                data:{
                    url:'http://localhost:8080/hotel',
                    powers:[],
                    user:{status:1}
                },
                methods:{
                	find : function(){
                        if(user_uid){
                            var that = this;
                            $.getJSON(that.url+"/user/find",{uid:user_uid},function (data) {
                                that.user = data;
                                $.each(data.powers,function(){
                                    var uid = this.id;
                                    $("input[type=checkbox]").each(function(){
                                        if(this.value==uid){
                                            this.checked = true;
                                        }
                                    })
                                })
                            })
                        }
                    },
                	getpowers : function(){
                        var that = this;
                        $.getJSON(that.url+'/power/query1',function(data){
                            that.powers = data;
                        })
                    },
                    check:function(p,event){
                    	var that = this;
                        var ck = event.currentTarget;
                        if(p.pid==0){
                            $.each(that.powers,function(){
                                if(this.pid==ck.value){
                                    $("input[value="+this.id+"]")[0].checked = ck.checked;
                                }
                            })
                        }else{
                            $("input[value="+p.pid+"]")[0].checked = true;
                        }
                    },
                    checkall:function(event){
                    	var that = this;
                        var btn = event.currentTarget;
                        var txt = $(btn).text();
                        if(txt=='全选') {
                            $("input[type=checkbox]").each(function(){
                                this.checked = true;
                            })
                            $(btn).text('取消');
                        }else{
                            $("input[type=checkbox]").each(function(){
                                this.checked = false;
                            })
                            $(btn).text('全选');
                        }
                    },
                    save : function () {
                        var that = this;
                        var ps = {
                            uid:user_uid,
                            uname:that.user.uname,
                            password:that.user.password,
                            status:that.user.status
                        }
                        var ids = "";
                        $("input[type=checkbox]").each(function () {
                            if(this.checked){
                                ids+=this.value+","
                            }
                        })
                        if(ids!="" && ids.length>0) {
                            ids = ids.substr(0, ids.length - 1);
                            ps.pids = ids;
                        }
                        $.post(that.url+'/user/save',ps,function (data) {
                            if(data){
                                $(".msg").html("<span style='color:darkgreen'>系统用户保存成功！</span>");
                            }else{
                                $(".msg").html("<span style='color:darkred'>系统用户保存失败，请重试！</span>")
                            }
                        })
                    }
                }
            });
            vue.getpowers();
            vue.find();
            $("#header").load("header.html");
            $("#left").load("left.html");
    	})