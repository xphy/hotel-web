$(function(){
            $("#header").load("header.html");
            $("#left").load("left.html");
            var dt = new Date();
            var month=dt.getMonth()+1;
            var year=dt.getFullYear();
            var date =dt.getDate();
            var nowdate= year+'-'+month+'-'+date;
            var vue = new Vue({
               el:'#app',
               data:{
                   url:'http://localhost:8080/hotel',
                   reserves:[],
                   kinds:[],
                   pages:1,
                   page:1,
                   rows:10,
                   id:0
               },
               methods:{
                    setpage:function(page){
                        if(page < 1){
                            page = 1;
                            this.page = 1;
                        }
                        if(page > this.pages){
                            this.page = this.pages;
                        }
                        this.query();
                    },
                    getkinds : function(){
                       var that = this;
                       $.getJSON(that.url+"/kind/query",function(data){
                           that.kinds = data;
                       })
                   },
                    query:function () {
                        var that = this;
                        var ps = {
                            page:that.page,
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
                        $.getJSON(that.url+"/reserve/query",ps,function(data){
                            that.reserves = data.list;
                            that.pages = data.pages;
                            var pa = data.page+1;
                            $(".pagination li").removeAttr("class");
                           $(".pagination li:eq("+pa+") ").attr("class","active");
                        })
                    },
                    reset:function(){
                        custom:$("#custom").val('');
                        sdate:$("#sdate").val('');
                        edate:$("#edate").val('');
                        phone:$("#phone").val('');
                        kid:$("#kid").val(0);
                        this.query();
                    },
                    update:function(r){
                        window.location.href="reserve.html?id="+r.id;
                    },
                    caution:function(id){
                        this.id = id;
                        $("#myModal").modal("show");
                    },
                    remove:function(){
                        var that = this;
                        id=that.id;
                        $.get(that.url+'reserve/remove/'+id,function(data){
                            if(data){
                                that.query();
                                $('#myModal').modal('hide');
                                that.id=0;
                            }else{
                               console.log("删除失败");
                            }
                        })  
                    },
                    save:function(r){
                        var that = this;
                        $.post(that.url+"/reserve/checkIn",r,function(data){
                            if(data){
                              $(".msg").html("<span style='color:darkgreen'>客房预订记录保存成功！</span>");
                              setTimeout(that.query(),2000);
                           }else{
                               $(".msg").html("<span style='color:darkred'>客房预订记录保存失败，请重试！</span>");
                           }
                        })
                    }
               }
            });
            vue.getkinds();
            vue.query();
            $("#sdate,#edate").datepicker({
                autoclose:true,
                language:'zh-CN',
                format:'yyyy-mm-dd',
                todayBtn:"linked",
                startDate:nowdate,
                todayHighlight:true
            })
        })