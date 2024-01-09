//------------------------------------------------------------------------------------------------------------------
// from http://msdn.microsoft.com/en-us/library/ms536437%28VS.85%29.aspx
//
// Workaround to make document.getElementById() follow W3C standard and only match on id
//
// You can make Internet Explorer's document.getElementById() method work according to W3C 
// standards and only return elements with matching id and not name by overriding the native 
// function in JavaScript like this:
//------------------------------------------------------------------------------------------------------------------
if (/msie/i.test (navigator.userAgent)) //only override IE
{
	document.nativeGetElementById = document.getElementById;
	document.getElementById = function(id)
	{
		var elem = document.nativeGetElementById(id);
		if(elem)
		{
			//make sure that it is a valid match on id
			if(elem.id == id)
			{
				return elem;
			}
			else
			{
				//otherwise find the correct element
				for(var i=1;i<document.all[id].length;i++)
				{
					if(document.all[id][i].id == id)
					{
						return document.all[id][i];
					}
				}
			}
		}
		return null;
	};
}



         function speedVid(videoID, rate) 
         {
            document.getElementById(videoID).playbackRate = rate;            
         }


//------------------------------------------------------------------------------------------------------------------
// This is included to (hopefully) allow the user to hit the Enter key to advance to the next "slide",
// as in PowerPoint. Although Powerpoint also uses the spacebar (32) to advance a slide, most browsers
// use the spacebar to page down, so it will not be programmed. Further, since backspace is used to 
// emulate the Back command in browsers, a shift-backspace is required to move back a "slide".
//
// Note that this requires each file's body tag to read
// <body onload="loadPage();" onkeyup="keypressed(event);">
//------------------------------------------------------------------------------------------------------------------
function keypressed(e)
{
   if (e.keyCode=='13')
   { 
      hideShowNext();
   }
   else if ((e.shiftKey) && (e.keyCode=='8'))
   { 
      hideShowPrevious();
   }
}

//------------------------------------------------------------------------------------------------------------------
// This function is called from the onload event of the body tag. It calls saveImageIDs, 
// loadPage and displayFirstSectionOnly.
//------------------------------------------------------------------------------------------------------------------
function loadPage()
{
   changeLogo();
   saveSections();
   saveImageIDs();
   displayFirstSectionOnly();
   showBookmark();   
}

//----------
// Must add id="307logo" to each notes page
//----------
function changeLogo()
{
	var source =  document.referrer;
	if (source.indexOf('homepages') >= 0)
	{	
	   if (source.indexOf('3307') == -1)
	   {
		   document.getElementById("307logo").src = "5307logoSm.jpg";
	   }
	}
}

//------------------------------------------------------------------------------------------------------------------
// Returns true if the searchedString begins with the findString, else return false.
//------------------------------------------------------------------------------------------------------------------
function startsWith(searchedString, findString)
{
   return searchedString.substring(0, findString.length) === findString
}
        
//------------------------------------------------------------------------------------------------------------------
// Save the ids of each section in an array for use in hiding sections.
// Get all of the section elements. If their id starts with "section", as in 
// "section01", "section02", etc., store then in the sectionIdArray.
//------------------------------------------------------------------------------------------------------------------
var sectionIdArray = []; 
function saveSections()
{             
   var sectionList = document.getElementsByTagName("section");
   var numSections = sectionList.length;
               
   var arrayIndex = 0;
   for (var ctr = 0; ctr < sectionList.length; ctr++)
   {
      if (startsWith(sectionList[ctr].id, "section")) 
      {
         sectionIdArray[arrayIndex] = sectionList[ctr].id;
         //alert ("Added " + sectionIdArray[arrayIndex] + ' in location ' + arrayIndex);
         arrayIndex++;                  
      }   
   } 
   /*
   for (var ctr = 0; ctr < sectionIdArray.length; ctr++)
   {
      alert(ctr + " = " + sectionIdArray[ctr]);   
   } 
   */   
}

