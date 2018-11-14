<!-- 按钮组件 -->
<script type="text/html" id="bdt_button">
    <a href="javscript:;;" 
    id="<%=id%>"
    style="<%=style%>"
    class="btn"><%=value%></a>
</script>

<script>
    (function (window) {
        function Tpl_button(container,index,element) {
            this.init(container,{
                index:index,
                style: JSONToHtml(element.style),
                id:'tpl_btn'+index,
                value:element.props.value
            });
            return {id:'tpl_btn'+index};
        }

        Tpl_button.prototype = {
            init: function (container,data) {
                var bt = baidu.template;
                var chtml = bt('bdt_button', data);
                $(container).append(chtml);              
            }
        }
        window.Tpl_button = Tpl_button;
    })(window);
 
</script>