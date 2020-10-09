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
          :src="userInfo.photo"
        />
      </van-cell>
        <!-- value： 设置右侧显示的文字 -->
      <van-cell is-link title="姓名" :value="userInfo.name" @click="isShowName=true"/>

      <van-cell is-link title="性别" :value="userInfo.gender === 0 ?'男':'女'" @click="isShowGender=true"/>

      <van-cell is-link title="生日" :value="userInfo.birthday" @click="isShowBirthday=true"/>

    </van-cell-group>

    <!-- 修改名字的弹层 -->
    <van-dialog
      v-model="isShowName"
      title="修改名字"
      show-cancel-button
      @confirm="hSaveName">
      <van-field v-model.trim="newName" />
    </van-dialog>

    <!-- 修改性别 -->
    <van-popup v-model="isShowGender" position="bottom">
      <van-nav-bar title="修改性别" left-text="取消" @click-left="showGender=false">
      </van-nav-bar>
      <van-cell title="男" @click="hSaveGender(0)" is-link></van-cell>
      <van-cell title="女" @click="hSaveGender(1)" is-link></van-cell>
    </van-popup>
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user'
import { mapState } from 'vuex'
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
    ...mapState(['userInfo'])
  },
  methods: {
    async hSaveName () {
      if (this.newName === '') {
        return
      }
      try {
        const result = await updateUserInfo({ name: this.newName })
        console.log(result)
        // 在本地更新vuex
        this.$store.commit('mUpdateName', this.newName)
        this.$toast.success('操作成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    async hSaveGender (gender) {
      try {
        const result = await updateUserInfo({ gender })
        console.log(result)
        // 在本地更新vuex
        this.$store.commit('mUpdateGender', gender)
        this.$toast.success('操作成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>
