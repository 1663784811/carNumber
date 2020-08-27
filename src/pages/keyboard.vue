<template>
  <div class="license-plate noselect">
    <div class="cph-box">
      <div class="numtitle">请输入车牌号</div>
      <div class="cph-wrap cph-wrap-shadow">
          <span :class="{active: (clickIndex)==index}"
                v-for="(item, index) in shadow"
                :key="index"
                @click="cphInputClick(index)">
            {{ cph[index] || (index === 7 ? '+' : '') }}
          </span>
      </div>
    </div>
    <transition name="slide">
      <div class="keyboard-wrap" @click="clickBoard" v-show="show_keyboard">
        <!--=====   头部  =====-->
        <div class="keyboardHeader">
          <div>
              <span class="specials" :class="{'kspecials': activeIndex < 6}" v-for="(item,index) in specials"
                    :key="index">{{ item }}</span>
          </div>
          <div class="close">
            <span class="kclose" @click="show_keyboard = false">关闭</span>
          </div>
        </div>
        <!--=====   省  =====-->
        <div v-if="activeIndex === 0">
          <div class="keyboard">
              <span @touchstart="touchstart" @touchend="touchend" v-for="(item, index) in provice.slice(0,10)"
                    :key="index">{{ item }}</span>
          </div>
          <div class="keyboard">
              <span @touchstart="touchstart" @touchend="touchend" v-for="(item, index) in provice.slice(10,19)"
                    :key="index">{{ item }}</span>
          </div>
          <div class="keyboard">
              <span @touchstart="touchstart" @touchend="touchend" v-for="(item, index) in provice.slice(19,26)"
                    :key="index">{{ item }}</span>
          </div>
          <div class="keyboard">
              <span @touchstart="touchstart" @touchend="touchend" v-for="(item, index) in provice.slice(26)"
                    :key="index">{{ item }}</span>
            <span @touchstart="touchstart" @touchend="touchend" class="k-del">删</span>
          </div>
        </div>
        <!--=====   英文数字  =====-->
        <div v-else>
          <div class="keyboard">
              <span @touchstart="touchstart" @touchend="touchend" v-for="(item, index) in numbers" :key="index">
                {{item }}</span>
          </div>
          <div class="keyboard">
              <span @touchstart="touchstart" @touchend="touchend" v-for="(item, index) in letters.slice(0,10)"
                    :key="index">{{ item }}</span>
          </div>
          <div class="keyboard">
              <span @touchstart="touchstart" @touchend="touchend" v-for="(item, index) in letters.slice(10,19)"
                    :key="index">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span @touchstart="touchstart" @touchend="touchend" class="k-done k-done2">完成</span>
            <span @touchstart="touchstart" @touchend="touchend" v-for="(item, index) in letters.slice(19)"
                  :key="index">{{ item }}</span>
            <span @touchstart="touchstart" @touchend="touchend" class="k-del">删</span>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>

export default {
  name: 'license-plate',
  data() {
    return {
      carNumber: '',
      showWin: this.show,
      provice: [
        '京', '津', '沪', '渝', '翼', '豫', '云', '辽', '黑', '湘',
        '皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘',
        '晋', '蒙', '陕', '吉', '闵', '贵', '粤',
        '青', '藏', '川', '宁', '琼', '使'
      ],
      numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      letters: [
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M'
      ],
      specials: ['领', '警', '港', '澳', '学', '挂'],
      cph: [],
      newCph: [],
      shadow: new Array(8),
      show_keyboard: true,
      clickIndex: 0,
      isOk: false
    };
  },
  methods: {
    confirmBtnFn() {
      this.$emit('confirmBtnFn', this.cph.join(''));
    },
    clickBoard(e) {
      if (e.target.tagName.toLowerCase() === 'span') {
        if (e.target.className.indexOf('k') === -1 && this.clickIndex < 8) {
          this.cph[this.clickIndex] = e.target.textContent;
          this.newCph = this.cph;
          this.clickIndex += 1;
          if (this.clickIndex > 7) this.clickIndex = 7;
        } else if (e.target.className === 'k-del') {
          this.newCph[this.clickIndex] = '';
          this.cph = this.newCph;
          this.clickIndex -= 1;
          if (this.clickIndex < 0) this.clickIndex = 0;
        } else if (e.target.className.indexOf('k-done2') !== -1) {
          this.confirmBtnFn();
        }
      }
    },
    cphInputClick(i) {
      this.clickIndex = i;
      this.show_keyboard = true;
    },
    touchstart(e) {
      e.target.classList.add('active_key');
    },
    touchend(e) {
      e.target.classList.remove('active_key');
    }
  },
  computed: {
    activeIndex() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.isOk = this.cph.length >= 6 && !this.cph.filter((item, index) => index < 6).includes('');
      return this.clickIndex;
    }
  }
};
</script>

