<template>
  <div class="container">
    <!-- 导航条 -->
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      title="编辑资料">
    </van-nav-bar>

    <!-- 编辑区 -->
    <van-cell-group>
      <input type="file" @change="hImageChange" />
      <van-cell is-link title="头像"  center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="userInfo.photo"
        />
      </van-cell>
        <!-- value： 设置右侧显示的文字 -->
      <van-cell is-link title="姓名" :value="userInfo.name" @click="hEditName"/>

      <van-cell is-link title="性别" :value="userInfo.gender === 1?'男':'女'" @click="isShowGender=true"/>

      <van-cell is-link title="生日" :value="userInfo.birthday" @click="isShowBirthday=true"/>
    </van-cell-group>

    <!-- 编辑区 修改名字-->
    <van-dialog
      v-model="isShowName"
      title="修改名字"
      show-cancel-button
      @confirm="hSaveName">
      <van-field v-model.trim="newName" />
    </van-dialog>

    <!-- 修改生日 -->
    <van-popup v-model="isShowBirthday" position="bottom">
      <van-nav-bar title="修改生日">
      </van-nav-bar>
      <!--
        v-model: 保存选中的日期
        type="date"： 类型是年月日
        min-date: 最早的时间
      -->
      <van-datetime-picker
        v-model="newDate"
        type="date"
        title="选择生日"
        @cancel="isShowBirthday=false"
        @confirm="hSaveBirthday"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'
import { updateUserInfo, updateUserPhoto } from '@/api/user.js'
export default {
  name: 'userProfile',
  data () {
    return {
      // 控制弹层
      isShowName: false,
      isShowGender: false,
      isShowBirthday: false,
      // 修改后的新名字
      newName: '',
      // 修改后新生日
      newDate: new Date(),
      minDate: new Date(1965, 0, 10), // dateTime-picker中最小时间
      maxDate: new Date() // 当前时间
    }
  },
  computed: {
    // 从vuex中获取信息
    ...mapState(['userInfo'])
  },
  methods: {
    hEditName () {
      this.newName = this.userInfo.name
      this.isShowName = true
    },
    async hSaveName () {
      // 调用接口，保存名字
      const { newName } = this
      if (newName === '') {
        return
      }
      try {
        const res = await updateUserInfo({ name: newName })
        console.log(res)
        // 成功
        // 1. 更新数据到vuex
        this.$store.commit('mUpdateName', newName)
        this.$toast.success('修改名字成功')
      } catch (error) {
        console.log(error)
      }
    },
    async hSaveBirthday () {
      // console.log(this.newDate)
      const birthday = dayjs(this.newDate).format('YYYY-MM-DD')
      try {
        const res = await updateUserInfo({ birthday })
        console.log(res)
        // 成功
        // 1. 更新数据到vuex
        this.$store.commit('mUpdateBirthday', birthday)
        // 2. 隐藏弹层
        this.isShowBirthday = false

        this.$toast.success('修改生日成功')
      } catch (error) {
        console.log(error)
      }
    },
    async hImageChange (e) {
      console.log(e)
      // 获取用户当前选中的图片
      const file = e.target.files[0]
      // 没有选中图片，返回
      if (!file) {
        return
      }
      console.log('当前用户选中的图片文件是', file)
      // 调用接口，上传这张图片
      const fd = new FormData()
      fd.append('photo', file)
      const res = await updateUserPhoto(fd)
      console.log(res)
      // 保存结果
      this.$store.commit('mUpdatePhoto', res.data.data.photo)
      this.$toast.success('头像修改成功')
    }
  }
}
</script>
