<template>
  <div></div>

</template>
<script>
export default {
  data () {
    return {
      lockReconnect: false,
      timeout: 60000,//1分钟发一次心跳
      timeoutObj: null,
      serverTimeoutObj: null,
    }
  },
  methods: {
    websocketopen (msg) {
      this.heartStart();
      //打开
    },
    websocketonmessage (msg) {
      this.heartStart();

      if (msg.data) {
        // socket获取的数据
        let serializeData = JSON.parse(msg.data);
        const { data, socketType } = serializeData;
        console.log('[  msg.data] >', msg.data)
        // this.$store.commit('setBraggerData', null);
        // this.$store.commit('setSocketType', null);
        if (
          (socketType == 2 && data && data == 2) ||
          (socketType == 3 && data && data.state && data.state !== 1)
        ) {
          // 在线用户被迫下线 在线产品用户下线
          // this.$store.commit('setSocketType', socketType);
        }
        if (socketType == 4 && data) {
          // 评论弹幕;
          // state.braggerData = data;
          // this.$store.commit('setBraggerData', data);
          // this.$store.commit('setSocketType', socketType);
        }
        if (socketType == 5 && data) {
          // 性能监控的数据
          // this.$store.commit('setPerformance', data);
        }
      }
    },
    websocketclose (msg) {
      //关闭
      this.reconnect();
    },
    websocketerror (err) {
      //失败
      this.reconnect();
    },
    createWebSocket () {
      try {
        if ('WebSocket' in window) {
          this.$store.dispatch('connectSocket')
          this.$store.state.messageSocket.onopen = this.websocketopen;

          this.$store.state.messageSocket.onmessage = this.websocketonmessage;
          this.$store.state.messageSocket.onclose = this.websocketclose;
          this.$store.state.messageSocket.onerror = this.websocketerror;
        }
      } catch (e) {
        this.reconnect();
      }
    },
    reconnect () {
      // 连接失败会重新连
      if (this.lockReconnect) return;
      this.lockReconnect = true;
      if (this.$route.fullPath.startsWith("/portal") && this.$store.state.userInfo.id) {
        // 确定是在正常登陆页才重新连接
        setTimeout(() => {
          this.createWebSocket();
          this.lockReconnect = false;
        }, 3000);
      }

    },
    heartStart () {
      const self = this;
      clearTimeout(self.timeoutObj);
      clearTimeout(self.serverTimeoutObj);
      this.$store.state.messageSocket.send("ping");//重置后就先发送一次，避免与下次间隔超过一分钟
      self.timeoutObj = setInterval(() => {
        self.$store.state.messageSocket.send("ping");
      }, self.timeout);
    }
  },

  mounted () {
    this.createWebSocket();
  },
  beforeUnmount () {
    this.$store.state.messageSocket && this.$store.state.messageSocket.close();
    clearTimeout(self.timeoutObj);
    clearTimeout(self.serverTimeoutObj);
  }
}
</script>
