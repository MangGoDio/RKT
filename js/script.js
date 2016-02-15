;(function(){

'use strict'

var divNum = 0

var body = document.querySelector('body')

var chat = document.querySelector('.mio .chat')

var keisan = {
  addEvent : function () {
    var oInput = document.querySelector('.create .create-edit'),
        equalBtnBasic = document.querySelector('.basic .div-create'),
        equalBtnPow = document.querySelector('.pow .div-create'),
        equalBtnSqrt = document.querySelector('.sqrt .div-create'),
        equalBtnLog = document.querySelector('.log .div-create'),
        equalBtnRandom = document.querySelector('.random .div-create'),
        aOpeartors = document.querySelectorAll('.operator > li'),
        aRollBtn = document.querySelectorAll('.keisan-choose > li')

    oInput.addEventListener('keydown', function(e){
      var keynum,
          answer
      if (window.event) {
        keynum = e.keyCode
      } else if (e.which) {
        keynum = e.which
      }
      if (keynum === 13) {
        this.value = this.value.replace(/[^\d\+\-\*\.\/\(\)]/g,'')
        if(this.value === '') {
          mio.text('<p><span>没数据，不给生成</span></p>')
        } else {
          answer = eval(this.value)
          create.saveDiv(answer)
        }
      }
    })

    ;(function(){
      for (var i = 0, wry = aOpeartors.length; i < wry; i++) {
        aOpeartors[i].addEventListener('click',
        function(){
          for (var j = 0; j < wry; j++) {
            aOpeartors[j].classList.remove('choose')
          }
          this.classList.add('choose')
        })
      }
    })()

    equalBtnBasic.addEventListener('click',
    function() {
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
      equal = equalBtnBasic.offsetLeft - document.body.offsetWidth / 2  + 410
      create.saveDiv(answer, equal)
    })

    equalBtnPow.addEventListener('click',
    function() {
      var firstNode = document.querySelector('.keisan-box-3 .num-div:last-child > p'),
          lastNode = document.querySelector('.keisan-box-4 .num-div:last-child > p'),
          firstNum, lastNum, answer, equal
      firstNum = firstNode ? firstNode.textContent : 'space'
      lastNum = lastNode ? lastNode.textContent : 'space'
      if (firstNum === 'space' || lastNum === 'space') {
        mio.text('<p><span>加空气啊!</span></p>')
        return false
      }
      answer = Math.pow(firstNum, lastNum)
      equal = equalBtnPow.offsetLeft - document.body.offsetWidth / 2  + 340
      create.saveDiv(answer, equal)
    })

    equalBtnSqrt.addEventListener('click',
    function() {
      var firstNode = document.querySelector('.keisan-box-5 .num-div:last-child > p'),
          firstNum, answer, equal
      firstNum = firstNode ? firstNode.textContent : 'space'
      if (firstNum === 'space') {
        mio.text('<p><span>加空气啊!</span></p>')
        return false
      }
      answer = Math.sqrt(firstNum)
      equal = equalBtnSqrt.offsetLeft - document.body.offsetWidth / 2  + 250
      create.saveDiv(answer, equal)
    })

    equalBtnLog.addEventListener('click',
    function() {
      var firstNode = document.querySelector('.keisan-box-6 .num-div:last-child > p'),
          lastNode = document.querySelector('.keisan-box-7 .num-div:last-child > p'),
          firstNum, lastNum, answer, equal
      firstNum = firstNode ? firstNode.textContent : 'space'
      lastNum = lastNode ? lastNode.textContent : 'space'
      if (firstNum === 'space' || lastNum === 'space') {
        mio.text('<p><span>加空气啊!</span></p>')
        return false
      }
      answer = Math.log(lastNum)/Math.log(firstNum)
      equal = equalBtnLog.offsetLeft - document.body.offsetWidth / 2  + 400
      create.saveDiv(answer, equal)
    })

    equalBtnRandom.addEventListener('click',
    function() {
      var firstNode = document.querySelector('.keisan-box-8 .num-div:last-child > p'),
          lastNode = document.querySelector('.keisan-box-9 .num-div:last-child > p'),
          firstNum, lastNum, answer, equal, min, max
      firstNum = firstNode ? firstNode.textContent : 'space'
      lastNum = lastNode ? lastNode.textContent : 'space'
      if (firstNum === 'space' || lastNum === 'space') {
        mio.text('<p><span>哥范围给一个好不</span></p>')
        return false
      }
      if(firstNum >= lastNum) {
        max = firstNum
        min = lastNum
      } else {
        min = firstNum
        max = lastNum
      }
      max = Math.floor(max)
      min = Math.ceil(min)
      answer = Math.floor(Math.random()*(max-min+1) + parseInt(min))
      equal = equalBtnRandom.offsetLeft - document.body.offsetWidth / 2  + 400
      create.saveDiv(answer, equal)
    })

    ;(function(){
      var boxAll = document.querySelector('.all-box'),
          length
      for (var i = 0, wry = aRollBtn.length; i < wry; i++) {
        aRollBtn[i].addEventListener('click',
        function(){
          for (var j = 0; j < wry; j++) {
            aRollBtn[j].classList.remove('choose')
          }
          this.classList.add('choose')
          length = this.getAttribute('loc')
          boxAll.style.marginTop = (0 - length) * 250 + 'px'
          switch(length) {
            case '2':
              setTimeout(function() {
                mio.text('<p><span>目前仅支持平方根计算</span></p>')
              }, 500); break
            case '4':
              setTimeout(function() {
                mio.text('<p><span>请装填随机数的生成范围</span></p>')
              }, 500); break
          }
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
    var oNumDiv = this.produceDiv(answer),
        oNumDel = oNumDiv.querySelector('.div-del'),
        oNumInput = oNumDiv.querySelector('.div-tips-input'),
        oNumTips = oNumDiv.querySelector('.div-tips'),
        oNumInfo = oNumDiv.querySelector('.div-info')
    if(!isFinite(answer)) {
      mio.text('<p><span>太大了♂塞不下</span></p>')
      return false
    }
    if(equal) {
      oNumDiv.style.left = equal + 'px'
      oNumDiv.style.top = '337px'
    }
    body.appendChild(oNumDiv)

    oNumDiv.addEventListener('dragstart',
    function(e) {
      oNumDel.classList.remove('show')
      oNumTips.style.display = 'none'
      oNumInfo.style.display = 'none'
      oNumInput.classList.remove('show')
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
      oNumTips.style.display = 'block'
    })

    oNumDiv.addEventListener('mouseover',
    function () {
      oNumInfo.style.display = 'block'
    })

    oNumDiv.addEventListener('contextmenu',
    function (e) {
      e.preventDefault()
      oNumDel.classList.add('show')
      oNumInput.classList.add('show')
      oNumTips.style.display = 'none'
      return false
    })

    oNumDel.addEventListener('click',
    function () {
      this.parentNode.classList.add('hide')
      setTimeout (function () {
        oNumDel.parentNode.parentNode.removeChild(oNumDel.parentNode)
      }, 500)
    })

    oNumInput.addEventListener('keydown',
    function (e) {
      var keynum,
          answer
      if (window.event) {
        keynum = e.keyCode
      } else if (e.which) {
        keynum = e.which
      }
      if (keynum === 13) {
        oNumTips.textContent = this.value
        this.classList.remove('show')
        oNumTips.style.display = 'block'
      }
    })

    oNumInput.addEventListener('blur',
    function () {
      oNumTips.textContent = this.value
      this.classList.remove('show')
      oNumTips.style.display = 'block'
    })


  },
  produceDiv : function (answer) {
    divNum++
    var oDiv = '<p class="div-answer">'+ answer + '</p> \
                <span class="div-info">' + answer + '</span> \
                <a class="div-tips"></a> \
                <input class="div-tips-input" type="text" placeholder="注释"/> \
                <span class="div-del"></span>'
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
  show : function (node) {
    node.classList.add('show')
    setTimeout(function () {
      mio.hide(chat)
    }, 5000)
  },
  hide : function (node) {
    node.classList.remove('show')
  },
  addEvent : function () {
    var oMioImg = document.querySelector('.mio > img')
    oMioImg.addEventListener('click',
    function () {
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
