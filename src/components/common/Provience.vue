<template>
    <div>
        <el-row :gutter="10" class="margin-top" >
            <el-col :span="5" style="padding-left:0px;">
                <el-select v-model="province" placeholder="请选择" filterable  @change="provinceChange">
                    <el-option
                            v-for="item in provinceOptions"
                            :key="item.value+1"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="5">
                <el-select v-model="city" placeholder="请选择" filterable @change="cityChange">
                    <el-option
                            v-for="item in cityOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>
<style>
    .margin-top{
        margin-top:10px;
    }
</style>
<script>
    export default {
      props: ['provinceValue','cityValue'],
      data: function() {
        return {
            province: this.provinceValue,
            city:this.cityValue,
            provinceOptions: [{
              value: 1,
              label: '北京市'
             }, {
              value: 2,
              label: '天津市'
             }, {
              value: 3,
              label: '上海市'
             }, {
              value: 4,
              label: '重庆市'
             }, {
              value: 5,
              label: '新疆维吾尔自治区'
             },{
              value: 6,
              label: '广西壮族自治区'
             },{
              value: 7,
              label: '西藏自治区'
             },{
              value: 8,
              label: '内蒙古自治区'
             },{
              value: 9,
              label: '宁夏回族自治区'
             },{
              value: 10,
              label: '河北省'
             },{
              value: 11,
              label: '河南省'
             },{
              value: 12,
              label: '云南省'
             },{
              value: 13,
              label: '辽宁省'
             },{
              value: 14,
              label: '黑龙江省'
             },{
              value: 15,
              label: '湖南省'
             },{
              value: 16,
              label: '安徽省'
             },{
              value: 17,
              label: '山东省'
             },{
              value: 18,
              label: '江苏省'
             },{
              value: 19,
              label: '浙江省'
             },{
              value: 20,
              label: '江西省'
             },{
              value: 21,
              label: '湖北省'
             },{
              value: 22,
              label: '甘肃省'
             },{
              value: 23,
              label: '山西省'
             },{
              value: 24,
              label: '陕西省'
             },{
              value: 25,
              label: '吉林省'
             },{
              value: 26,
              label: '福建省'
             },{
              value: 27,
              label: '贵州省'
             },{
              value: 28,
              label: '广东省'
             },{
              value: 29,
              label: '青海省'
             },{
              value: 30,
              label: '四川省'
             },{
              value: 31,
              label: '海南省'
             },{
              value: 32,
              label: '台湾省'
             },{
              value: 33,
              label: '香港特别行政区'
             },{
              value: 34,
              label: '澳门特别行政区'
             },{
              value: 35,
              label: '海外'
             }],
            cityOptions:[]
        }
      },
      methods: {
        provinceChange(val){
            let vm = this;
            switch(val){
                case 1:
                    vm.cityOptions = [
                        {"value":"东城区"},{"value":"西城区"},{"value":"崇文区"},{"value":"宣武区"},{"value":"朝阳区"},{"value":"海淀区"},{"value":"丰台区"},{"value":"石景山区"},{"value":"房山区"},{"value":"通州区"},{"value":"顺义区"},{"value":"昌平区"},{"value":"大兴区"},{"value":"怀柔区"},{"value":"平谷区"},{"value":"门头沟区"},{"value":"密云县"},{"value":"延庆县"},{"value":"其他"} 
                     ];
                break;
                case 2:
                    vm.cityOptions = [
                        {"value":"和平区"},{"value":"河东区"},{"value":"河西区"},{"value":"南开区"},{"value":"河北区"},{"value":"红桥区"},{"value":"塘沽区"},{"value":"汉沽区"},{"value":"大港区"},{"value":"东丽区"},{"value":"西青区"},{"value":"北辰区"},{"value":"津南区"},{"value":"武清区"},{"value":"宝坻区"},{"value":"静海县"},{"value":"宁河县"},{"value":"蓟县"},{"value":"其他"}   
                     ];
                break;
                case 3:
                    vm.cityOptions = [
                        {"value":"黄浦区"},{"value":"卢湾区"},{"value":"徐汇区"},{"value":"长宁区"},{"value":"静安区"},{"value":"普陀区"},{"value":"闸北区"},{"value":"虹口区"},{"value":"杨浦区"},{"value":"宝山区"},{"value":"闵行区"},{"value":"嘉定区"},{"value":"松江区"},{"value":"金山区"},{"value":"青浦区"},{"value":"南汇区"},{"value":"奉贤区"},{"value":"浦东新区"},{"value":"崇明县"},{"value":"其他"} 
                     ];
                break;
                case 4:
                    vm.cityOptions = [
                        {"value":"渝中区"},{"value":"大渡口区"},{"value":"江北区"},{"value":"南岸区"},{"value":"北碚区"},{"value":"渝北区"},{"value":"巴南区"},{"value":"长寿区"},{"value":"双桥区"},{"value":"沙坪坝区"},{"value":"万盛区"},{"value":"万州区"},{"value":"涪陵区"},{"value":"黔江区"},{"value":"永川区"},{"value":"合川区"},{"value":"江津区"},{"value":"九龙坡区"},{"value":"南川区"},{"value":"綦江县"},{"value":"潼南县"},{"value":"荣昌县"},{"value":"璧山县"},{"value":"大足县"},{"value":"铜梁县"},{"value":"梁平县"},{"value":"开县"},{"value":"忠县"},{"value":"城口县"},{"value":"垫江县"},{"value":"武隆县"},{"value":"丰都县"},{"value":"奉节县"},{"value":"云阳县"},{"value":"巫溪县"},{"value":"巫山县"},{"value":"石柱土家族自治县"},{"value":"秀山土家族苗族自治县"},{"value":"酉阳土家族苗族自治县"},{"value":"彭水苗族土家族自治县"},{"value":"其他"}        
                     ];
                break;
                case 5:
                    vm.cityOptions = [
                         {"value":"乌鲁木齐"},{"value":"克拉玛依"},{"value":"吐鲁番地区"},{"value":"哈密地区"},{"value":"和田地区"},{"value":"阿克苏地区"},{"value":"喀什地区"},{"value":"克孜勒苏柯尔克孜自治州"},{"value":"巴音郭楞蒙古自治州"},{"value":"昌吉回族自治州"},{"value":"博尔塔拉蒙古自治州"},{"value":"石河子"},{"value":"阿拉尔"},{"value":"图木舒克"},{"value":"五家渠"},{"value":"伊犁哈萨克自治州"},{"value":"其他"}
                     ];
                break;
                case 6:
                    vm.cityOptions = [
                      {"value":"南宁"},{"value":"柳州"},{"value":"桂林"},{"value":"梧州"},{"value":"北海"},{"value":"防城港"},{"value":"钦州"},{"value":"贵港"},{"value":"玉林"},{"value":"百色"},{"value":"贺州"},{"value":"河池"},{"value":"来宾"},{"value":"崇左"},{"value":"其他"}
                     ];
                break;
                case 7:
                    vm.cityOptions = [
                         {"value":"拉萨"},{"value":"那曲地区"},{"value":"昌都地区"},{"value":"林芝地区"},{"value":"山南地区"},{"value":"日喀则地区"},{"value":"阿里地区"},{"value":"其他"}
                     ];
                break;
                case 8:
                    vm.cityOptions = [
                       {"value":"呼和浩特"},{"value":"包头"},{"value":"乌海"},{"value":"赤峰"},{"value":"通辽"},{"value":"鄂尔多斯"},{"value":"呼伦贝尔"},{"value":"巴彦淖尔"},{"value":"乌兰察布"},{"value":"锡林郭勒盟"},{"value":"兴安盟"},{"value":"阿拉善盟"},{"value":"其他"} 
                     ];
                break;
                case 9:
                    vm.cityOptions = [
                       {"value":"银川"},{"value":"石嘴山"},{"value":"吴忠"},{"value":"固原"},{"value":"中卫"},{"value":"其他"} 
                     ];
                break;
                case 10:
                    vm.cityOptions = [
                        {"value":"石家庄"},{"value":"唐山"},{"value":"秦皇岛"},{"value":"邯郸"},{"value":"邢台"},{"value":"保定"},{"value":"张家口"},{"value":"承德"},{"value":"沧州"},{"value":"廊坊"},{"value":"衡水"},{"value":"其他"}                               
                     ];
                break;
                case 11:
                    vm.cityOptions = [
                        {"value":"郑州"},{"value":"开封"},{"value":"洛阳"},{"value":"平顶山"},{"value":"安阳"},{"value":"鹤壁"},{"value":"新乡"},{"value":"焦作"},{"value":"濮阳"},{"value":"许昌"},{"value":"漯河"},{"value":"三门峡"},{"value":"南阳"},{"value":"商丘"},{"value":"信阳"},{"value":"周口"},{"value":"驻马店"},{"value":"焦作"},{"value":"其他"}   
                     ];
                break;
                case 12:
                    vm.cityOptions = [
                         {"value":"昆明"},{"value":"曲靖"},{"value":"玉溪"},{"value":"保山"},{"value":"昭通"},{"value":"丽江"},{"value":"普洱"},{"value":"临沧"},{"value":"德宏傣族景颇族自治州"},{"value":"怒江傈僳族自治州"},{"value":"迪庆藏族自治州"},{"value":"大理白族自治州"},{"value":"楚雄彝族自治州"},{"value":"红河哈尼族彝族自治州"},{"value":"文山壮族苗族自治州"},{"value":"西双版纳傣族自治州"},{"value":"其他"} 
                     ];
                break;
                case 13:
                    vm.cityOptions = [
                         {"value":"沈阳"},{"value":"大连"},{"value":"鞍山"},{"value":"抚顺"},{"value":"本溪"},{"value":"丹东"},{"value":"锦州"},{"value":"营口"},{"value":"阜新"},{"value":"辽阳"},{"value":"盘锦"},{"value":"铁岭"},{"value":"朝阳"},{"value":"葫芦岛"},{"value":"其他"}   
                     ];
                break;
                case 14:
                    vm.cityOptions = [
                        {"value":"哈尔滨"},{"value":"齐齐哈尔"},{"value":"鹤岗"},{"value":"双鸭山"},{"value":"鸡西"},{"value":"大庆"},{"value":"伊春"},{"value":"牡丹江"},{"value":"佳木斯"},{"value":"七台河"},{"value":"黑河"},{"value":"绥化"},{"value":"大兴安岭地区"},{"value":"其他"}  
                     ];
                break;
                case 15:
                    vm.cityOptions = [
                        {"value":"长沙"},{"value":"株洲"},{"value":"湘潭"},{"value":"衡阳"},{"value":"邵阳"},{"value":"岳阳"},{"value":"常德"},{"value":"张家界"},{"value":"益阳"},{"value":"郴州"},{"value":"永州"},{"value":"怀化"},{"value":"娄底"},{"value":"湘西土家族苗族自治州"},{"value":"其他"}
                     ];
                break;
                case 16:
                    vm.cityOptions = [
                        {"value":"合肥"},{"value":"芜湖"},{"value":"蚌埠"},{"value":"淮南"},{"value":"马鞍山"},{"value":"淮北"},{"value":"铜陵"},{"value":"安庆"},{"value":"黄山"},{"value":"滁州"},{"value":"阜阳"},{"value":"宿州"},{"value":"巢湖"},{"value":"六安"},{"value":"亳州"},{"value":"池州"},{"value":"宣城"},{"value":"其他"}
                     ];
                break;
                case 17:
                    vm.cityOptions = [
                        {"value":"济南"},{"value":"青岛"},{"value":"淄博"},{"value":"枣庄"},{"value":"东营"},{"value":"烟台"},{"value":"潍坊"},{"value":"济宁"},{"value":"泰安"},{"value":"威海"},{"value":"日照"},{"value":"莱芜"},{"value":"临沂"},{"value":"德州"},{"value":"聊城"},{"value":"滨州"},{"value":"菏泽"},{"value":"其他"}     
                     ];
                break;
                case 18:
                    vm.cityOptions = [
                        {"value":"南京"},{"value":"苏州"},{"value":"无锡"},{"value":"常州"},{"value":"镇江"},{"value":"南通"},{"value":"泰州"},{"value":"扬州"},{"value":"盐城"},{"value":"连云港"},{"value":"徐州"},{"value":"淮安"},{"value":"宿迁"},{"value":"其他"}
                     ];
                break;
                case 19:
                    vm.cityOptions = [
                        {"value":"杭州"},{"value":"宁波"},{"value":"温州"},{"value":"嘉兴"},{"value":"湖州"},{"value":"绍兴"},{"value":"金华"},{"value":"衢州"},{"value":"舟山"},{"value":"台州"},{"value":"丽水"},{"value":"其他"}
                     ];
                break;
                case 20:
                    vm.cityOptions = [
                        {"value":"南昌"},{"value":"景德镇"},{"value":"萍乡"},{"value":"九江"},{"value":"新余"},{"value":"鹰潭"},{"value":"赣州"},{"value":"吉安"},{"value":"宜春"},{"value":"抚州"},{"value":"上饶"},{"value":"其他"} 
                     ];
                break;
                case 21:
                    vm.cityOptions = [
                       {"value":"武汉"},{"value":"黄石"},{"value":"十堰"},{"value":"荆州"},{"value":"宜昌"},{"value":"襄樊"},{"value":"鄂州"},{"value":"荆门"},{"value":"孝感"},{"value":"黄冈"},{"value":"咸宁"},{"value":"随州"},{"value":"恩施土家族苗族自治州"},{"value":"仙桃"},{"value":"天门"},{"value":"潜江"},{"value":"神农架林区"},{"value":"其他"}  
                     ];
                break;
                case 22:
                    vm.cityOptions = [
                         {"value":"兰州"},{"value":"嘉峪关"},{"value":"金昌"},{"value":"白银"},{"value":"天水"},{"value":"武威"},{"value":"酒泉"},{"value":"张掖"},{"value":"庆阳"},{"value":"平凉"},{"value":"定西"},{"value":"陇南"},{"value":"临夏回族自治州"},{"value":"甘南藏族自治州"},{"value":"其他"}  
                     ];
                break;
                case 23:
                    vm.cityOptions = [
                        {"value":"太原"},{"value":"大同"},{"value":"阳泉"},{"value":"长治"},{"value":"晋城"},{"value":"朔州"},{"value":"晋中"},{"value":"运城"},{"value":"忻州"},{"value":"临汾"},{"value":"吕梁"},{"value":"其他"}
                     ];
                break;
                case 24:
                    vm.cityOptions = [
                        {"value":"西安"},{"value":"铜川"},{"value":"宝鸡"},{"value":"咸阳"},{"value":"渭南"},{"value":"延安"},{"value":"汉中"},{"value":"榆林"},{"value":"安康"},{"value":"商洛"},{"value":"其他"}
                     ];
                break;
                case 25:
                    vm.cityOptions = [
                        {"value":"长春"},{"value":"吉林"},{"value":"四平"},{"value":"辽源"},{"value":"通化"},{"value":"白山"},{"value":"松原"},{"value":"白城"},{"value":"延边朝鲜族自治州"},{"value":"其他"}
                     ];
                break;
                case 26:
                    vm.cityOptions = [
                        {"value":"福州"},{"value":"厦门"},{"value":"莆田"},{"value":"三明"},{"value":"泉州"},{"value":"漳州"},{"value":"南平"},{"value":"龙岩"},{"value":"宁德"},{"value":"其他"} 
                     ];
                break;
                case 27:
                    vm.cityOptions = [
                         {"value":"贵阳"},{"value":"六盘水"},{"value":"遵义"},{"value":"安顺"},{"value":"铜仁地区"},{"value":"毕节地区"},{"value":"黔西南布依族苗族自治州"},{"value":"黔东南苗族侗族自治州"},{"value":"黔南布依族苗族自治州"},{"value":"其他"} 
                     ];
                break;
                case 28:
                    vm.cityOptions = [
                        {"value":"广州"},{"value":"深圳"},{"value":"珠海"},{"value":"汕头"},{"value":"韶关"},{"value":"佛山"},{"value":"江门"},{"value":"湛江"},{"value":"茂名"},{"value":"肇庆"},{"value":"惠州"},{"value":"梅州"},{"value":"汕尾"},{"value":"河源"},{"value":"阳江"},{"value":"清远"},{"value":"东莞"},{"value":"中山"},{"value":"潮州"},{"value":"揭阳"},{"value":"云浮"},{"value":"其他"}
                     ];
                break;
                case 29:
                    vm.cityOptions = [
                        {"value":"西宁"},{"value":"海东地区"},{"value":"海北藏族自治州"},{"value":"海南藏族自治州"},{"value":"黄南藏族自治州"},{"value":"果洛藏族自治州"},{"value":"玉树藏族自治州"},{"value":"海西蒙古族藏族自治州"},{"value":"其他"}
                     ];
                break;
                case 30:
                    vm.cityOptions = [
                        {"value":"成都"},{"value":"自贡"},{"value":"攀枝花"},{"value":"泸州"},{"value":"德阳"},{"value":"绵阳"},{"value":"广元"},{"value":"遂宁"},{"value":"内江"},{"value":"乐山"},{"value":"南充"},{"value":"眉山"},{"value":"宜宾"},{"value":"广安"},{"value":"达州"},{"value":"雅安"},{"value":"巴中"},{"value":"资阳"},{"value":"阿坝藏族羌族自治州"},{"value":"甘孜藏族自治州"},{"value":"凉山彝族自治州"},{"value":"其他"}       
                     ];
                break;
                case 31:
                    vm.cityOptions = [
                        {"value":"海口"},{"value":"三亚"},{"value":"五指山"},{"value":"琼海"},{"value":"儋州"},{"value":"文昌"},{"value":"万宁"},{"value":"东方"},{"value":"澄迈县"},{"value":"定安县"},{"value":"屯昌县"},{"value":"临高县"},{"value":"白沙黎族自治县"},{"value":"昌江黎族自治县"},{"value":"乐东黎族自治县"},{"value":"陵水黎族自治县"},{"value":"保亭黎族苗族自治县"},{"value":"琼中黎族苗族自治县"},{"value":"其他"} 
                     ];
                break;
                case 32:
                    vm.cityOptions = [
                        {"value":"台北市"},{"value":"高雄市"},{"value":"台北县"},{"value":"桃园县"},{"value":"新竹县"},{"value":"苗栗县"},{"value":"台中县"},{"value":"彰化县"},{"value":"南投县"},{"value":"云林县"},{"value":"嘉义县"},{"value":"台南县"},{"value":"高雄县"},{"value":"屏东县"},{"value":"宜兰县"},{"value":"花莲县"},{"value":"台东县"},{"value":"澎湖县"},{"value":"基隆市"},{"value":"新竹市"},{"value":"台中市"},{"value":"嘉义市"},{"value":"台南市"},{"value":"其他"}
                     ];
                break;
                case 33:
                    vm.cityOptions = [
                        {"value":"香港"}
                     ];
                break;
                case 34:
                    vm.cityOptions = [
                        {"value":"澳门"}
                     ];
                break;
                case 35:
                    vm.cityOptions = [
                        {"value":"海外"}
                     ];
                break;
            };
            this.$emit('provinceChanged',this.provinceOptions[this.province].label)
        },
        cityChange(val){
        	this.$emit('cityChanged',this.city)
        }
      }
    }
</script>