//------------------------------------------------------------------------------------------------------------------
// save the ids of each image in an array for use in hiding images.
//------------------------------------------------------------------------------------------------------------------
var imageIdArray = [];
function saveImageIDs() 
{
     if (imageIdArray.length == 0)
     {
       // set image ID list
       imageIdArray[0]="prn";
       imageIdArray[1]="nextInHeader";
       imageIdArray[2]="nextInFooter";
       imageIdArray[3]="backInHeader";
       imageIdArray[4]="backInFooter";
   }
} 

//------------------------------------------------------------------------------------------------------------------
// Called on body load.  If user navigates away from the page that was bookmarked and goes back,
// this tries to go to the right point.
//------------------------------------------------------------------------------------------------------------------
function showBookmark()
{
   //window.location=url;
   if (urlIsBookmark())
   {
     var newURL = window.location.href; //getBookmarkUrl();
     var bm= getBookmarkUrl();
     bookmark(bm);
   }
}

//------------------------------------------------------------------------------------------------------------------
// This function cycles through all the section divs, and hides each one. 
// Then it displays section 1.  This is called from the onload event of the
// body tag.  It is included so that during page editing all sections can 
// remain open, but only section 1 is displayed when the page is viewed.
//
// See this version: http://noddychaspeaks.blogspot.com/2012/01/back-button-hack-for-webapps-built-on.html
//------------------------------------------------------------------------------------------------------------------
function displayFirstSectionOnly()
{ 
   // Hide all sections.
   for (var sctr=0; sctr < sectionIdArray.length; sctr++)
   {
       hideDiv(sectionIdArray[sctr]);
   }  
    
   //alert ("The " + currentDiv  + " div was displayed");
   //showDiv("section01");
   showDiv(sectionIdArray[0]);
}

//------------------------------------------------------------------------------------------------------------------
// opens the associated index file
//------------------------------------------------------------------------------------------------------------------
function showIndex(url) 
{
   self.name = "main"; // names current window as "main"
    var left = window.screenX;  // this shifts pop-up to proper monitor
   var windowprops = "toolbar=0,location=0,directories=0,status=0, " +
   "menubar=0,scrollbars=1,resizable=1,width=310,height=390"+ ",left=" + left;

   openWindow = window.open(url, "index", windowprops); // opens index
   if (window.focus) 
   {
     openWindow.focus()
   } 
}

//------------------------------------------------------------------------------------------------------------------
// opens the associated index file
//------------------------------------------------------------------------------------------------------------------
function showIndexW(url, windowWidth) 
{
   self.name = "main"; // names current window as "main"

   var left = window.screenX;  // this shifts pop-up to proper monitor
   var windowprops = "toolbar=0,location=0,directories=0,status=0, " +
   "menubar=0,scrollbars=1,resizable=1,width=" + windowWidth + ",height=390" + ",left=" + left ;
 


   openWindow = window.open(url, "index", windowprops); // opens index

   if (window.focus) 
   {
     openWindow.focus()
   } 
}


//------------------------------------------------------------------------------------------------------------------
// hide or show a div based on current display style
//------------------------------------------------------------------------------------------------------------------
function showHideDiv(divId, imgId)
{ 
      var style = document.getElementById(divId).style.display;
      if (style == "none")
      {
         document.getElementById(imgId).src = "images/collapse.gif";
         document.getElementById(divId).style.display = 'block';
         document.getElementById(divId).style.padding = '0px 0px 10px 25px ';           
      }
      else // == "block"
      {
         document.getElementById(imgId).src = "images/expand.gif";
         document.getElementById(divId).style.display = 'none';
      }
}

//------------------------------------------------------------------------------------------------------------------
// Given a section name as a parameter, hide that section.
//------------------------------------------------------------------------------------------------------------------
function hideDiv(id)
{ 
      //alert("Hiding " + id);
      document.getElementById(id).style.display = 'none';
      //document.getElementById(id).className="noshow";
}

