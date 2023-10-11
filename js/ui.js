$(window).resize(function(){ 
  if (window.innerWidth >= 1024) {  
    //pc
    $("#wrap .m-menu").removeClass('on');
    $('header').removeClass('on');
    $('header').css('padding-bottom', 0);
    $('header .nav-sub').css('display', '');
  }
}).resize();

window.onload = function(){
  $('html,body').animate({
      scrollTop : 0
   }, 300);
  return false;
}

$(document).ready(function(){
  /* pc nav */
  $('.nav > li').hover(function(){
    if(  $("header .m-menu").hasClass('on') === false ){
      $(this).addClass('on');
      var navH = $(this).find('.nav-sub').innerHeight();
      $('header').addClass('on');
      $('header').css('padding-bottom', navH);
    }
  }, function(){
      $(this).removeClass('on');
      $('header').removeClass('on');
      $('header').css('padding-bottom', 0);
  });

  /* nav */
  $("header a.link").click(function(event){         
    event.preventDefault();
    if( $("header .m-menu").hasClass('on') ){
      $(this).siblings('.nav-sub').slideToggle();
      if( $(this).parents('ul').hasClass('nav-sub') || $(this).hasClass('link-go') ){
        $('html,body').animate({scrollTop:$(this.hash).offset().top - 40}, 500);
        $("header .m-menu").removeClass('on')
      }
    } else{
      $('.nav > li').removeClass('on');
      $('header').removeClass('on');
      $('header').css('padding-bottom', 0)
      $('html,body').animate({scrollTop:$(this.hash).offset().top - 40}, 500);
    }
  });

  /* scroll event  */
  var isScroll = false;
  $(window).scroll(function(){
    history.scrollRestoration = "auto";
    var $sclTop = $(window).scrollTop();
    var $intro2Top = $('#intro2').offset().top;
    var $company2Top = $('#company2').offset().top;
    var $section = $('.section');

    //company2
    if( $company2Top + 200 <= $sclTop ){
      if( isScroll ){
        //숫자 카운트 애니메이션
        $('#company2 .history-info .nums').each(function () {
          var $this = $(this),
              countTo = $this.attr('data-count');
          $({
              countNum: $this.text()
          }).animate({
              countNum: countTo
          }, {
              duration: 1000,
              easing: 'linear',
              step: function () {
                  $this.text(Math.floor(this.countNum));
              },
              complete: function () {
                  $this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
              }
          });
        });
        isScroll = false;
      }
    }

    //intro2
    if( $intro2Top/2 <= $sclTop ){
      if( !isScroll ){
        //숫자 카운트 애니메이션
        $('#intro2 .nums').each(function () {
          var $this = $(this),
              countTo = $this.attr('data-count');
          $({
              countNum: $this.text()
          }).animate({
              countNum: countTo
          }, {
              duration: 1000,
              easing: 'linear',
              step: function () {
                  $this.text(Math.floor(this.countNum));
              },
              complete: function () {
                  $this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
              }
          });
        });
        isScroll = true
      }
    }

    //index에만 해더투명처리
    if( $intro2Top < $sclTop ){
      $('header').removeClass('active');
    }
    if( $intro2Top > $sclTop ){
      $('header').addClass('active');
    }
    
    //스크롤시 section active
    $.each( $section, function(i) {
      var $target = $section.eq(i),
      $intro2Top = $target.offset().top - ($section.height() / 1.4);
      if( $intro2Top <= $sclTop ){
        $section.eq(i).addClass('active')
      }
    })

  }); 

  /* common swiper */
  var swiper = new Swiper('.swiper-type1', {
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }, 
    on: { 
      slideChangeTransitionStart: function() {
        if( $('.swiper-slide-active').hasClass('us') ){
          $('.product1-map h2.tit.kr').removeClass('on');
          $('.product1-map h2.tit.us').addClass('on');
        } else if( $('.swiper-slide-active').hasClass('kr') ){
          $('.product1-map h2.tit.us').removeClass('on');
          $('.product1-map h2.tit.kr').addClass('on');
        }
    }
  },
  });

  /* common swiper - publication */
  var swiper2 = new Swiper(".publication-swiper", {
    slidesPerView : 1,
    slidesPerGroup : 1, 
    loopFillGroupWithBlank : true,
    breakpoints: {
        1024: {
            slidesPerView : 2,
            slidesPerGroup : 2, 
            spaceBetween : 30,
            loopFillGroupWithBlank : true,
        },
      },
    navigation: {
      nextEl: ".publication-swiper .swiper-button-next",
      prevEl: ".publication-swiper .swiper-button-prev",
    },
  });

  /* common 게시판 더보기 */
  $(".press-area .press-news").slice(0, 6).show(); // 초기갯수
  $(".btn-press-more").click(function(e){ // 클릭시 more
      e.preventDefault();
      $(".press-area .press-news:hidden").slice(0, 6).show(); // 클릭시 more 갯수 지정
      if($(".press-news:hidden").length == 0){ // 컨텐츠 남아있는지 확인
        $(".btn-press-more").hide(); // 컨텐츠 없을시 more 삭제
    }
  });
    
  /* mobile 모바일 메뉴 */
  $("header .m-menu").click(function(){ 
    $(this).toggleClass('on');
  });
});