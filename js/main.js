(function ($) {
    "use strict";

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };
    
    
    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();
    
    // Initiate WOW.js
    var wow = new WOW({
        boxClass: 'wow', // default
        animateClass: 'animated', // default
        offset: 0, // default
        mobile: true, // default
        live: true // default
    });
    wow.init(); // Inicializar WOW antes de GSAP

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    // Typed Initiate
    if ($('.hero .hero-text h2').length == 1) {
        var typed_strings = $('.hero .hero-text .typed-text').text();
        var typed = new Typed('.hero .hero-text h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});

    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            }
        }
    });
    
    // Portfolio filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });

    // GSAP Section
    gsap.registerPlugin(ScrollTrigger);

    window.addEventListener("load", () => {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".wrapper",
                start: "top top",
                end: "+=150%",
                pin: true,
                scrub: true,
                markers: true
            }
        })
        .to("img", {
            scale: 2,
            z: 350,
            transformOrigin: "center center",
            ease: "power1.inOut"
        })
        .to(".section.hero", {
            scale: 1.1,
            transformOrigin: "center center",
            ease: "power1.inOut"
        }, "<");

        // Agregar animaciones adicionales para tus secciones que usan WOW.js
        gsap.from(".experience .wow.zoomIn", {
            scrollTrigger: {
                trigger: ".experience",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            scale: 0.5,
            duration: 1
        });

        gsap.from(".timeline-item.left", {
            scrollTrigger: {
                trigger: ".timeline-item.left",
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            x: -100,
            opacity: 0,
            duration: 1
        });

        gsap.from(".timeline-item.right", {
            scrollTrigger: {
                trigger: ".timeline-item.right",
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            x: 100,
            opacity: 0,
            duration: 1
        });
    });

    document.querySelectorAll('.btn-custom-web, .btn-custom-git').forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(() => button.blur(), 100);
        });
    });

})(jQuery);
