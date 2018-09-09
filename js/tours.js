        $(function(){
            var vue = new Vue({
                el:'#app',
                data:{
                    url:'http://localhost:8080/hotel/tour/',
                    tours:{},
                    param:{},
                    pages:1,
                    rows:10,
                    page:1
                },
                methods:{
                    getpage:function(p){
                        if(p<1) p=1 ;
                        if(p>this.pages) p = this.pages;
                        this.page=p;
                    },
                    query:function(){
                        var that=this;
                        var ps ={
                            title:that.param.title,
                            sdate:that.param.sdate,
                            edate:that.param.edate,
                            page:that.page,
                            rows:that.rows
                        }
                        $.getJSON(that.url+'query',ps,function(data){
                            that.tours=data.list;
                            that.pages=data.pages;
                            that.page=data.page;
                        })
                    },
                    reset:function(){
                        this.param.title='';
                        this.param.sdate='';
                        this.param.edate='';
                    },
                    remind:function(id){
                       this.param.id=id;
                       $('#myModal').modal('show');
                    },
                    remove:function(){
                        var that =this;
                        console.log(that.url+'remove/'+that.param.id);
                        $.get(that.url+'remove/'+that.param.id,function(data){
                            if(data){
                                that.query();
                                that.param.id=0;
                                $('#myModal').modal('hide');
                            }else{
                                console.log("删除失败");
                            }
                        })
                    },
                    update:function(id){
                        window.location ="tour.html?id=" + id;
                    }

                }
            });
            vue.query();
            $("#header").load("header.html");
            $("#left").load("left.html");
            var dt =new Date();
            var year = dt.getFullYear();
            var month =dt.getMonth() +1 ;
            var date = dt.getDate();
            $("#qdate input").datepicker({
                autoclose:true,
                language:"zh-CN",
                fromat:"yyyy-mm-dd",
                todayBtn:"linked",
                clearBtn:true,
                startDate:year+'-'+month+'-'+date,
            });
        })