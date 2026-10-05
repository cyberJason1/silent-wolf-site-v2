// script.js 《沉默之狼》官网交互脚本
(function(){
    const CONFIG = {
        characters: [
            {name:"陈知白", img:"images/chenzhibai.png"},
            {name:"苏念", img:"images/sunian.png"},
            {name:"Ariff Aimran", img:"images/ariff.png"},
            {name:"陈知夜", img:"images/chenzhiye.png"}
        ],
        radius: 260,
        startAngle: -90,
        scrollRange: 340,
        floatingCharThreshold: 0.35
    };

    const heroCarousel = document.querySelector('.hero-carousel');
    const circleScene = document.querySelector('.circle-scene');
    const floatingChar = document.querySelector('.floating-character');
    const textBlocks = document.querySelectorAll('.text-block');

    function buildCircleCharacters(){
        const count = CONFIG.characters.length;
        circleScene.querySelectorAll('.character-item').forEach(el=>el.remove());
        CONFIG.characters.forEach((char, idx)=>{
            const item = document.createElement('div');
            item.className = 'character-item';
            if(char.img){
                item.innerHTML = `
                    <img src="${char.img}" alt="${char.name}">
                    <div class="character-name">${char.name}</div>
                `;
            }else{
                item.classList.add('noimg');
                item.dataset.name = char.name;
            }
            circleScene.appendChild(item);
        });
    }

    function updateCircleRotation(scrollPercent){
        const items = circleScene.querySelectorAll('.character-item');
        const count = items.length;
        if(count === 0) return;
        const totalRotate = scrollPercent * 360;
        items.forEach((item, idx)=>{
            const angleDeg = CONFIG.startAngle + (360 / count) * idx + totalRotate;
            const rad = angleDeg * Math.PI / 180;
            const x = Math.cos(rad) * CONFIG.radius;
            const y = Math.sin(rad) * CONFIG.radius;
            item.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        });
    }

    function setupTextFadeIn(){
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    entry.target.classList.add('in');
                }
            });
        },{threshold:0.2});
        textBlocks.forEach(block=>observer.observe(block));
    }

    function onScroll(){
        const rect = heroCarousel.getBoundingClientRect();
        const carouselHeight = heroCarousel.clientHeight;
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / carouselHeight));
        updateCircleRotation(scrollProgress);
        if(scrollProgress >= CONFIG.floatingCharThreshold){
            floatingChar.classList.add('show');
        }else{
            floatingChar.classList.remove('show');
        }
    }

    function setupWheelHint(){
        circleScene.addEventListener('mouseenter',()=>{
            circleScene.classList.add('wheel-on');
        });
        circleScene.addEventListener('mouseleave',()=>{
            circleScene.classList.remove('wheel-on');
        });
    }

    function debounce(fn, delay=16){
        let timer;
        return function(...args){
            clearTimeout(timer);
            timer = setTimeout(()=>fn.apply(this, args), delay);
        }
    }

    function init(){
        buildCircleCharacters();
        setupTextFadeIn();
        setupWheelHint();
        window.addEventListener('scroll', debounce(onScroll));
        window.addEventListener('resize', debounce(onScroll));
        onScroll();
    }

    if(document.readyState === "loading"){
        document.addEventListener("DOMContentLoaded", init);
    }else{
        init();
    }
})();
