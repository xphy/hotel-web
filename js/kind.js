     $(function(){
           
           var vue = new Vue({
            el:'#app',
            data:{
               url:'http://localhost:8080/hotel/kind/',
               kind:{},
               id:0,
               kinds:[]
            },
            methods:{
                caution:function(id){
                  this.id=id;
                  $('#myModal').modal('show');
                },
                remove:function(){
                  var that = this;
                  id=that.id;
                    $.get(that.url+'/remove/'+id,function(data){
                        if(data){
                            that.query();
                            that.clear();
                            $('#myModal').modal('hide');
                            that.id=0;
                       }else{

                        }
                     })  
                },
               query:function(){
                    var that=this;
                    $.getJSON(that.url+'query',function(data){
                      that.kinds=data;
                    })
               },
               get:function(kind){
                    this.kind=kind;
               },
                clear:function(){
                    this.kind={}
                },
                save:function(kind){
                   var that=this;
                   var param = {
                            id:that.kind.id,
                            name:that.kind.name,
                            icon:that.kind.icon,
                            info:that.kind.info
                        }
                    var reg = /^[\u4e00-\u9fa5]{2,5}$/
                    if(that.kind.name && reg.test(that.kind.name)) {
                         $.post(that.url+'save',param,function(data){
                            if(data){
                                    that.query();
                                    that.clear();
                                }
                               })
                        }
                }
            },
        
        })
        vue.query();
        $("#header").load("header.html");
        $("#left").load("left.html");
       })