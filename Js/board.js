$(document).ready(function () {
  var txt = localStorage.getItem("txt");
  $(".board_ul").append("<li>" + txt + "</li>");
});
