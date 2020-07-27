window.onload = function () {
    function debounce (fn, delayTime) {
        let timeOut
        return function () {
            let args = arguments
            clearTimeout(timeOut)
            timeOut = setTimeout(function () {
                fn.apply(this, args)
            }, delayTime)
        }
    }
    function throttle (fn, delayTime) {
        let last, timeOut
        return function () {
            let args = arguments
            let now = new Date()
            if (last && now - last < delayTime) {
                clearTimeout(timeOut)
                timeOut = setTimeout(function () {
                    last = now
                    fn.apply(this, args)
                }, delayTime)
            } else {
                last = now
                fn.apply(this, args)
            }
        }
    }
    function ajax (content) {
        console.log(`ajax request ${content}`, new Date())
    }


    let throttleAjax = throttle(ajax, 1000)
    let debounceAjax = debounce(ajax, 1000)

    let inputD = document.getElementById('debounce')
    let buttomT = document.getElementById('throttle')

    buttomT.addEventListener('click', function (e) {
        throttleAjax(e.target.value)
    })
    // inputD.addEventListener('onchange', function (e) {
    //     debounceAjax(e.target.value)
    // })
    inputD.oninput = function (e) {
        debounceAjax(e.target.value)
    }

}

 function sortQualification (qualifications ) {
    console.log('啊哈哈哈')
    const sortMap = ['主板', '中小企业板', '创业板', '三板', '科创板', '高新技术企业', '国家科技', '小巨人', '独角兽', '瞪羚']
    let allQualification = new Set(qualifications)
    allQualification = Array.from(allQualification) 
    allQualification.sort((x, y) => {
      let xIndex = -1, yIndex = -1
      sortMap.forEach((item,index)=>{
        if(x.indexOf(item) !== -1) xIndex = index
        if(y.indexOf(item) !== -1) yIndex = index
      })
      if (xIndex === -1 || yIndex === -1) return xIndex === -1 ? 1 : 0
      return xIndex < yIndex ? -1 : 1
    })
     console.log(allQualification)
  }
  sortQualification(['高新技术','国家科技进步奖','瞪羚'])



