<!-- 页面组件 -->
<script type="text/html" id="bdt_pageSettings">
    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
        <ul class="layui-tab-title">
            <li class="layui-this">页面样式</li>
        </ul>
        <div class="layui-tab-content">
            <form class="layui-form" action="">
                <div class="layui-form-item">
                    <label class="layui-form-label">页面模式</label>
                    <div class="layui-input-block">
                        <input type="radio"  lay-filter="pagesettingsMod" name="pagesettingsMod" value="普通" title="普通" <%=window.pageConfig.html.mod=='普通'?'checked':'' %>  />
                        <input type="radio" lay-filter="pagesettingsMod" name="pagesettingsMod" value="全屏" title="全屏"  <%=window.pageConfig.html.mod=='全屏'?'checked':'' %> />
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">背景颜色</label>
                    <div class="layui-input-block">
                         <div id="pageSettings_color"></div>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">背景图片</label>
                    <div class="layui-input-block">
                         <img id="pageSettings_img" 
                         style="width:80%;height:100px;border:1px solid #fff;" 
                         src="<%=window.pageConfig.html.background_img%>" />
                    </div>
                </div>    
                <div class="layui-form-item">
                    <label class="layui-form-label"></label>
                    <div class="layui-input-block">
                         <input value="<%=window.pageConfig.html.background_img%>" id="pageSettings_img_url" type="text" name="title" placeholder="请输入图片地址" autocomplete="off" class="layui-input">
                    </div>
                </div>    

            </form>
        </div>
    </div>

</script>



<script>
    (function (window) {
        function Tpl_pageSettings(layui,container,data) {
            this.layui = layui;          
            this.form = layui.form;
            this.colorpicker = layui.colorpicker;
            this.init(container,data);
        }

        Tpl_pageSettings.prototype = {
            $page:null, //页面dom
            $pageBg:null, //背景图片
            //根据选项，渲染页面
            renderPage:function(){
                //背景图片
                $('#pageSettings_img').attr('src',pageConfig.html.background_img);
                if(pageConfig.html.background_img){
                    this.$pageBg.attr('src',pageConfig.html.background_img);
                    this.$pageBg.show();
                }else{
                    this.$pageBg.hide();
                }
                //背景颜色
                if(pageConfig.html.background_color){
                    this.$page.css({
                      "background":pageConfig.html.background_color
                    });
                }else{
                    this.$page.css({
                      "background":"transparent"
                    });
                }

                if(pageConfig.html.mod=='普通'){
                    //普通模式
                    this.$page.css({
                       "width":"100%",
                       "height":"100%",
                       "overflow-y":"auto"
                    });
                    this.$pageBg.css({
                        "width":"100%",
                        "height":"auto"                      
                    });                    

                }else if(pageConfig.html.mod=='全屏'){
                   //全屏
                   this.$page.css({
                       "width":"100%",
                       "height":"100%",
                       "overflow-y":"hidden",
                    });
                    this.$pageBg.css({
                        "width":"100%",
                        "height":"100%"                        
                    });
                }



            },
            addEvent:function(){
                var that = this;
                this.colorpicker.render({
                    elem: '#pageSettings_color',
                    color:pageConfig.html.background_color,
                    change:function(color){
                        pageConfig.html.background_color = color;
                       that.renderPage();
                    },
                    done: function (color) {
                       if(color==''){
                        pageConfig.html.background_color = color;
                        that.renderPage();
                       }
                    }
                });
               //页面模式
               this.form.on('radio(pagesettingsMod)',function(data){
                    pageConfig.html.mod = data.value;   
                    that.renderPage();
               });
               //背景图片
               $('#pageSettings_img_url').blur(function(){
                   var value = $('#pageSettings_img_url').val();
                   pageConfig.html.background_img = value;
                   that.renderPage();
               })

            },
            init: function (container,data) {
                this.$page = $('#content_html');
                this.$pageBg=$('#img_page_bg');

                var bt = baidu.template;
                var chtml = bt('bdt_pageSettings', data);
                $(container).html(chtml);
                this.form.render();
                this.addEvent();
                this.renderPage();
            }
        }
        window.Tpl_pageSettings = Tpl_pageSettings;
    })(window);
 
</script>