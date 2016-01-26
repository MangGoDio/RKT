;(function(){

'use strict'

var divNum = 1

var body = document.querySelector('body')

var chat = document.querySelector('.mio .chat')

var keisan = {
  addEvent : function () {
    var oInput = document.querySelector('.create .create-edit')
    var equalBtnBasic = document.querySelector('.basic .div-create')
    var aOpeartors = document.querySelectorAll('.operator > li')
    var aRollBtn = document.querySelectorAll('.keisan-choose > li')

    oInput.addEventListener('keydown', function(e){
      var keynum,
          answer
      if (window.event) {
        keynum = e.keyCode
      } else if (e.which) {
        keynum = e.which
      }
      if (keynum === 13) {
        this.value = this.value.replace(/[^\d]/g,'')
        answer = eval(this.value)
        create.saveDiv(answer)
      }
    })

    ;(function(){
      for (var i = 0, wry = aOpeartors.length; i < wry; i++) {
        aOpeartors[i].addEventListener('click', function(){
          for (var j = 0; j < wry; j++) {
            aOpeartors[j].classList.remove('choose')
          }
          this.classList.add('choose')
        })
      }
    })()

    equalBtnBasic.addEventListener('click', function(e){
      var firstNode = document.querySelector('.keisan-box-1 .num-div:last-child > p'),
          lastNode = document.querySelector('.keisan-box-2 .num-div:last-child > p'),
          optNumNode = document.querySelector('.operator > li.choose'),
          firstNum, lastNum, answer, equal, optNum
      firstNum = firstNode ? firstNode.textContent : 'space'
      lastNum = lastNode ? lastNode.textContent : 'space'
      if (firstNum === 'space' || lastNum === 'space') {
        mio.text('<p><span>加空气啊!</span></p>')
        return false
      }
      if (optNumNode == undefined) {
        mio.text('<p><span>蠢货你忘了选运算符</span></p>')
        return false
      }
      optNum = optNumNode.getAttribute('name')
      answer = eval(firstNum + optNum + lastNum)
      equal = equalBtnBasic.offsetLeft - document.body.offsetWidth / 2  + 440
      create.saveDiv(answer, equal)
    })

    ;(function(){
      for (var i = 0, wry = aRollBtn.length; i < wry; i++) {
        aRollBtn[i].addEventListener('click', function(){
          if(this.className !== 'choose') {
            mio.text('<p><span>功能还没做啦，别瞎J8点</span></p>')
          }
        /*
          for (var j = 0; j < wry; j++) {
            aRollBtn[j].classList.remove('choose')
          }
          this.classList.add('choose')
        */
        })
      }
    })()

  }
}

var create = {
  saveDiv : function (answer, equal) {
    var pageX,
        pageY,
        divX = 0,
        divY = 0
    var oNumDiv = this.produceDiv(answer)
    if(equal) {
      oNumDiv.style.left = equal + 'px'
      oNumDiv.style.top = '465px'
    }
    body.appendChild(oNumDiv)

    oNumDiv.addEventListener('dragstart',
    function(e) {
      pageX = e.pageX, pageY = e.pageY
      var oDrag = e.dataTransfer
      oDrag.effectAllowed = 'copy'
      oDrag.setData("text",e.target.id);
    })

    oNumDiv.addEventListener('dragend',
    function (e) {
      var stepX = e.pageX - pageX,
          stepY = e.pageY - pageY
          console.log(divX)
          console.log(stepY)
      divX += stepX, divY += stepY
      console.log(divX)
      oNumDiv.style.transform = 'translate(' + divX + 'px,' + divY + 'px)'
    })

    oNumDiv.addEventListener('mouseover',
    function () {
      this.querySelector('.div-info').style.display = 'block'
    })

    oNumDiv.addEventListener('mousedown',
    function () {
      this.querySelector('.div-info').style.display = 'none'
    })

  },
  produceDiv : function (answer) {
    divNum++
    var oDiv = '<p class="div-answer">' + answer + '</p><span class="div-info">' + answer + '</span>'
    var oDivNode = document.createElement('div')
    oDivNode.classList.add('num-div')
    oDivNode.setAttribute('draggable', 'true')
    oDivNode.setAttribute('id', divNum)
    oDivNode.innerHTML = oDiv
    return oDivNode
  }
}

var box = {
  addEvent : function () {
    var aBox = document.querySelectorAll('div[class ^= keisan-box]')
    for (var i = 0, wry = aBox.length; i < wry; i++) {

      aBox[i].addEventListener('drop',
      function (e) {
        var strText = e.dataTransfer.getData('text');
        this.appendChild(document.getElementById(strText))
        e.preventDefault()
        e.stopPropagation()
      })

    }

    document.addEventListener('dragover',
    function(e){
      e.preventDefault()
      e.stopPropagation()
    })

    document.addEventListener('drop', this.dropDiv)
  },
  dropDiv : function (e) {
    var strText = e.dataTransfer.getData('text')
    body.appendChild(document.getElementById(strText))
    e.preventDefault()
    e.stopPropagation()
  }
}

var mio = {
  start : function () {
    setTimeout(function () {
      chat.classList.add('show')
    }, 2000)
    setTimeout(function () {
      chat.classList.remove('show')
    }, 10000)
    this.addEvent()
  },
  text : function (html) {
    chat.innerHTML = html
    mio.show(chat)
  },
  show: function (node) {
    node.classList.add('show')
    setTimeout(function () {
      mio.hide(chat)
    }, 5000)
  },
  hide: function (node) {
    node.classList.remove('show')
  },
  addEvent : function () {
    var oMioImg = document.querySelector('.mio > img')
    oMioImg.addEventListener('click', function () {
      if (chat.className === 'chat') {
        mio.show(chat)
      } else {
        mio.hide(chat)
      }
    })
  }
}

keisan.addEvent()
box.addEvent()
mio.start()

})()