//------------------------------------------------------------------------------------------------------------------
// Given a section name as a parameter, display that section.
//------------------------------------------------------------------------------------------------------------------
function showDiv(id) 
{
     //alert("Showing " + id);
     document.getElementById(id).style.display = 'block';
     //document.getElementById(id).className="";
}

//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
function toggleDiv(divId)
{
   var div = document.getElementById(divId);
   div.style.display = (div.style.display=="block" ? "none" : "block");
}

//------------------------------------------------------------------------------------------------------------------
// Given sections names as parameters, hide the first section and display the second.
// Used by the previous and next navigation buttons.
//------------------------------------------------------------------------------------------------------------------
function hideShow(hideSection, showSection)
{
    hideDiv(hideSection);
    showDiv(showSection);
    window.scroll(0,0);
    //alert("HideShow");
    //toggleDiv(hideSection);
    //toggleDiv(showSection);
}

//------------------------------------------------------------------------------------------------------------------
// Determines current section id and hides it.  Then to find next section id it extracts number portion of 
// current section id, increments it, appends it to "section" or "section0", and displays the next section.
// Used by the next navigation button.
//------------------------------------------------------------------------------------------------------------------
function hideShowNext()
{
    // Save the ids of all sections.
    if (sectionIdArray.length == 0) saveSections();

    getCurrentDiv();
	getCurrentDivIndex(); // gets currentDivIndex
    var currentSection=currentDiv;
    var currentSectionID = +currentSection.substring(7);

    // if not on last section, do
	//if (currentSectionID != sectionIdArray.length)
	if (sectionIdArray[currentDivIndex] != sectionIdArray[sectionIdArray.length-1])	
	
    {
       hideDiv(currentSection); 
       
       var nextSectionNumber = currentSectionID + 1;
       var nextSection = "";
       if (currentSectionID < 9)
       {
           nextSection = "section0" + nextSectionNumber;
       }
       else
       {
           nextSection = "section" + nextSectionNumber;
       }       
       
       // if just moved to last page, gray out next button
       //if (nextSectionNumber == sectionIdArray.length)
	   if (sectionIdArray[currentDivIndex+1] == sectionIdArray[sectionIdArray.length-1])   
       {
           document.getElementById("nextInHeader").src = "images/!rightArrowSmGray.png";
           document.getElementById("nextInHeader").alt = "Disabled next button.";
           document.getElementById("nextInFooter").src = "images/!rightArrowSmGray.png";
           document.getElementById("nextInFooter").alt = "Disabled next button.";
       }
       // if just moved from first page, set back button to active
       //if (currentSectionID == 1)
	   if (currentDivIndex == 0)	   
       {
           document.getElementById("backInHeader").src = "images/!leftArrowSm.png";
           document.getElementById("backInHeader").alt = "Move to previous section.";
           document.getElementById("backInFooter").src = "images/!leftArrowSm.png";
           document.getElementById("backInFooter").alt = "Move to previous section.";           
       }       

       showDiv(nextSection);
       scroll(0,0);
   }
}

