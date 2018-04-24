<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/news' }"><i class="el-icon-date"></i> 新闻</el-breadcrumb-item>
                <el-breadcrumb-item>编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            进行图文编排,默认第一张图片作为新闻封面
        </div>
        <div>
            <el-input v-model="titleInput" placeholder="请输入新闻标题" class='newsTitle'></el-input>
            <el-date-picker
              v-model="showDate"
              type="date"
              placeholder="选择日期"
              >
            </el-date-picker>
        </div>
        <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
        <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
    </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor';
    import { getQNToken } from '../../api/QN.js';
    import { postNews,updateNews } from '../../api/news.js';
    import { mapGetters } from 'vuex';
    export default {
        data: function(){
            return {
                pickerOptions0: {
                  disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                  }
                },
                showDate:'',
                titleInput:'',
                dateValue:'',
                content: '',
                editorOption: {
                    // something config
                }
            }
        },
        components: {
            quillEditor
        },
        created(){
            this.getToken()
            this.isEdit = this.$route.query.edit
            if(this.isEdit){
                this.titleInput = this.newsTitle
                this.content = this.newsContent
                this.showDate = this.createTime
            }
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            backToNews(){
                this.$router.push({path:'news'})
            },
            submit(){
                if(!this.titleInput){
                    this.$message.error('请输入新闻标题')
                    return
                }else if(!this.content){
                    this.$message.error('请输入新闻内容')
                    return
                } // else if(!this.showDate){
                //     this.$message.error('请选择新闻日期')
                //     return
                // }
                // console.log(this.content,this.titleInput,this.dateValue,this.selectValue);
                // 设置时间
                let d = new Date,
                    Y = d.getFullYear(),
                    M = d.getMonth()+1,
                    D = d.getDate(),
                    date = Y+"-"+M+"-"+D;

                let html = this.content;
                
                let imgReg = /<img.*?(?:>|\/>)/g;               //匹配图片
                let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/;    //匹配src属性 
                let imgs = html.match(imgReg);                  //img标签数组

                // let splited_html = html.split(imgReg)           //splited_html 是split掉img标签后的数组
                // let src_arr = this.takeImgSrcOut(imgs,srcReg)   //src_arr 是去掉img标签后的src内的内容组成的数组
                // console.log(imgs)
                // console.log(html,splited_html)
                // console.log(html.replace(imgReg,''),this.content)
                // console.log(src_arr)
                // let date = `${this.showDate.getFullYear()}-${this.showDate.getMonth()+1}-${this.showDate.getDate()}`
                let newInfo = {
                        "newsTitle":this.titleInput,
                        "newsContent":html,
                        "createTime":date,
                }
                
                if(this.isEdit){        //编辑新闻
                    // console.log('编辑')
                    if(imgs && imgs.length){       //如果有配图
                        let splited_html = html.split(imgReg)           //splited_html 是split掉img标签后的数组
                        let src_arr = this.takeImgSrcOut(imgs,srcReg)   //src_arr 是去掉img标签后的src内的内容组成的数组
                        let isAllBase64 = true;
                        let waitForUploadImgs = []; 
                        let waitForUploadImgs_indexs = [];
                        for(let i=0,len = src_arr.length;i<len;i++){
                            // console.log(src_arr[i])
                            if(!this.isBase64(src_arr[i])){
                                isAllBase64 = false
                                // imgs.splice(i,1)
                                waitForUploadImgs.push(src_arr[i])
                                waitForUploadImgs_indexs.push(i)            //保存需要上传的图片在imgs中的下标
                                // console.log("有新的图片",src_arr[i])
                            }
                        }
                        if(isAllBase64){                //如果都是base64的说明没有新图片，则不需要七牛上传，直接update即可
                            // console.log("有配图但没新配图，更新")
                            newInfo.newsId = this.newsId
                            this.updateNews(newInfo)
                        }else{                 //如果isAllBase64是false，说明插入的有新的图片，则需要重新七牛上传，再将上传好的图片img标签插入到原html字符串中
                            // console.log(waitForUploadImgs,waitForUploadImgs_indexs)
                            this.srcBase64splice(waitForUploadImgs)         //去掉data中前边的"data:image/png;base64,"
                            this.uploadToQiniu(waitForUploadImgs).then(res=>{
                                for(let i = 0,len = res.length;i<len;i++){
                                    imgs[waitForUploadImgs_indexs[i]] = `<img src='${res[i]}'>`     //通过waitForUploadImgs_indexs数组中保存的下标将原来imgs数组中尚未处理的base64格式的img标签替换为七牛上传成功后的img标签
                                }
                                // console.log(imgs)
                                let resulet_html_arr = []
                                for(let n = 0;n<splited_html.length;n++){         //用一个新数组将普通标签和img标签添加到一起然后转成字符串
                                    resulet_html_arr.push(splited_html[n]||'')
                                    // console.log('插入其他',splited_html[n],n)
                                    if(imgs[n]){
                                        resulet_html_arr.push(imgs[n])
                                        // console.log('插入img',imgs[k])
                                    }
                                    
                                }
                                // console.log(resulet_html_arr.join(""))
                                newInfo.newsContent = resulet_html_arr.join("")
                                newInfo.newsId = this.newsId
                                // console.log("有配图且有新配图，更新")
                                this.updateNews(newInfo)
                            })
                        }
                    }else{          //如果没有配图
                        // console.log("没配图，更新")
                        console.log(newInfo)
                        this.updateNews(newInfo)
                    }   
                }else{                  //创建新闻
                    // console.log('创建')
                    if(imgs ){  
                    // if(imgs && imgs.length){       //如果有配图
                        let splited_html = html.split(imgReg)           //splited_html 是split掉img标签后的数组
                        let src_arr = this.takeImgSrcOut(imgs,srcReg)   //src_arr 是去掉img标签后的src内的内容组成的数组
                        this.srcBase64splice(src_arr)
                        this.uploadToQiniu(src_arr).then(res=>{
                            let resulet_html_arr = []
                            for(let n = 0;n<splited_html.length;n++ ){
                                resulet_html_arr.push(splited_html[n]||'')
                                if(res[n]){
                                    const img_tag = `<img src='${res[n]}'>`
                                    resulet_html_arr.push(img_tag)
                                    // console.log('插入img',imgs[k])
                                    // k++;
                                }
                                // console.log(resulet_html_arr)
                                
                            }
                            newInfo.newsContent = resulet_html_arr.join("")
                            // console.log("有配图，创建")
                            this.postNews(newInfo)
                        })
                    }else{                         //如果没有配图
                        // console.log("没配图，创建")
                        this.postNews(newInfo)
                        this.$message.error('新闻必须有至少一张配图')
                        
                        // this.postNews(newInfo)
                    }       
                }
            },
            uploadToQiniu(imgs_src){
                    const _this = this;
                    const token = this.QNtoken;
                    let imgs_arr = [];
                    return new Promise(function(resolve){
                        for(let i = 0,len = imgs_src.length;i<len;i++){
                            let url = "http://up.qiniu.com/putb64/"+_this.fileSize(imgs_src[i]); 
                            let xhr = new XMLHttpRequest();
                            xhr.onreadystatechange=function(){
                                if (xhr.readyState==4){
                                let keyText=xhr.responseText;

                                keyText = JSON.parse(keyText)
                                /*返回的key是字符串，需要装换成json*/
                                // keyText=_this.strToJson(keyText);

                                // https://ohc5vthqm.qnssl.com/是公司的七牛云空间网址，keyText.key 是返回的图片文件名
                                const picUrl="https://ohc5vthqm.qnssl.com/"+keyText.key;
                                    imgs_arr.push(picUrl)
                                }
                            }
                            xhr.open("POST", url, false); 
                            xhr.setRequestHeader("Content-Type", "application/octet-stream"); 
                            xhr.setRequestHeader("Authorization", "UpToken "+token); 
                            xhr.send(imgs_src[i]);   


                        }
                        resolve(imgs_arr)
                    })
               
            },
            updateNews(newInfo){
                // console.log(newInfo)
                updateNews(newInfo).then(res=>{
                    if(res.success){
                        this.$message.success('更新新闻成功')
                        this.$router.push({path:'news'})
                    }else{
                        this.$message.error('更新新闻失败')
                    }
                }).catch(err=>{
                        this.$message.error('更新出错')
                    })
            },
            postNews(newInfo){
                postNews(newInfo).then(res=>{
                    if(res.success){
                        this.$message.success('创建新闻成功')
                        this.$router.push({path:'news'})
                    }else{
                        this.$message.error('创建新闻失败')
                    }
                }).catch(err=>{
                        this.$message.error('创建出错')
                    })
            },
            takeImgSrcOut(imgs,srcReg){             //img标签内的src中的信息保存在数组中
                    let srcs = [];
                    for (let i = 0; i < imgs.length; i++) {
                        let src = imgs[i].match(srcReg)[1]; 
                        let picBase = src
                        srcs.push(picBase);
                    }
                    return srcs;
            },
            isBase64(src){
                return /^http/.test(src)
            },
            srcBase64splice(srcs){          //去除base64数据前边的"data:image/png;base64,"
                for(let i = 0,len = srcs.length;i<len;i++){
                // console.log(srcs[i].indexOf(','))
                    srcs[i] = srcs[i].substring(srcs[i].indexOf(',')+1,srcs[i].length)
                }
            },
            getToken(){
                getQNToken().then(res=>{
                    if(res.data){
                        this.QNtoken = res.data 
                    }
                })
            },
            fileSize(picBase){
                let fileSize;
                if(picBase.indexOf('=')>0){
                    let indexOf = picBase.indexOf('=')
                    picBase = picBase.substring(0,indexOf)  //把末尾的等号去掉
                }

                fileSize = parseInt(picBase.length-(picBase.length/8)*2)
                return fileSize;
            }
        },
        computed: {
            ...mapGetters([
                'newsId',
                'newsTitle',
                'newsContent',
                'newsTag',
                'createTime'
            ]),
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        },
        watch: {
            currentIndex(val, old){
                this.showDate = ''
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
    .el-input,.el-row{
        margin-bottom: 20px;
    }
    .newsTitle{
        width: 600px;
    }
</style>


