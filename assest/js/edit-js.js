jQuery(function ($) {
  $(window).on('load', function () {
    $('#prelodaer').fadeOut(300);
  });
  // =====================scroll top
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 500) {
      $('.scroll-to-target').addClass('open');
    } else {
      $('.scroll-to-target').removeClass('open');
    }
  });
  if ($('.scroll-to-target').length) {
    $(".scroll-to-target").on('click', function () {
      var target = $(this).attr('data-target');
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 500);
    });
  }
  // ============fixed-header
  function headerfixed() {
    var getscrltop = $(this).scrollTop();
    if (getscrltop > 0) {
      $('.main_header').addClass('sticky-header');
    } else {
      $('.main_header').removeClass('sticky-header');
    }
  }
  $(window).scroll('scroll resize', headerfixed);
  // ============navigation
  function sidemenu() {
    $('.nav_sec').toggleClass('slidein');
    if (!$('.nav_sec .cls-btn').length) {
      $('.nav_sec').prepend('<div class="cls-btn"></div>');
    }
  }
  $('body').find('.toggle-menu').on('click', sidemenu);
  $('.nav_sec ul > li > ul').parent().prepend('<i class="arw-nav"></i>');
  function subMenu() {
    $(this).parent('li').find('> ul').stop(true, true).slideToggle();
    $(this).parents('li').siblings().find('ul').stop(true, true).slideUp();
    $(this).toggleClass('actv');
    $(this).parent().siblings().find('.arw-nav').removeClass('actv');
  }
  $('.nav_sec ul > li > .arw-nav').on('click', subMenu);
  $(document).ready(function () {
    $('.toggle-menu').click(function () {
      $('.overlay').addClass('show');
    });
    $('body').on('click', '.cls-btn', function () {
      $('.nav_sec').removeClass('slidein');
      $('.overlay').removeClass('show');
    });
    $('.overlay').click(function () {
      $('.nav_sec').removeClass('slidein');
      $(this).removeClass('show');
    });
    $(document).ready(function () {
      $(".has-mega-menu").hover(
        function () {
          $(this).find(".mega-menu").stop(true, true).fadeIn(300);
        },
        function () {
          $(this).find(".mega-menu").stop(true, true).fadeOut(200);
        }
      );
    });

  });
  // ============Banner Slider
  var swiper = new Swiper(".bannerSwiper", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
  });
  // ============Tab Gallery
  $(document).ready(function () {
    $(".tabs li").on("click", function () {
      $(".tabs li").removeClass("active");
      $(".tab-content").removeClass("active");
      $(this).addClass("active");
      $("#" + $(this).data("tab")).addClass("active");
    });
  });
  // ============Glightbox
  const lightbox = GLightbox({
    selector: '.glightbox'
  });
  // ============Latest Announcements & Updates Slider
  var swiper = new Swiper(".announcementSwiper", {
    navigation: {
      nextEl: ".next_btn",
      prevEl: ".prev_btn",
    },
    slidesPerView: 'auto',
    loop: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 15,
      }
    }
  });
  //=====================AOS Animation
  AOS.init({
    duration: 1000,
    once: true,
  });
  //=====================Counter
  $(document).ready(function () {
    let started = false;
    function startCounter() {
      if (started) return;
      started = true;
      $(".counter").each(function () {
        let $this = $(this);
        let target = parseInt($this.attr("data-target"));
        let count = 0;
        let speed = target / 200;
        function updateCount() {
          if (count < target) {
            count += speed;
            $this.text(Math.ceil(count) + "+");
            requestAnimationFrame(updateCount);
          } else {
            $this.text(target + "+");
          }
        }
        updateCount();
      });
    }
    $(window).on("scroll", function () {
      let sectionTop = $(".counter-section").offset().top;
      let scrollPos = $(window).scrollTop() + $(window).height();
      if (scrollPos > sectionTop + 100) {
        startCounter();
      }
    });
  });
  //=====================Timeline slider
  $(document).ready(function () {
    var years = [
      "1935", "1936", "1937", "1946", "1947",
      "1952", "1956", "1960", "1962", "1983-84", "2009"
    ];
    var visibleStart = 0;
    var visibleLimit = 4;
    function renderYears() {
      $("#yearList").empty();
      let sliced = years.slice(visibleStart, visibleStart + visibleLimit);
      sliced.forEach((year, i) => {
        $("#yearList").append(
          `<li data-slide="${visibleStart + i}">${year}</li>`
        );
      });
      highlightActiveSlide();
    }
    function highlightActiveSlide() {
      let activeSlide = timelineSwiper.activeIndex;

      $("#yearList li").removeClass("active");

      $("#yearList li").each(function () {
        if ($(this).data("slide") == activeSlide) {
          $(this).addClass("active");
        }
      });
    }
    var timelineSwiper = new Swiper('.timeline-swiper', {
      direction: 'vertical',
      speed: 1000,
      loop: false
    });
    timelineSwiper.on('slideChange', highlightActiveSlide);
    renderYears();
    $(document).on("click", "#yearList li", function () {
      let index = $(this).data("slide");
      timelineSwiper.slideTo(index);
      highlightActiveSlide();
    });
    $(".next-btn").click(function () {
      if (visibleStart + visibleLimit < years.length) {
        visibleStart++;
        renderYears();
      }
    });
    $(".prev-btn").click(function () {
      if (visibleStart > 0) {
        visibleStart--;
        renderYears();
      }
    });
  });
  // ============Upload Cv
  $(".browseBtnModern").on("click", function (e) {
    e.preventDefault();
    $("#cvUpload").trigger("click");
  });

  $("#cvUpload").on("change", function () {
    let fileName = this.files.length ? this.files[0].name : "";
    if (fileName) {
      $(".uploadFileName").text(fileName);
    }
  });

});
// ============Timeline
document.addEventListener("DOMContentLoaded", () => {
    const revealItems = document.querySelectorAll(".reveal");

    const activeOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealItems.forEach((item) => {
            const itemTop = item.getBoundingClientRect().top;

            if (itemTop < triggerBottom) {
                item.classList.add("active");
            } else {
            }
        });
    };

    window.addEventListener("scroll", activeOnScroll);
    activeOnScroll(); 
});
// =============Copy Right Date Change
document.getElementById("year").textContent = new Date().getFullYear();