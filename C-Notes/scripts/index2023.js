
function bookmarkInMain(url)
{
   if ((window.opener != null) && (! window.opener.closed)) 
   {
      window.opener.bookmark(url);
      closeIndex();
   }   
   else
   {
      alert("Some problem occurred with window.opener.");
   }
}


function closeIndex() 
{
   timer = setTimeout('window.close();', 10);
}
