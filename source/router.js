export const router = {};
/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
 router.setState = function(state, newState) {
    var body = document.querySelector('body');
    var header = document.querySelector('header');
    var columns = document.getElementById("column_view");

    //change state to settings
    if(state == "archive"){

      document.getElementById("edit").style.display = "none";
      document.getElementById("search").style.display = "none";
      document.getElementById("archive").src="./images/close.svg";
      document.getElementById("griditem").style.paddingLeft = "110px";
      document.getElementById("column_view").style.display="none";
      document.getElementById("archive_view").style.display="flex";
      document.getElementById("editor").style.display="none";
      document.getElementById("clear").style.display="none";

      header.className = "Archive"; //change header text
      if(newState){
        window.history.pushState({page: "archive"}, "archive", "#archive"); //push state and change URL
      }
    }else if(state == "home"){
      document.getElementById("edit").style.display = "inline-block";
      document.getElementById("search").style.display = "inline-block";
      document.getElementById("archive").src="./images/folder.png";
      document.getElementById("griditem").style.paddingLeft = "2px";
      document.getElementById("column_view").style.display="flex";
      document.getElementById("archive_view").style.display="none";
      document.getElementById("editor").style.display="grid";
      document.getElementById("clear").style.display="inline-block";

      if(newState){
        window.history.pushState({page: "home"}, "home", window.location.pathname + window.location.search); //push state and change URL
      }
    }
  }
