//已添加的组件列表
window.pageData = {
    html:{
       mod:'普通',//模式：普通、全屏
       background_img:'https://p1.ssl.qhimg.com/t011ba76fa82e693ee6.png',//背景图片 
       background_color:''//背景颜色
    },
    elements:[]
};
window.defaultImgUrl ='https://p4.ssl.qhimg.com/t016c95d6b39dd7f631.png';

//组件的默认配置
window.tplDefaultConfig={
    button:{
        style:{
            display:'block',
            position:'absolute',
            top:'80px',
            left:'120px',
            width:'100px',
            height:'40px',
            line_height:'40px',
            border:'1px solid #000',
            z_index:'1',
            color:'#000',
            background_color:'#fff',
            opacity:'1',
            background_image:'none',
            background_size:'auto'
        },
        props:{
            value:'按钮'
        }
    },
    img:{
        style:{
            display:'block',
            position:'absolute',
            top:'180px',
            left:'120px',
            width:'100px',
            height:'40px',
            z_index:'1',
            background:'none',
            opacity:'1'
        },
        props:{
            src:defaultImgUrl
        }
       
    }


};
//json转html属性
window.JSONToHtml = function(obj){
    return JSON.stringify(obj).replace(/_/g,'-').replace(/\"/g,'').replace(/[,}]/g,';').replace(/{/g,'');
}