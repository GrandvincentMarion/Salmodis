wowAnime();

$(document).ready(function() {
    
    var names = [];
    var anchors = [];

    $('.section').each(function() {
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
           
        },
        afterResize: function(){
            //movingSlider();
        },


    });


    function MenuLateral() {
        $('#fp-nav').prepend('<div class="fp-nav__social"></div>');
        
        $('#fp-nav ul').wrap('<div class="fp-nav__dot"></div>');
        $('.fp-nav__dot').prepend('<div class="fp-nav__arrow arrow-top"><img src="./img/arrow-top.svg"></div>');
        $('.fp-nav__dot').append('<div class="fp-nav__arrow arrow-bottom"><img src="./img/arrow-bottom.svg"></div>');

        $('.fp-nav__social').append('<ul><li><img src="./img/phone.svg"><div class="fp-tooltip right phone">01 46 87 50 43</div></li><li><img src="./img/mail.svg"><div class="fp-tooltip right mail"><a href="mailto:salmodis@gmail.com">salmodis@gmail.com</a></div></li><li><img src="./img/placement.svg"><div class="fp-tooltip right address">SALMODIS, SA LE CREN<br />70C allée de Saint Malo<br />Marée 80115<br />94519 Rungis CEDEX</div></li></ul>');

        $('.fp-nav__arrow.arrow-top').click(function() {
            var prevSection = $('.section.fp-section.fp-table').first().data('anchor');
            if (prevSection !== undefined) {
                window.location.hash = "#"+prevSection+"";
            }
        });

        $('.fp-nav__arrow.arrow-bottom').click(function() {
            var nextSection = $('.section.fp-section.fp-table').last().data('anchor');
            if (nextSection !== undefined) {
                window.location.hash = "#"+nextSection+"";
            } 
        });

        $('#fp-nav ul li a').each(function() {
            if ( $(this).attr('href') === "#undefined" ) {
                $(this).parent('li').remove();
            }
        });

        if ( $('.section').hasClass('removeAnchor')) {
            $('.section.removeAnchor').each(function() {
                var indexToRemove = $(this).index();
                $('#fp-nav .fp-nav__dot ul li').eq(indexToRemove).css({'visibility': 'hidden', 'display' : 'none'})
            }); 
        }
        
    
    }
    MenuLateral();
    
    

	// Contact form
	$('form').submit(function(){
        
		var f = $(this).find('.champs'), 
		ferror = false, 
        emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
        
		f.children('input').each(function(){ // run all inputs
			var i = $(this); // current input
			var rule = i.attr('data-rule');
            
			if( rule !== undefined ){
                var ierror=false; // error flag for current input
                var pos = rule.indexOf( ':', 0 );
            
                if( pos >= 0 ){
                    var exp = rule.substr( pos+1, rule.length );
                    rule = rule.substr(0, pos);
                }else{
                    rule = rule.substr( pos+1, rule.length );
                }
                switch( rule ){
                    case 'required':
                    if( i.val()==='' ){ ferror=ierror=true; }
                    break;
                    
                    case 'maxlen':
                    if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
                    break;

                    case 'email':
                    if( !emailExp.test(i.val()) ){ ferror=ierror=true; }
                    break;

                    case 'checked':
                    if( !i.attr('checked') ){ ferror=ierror=true; }
                    break;
                    
                    case 'regexp':
                    exp = new RegExp(exp);
                    if( !exp.test(i.val()) ){ ferror=ierror=true; }
                    break;
                }
				i.next('.validation').html( ( ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '' ) ).show('blind');
			}
		});
		f.children('textarea').each(function(){ 

			var i = $(this); 
			var rule = i.attr('data-rule');

			if( rule !== undefined ){
			    var ierror=false; // error flag for current input
                var pos = rule.indexOf( ':', 0 );
                
                if( pos >= 0 ){
                    var exp = rule.substr( pos+1, rule.length );
                    rule = rule.substr(0, pos);
                }else{
                    rule = rule.substr( pos+1, rule.length );
                }
                switch( rule ){
                    case 'required':
                    if( i.val()==='' ){ ferror=ierror=true; }
                    break;
                    
                    case 'maxlen':
                    if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
                    break;
                }
				i.next('.validation').html( ( ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '' ) ).show('blind');
			}
        });
        
		if( ferror ) return false; 
        else var str = $(this).serialize();	
        console.log(str)
        
        $.ajax({
            type: "POST",
            url: "./js/contact.php",
            data: str,
            success: function(msg){
                $(".sendmessage").addClass("show");
                $(".errormessage").ajaxComplete(function(event, request, settings){
    
                    if(msg == 'OK'){
                        $(".sendmessage").addClass("show");				
                    }
                    else{
                        $(".sendmessage").removeClass("show");
                        result = msg;
                    }
    
                    $(this).html(result);
                });
            }
        });
        return false;
	});

});


function wowAnime() {
    wow = new WOW({
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       -150,          // default
        mobile:       false,       // default
        live:         true        // default
    }).init(); 
}


//menu responsive 
function menuResponsive() {
    if (window.innerWidth <= 767) {
        document.querySelector(".navbar-icon a").addEventListener("click", function(event) {
            event.preventDefault();
        }, false);
    
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
}
menuResponsive();
window.addEventListener('resize', function(event){
    console.log('here')
    menuResponsive();
});



// slider fullpage #homepage
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

function formulaire() {
    var thisInput = document.querySelectorAll('form .champs input, form .champs textarea');
    for (var i = 0; i < thisInput.length; i++) {
        thisInput[i].addEventListener("focus", function(event){
            event.target.parentNode.children[0].classList.add('active');
        });

        thisInput[i].addEventListener("focusout", function(event){
            if ( event.target.value === "") {
                event.target.parentNode.children[0].classList.remove('active');
            }
        });
    }

}
formulaire()


$(document).ready(function() {
    if ( $('.gallery-content').length > 0 ) {
        $('.gallery-content').magnificPopup({
            delegate: 'a',
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: false,
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            image: {
                verticalFit: true,
                titleSrc: function(item) {
                    return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
                }
            },
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function(element) {
                    return element.find('img');
                }
            }
        });
    }
});