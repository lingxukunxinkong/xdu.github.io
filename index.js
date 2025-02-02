let sin = document.getElementById("search-input")
function search() {
    let url = sin.value.trim()
    if (url === "") {
    	alert("不要输入空格")
    } else {
        let searchQuery = encodeURIComponent(url)
        window.location.href = isValidURL(searchQuery, "https://cn.bing.com/search?q=" + searchQuery)
    }
}


function to(url) {
	document.location.href = "https://www." + url + ".com"
}
function tofull(url) {
	document.location.href = "https://" + url
}

let areButtonsVisible = true
function cleanMode() {
    let buttons = document.querySelectorAll('.favorites button')
    if (areButtonsVisible) {
        gsap.to(buttons, { 
            duration: 0.5, 
            opacity: 0, 
            scale: 0.1, 
            stagger: 0.1 
        })
    } else {
        gsap.to(buttons, { 
            duration: 0.5, 
            opacity: 1, 
            scale: 1, 
            stagger: 0.1 
        })
    }
    areButtonsVisible = !areButtonsVisible
}

function isValidURL(url, errorReturn) {
    url = (url.startsWith("http://") || url.startsWith("https://"))?url:"https://"+url
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // 协议
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // 域名
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) 地址
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // 端口和路径
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // 查询字符串
        '(\\#[-a-z\\d_]*)?$','i') // 片段标识
    result = pattern.test(url)?url:errorReturn
    return result
}

function addfavorites() {
    let addDialogs = document.getElementsByClassName("addDialog")
    gsap.to(addDialogs, {
        duration: 1,
        opacity: 1,
        scale: 1,
        ease: "circ.inOut",
        stagger: 0.1
    })
}

function showIcon() {
	let url = document.getElementById("url").value.trim()
    let img = document.getElementById("favicon")
    img.src = isValidURL(url + "/favicon.ico")
}

document.getElementById("background").addEventListener('click', function(){
    let addDialogs = document.getElementsByClassName("addDialog")
    gsap.to(addDialogs, {
        duration: 1,
        opacity: 0,
        scale: 0,
        ease: "circ.inOut",
        stagger: 0.1
    })
})

document.getElementById("file").addEventListener('change', function(){
    const file = this.files[0]
    if(file) {
        const reader = new FileReader()
        reader.addEventListener('load', function(){
            document.getElementById("favicon").src = reader.result
        })
        reader.readAsDataURL(file)
    }
})

setInterval(() => {
    let d = new Date()
    document.title = d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
}, 1000)

document.getElementById('favicon').addEventListener('error', function(event) {
    event.target.src = 'images/unknown web';
    event.target.onerror = null;
})