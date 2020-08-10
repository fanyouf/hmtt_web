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
      <van-cell is-link title="头像"  center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="user.photo"
        />
      </van-cell>
        <!-- value： 设置右侧显示的文字 -->
      <van-cell is-link title="姓名" :value="user.name" @click="showName=true"/>

      <van-cell is-link title="性别" :value="user.gender === 1 ? '女':'男'" @click="showGender=true"/>

      <van-cell is-link title="生日" :value="user.birthday" @click="showBirthday=true"/>
    </van-cell-group>

    <!-- 修改名字 -->
    <van-dialog
      v-model="showName"
      title="修改名字"
      show-cancel-button
      @confirm="hSaveName">
      <van-field v-model.trim="newName" />
    </van-dialog>

    <!-- 修改性别 -->
      <van-popup v-model="showGender" position="bottom">
        <van-nav-bar title="修改性别" left-text="取消" @click-left="showGender=false">
        </van-nav-bar>
        <van-cell title="男" @click="hSaveGender(0)" is-link></van-cell>
        <van-cell title="女" @click="hSaveGender(1)" is-link></van-cell>
      </van-popup>
  </div>
</template>

<script>
import { getProfile, updateUserInfo } from '@/api/user'
export default {
  name: 'userProfile',
  data () {
    return {
      // 控制弹层
      showName: false,
      showGender: false,
      showBirthday: false,

      // 当前用户的信息
      user: { name: '张三' },

      // 修改后的新名字
      newName: '',
      // 修改后新生日
      newDate: new Date(),
      minDate: new Date(1965, 0, 10), // dateTime-picker中最小时间
      maxDate: new Date() // 当前时间
    }
  },
  created () {
    this.loadProfile()
  },
  methods: {
    // 修改名字
    async hSaveName () {
      if (this.newName === '') {
        return
      }
      this.$toast.loading({
        duration: 0, // 永远不会关闭
        mask: true,
        message: '操作中....'
      })

      try {
        // 1. 调用接口，发请求，修改名字
        const result = await updateUserInfo({
          name: this.newName
        })
        console.log(result)
        // 2. 更新视图
        this.user.name = this.newName
        this.newName = ''
        this.$toast.success('修改名字成功')
      } catch {
        this.$toast.fail('修改名字失败')
      }
    },

    async hSaveGender (gender) {
      this.$toast.loading({
        duration: 0, // 永远不会关闭
        mask: true,
        message: '操作中....'
      })

      try {
        // 1. 调用接口，发请求，修改性别
        const result = await updateUserInfo({
          gender
        })
        console.log(result)
        // 2. 更新视图
        this.user.gender = gender

        this.$toast.success('修改性别成功')
        // 3. 收起弹层
        this.showGender = false
      } catch (err) {
        this.$toast.fail('修改性别失败')
      }
    },
    async loadProfile () {
      const result = await getProfile()
      console.log(result)
      this.user = result.data.data
      this.newName = this.user.name
    }
  }
}
</script>
