<!--<template>-->
<!--  <div>-->
<!--    pageOne页面-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->

<!--}-->
<!--</script>-->

<!--<style>-->

<!--</style>-->
<template>
  <div class = "container">
    <div class="content">
      <div v-for="item in msg_list" :key="item.id">
        <div class="item item-center"><span>{{item.timetext}}/span></div>

        <div class="item item-left" v-if="item.type == 'fay'">
          <div class="avatar"><img src="" />
          </div>
          <div class="bubble bubble-left">{{item.content}}</div>
        </div>
        <div class="item item-right" v-else>
          <div class="bubble bubble-right">{{item.content}}</div>
          <div class="avatar"><img src="" /></div>
          </div>
        </div>
      </div>

    <div class="input-area">
      <textarea v-model="send_msg" name="text" id="textarea" placeholder="发送些内容给Fay..."></textarea>
      <div class="button-area">
        <button id="send-btn3" @click="send(4)">行为识别</button>
        <button id="send-btn4" @click="send(5)" style="margin-left: 25px;">安全检测</button>
        <button id="send-btn5" @click="send(6)" style="margin-left: 25px;">情绪识别</button>
        <button id="send-btn1" @click="send(2)" style="margin-left: 25px;">Fay</button>
        <button id="send-btn2" @click="send(3)" style="margin-left: 25px;">聊天模式</button>

        <!--                                    <button id="send-btn" @click="send(3)">连续对话</button>-->



        <!-- <button id="send-btn" @click="send(2)" style="margin-left: 25px;">ChatGPT</button> -->

      </div>
    </div>
  </div>
</template>

<script>
function isEmptyItem(data) {
  let isEmpty = true
  let explain = data["explain"]
  for (let key in data) {
    let value = data[key]
    if (key !== "tab_name" && value.constructor === String && value.length > 0) {
      isEmpty = false
      break
    }
  }
  for (let key in explain) {
    let value = explain[key]
    if (value.constructor === String && value.length > 0) {
      isEmpty = false
      break
    }
  }
  return isEmpty
}

function lastItemIsEmpty() {
  return this.isEmptyItem(this.items_data[this.items_data.length - 1])
}

function uuid() {
  let uuid = Math.random().toString(36);
  return uuid
}

function runnnable() {
  setTimeout(() => {
    let _this = this
    let item_data_list = []
    let changed = false
    let index = 0
    for (let i = 0; i < _this.items_data.length; i++) {
      let data = _this.items_data[i]
      if (i === (_this.items_data.length - 1) || !this.isEmptyItem(data)) {
        item_data_list[index] = _this.items_data[i]
        index++
      } else {
        changed = true
      }
    }
    if (!this.lastItemIsEmpty()) {
      changed = true
      item_data_list.push({
        tab_name: this.uuid(),
        enabled: false,
        name: "",
        explain: {
          intro: "",
          usage: "",
          price: "",
          discount: "",
          promise: "",
          character: ""
        },
        demoVideo: "",
        QnA: ""
      })
    }
    if (changed) {
      _this.items_data = item_data_list
      console.log("修改了！" + _this.items_data.length)
    }
    this.runnnable()
  }, 50)
}

function sendSuccessMsg(text) {
  this.$notify({
    title: '成功',
    message: text,
    type: 'success'
  });
}

function send(sendto) {
  let _this = this;
  let text = _this.send_msg;
  if (!text) {
    alert('请输入内容');
    return;
  }
  let info = {
    'content' : text ,
    'timetext' : _this.getCurrentTime() ,
    'type' : 'member' ,
    'way' : 'send'
  }
  console.log(text)
  _this.msg_list.push(info);
  this.timer = setTimeout(()=>{   //设置延迟执行
    //滚动条置底
    let height = document.querySelector('.content').scrollHeight;
    document.querySelector(".content").scrollTop = height;
  },1000)
  _this.send_msg = ''
  let url = "http://localhost:5000/api/send";
  let send_data = {
    "msg": text,
    "sendto" : sendto
  };

  let xhr = new XMLHttpRequest()
  xhr.open("post", url)
  xhr.setRequestHeader("Content-type", "application/json")
  xhr.send(JSON.stringify(send_data));
  let executed = false
  xhr.onreadystatechange = async function () {
    if (!executed && xhr.status === 200) {
      // _this.getMsgList()
      //    document.querySelector('#textarea').value = '';
      //    document.querySelector('#textarea').focus();
      //     const responseData = JSON.parse(xhr.responseText);
      //     console.log("Response data:", responseData);
    }
  }
}

function  getMsgList(){
  let _this = this;
  let url = "http://localhost:5000/api/get-msg";
  let xhr = new XMLHttpRequest()
  xhr.open("post", url)
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  xhr.send()
  let executed = false
  xhr.onreadystatechange = async function () {
    if (!executed && xhr.status === 200) {
      try {
        if (xhr.responseText.length > 0) {
          let data = await eval('(' + xhr.responseText + ')')
          _this.msg_list = data['list'];

          //滚动条置底
          let height = document.querySelector('.content').scrollHeight;
          document.querySelector(".content").scrollTop = height;
          this.timer = setTimeout(()=>{   //设置延迟执行
            //滚动条置底
            let height = document.querySelector('.content').scrollHeight;
            document.querySelector(".content").scrollTop = height;
          },1000)
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}

function addMsg(data){
  let _this = this;
  let info = {
    'content' : data['content'] ,
    'timetext' :  _this.getCurrentTime() ,
    'type' : data['type'] ,
    'way' : 'send'
  }
  _this.msg_list.push(info);

  this.timer = setTimeout(()=>{   //设置延迟执行
    //滚动条置底
    let height = document.querySelector('.content').scrollHeight;
    document.querySelector(".content").scrollTop = height;
  },1000)
}

function getCurrentTime() {
  //获取当前时间并打印
  // let _this = this;
  let current_date = new Date();
  let yy = current_date.getFullYear();
  let mm = current_date.getMonth()+1<10 ? '0'+parseInt(current_date.getMonth()+1) : current_date.getMonth()+1;
  let dd = current_date.getDate()<10 ? '0'+current_date.getDate() : current_date.getDate();
  let hh = current_date.getHours()<10 ? '0'+current_date.getHours() : current_date.getHours();
  let mf = current_date.getMinutes()<10 ? '0'+current_date.getMinutes() : current_date.getMinutes();
  let ss = current_date.getSeconds()<10 ? '0'+current_date.getSeconds() : current_date.getSeconds();
  let get_time = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
  return get_time;

}
</script>