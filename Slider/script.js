let totalSlides = document.querySelectorAll('.slider--item').length;
let curretSlide = 0;



document.querySelector('.slider--width').style.width = 
    `calc(100vw * ${totalSlides} )`;

document.querySelector('.slider--controls').style.height = 
    `${document.querySelector('.slider').clientHeight}px`;






function goPrev(){
    curretSlide--;
    if(curretSlide < 0){
        curretSlide = totalSlides-1;
    }
    updateMargin();
}


function goNext(){
    curretSlide++;
    if(curretSlide >(totalSlides-1)){
        curretSlide=0;
    }
    updateMargin();
}


function updateMargin(){
    let sliderItemWidth = document.querySelector('.slider--item').clientWidth;
    let newMargin = (curretSlide * sliderItemWidth);
    document.querySelector('.slider--width').style.marginLeft =
    `-${newMargin}px`;
}


setInterval(goNext, 5000)