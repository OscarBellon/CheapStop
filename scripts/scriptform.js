
document.getElementById("icono-usuario").addEventListener("click", function () {
    //document.getElementById("botones-container").style.display = "none";
    //document.getElementById("slider-container").style.display = "none";
    var dropdownMenu = document.getElementById("usuario-desplegable");
    if (dropdownMenu.style.display === "none") {
      dropdownMenu.style.display = "block";
    } else {
      dropdownMenu.style.display = "none";
    }
  });
  document.getElementById("icono-menu").addEventListener("click", function(){
    window.location.href="index.html";
  })