import { handleError } from "vue";

const WS_HTTPS = 'ws'
const WS_BASEURL = "192.168.0.115:6800"
const WS_ADDRESS = `${WS_HTTPS}://${WS_BASEURL}/Chat?contactId=01FY8B36YY87YG9R95RWRK0111-MESSENGER&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJJc0F2YWlsYWJsZSI6ZmFsc2UsIklkIjpudWxsLCJOYW1lIjpudWxsLCJUb2tlblRpbWUiOiIyMDIyLTAzLTI4VDE0OjA3OjI0Ljc4NzY4NjYrMDg6MDAiLCJleHAiOjE2Nzk5ODM2NDUuMH0.CK5nNzeeM__JJc6y7xaruIRkwHnCS9dX5EZOAPZWm88`

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
}

export default useWebSocket