function writeNavbar() {
  $.ajax({
    url: "navbar.html",
    cache: false,
    async: false,
    success: function(html){
      document.write(html);
    }
  });
}