//------------------------------------------------------------------------------------------------------------------
// Determines current section id and hides it.  Then to find previous section id it extracts number portion of 
// current section id, decrements it, appends it to "section" or "section0", and displays the previous section.
// Used by the previous navigation button.
//------------------------------------------------------------------------------------------------------------------
function hideShowPrevious()
{
    // Save the ids of all sections.
    saveSections();
    
    getCurrentDiv();
    var currentSection=currentDiv;
	getCurrentDivIndex(); // gets currentDivIndex
	//alert("currentDiv is " + currentDiv);
    var currentSectionID = +currentSection.substring(7);
	
	// if not on first section
    //if (currentSectionID != 1)
	if (sectionIdArray[currentDivIndex] != sectionIdArray[0])
    {
       hideDiv(currentSection);
    
       var previousSectionNumber = currentSectionID - 1;
       var previousSection = "";
       if (currentSectionID < 11)
       {
           previousSection = "section0" + previousSectionNumber;
       }
       else
       {
           previousSection = "section" + previousSectionNumber;
       }
       // if just moved to first page, gray out back button
       //if (previousSectionNumber == 1)
	   //alert("sectionIdArray[currentDivIndex] is " + sectionIdArray[currentDivIndex]);
	   //alert("sectionIdArray[0] is " + sectionIdArray[0]);
	   if (sectionIdArray[currentDivIndex-1] == sectionIdArray[0])	   
       {
           document.getElementById("backInHeader").src = "images/!leftArrowSmGray.png";
           document.getElementById("backInHeader").alt = "Disabled back button.";
           document.getElementById("backInFooter").src = "images/!leftArrowSmGray.png";
           document.getElementById("backInFooter").alt = "Disabled back button.";
       }
       // if just moved from last page, set next button to active
       //if (currentSectionID == sectionIdArray.length)
	   if (sectionIdArray[currentDivIndex] == sectionIdArray[sectionIdArray.length-1])	   
       {
           document.getElementById("nextInHeader").src = "images/!rightArrowSm.png";
           document.getElementById("nextInHeader").alt = "Move to next section.";
           document.getElementById("nextInFooter").src = "images/!rightArrowSm.png";
           document.getElementById("nextInFooter").alt = "Move to next section.";
       }
      
       showDiv(previousSection);
       scroll(0,0);
   }
}



var currentDiv = "";  // global to save originating div between show and hide ops
//------------------------------------------------------------------------------------------------------------------
// This function returns the div that is currently displayed.
//------------------------------------------------------------------------------------------------------------------
function getCurrentDiv()
{ 
   for (var sctr=0; sctr < sectionIdArray.length; sctr++)
   {      
       if (document.getElementById(sectionIdArray[sctr]).style.display == "block")
       {
          currentDiv = sectionIdArray[sctr];
          //alert ("The " + currentDiv  + " div is displayed");
       }
   } 
}

var currentDivIndex = 0;  // global to save originating div index between show and hide ops
//------------------------------------------------------------------------------------------------------------------
// This function returns the div that is currently displayed.
//------------------------------------------------------------------------------------------------------------------
function getCurrentDivIndex()
{ 
   for (var sctr=0; sctr < sectionIdArray.length; sctr++)
   {      
       if (document.getElementById(sectionIdArray[sctr]).style.display == "block")
       {
          currentDivIndex = sctr;
       }
   } 
}

//------------------------------------------------------------------------------------------------------------------
// This function displays the content of all sections for printing purposes.
// See embedded comments for details of each step.
//------------------------------------------------------------------------------------------------------------------
function printableVersion()
{
   // Save the ids of all navigation images as well as all sections.
   saveImageIDs();
   saveSections();
   
   getCurrentDiv(); 
   

   // Hide all navigation images.
   for (var ctr=0; ctr <imageIdArray.length; ctr++)
   {
       document.getElementById(imageIdArray[ctr]).style.display = 'none';
       //document.getElementById(imageIdArray[ctr]).className="noshow";

   }
     
   // Display the image for returning to original page.
   document.getElementById('close').style.display = 'block'; // added block
   //document.getElementById('close').className="";
   
   // Display all sections.
   for (var sctr=0; sctr <sectionIdArray.length; sctr++)
   {
       showDiv(sectionIdArray[sctr]);
   }   
   
   // Display all hidden elements.
   revealHidden();
}

//------------------------------------------------------------------------------------------------------------------
// This array contains the ids of the hidden sections so they can be revealed for printing
//------------------------------------------------------------------------------------------------------------------
var hiddenIDArray = [
     "HW",
     "SW1",
     "C",
     "O",
     "expandAnalystDiv",
     "expandSdevDiv",
     "expandDBDiv",
     "expandUXDiv",
     "expandFEDiv",
     "expandBE",
     "expandFSDiv",
     "expandNADiv",
     "expandCybersecurityDiv",
     "CY01",
     "CY02",
     "CY03",
     "CY04",
     "CY05",
     "expandAnalyticsDiv",
     "BA01",
     "BA02",
     "BA03",
     "BA04",
     "BA05"
]; 

