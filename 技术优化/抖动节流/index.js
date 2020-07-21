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