/**
  项目JS主入口
  以依赖layui的layer和form模块为例
**/
layui.define(['layer', 'form', 'element','colorpicker'], function (exports) {
    // 引用组件
    var layer = layui.layer,
        form = layui.form;


    //逻辑代码    
    function MyCode_Index(){
        this.init();
    }
    MyCode_Index.prototype ={
        addEvent:function(){

        },
        init:function(){
            console.log(pageData);
            //new Tpl_pageSettings(layui,'#container_right',{data:1});
            var $btn= new Tpl_button('#content_html',1,tplDefaultConfig.button);
            new Tpl_buttonSettings(layui,'#container_right',{data:1});
            console.log($btn);
        }
    };
    new MyCode_Index();

    //导出
    exports('index', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});