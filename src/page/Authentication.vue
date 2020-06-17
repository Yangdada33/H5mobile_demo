<template>
  <div class="container">
    <div class="head">
      <span @click="back()">
        <van-icon name="arrow-left" />Back
      </span>
      <span class="title">医师认证</span>
    </div>

    <van-form @submit="onSubmit">
      <div class="line">
        <van-field v-model="name" label="姓名" placeholder="(请填写真实姓名,方便患者查看)" />
      </div>

      <div class="hint">如无您就职的医院等名称,请选择最接近选项,稍后联系客服更改</div>

      <!-- 城市 -->
      <div class="line">
        <van-field
          readonly
          clickable
          name="area"
          :value="valueCity"
          label="选择城市"
          placeholder="点击选择省市"
          @click="showArea = true"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="onCity"
            @cancel="showArea = false"
            :columns-num="2"
          />
        </van-popup>
      </div>

      <!-- 医院 -->
      <div class="line">
        <van-field
          readonly
          clickable
          label="医院"
          :value="valueHospital"
          placeholder="选择医院"
          @click="showPicker1 = true"
        />
        <van-popup v-model="showPicker1" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker1 = false"
            @confirm="onHospital"
          />
        </van-popup>
      </div>

      <!-- 科室 -->
      <div class="line">
        <van-field
          readonly
          clickable
          label="科室"
          :value="valueSection"
          placeholder="选择科室"
          @click="showPicker2 = true"
        />
        <van-popup v-model="showPicker2" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columnsSection"
            @cancel="showPicker2 = false"
            @confirm="onSection"
          />
        </van-popup>
      </div>

      <!-- 职称 -->
      <div class="line">
        <van-field
          readonly
          clickable
          label="职称"
          :value="valueProfession"
          placeholder="选择职称"
          @click="showPicker3 = true"
        />
        <van-popup v-model="showPicker3" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columnsProfession"
            @cancel="showPicker3 = false"
            @confirm="onProfession"
          />
        </van-popup>
      </div>

      <!-- 电话 -->
      <div class="line">
        <van-field v-model="tel" type="tel" label="邀请人电话 :" placeholder="(如无可略过)" />
      </div>

      <!-- 门诊时间 -->
      <div class="line">
        <van-field name="radio" label="门诊时间 :">
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio name="1" shape="square">周一上午</van-radio>
              <van-radio name="2" shape="square">周一下午</van-radio>
              <van-radio name="3" shape="square">周二上午</van-radio>
              <van-radio name="4" shape="square">周二下午</van-radio>
              <van-radio name="5" shape="square">周三上午</van-radio>
              <van-radio name="6" shape="square">周三下午</van-radio>
              <van-radio name="7" shape="square">周四上午</van-radio>
              <van-radio name="8" shape="square">周四下午</van-radio>
              <van-radio name="9" shape="square">周五上午</van-radio>
              <van-radio name="10" shape="square">周五下午</van-radio>
              <van-radio name="11" shape="square">周六上午</van-radio>
              <van-radio name="12" shape="square">周六下午</van-radio>
              <van-radio name="13" shape="square">周日上午</van-radio>
              <van-radio name="14" shape="square">周日下午</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>

      <!-- 证件 -->
      <div class="line">
        <van-field label="上传证件照片" value readonly />
        <van-uploader v-model="certificate" :after-read="certificate_" style="margin-left:10px" />
      </div>

      <!-- 上传头像 -->
      <div>
        <van-field label="上传头像" value readonly />
        <van-uploader v-model="fileList" :after-read="afterRead" style="margin-left:10px" />
      </div>

      <div class="button">
        <van-button round block type="info" native-type="submit">
          <van-icon name="friends-o" />马上认证
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from 'vue'
import area from '../assets/area.js'
import {
  Icon,
  Field,
  Form,
  Area,
  Popup,
  Picker,
  RadioGroup,
  Radio,
  Uploader,
  Button
} from 'vant'
Vue.use(Icon)
  .use(Field)
  .use(Form)
  .use(Area)
  .use(Popup)
  .use(Picker)
  .use(Radio)
  .use(RadioGroup)
  .use(Uploader)
  .use(Button)

export default {
  name: 'Authentication',
  data() {
    return {
      name: '',
      valueCity: '',
      showArea: false,
      areaList: {}, // 数据格式见 Area 组件文档
      showPicker1: false,
      columns: [
        '第一人民医院',
        '第二人民医院',
        '第三人民医院',
        '第四人民医院',
        '第五人民医院'
      ],
      valueHospital: '',
      showPicker2: false,
      valueSection: '',
      columnsSection: [
        {
          text: '一级科室1',
          children: [
            {
              text: '二级科室1'
            },
            {
              text: '二级科室2'
            },
            {
              text: '二级科室3'
            }
          ]
        },
        {
          text: '一级科室2',
          children: [
            {
              text: '二级科室1'
            },
            {
              text: '二级科室2'
            }
          ]
        }
      ],
      showPicker3: false,
      valueProfession: '',
      columnsProfession: [
        '主治医师',
        '主治医师',
        '主治医师',
        '主治医师',
        '主治医师'
      ],
      tel: '',
      radio: '1',
      certificate: [],
      fileList: []
    }
  },
  methods: {
    back() {
      this.$router.push('/')
    },
    // 城市
    onCity(values) {
      this.valueCity = values.map(item => item.name).join('/')
      this.showArea = false
    },
    // 医院
    onHospital(value) {
      this.valueHospital = value
      this.showPicker1 = false
    },
    // 科室
    onSection(value) {
      // console.log(value)
      this.valueSection = value.join() // join==> 数组转字符串
      this.showPicker2 = false
    },
    // 职称
    onProfession(v) {
      this.valueProfession = v
      this.showPicker3 = false
    },
    // 证件
    certificate_(file) {
      console.log(file)
    },
    // 头像
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    onSubmit(values) {
      console.log('submit', values)
    }
  },
  mounted() {
    console.log(area)
    this.areaList = area
  }
}
</script>

<style lang="less" scoped>
.container {
  // position: relative;
  .head {
    height: 50px;
    background-color: #dd4f44;
    display: flex;
    align-items: center;
    position: relative;
    color: #fff;

    span {
      font-size: 26px;

      .van-icon {
        top: 50%;
        transform: translateY(15%);
      }
    }

    .title {
      font-size: 20px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .line {
    border-bottom: 1px solid #ccc;
    padding-bottom: 2px;
  }

  .hint {
    font-size: 16px;
    margin: 5px 10px;
    color: #c8c9cc;
  }

  .button {
    width: 80%;
    margin: 20px auto;
    display: flex;

    .van-icon {
      width: 20px;
      top: 50%;
      transform: translateY(15%);
    }
  }
}

.van-radio-group--horizontal {
  margin-top: 30px;
  margin-left: -100px;
}

.van-radio--horizontal {
  margin: 10px 0;
  margin-right: 70px;
  margin-left: 10px;
}

.van-button--info {
  background-color: #dd4f44;
  border: 0.0625rem solid #dd4f44;
}
</style>
