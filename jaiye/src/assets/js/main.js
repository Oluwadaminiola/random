window.onscroll = function() {
  var header = document.querySelector("#header-scroll");

  // if (window.pageYOffset >= 1) {
  //   header.classList.add("is-sticky");
  // } else {
  //   header.classList.remove("is-sticky");
  // }
};

$(document).ready(function() {
  $(".hamburger-menu").on("click", function() {
    $(".bar").toggleClass("animate");
    var mobileNav = $(".mobile-nav");
    mobileNav.toggleClass("hide show");
    $("body").toggleClass("overflow_hidden");
  });
});