<style scoped lang="scss">
.popTop {
  position: relative;

  .popTitle {
    font-size: 14px;
    padding: 10px;
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.popContent {
  box-sizing: border-box;
  padding: 20px;
  min-height: 125px;
  display: flex;
  justify-content: center;
}

.popFooter {
  display: flex;

  .btn {
    font-size: 14px;
    color: #222222;
    flex: 1;
    padding: 14px 0;
    background: #EFEFEF;
    font-weight: bold;
  }

  .cancelBtn {
    flex: 1;
  }

  .confirmBtn {
    flex: 1;
    background: #FF2343;
    color: #fff;
  }
}

.license-plate {
  padding: 10px;
  .cph-wrap {
    display: flex;
    justify-content: flex-start;
    font-size: 18px;
    line-height: 40px;
    min-height: 40px;

    .active {
      width: 29.5px;
      height: 40px;
      background-color: #CFD3DD;
    }
  }

  .cph-wrap-shadow {
    background-color: #fff;
    z-index: 0;
    margin: 30px 10px;
  }

  .cph-wrap-shadow span {
    font-size: 18px;
  }

  .cph-wrap span {
    position: relative;
    text-align: center;
    width: 29.5px;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #E1E1E1;
    margin-right: 7px;
    background-color: #fff;
    color: #222;
    z-index: 99;
  }

  .cph-wrap span:first-of-type {
    margin-left: 0;
  }

  .cph-wrap span:nth-of-type(8) {
    margin-right: 0;
  }

  .cph-wrap span:last-child::before {
    content: none;
  }

  .keyboard-wrap {
    background: #CFD3DD;
    padding: 0 2px 0;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .keyboardHeader {
      display: flex;
      background-color: #fff;
      margin: 1px -2px 10px -2px;
      line-height: 40px;
      justify-content: space-between;
      align-items: center;
      .specials {
        font-size: 18px;
        margin-left: 12px;
        color: #222;
      }

      .kspecials {
        color: #ccc;
      }

      .close {
        padding-right: 10px;
        display: flex;
        justify-content: flex-end;

        span {
          color: #999;
          text-decoration: none;
          display: block;
          width: 40px;
          height: 40px;
          text-align: center;
          font-size: 16px;
        }
      }
    }
  }

  .keyboard {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    position: relative;

    span {
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 1px 2px #666;
      width: calc(10% - 4px);
      text-align: center;
      height: 46px;
      line-height: 46px;
      margin: 0 2px 8px;
      font-size: 16px;
    }

    .k-del {
      width: 40px;
      position: absolute;
      right: 2px;
      display: block;

    }

    .k-del img {
      display: block;
      margin: 9px auto;
    }

    .k-done {
      width: 60px;
      position: absolute;
      right: 2px;
      display: block;
      background-color: #0084FF;
      color: #fff;
      font-weight: bold;
    }

    .k-done2 {
      left: 2px;
      width: 40px;
    }
  }

  .keyboard > div {
    display: flex;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .3s;
    opacity: 1;
    transform: translateY(0);
  }

  .slide-enter, .slide-leave-to {
    opacity: 0;
    transform: translateY(400px);
  }
}

.cph-box {
  position: relative;
  margin: 65px auto;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;

  .numtitle {
    font-size: 18px;
    color: #222222;
    text-align: center;
    line-height: 50px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    font-weight: normal;
  }
}

span.hide {
  opacity: 0;
}

.active_key {
  background-color: #000;
  opacity: 0.2;
}
</style>
