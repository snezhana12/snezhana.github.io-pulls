$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/carousel/chevron-left-solid.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/carousel/chevron-right-solid.svg"></button>',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    prevArrow: '<button type="button" class="slick-prev"><img src="img/carousel/chevron-left-solid.svg"></button>',
                    nextArrow: '<button type="button" class="slick-next"><img src="img/carousel/chevron-right-solid.svg"></button>',
                }
            },
            {
              breakpoint: 767,
              settings: {
                prevArrow: '<button type="button" class="slick-prev"><img src="img/carousel/chevron-left-solid.svg"></button>',
                nextArrow: '<button type="button" class="slick-next"><img src="img/carousel/chevron-right-solid.svg"></button>',
              }
            },
            {
              breakpoint: 575,
              settings: {
                prevArrow: '<button type="button" class="slick-prev"><img src="img/carousel/chevron-left-solid.svg"></button>',
                nextArrow: '<button type="button" class="slick-next"><img src="img/carousel/chevron-right-solid.svg"></button>',
              }
            }
        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

   /*  modal */

   $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
    }); 
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut ('slow');
   });


   $('.button_mini').each(function (i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
   })

   function validateForms (form){
   $(form).validate({
    rules: {
        name:'required',
        phone:'required',
        email: {
            required: true,
            email: true
        }
    }, 
    messages: {
        name: "Пожалуйста, введите свое имя",
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свой e-mail",
          email: "Неправильно введен адрес почты"
        }
      }
   });
   };
   validateForms('#consultation-form');
   validateForms('#consultation form');
   validateForms('#order form');

   $('input[name=phone]').mask("+38 (999) 999-99-99");

   $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    })
    return false;
   });

   //smooth scroll and pageup

   $(window).scroll(function() {
    if($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
   });

   $("a[href=#up]").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
   });

   new WOW().init();
  });

