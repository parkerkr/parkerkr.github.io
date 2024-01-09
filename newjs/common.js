$(document).ready(function(){
    $('.cboxElement').colorbox({rel:'cboxElement'});    
});

//------------------------------------------------------------------------------------------------------------------
// Given a div id show or hide a div, depending on its status.  This provides a collapse/expand feature.
//------------------------------------------------------------------------------------------------------------------
function showHideDiv(divId, imgId)
{ 
      var style = document.getElementById(divId).style.display;
      if (style == "none")
      {
         document.getElementById(imgId).src = "images/minus.jpg";
         document.getElementById(divId).style.display = 'block';
         //document.getElementById(divId).style.marginLeft = '25px';
         //document.getElementById(divId).style.padding = '0px 0px 10px 25px ';           
      }
      else // == "block"
      {
         document.getElementById(imgId).src = "images/plus.jpg";
         //alert("setting to none in showHideDiv");
         document.getElementById(divId).style.display = 'none';
      }
}