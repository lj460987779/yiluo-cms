<template>
    <div class="upload-container">
        <el-upload
                class="image-uploader"
                :data="dataObj"
                drag
                :multiple="false"
                :show-file-list="false"
                action="https://up.qbox.me"
                :before-upload="beforeUpload"
                :on-success="handleImageScucess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div class="image-preview">
            <div class="image-preview-wrapper" v-show="imageUrl.length>1">
                <!--<img :src="imageUrl+'?imageView2/1/w/200/h/200'">-->
                <img :src="imageUrl">
                <div class="image-preview-action">
                    <i @click="rmImage" class="el-icon-delete"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // 预览效果见付费文章
    // import { getToken } from 'api/qiniu';
    export default {
      name: 'singleImageUpload',
      props: {
        value: String,
        initialUrl: String
      },
      computed: {
        imageUrl() {
          return this.localUrl || this.initialUrl
        }
      },
      data() {
        return {
          tempUrl: '',
          localUrl: '',
          dataObj: { token: '', key: '' }
        };
      },
      methods: {
        rmImage() {
          this.emitInput('');
        },
        emitInput(val) {
          this.$emit('input', val);
        },
        handleImageScucess(response) {
//          this.emitInput(this.tempUrl)
          console.log('singleImage2, handleImageSuccess, response:', response)
          if (response.success) {
            const imageId = response.data.id
            const imageUrl = response.data.urlToken
            this.localUrl = imageUrl
            this.emitInput(imageId)
          }
        },
        beforeUpload(file) {
          const _self = this;
          console.log('singleImage2, beforeUpload, file:', file)
          const fileName = file.name
          if (!fileName) {
            return
          }
          return new Promise((resolve, reject) => {
            getToken(fileName).then(response => {
              const key = response.data.uploadKey;
              const token = response.data.uploadToken;
              _self._data.dataObj.token = token;
              _self._data.dataObj.key = key;
//              this.tempUrl = response.data.qiniu_url;
              resolve(true);
            }).catch(err => {
              console.log(err);
              reject(false)
            });
          });
        }
      }
    };
</script>

<style  scoped>
    .upload-container {
        width: 100%;
        position: relative;
        @include clearfix;
        .image-uploader {
            width: 60%;
            float: left;
        }
        .image-preview {
            width: 200px;
            height: 200px;
            position: relative;
            border: 1px dashed #d9d9d9;
            float: left;
            margin-left: 50px;
            .image-preview-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .image-preview-action {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                cursor: default;
                text-align: center;
                color: #fff;
                opacity: 0;
                font-size: 20px;
                background-color: rgba(0, 0, 0, .5);
                transition: opacity .3s;
                cursor: pointer;
                text-align: center;
                line-height: 200px;
                .el-icon-delete {
                    font-size: 36px;
                }
            }
            &:hover {
                .image-preview-action {
                    opacity: 1;
                }
            }
        }
    }

</style>