//------------------------------------------------------------------------------------------------------------------
// This function reveals every hidden element for printing purposes.
//------------------------------------------------------------------------------------------------------------------
function revealHidden()
{
   var len = hiddenIDArray.length;
   for (var ctr = 0; ctr < len; ctr++) 
   {
      document.getElementById(hiddenIDArray[ctr]).style.display = 'block';
   }
}
         
//------------------------------------------------------------------------------------------------------------------
// This function re-hides every hidden element for normal view.
//------------------------------------------------------------------------------------------------------------------
function concealHidden()
{
   var len = hiddenIDArray.length;
   for (var ctr = 0; ctr < len; ctr++) 
   {
      document.getElementById(hiddenIDArray[ctr]).style.display = 'none';
   }
}         

//------------------------------------------------------------------------------------------------------------------
// determines if url is bookmark
//------------------------------------------------------------------------------------------------------------------
function urlIsBookmark()
{
   var url = window.location.href;
   var pound = url.lastIndexOf('#'); 
   return (pound >= 0);
}

//------------------------------------------------------------------------------------------------------------------
// get the url of the current bookmark
//------------------------------------------------------------------------------------------------------------------
function getBookmarkUrl()
{
   var url = window.location.href;
   var pound = url.lastIndexOf('#');   
   return url.substring(pound);
}

//------------------------------------------------------------------------------------------------------------------
// This function returns the display to the original version of the page.
// See embedded comments for details of each step.
//------------------------------------------------------------------------------------------------------------------
function originalVersion()
{ 
   // Hide all sections.
   for (var sctr=0; sctr <sectionIdArray.length; sctr++)
   {
       hideDiv(sectionIdArray[sctr]);
   }  
    
   //alert ("The " + currentDiv  + " div was displayed");
   showDiv(currentDiv);
   
   // Re-hide hidden elements.
   concealHidden();

   // Show all navigation images.
   for (var ctr=0; ctr <imageIdArray.length; ctr++)
   {
       document.getElementById(imageIdArray[ctr]).style.display = 'inline'; // added block
       //document.getElementById(imageIdArray[ctr]).className="";
   }  
   
   // Hide image for returning to original page.
   document.getElementById('close').style.display = 'none';
   //document.getElementById('close').className="noshow";
   
   if (urlIsBookmark())
   {
      window.top.location = getBookmarkUrl();
      window.scroll(0,0);
   }   
}

