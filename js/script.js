$(document).ready(function() {
    
    var names = [];
    var anchors = [];
    
    $('.section').each(function() {
        var nameSection = $(this).data('name'); 
        var anchorSection = $(this).data('anchor'); 
        var anchorParts = anchorSection.split();
        var nameParts = nameSection.split();
        names.push(nameParts[0]);
        anchors.push(anchorParts[0]);
    });
    

	$('#fullpage').fullpage({
        anchors: anchors,
        scrollBar: true,
        autoScrolling: true,
        responsiveWidth: 767,
        navigation: true,
		navigationPosition: 'right',
        navigationTooltips: names,
        scrollingSpeed: 800,
        scrollOverflow: true,
        scrollOverflowOptions: {
            click: false,  
            wheelStep: 20
        },

        onLeave: function(index, nextIndex, direction){
            //sticky header | every page
            var header = $('.navbar');
            if(nextIndex > 1) {
                header.addClass('sticky');
            }
            else if (nextIndex == 1) {
                header.removeClass('sticky');
            }

            // color of navigation
            if ( $('.section').eq(nextIndex-1).hasClass('black-dot') === true) {
                $('#fp-nav').addClass('dark');
            } 
            else if ($('.section').eq(nextIndex-1).hasClass('black-dot') === false){
                $('#fp-nav').removeClass('dark');
            }
          
        },
        afterLoad: function(anchorLink, index){
           
        },

        afterRender: function(){
            movingSlider();

            if( $('.navbar').hasClass('sticky')) {
                console.log('here')
                $('.navbar').removeClass('wow').css('visibility', 'visible');
            }
            wow = new WOW(
                {
                    boxClass:     'wow',      // default
                    animateClass: 'animated', // default
                    offset:       0,          // default
                    mobile:       false,       // default
                    live:         true        // default
                }
            ).init();

        }

    });
    $.fn.fullpage.reBuild();
});

//menu responsive 
function menuResponsive() {
    
    var menuResponsive = document.querySelector('.menu-responsive');
    var copy = document.querySelector('.navbar ul.menu').cloneNode(true);
    menuResponsive.appendChild(copy)

    var open = document.querySelector('.navbar .navbar-icon img');
    var close = document.querySelector('.menu-responsive img');
    open.addEventListener("click", function(){
        menuResponsive.classList.add('active');
    });
    close.addEventListener("click", function(){
        menuResponsive.classList.remove('active');
    });
}
menuResponsive();




// slider first section
function fullSlideshow() {
    var background = document.querySelectorAll('.full-background img.background');
    if (background.length === 0) {
       return
    }
    var backgroundLength = background.length
    var index = 0;
    
    setTimeout(function(){
        background[index].classList.add('active');
    }, 40);

    setInterval(function(){
        background[index].classList.remove('active')
        index++
        if(index === backgroundLength) {
            index = 0
        }
        background[index].classList.add('active')
    }, 5000);   
    
   

}
fullSlideshow()


function numberOfYears() {
    var year = document.querySelector('.header-title span')
    if (year === null) {
        return
    }
    var years = year.firstChild.nodeValue;
    setInterval(function(){
        years--
        if (years >= 1978) {
            document.querySelector('.header-title span').innerHTML = years;
        }
        if (years == 1978) {
            document.querySelector('.header-title span').classList.add('anim');
        }

    },75);
}
numberOfYears();


function movingSlider() {
    var slider      = document.querySelector('.galerie-slideshow');
    if (slider === null) {
        return
    }
    var sliderITEM  = document.querySelectorAll('.galerie-slideshow-item');
    var sliderPOS   = slider.offsetLeft;
    var index       = 0;
    var wScreen     = window.innerWidth;

    for (var i = 0; i < sliderITEM.length; i++) {
        var w = index +=sliderITEM[i].clientWidth;
    }

    slider.style.width = w + "px";

    setInterval(function(){
        if (slider.offsetLeft == 0) {
            slider.style.left = wScreen - w + "px";
        }
        if (slider.offsetLeft == wScreen - w) {
            slider.style.left = 0 + "px";
        }
    },10);

}

window.addEventListener('resize', function(){
    movingSlider()
});

