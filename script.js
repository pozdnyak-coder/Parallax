class Parallax {
    constructor(obj){
        this.clouds = document.querySelectorAll(obj.clouds)
        this.boat   = document.querySelector(obj.boat)
        this.bg     = document.querySelector(obj.bg)
        window.addEventListener('scroll', () => {this.moveElements()})
    }
    moveElements(){
        this.clouds.forEach(cloud => {
           let speed = cloud.getAttribute('data-speed')
           cloud.style.transform = `translateX(${window.scrollY * speed}px)`  
        })
        this.boat.style.transform     = `translateX(${window.scrollY * 0.1}px)`
        this.bg.style.objectPosition  = `0 ${window.scrollY * 0.1}%` 
    }
}
const parallax = new Parallax({
    clouds: '.header__cloud',
    boat:   '.header__boat',
    bg:     '.header__fantasy'
})

class Text {
    constructor(obj){
        this.text = document.querySelector(obj.text)
        this.fullText = this.text.innerHTML
        this.text.innerHTML = ''
        this.str()
    }
    str(x = 0){
        this.text.innerHTML += this.fullText[x]
        x++
        if(x < this.fullText.length) {
            setTimeout(() => {
                this.str(x)
            }, 200);
        }else if(x == this.fullText.length){
            setTimeout(() => {
                this.text.innerHTML = ''
                this.str()
            }, 2000);
        }
    }
}
const text = new Text ({
    text: 'h1'
})

class Scroll {
    constructor(obj) {
        this.section = document.querySelector(obj.section)
        window.addEventListener('scroll', () => {
            this.fadeAnim(this.section, 2)
        })
    }
    fadeAnim(section, coordinate){
        const fadeRight = section.querySelectorAll('.fade-right');
        fadeRight.forEach(el => {
            const speed = el.getAttribute("data-speed")
            el.style.transition = speed + 'ms'
            if(window.scrollY >= (section.offsetTop - section.offsetHeight * coordinate)){
                el.classList.add('active')
            }else{
                el.classList.remove('active')
            }
        }) 
    }
}
const scroll = new Scroll({
    section: '.scroll'
})

class Rotate3D {
    constructor(obj){
        this.cards = document.querySelectorAll(obj.card);
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {this.rotate(e, card)})
            card.addEventListener('mouseout', (e) => {this.rotateNone(card)})
        })
    }
    rotate(e, card){
        const cardItem = card.querySelector('.card__item')
        const halfHeight = cardItem.offsetHeight / 2
        cardItem.style.transform = `rotateX(${(halfHeight - e.offsetY) / 10}deg) rotateY(${-(halfHeight - e.offsetX) / 10}deg)`
    }
    rotateNone(card){
        const cardItem = card.querySelector('.card__item')
        cardItem.style.transform = 'rotate(0)'
    }
}
const scroll3D = new Rotate3D({
    card: '.card'
})

class ParallaxMove {
    constructor(obj){
        this.moveEl = document.querySelectorAll(obj.moveEl);
        window.addEventListener('mousemove', (e) => {
            this.moveItems(e)
        })
    }
    moveItems(e){
        this.moveEl.forEach(items => {
            const speed = items.getAttribute('data-speed')
            const X = (window.innerWidth  - e.pageX * speed )  / 50
            const Y = (window.innerHeight - e.pageY * speed )  / 100
            items.style.transform = `translate(${X}px, ${Y}px)`
        })
    }
}

const parallaxMove = new ParallaxMove({
    moveEl: '.parallax__ball'
})

class Bubble {
    constructor(obj){
        this.bubble = document.querySelectorAll(obj.bubble)
        this.bubble.forEach(bubble => {
            bubble.addEventListener('mousemove', (e) => {
                this.bubbleShow(e, bubble)
            })
        })
    }
    bubbleShow(e, item) {
        const X = e.pageX - item.offsetLeft
        const Y = e.pageY - item.offsetTop
        
        let span = item.querySelector('span')
        span.style.left = `${X}px`
        span.style.top  = `${Y}px`
    }
}

const bubble = new Bubble({
    bubble: '.timer__btn'
})

class Timer {
    constructor(obj){
        this.timerNums = document.querySelectorAll(obj.timerNums);
        this.timerSection = document.querySelector(obj.timerSection);
        this.state = true
        window.addEventListener("scroll", () => { this.scrollTimer() })
    }
    scrollTimer() {
        if(this.state){
            if(window.scrollY >= this.timerSection.offsetTop - this.timerSection.offsetHeight * 2){
                this.timerSet()
                this.state = false
            }
        }
    }
    timerSet(){
        this.timerNums.forEach(nums => {
            const count = nums.getAttribute('data-num')
            nums.innerHTML = 0
            function timer(i = 0) {
                nums.innerHTML = i
                i++
                if(i <= count){
                    setTimeout(() => {
                        timer(i)
                    }, 5);
                }
            }
            timer()
        })
    }
}

const timer = new Timer({
    timerNums: '.timer__num',
    timerSection: '.timer'
}) 