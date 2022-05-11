const state={
  token:'',
  userInfo:{},
  chatPerson:{},
  editClick:{},
  dialogMsg:{
    isAdd: true,
    addTit: "新建角色",
    addvisible: false,
    confirmLoading: false,
  },
  loadding:false,
  wsdata:{
    fromContactId: "01FYNSN02RGTW6ETXZBMSYJQRX",
    isRight: true,
    message: "666",
    messageType: "TextMessage",
    replyToMessageId: null,
    sendTime: "0001-01-01T00:00:00",
    toContactIdList: ["01FXRNXY02TEX69Z81KJP5NKXE-MESSENGER"]
  },
  randDoms:"", //随机数
  contIds:"01FXRNXY02TEX69Z81KJP5NKXE-MESSENGER",
};

export default state