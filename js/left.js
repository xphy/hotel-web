$(function(){
        var vue = new Vue({
            el:'#accordion',
            data:{
                powers:user.powers,
                parents:[]
            },
            methods : {
                gmenu : function(){
                    
                    var that = this;
                    $.each(that.powers,function(){
                        if(this.pid==0){
                            var father =this;
                            $.each(that.powers,function(){
                                if(this.pid == father.id){
                                    father.Son = true;
                                }
                            })
                            that.parents.push(father);
                        }
                    })
                }
            }
        })
        vue.gmenu();
    })