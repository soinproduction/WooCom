

$(document).ready(function(){
    $('.slick__slider').slick({
        accessibility: true,
        dots:false,
        prevArrow: '<button class="slick__slider-left slick__slider__btn"><img src="img/left.svg" alt="left"></button>',
        nextArrow: '<button class="slick__slider-right slick__slider__btn"><img src="img/right.png" alt="right"></button>',
        // centerMode:true,
        responsive: [
            {
              breakpoint: 1024, // - от какой ширины изменять настройки(1024 и ниже)
              settings: {
                // вносим изменения на ширине 1024 и ниже 
                slidesToShow: 1,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 320, // брекпоинтов может быть сколько угодно
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    });

    $('[data-modal=get_start]').on('click', function(){
        $('.overlay, #get__start').fadeIn('slow');
    });
    $('[data-modal=develop]').on('click', function(){
        $('.overlay, #develop').fadeIn('slow');
    });
    $('.modal__close, .overlay').on('click', function(){
        $('.overlay, #get__start, #develop, #thanks').fadeOut('slow');
    });

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                tel: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                tel: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    }

    valideForms('#start__form');
    valideForms('#develop__form');

    $('input[name=tel]').mask(" +3(999) 999-99-99");

    $('form').submit(function(e){
        e.preventDefault();
        $.ajax ({
            type: 'POST',
            url: 'mailer/smart.php',
            dara: $(this).serialize()
        }).done(function(){
            $(this).find('input').val('');
            $('#get__start, #develop').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // scroll
    $(window).scroll(function(){
        if($(this).scrollTop() > 1200) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    $("a[href^='#']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    $(".hamburger").click(function(event) {
        $(".hamburger").toggleClass('hamburger__active'),
        $(".nav").toggleClass('nav__active')
      });

  });

  


