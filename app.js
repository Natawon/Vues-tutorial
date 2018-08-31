// manage database
const database = firebase.database();
const messageRef =database.ref("message");

new Vue({
  el:"#comment",
  data:{
    messageText:'',
    message:[],
    name:'toomtam',
    editText:null
  },
  methods: {
    storeMessage:function() {
      messageRef.push({text:this.messageText,name:this.name})
      // this.message.push({text:this.messageText,name:this.name})

      this.messageText=''
      // console.log(this.message);
    },
    deleteMessage:function(message){
      //ลบข้อมุล
      messageRef.child(message.id).remove()

    },
    editMessage:function(message){
      //แก้ไข
     this.editText=message
     this.messageText=message.text
   },
   cancelMessage:function(message){
     //ยกเลิก
    this.editText=null
    this.messageText=''
  },
  updateMessage:function(message){
    //อัพเดท
    messageRef.child(this.editText.id).update({text:this.messageText})
    this.cancelMessage()
    }
  },
  created() {
    //do something after creating vue instance
    //หลังจากเพิ่มข้อมูลเสร็จ เอาข้อมูลที่มีอยู่ในฐานมาแสดง
    messageRef.on('child_added',snapshot=>{
      //เอาข้อมูลจาก massage มาเก็บใน array
      // this.message.push(snapshot.val())
      // console.log(snapshot.val());
        // console.log(snapshot.key);
        this.message.push({...snapshot.val(),id:snapshot.key})

    })
    messageRef.on('child_removed',snapshot=>{
      const deleteText=this.message.find(message=>message.id == snapshot.key)
      const index=this.message.indexOf(deleteText)
      this.message.splice(index,1)
    })
    messageRef.on('child_changed',snapshot=>{
      const updateText =this.message.find(message=>message.id == snapshot.key)
      updateText.text=snapshot.val().text
    })
  }

})
