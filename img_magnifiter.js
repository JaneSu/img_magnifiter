var magnifiter = function (opt) {
    opt = opt || {};

    let opts = {
        obj: opt.obj || '#img-container',
        wrapper_width: opt.wrapper_width || '400',
        wrapper_height: opt.wrapper_height || '200'
    }
    let str = opts.obj.substring(1)
    let mag_wrapper = document.getElementById(str)

    mag_wrapper.setAttribute('style', 'width:' + parseInt(opts.wrapper_width) + 'px;height:' + parseInt(opts.wrapper_height) + 'px')

    var img;
    for (let i = 0; i < mag_wrapper.childNodes.length; i++) {
        if (mag_wrapper.childNodes[i].nodeType === 1) {
            img = mag_wrapper.childNodes[1]
            img.classList.add("img")
            img.setAttribute('width', '100%')
            img.setAttribute('height', '100%')
        }
    }

    let init = function (x, y) {
        let img = document.getElementsByClassName('img')[0]
        let blue_wrapper = document.createElement('span');
        mag_wrapper.appendChild(blue_wrapper)
        mag_wrapper.style.position = 'relative'
        blue_wrapper.setAttribute('class', 'blue_wrapper')
        blue_wrapper.setAttribute('style', 'width:50px')
        blue_wrapper.style.height = '50px'
        blue_wrapper.style.position = 'absolute'
        blue_wrapper.style.top = (y - 25) + 'px';
        blue_wrapper.style.left = (x - 25) + 'px';
        blue_wrapper.style.background = 'lightblue'
        blue_wrapper.style.opacity = '0.2'

        blue_wrapper.style.position = 'absolute'

        let min_box = document.createElement('span');
        min_box.setAttribute('class', 'min_box')
        mag_wrapper.appendChild(min_box)
        min_box.setAttribute('style', 'position:absolute')
        min_box.style.top = y + 'px';
        min_box.style.left = x + 'px';
        min_box.style.background = 'url(' + img.src + ')'
        // min_box.style.opacity = '0.2'
        min_box.style.height = '80px'
        min_box.style.width = '80px'
        min_box.style.backgroundPositionX = (x - 25) + 'px';
        min_box.style.backgroundPositionY = (y - 25) + 'px';
        min_box.style.backgroundSize = (parseInt(opts.wrapper_width) * 1.5) + 'px ' + (parseInt(opts.wrapper_height) * 1.5) + 'px'
        min_box.style.backgroundRepeat = 'no-repeat'
        // min_box.style.transform = 'scale(2,2)'


    }

    let getElementDis = function (id) {
        let currentId = id
        let current = document.getElementById(currentId),
            actualleft = '',
            actualtop = '';
        while (current.offsetParent !== null) {
            actualleft += current.offsetLeft
            actualtop += current.offsetTop
            current = current.offsetParent
        }
        return [actualtop,actualleft]
    }

    let enter = function (e) {
        console.log(e.target.id)
        let currentId = e.target.id
        let currentObj = getElementDis(currentId)


        let y = e.clientY - currentObj[0],
            x = e.clientX - currentObj[1];
        init(x, y)

        if(this.getElementsByClassName('blue_wrapper').length>1 && this.getElementsByClassName('min_box').length>1){
            for(let i=1,len = this.getElementsByClassName('blue_wrapper').length;i<len;i++){
                this.removeChild(this.getElementsByClassName('blue_wrapper')[i])
                this.removeChild(this.getElementsByClassName('min_box')[i])
            }
        }
    }

    let moveMethods = function (e) {
        let currentId = e.target.parentNode.id
        let currentObj = getElementDis(currentId)
        let y = e.clientY - currentObj[0],
        x = e.clientX - currentObj[1];

        let move_ele = document.getElementsByClassName('blue_wrapper')[0]
        let min_box = document.getElementsByClassName('min_box')[0];
        move_ele.style.top = (y - 25) + 'px';
        move_ele.style.left = (x - 25) + 'px';
        min_box.style.top = (y + 25) + 'px';
        min_box.style.left = (x + 25) + 'px';
        min_box.style.backgroundPositionX = -(x * 1.5 - 25) + 'px';
        min_box.style.backgroundPositionY = -(y * 1.5 - 25) + 'px';
        
        if (x > parseInt(opts.wrapper_width) || y > parseInt(opts.wrapper_height)) {
            mag_wrapper.removeChild(move_ele)
            mag_wrapper.removeChild(min_box)
        }
    }

    mag_wrapper.addEventListener('mouseenter', enter, false)
    mag_wrapper.addEventListener('mousemove', moveMethods, false)

}
