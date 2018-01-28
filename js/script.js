$(document).ready(function() {
    
    var names = [];
    var anchors = [];

    $('.section.withAnchor').each(function() {
        var nameSection = $(this).data('name'); 
        var nameParts = nameSection.split();
        names.push(nameParts[0]);

        var anchorSection = $(this).data('anchor'); 
        var anchorParts = anchorSection.split();
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
        scrollingSpeed: 1000,
        scrollOverflow: true,
        scrollOverflowOptions: {
            click: false,  
            wheelStep: 20
        },

        onLeave: function(index, nextIndex, direction){
            var nbSection = $('.section').length;
            if (nextIndex == nbSection) {
                $('.fp-nav__arrow.arrow-bottom').addClass('inactive')
            } else {
                $('.fp-nav__arrow.arrow-bottom').removeClass('inactive')
            }

            if (nextIndex == 1) {
                $('.fp-nav__arrow.arrow-top').addClass('inactive')
            } else {
                $('.fp-nav__arrow.arrow-top').removeClass('inactive')
            }                   

            // animation tooltip
            var indexEq = nextIndex-1;
            $("#fp-nav .fp-nav__dot ul li:eq("+indexEq+")").addClass('anim');
            setTimeout(function(){
                $("#fp-nav .fp-nav__dot ul li:eq("+indexEq+")").removeClass('anim');
            }, 1500);
                    
        },
        afterLoad: function(anchorLink, index){

        },
        afterRender: function(){
            movingSlider();
            wowAnime();
        },
        afterResize: function(){
            movingSlider();
        },


    });


    function MenuLateral() {
        $('#fp-nav').prepend('<div class="fp-nav__social"></div>');
        $('.fp-nav__social').append('<img src="./img/phone.svg"> ');
        $('.fp-nav__social').append('<img src="./img/mail.svg"> ');
        $('.fp-nav__social').append('<img src="./img/placement.svg"> ');
        $('#fp-nav ul').wrap('<div class="fp-nav__dot"></div>');
        $('.fp-nav__dot').prepend('<div class="fp-nav__arrow arrow-top"><img src="./img/arrow-top.svg"></div>');
        $('.fp-nav__dot').append('<div class="fp-nav__arrow arrow-bottom"><img src="./img/arrow-bottom.svg"></div>');

        $('.fp-nav__arrow.arrow-top').click(function() {
            var prevSection = $('.section.active.fp-completely').prev().data('anchor');
            if (prevSection !== undefined) {
                window.location.hash = "#"+prevSection+"";
            }
        });

        $('.fp-nav__arrow.arrow-bottom').click(function() {
            var nextSection = $('.section.active.fp-completely').next().data('anchor');
            if (nextSection !== undefined) {
                window.location.hash = "#"+nextSection+"";
            } 
        });

        $('#fp-nav ul li a').each(function() {
            if ( $(this).attr('href') === "#undefined" ) {
                $(this).parent('li').remove();
            }
        });
    
    }
    MenuLateral();
    
});


function wowAnime() {
    wow = new WOW(
        {
            boxClass:     'wow',      // default
            animateClass: 'animated', // default
            offset:       -150,          // default
            mobile:       false,       // default
            live:         true        // default
        }
    ).init(); 
}


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





