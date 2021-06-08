export const router = {};
import { remove_filter } from './script.js';
/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
 router.setState = function(state, newState) {
    var body = document.querySelector('body');
    var header = document.querySelector('header');
    var columns = document.getElementById("column_view");

    //change state to settings
    if (state == "archive") {
      remove_filter();
      document.getElementById("edit").style.display = "none";
      document.getElementById("search_off").style.display = "none";
      document.getElementById("search_on").style.display = "none";
      document.getElementById("archive").src="./images/revert.svg";
      document.getElementById("griditem").style.paddingLeft = "87px";
      document.getElementById("column_view").style.display="none";
      document.getElementById("archive_view").style.display="flex";
      document.getElementById("editor").style.display="none";
      document.getElementById("clear").style.display="none";

      if (newState){
        window.history.pushState({page: "archive"}, "archive", "#archive"); //push state and change URL
      }
    } else if (state == "home") {
      remove_filter();
      document.getElementById("edit").style.display = "inline-block";
      document.getElementById("search_off").style.display = "inline-block";
      document.getElementById("search_on").style.display = "none";
      document.getElementById("archive").src="./images/archive.svg";
      document.getElementById("griditem").style.paddingLeft = "2px";
      document.getElementById("column_view").style.display="flex";
      document.getElementById("archive_view").style.display="none";
      document.getElementById("editor").style.display="grid";
      document.getElementById("clear").style.display="inline-block";

      if (newState) {
        window.history.pushState({page: "home"}, "home", window.location.pathname + window.location.search); //push state and change URL
      }
    }
  }
