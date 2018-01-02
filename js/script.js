$(document).ready(function() {
	$('#fullpage').fullpage({
        anchors: ['salmodis', 'qui-sommes-nous-?', 'nos-produits-d-aquaculture', 'nos-produits-salaison', 'notre-galerie-photo', 'contact'],
        menu: '#menu',
        css3:true,
        autoScrolling: true,
        responsiveWidth: 767,
        navigation: true,
		navigationPosition: 'right',
		navigationTooltips: ['Salmodis', 'Qui sommes-nous ?', "Produits d'aquaculture", 'Produits salaison', 'Galerie photo', 'Contact'],

        onLeave: function(index, nextIndex, direction){

            //sticky header
            var header = $('.navbar');
            if(nextIndex > 1) {
                header.addClass('sticky');
            }
            else if (nextIndex == 1) {
                header.removeClass('sticky');
            }

            // color of navigation
            if (nextIndex == 2 || nextIndex == 4 || nextIndex == 5) {
                $('#fp-nav').addClass('dark');
            } 
            else {
                $('#fp-nav').removeClass('dark');
            }

            // animation section-2
            if (nextIndex == 2) {
                setInterval(function(){
                    $('#entreprise-section .card .col-md-3').removeClass('active')
                }, 200);
            }

            // animation section-3
            if (nextIndex == 3) {
                setInterval(function(){
                    $('#produits-aquaculture .navbar-middle ul').removeClass('active')
                }, 200);
            }

            // animation section-3
            if (nextIndex == 4) {
                setInterval(function(){
                    $('#produits-salaison .navbar-middle ul').removeClass('active')
                }, 200);
            }
        },

    });
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
    var years = document.querySelector('.header-title span').firstChild.nodeValue;

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
movingSlider()


window.addEventListener('resize', function(){
    movingSlider()
});
