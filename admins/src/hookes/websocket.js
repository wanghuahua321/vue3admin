import { handleError } from "vue";

const WS_HTTPS = 'wss'
const WS_BASEURL = "192.168.0.113:6800"
const WS_ADDRESS = `${WS_HTTPS}://${WS_BASEURL}/Chat?ContactId=01FXRNXY02TEX69Z81KJP5NKXE-MESSENGER`

function useWebSocket (handleMessage) {
  const ws = new WebSocket(WS_ADDRESS);

  const init = () => {
    bindEvent()
  }

  function bindEvent () {
    ws.addEventListener('open', handleOpen, false);
    ws.addEventListener('close', handleClose, false);
    ws.addEventListener('error', handleError, false);
    ws.addEventListener('message', handleMessage, false) //外部传过来一个函数
  }

  function handleOpen (e) {
    console.log('[ websocket open ] >', e)
  }

  function handleClose (e) {
    console.log('[ websocket handleClose ] >', e)
  }

  function handleError (e) {
    console.log('[ websocket handleError ] >', e)
  }



  init()

  return ws
}

export default useWebSocket