//------------------------------------------------------------------------------------------------------------------
// Move to the specified bookmark, even if the page is not displayed
//------------------------------------------------------------------------------------------------------------------
function bookmark(url)
{

   // if currentDiv has not been set, set it to section01
   if (!currentDiv)
   {
      saveSections();
      currentDiv = "section01";
   }

   // if close button is hidden (ie in single page mode) save section IDs and reset current div
   if (document.getElementById('close').style.display == 'none')
   {
      saveSections();
      // Save original div and div ID
      getCurrentDiv();
      //alert("resetting current div to " + currentDiv);
   }
   
   var originalSection=currentDiv;
   var originalSectionID = +originalSection.substring(7);
   //alert("Leaving " + originalSection);
    
   // hide all sections
   //saveSections();
   
   // if close button is hidden (ie in single page mode) then hide all sections
   if (document.getElementById('close').style.display == 'none')
   {
      for (var sctr=0; sctr <sectionIdArray.length; sctr++)
      {
          hideDiv(sectionIdArray[sctr]);
      }   
   }
   // go to url: 
   //window.location=url;
//   window.top.location=url;
//   window.scroll(0,0);

      // The next section of code locates the section in which the bookmark is located 
   
      // check parent
      var nodeID = url.substring(1);
      currentNode = document.getElementById(nodeID);
   
      var section = "";
      var parent = currentNode.parentNode;
      var bookmark = "";
      
      //alert("Parent class = " + parent.className);
      var isSectionHeader = parent.className == "h5";     
   
      // the first condition is tripped by parent.id being null, undefined, or false
      // moves up a parent node at a time until it finds one that starts with "section"
      while ((!parent.id) || (parent.id.substring(0,7) != "section"))
      {
         if (parent.id.substring(0,8) == "bookmark")
         { bookmark = parent.id; }
          parent = parent.parentNode;
      }

      var parentID = parent.id;
      //alert("parent id is " + parentID);
      if (parentID.substring(0,7) == "section")
      {
         section = parentID;
         currentDiv = section;    // added this to save bookmark section when returning to single page view
         //alert("Displaying " + section);
      }
      // display section
      showDiv(section);
      if (bookmark != "") 
      {
         //alert("bm = " + bookmark);
         showDiv(bookmark);
      }
   
      // if the bookmark is (the heading of) a section id then move to top of screen
      if (isSectionHeader) 
         window.scroll(0,0);
      else // force the url to go to the bookmark
      {
         //alert("Node id = " + nodeID);
         //alert("Div = " + currentDiv);
         //document.getElementById(currentDiv).scrollTop = document.getElementById(nodeID).offsetTop;
         document.getElementById(nodeID).scrollIntoView(true);

         //window.top.location=url;
      }
   // This section applies the correct navigation arrows
   
   // Save new div and div ID
   if (document.getElementById('close').style.display == 'none')
   {
      getCurrentDiv();
      //alert("resetting current div again to " + currentDiv);      
   }
   var newSection=currentDiv;
   var newSectionID = +newSection.substring(7);
   //alert("Arriving at " + newSection);

   // if just moved to last page, gray out next button
   if (newSectionID == sectionIdArray.length-1)
   {
       document.getElementById("nextInHeader").src = "images/!rightArrowSmGray.png";
       document.getElementById("nextInHeader").alt = "Disabled next button.";
       document.getElementById("nextInFooter").src = "images/!rightArrowSmGray.png";
       document.getElementById("nextInFooter").alt = "Disabled next button.";
   }
   
   // if just moved to first page, gray out back button
   if (newSectionID == 0)
   {
       document.getElementById("backInHeader").src = "images/!leftArrowSmGray.png";
       document.getElementById("backInHeader").alt = "Disabled back button.";
       document.getElementById("backInFooter").src = "images/!leftArrowSmGray.png";
       document.getElementById("backInFooter").alt = "Disabled back button.";
   }  

   // if just moved from first page, set back button to active
   if (originalSectionID == 0)
   {
       document.getElementById("backInHeader").src = "images/!leftArrowSm.png";
       document.getElementById("backInHeader").alt = "Move to previous section.";
       document.getElementById("backInFooter").src = "images/!leftArrowSm.png";
       document.getElementById("backInFooter").alt = "Move to previous section.";           
   }  
   
   // if just moved from last page, set next button to active
   if (originalSectionID == sectionIdArray.length-1)
   {       
	   document.getElementById("nextInHeader").src = "images/!rightArrowSm.png";
       document.getElementById("nextInHeader").alt = "Move to next section.";
       document.getElementById("nextInFooter").src = "images/!rightArrowSm.png";
       document.getElementById("nextInFooter").alt = "Move to next section.";
   }
   
}


//------------------------------------------------------------------------------------------------------------------
// Used in place of function originalVersion in first version
//------------------------------------------------------------------------------------------------------------------
function refresh()
{
   //window.location.reload();
   window.top.location.reload();
   window.scroll(0,0);
}

//------------------------------------------------------------------------------------------------------------------
//  Open a new window in which to display the filename passed in.
//------------------------------------------------------------------------------------------------------------------
function win ( pwidth, pheight, pleft, ptop, filename)
{
   var windowprops = "scrollbars=yes, resizable=yes" +
      ",left=" + pleft + ",top=" + ptop +
      ",width=" + pwidth + ",height=" + pheight;
   window.open(filename,"",windowprops);
}
	
// End -->

