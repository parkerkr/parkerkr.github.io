//-------------------------------------------------------------------------
// Called on body load.  If user navigates away from the page that was bookmarked and goes back,
// this tries to go to the right point.
//-------------------------------------------------------------------------
function showBookmark()
{
   //window.location=url;
   if (urlIsBookmark())
   {
     var newURL = window.location.href; //getBookmarkUrl();
     var bm  = getBookmarkUrl();
     //alert("bookmark is " + bm);
     bookmark(bm);
   }
}

//-------------------------------------------------------------------------
// determines if url is bookmark
//-------------------------------------------------------------------------
function urlIsBookmark()
{
   var url = window.location.href;
   var pound = url.lastIndexOf('#'); 
   return (pound >= 0);
}

//-------------------------------------------------------------------------
// get the url of the current bookmark
//-------------------------------------------------------------------------
function getBookmarkUrl()
{
   var url = window.location.href;
   var pound = url.lastIndexOf('#');   
   return url.substring(pound);
}

//--------------------------------------------------------------------------
// Given a section name as a parameter, display that section.
//--------------------------------------------------------------------------
function showDiv(id) 
{
     //alert("Showing " + id);
     document.getElementById(id).style.display = 'block';
     //document.getElementById(id).className="";
}

//--------------------------------------------------------------------------
// Move to the specified bookmark, even if the page is not displayed
//--------------------------------------------------------------------------
function bookmark(url)
{
 
      var nodeID;
      var pound = url.lastIndexOf('#');   
      var bookmark = url.substring(pound+1);
      if (bookmark != "") 
      {
         //alert("bm = " + bookmark);
         showDiv(bookmark);
      }
      if (bookmark=="expandCurriculumDevelopmentDiv")
         {nodeID = "curriculumDev";}
      else if (bookmark=="expandPresentationsDiv")
         {nodeID = "Presentations";}
      document.getElementById(nodeID).scrollIntoView(true); 
}