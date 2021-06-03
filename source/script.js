import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

var high_priority_array = [];
var low_priority_array = [];
var completed_array = [];
var archive_array = [];

var filter_toggle = false;
var filter_start_date = null;
var filter_end_date = null;
var filter_label = null;
 
function toggle_filter(start_date, end_date, label) {
    if(filter_toggle === false){
        document.getElementById("search_off").style.display = "none";
        document.getElementById("search_on").style.display = "inline-block";
        filter_toggle = true;
        filter_start_date = start_date;
        filter_end_date = end_date;
        filter_label = label;
    } else {
        document.getElementById("search_off").style.display = "inline-block";
        document.getElementById("search_on").style.display = "none";
        filter_toggle = false;
        filter_start_date = null;
        filter_end_date = null;
        filter_label = null;
    }
    populate_global_arrays();
    update_view("HP");
    update_view("LP");
    update_view("C");
}

document.addEventListener('DOMContentLoaded', function(){
    populate_global_arrays(); //load arrays when page loads
    display_date(); // load up the dates
    auto_archive(168); // archive old bullets in complete - 168 hrs (7 days)
    update_view("HP");
    update_view("LP");
    update_view("C");
    update_view("A");
});

/*
    formats local storage, fills global arrays,
    and also shows the FAQ the first time the user enters the page
*/
function populate_global_arrays() {
    if (localStorage.getItem("HP") === null) {
        localStorage.setItem("HP", JSON.stringify({0:[]}));
        document.querySelector("#FAQ").click(); //shows the FAQ
        console.log('HP created');
    }
    if (localStorage.getItem("LP") === null) {
        localStorage.setItem("LP", JSON.stringify({0:[]}));
        console.log('LP created');
    }
    if (localStorage.getItem("C") === null) {
        localStorage.setItem("C", JSON.stringify({0:[]}));
        console.log('C created');
    }
    if (localStorage.getItem("A") === null) {
        localStorage.setItem("A", JSON.stringify({0:[]}));
        console.log('A created');
    }
    high_priority_array = JSON.parse(localStorage.getItem("HP"))[0];
    low_priority_array = JSON.parse(localStorage.getItem("LP"))[0];
    completed_array = JSON.parse(localStorage.getItem("C"))[0];
    archive_array = JSON.parse(localStorage.getItem("A"))[0];

    if(filter_toggle == true){    
        let bullet;
        let bullet_date;
        
        for(let i = low_priority_array.length - 1; i >= 0; i--) {
            bullet = low_priority_array[i];
            bullet_date = new Date(bullet.deadline.substring(0,4), bullet.deadline.substring(5,7), bullet.deadline.substring(8,10));
            if((bullet_date < filter_start_date && filter_start_date != null) || (bullet_date > filter_end_date && filter_end_date != null) || (bullet.labels != filter_label && filter_label != null)) {
                low_priority_array.splice(i, 1);
            }
        }

        for(let i = high_priority_array.length - 1; i >= 0; i--) {
            bullet = high_priority_array[i];
            bullet_date = new Date(bullet.deadline.substring(0,4), bullet.deadline.substring(5,7), bullet.deadline.substring(8,10));
            if((bullet_date < filter_start_date && filter_start_date != null) || (bullet_date > filter_end_date && filter_end_date != null) || (bullet.labels != filter_label && filter_label != null)) {
                high_priority_array.splice(i, 1);
            }
        }

        for(let i = completed_array.length - 1; i >= 0; i--) {
            bullet = completed_array[i];
            bullet_date = new Date(bullet.deadline.substring(0,4), bullet.deadline.substring(5,7), bullet.deadline.substring(8,10));
            if((bullet_date < filter_start_date && filter_start_date != null) || (bullet_date > filter_end_date && filter_end_date != null) || (bullet.labels != filter_label && filter_label != null)) {
                completed_array.splice(i, 1);
            }
        }
    }
}

/* localstorage objc
{
    HP: {
        0: [post1, post2, post3]
    },
    LP: {
        0: [post4, post5]
    },
    C: {
        0: [post6, post7]
    },
    A: {
        0: [post8]
    },
    ID: num
}
*/

//call this whenever a new bullet point is created
//returns an integer, which will be the unique bullet id
//ID's are reset to 1 whenever local storage is cleared
function get_bullet_id()
{
    if (localStorage.getItem("ID") === null) {
        localStorage.setItem("ID", 0);
        console.log('id set to 0');
    }
    let id = localStorage.getItem('ID');
    id++;
    localStorage.setItem('ID', id);
    return id;
}

function delete_bullet_db(task_field, id){
    let origin_list = JSON.parse(localStorage.getItem(task_field)); //js object
    for(let i = 0; i < origin_list[0].length; i++) { //search through and remove bullet
        if(origin_list[0][i].bullet_id == id){
            origin_list[0].splice(i, 1);
        }
    }
    localStorage.setItem(task_field, JSON.stringify(origin_list));
    populate_global_arrays();
    update_view(task_field);
}

function create_bullet_db(bullet){
    let origin_list = JSON.parse(localStorage.getItem(bullet.task_field));  // {0: [{bullet1},{bullet2} ...]}
    origin_list[0].unshift(bullet);
    localStorage.setItem(bullet.task_field, JSON.stringify(origin_list));
    populate_global_arrays(); // READ
    update_view(bullet.task_field);
}

//listens for the modal submission
document.querySelector("#save_edits").addEventListener('click', function() {
    let text = $('#edit_modal textarea').val().trim();
    if(text.length < 1) { //must type something!
        alert("Textarea is empty!");
        return;
    }
    let obj = {
        "task_field": $('#edit_task_field').text(),
        "labels": $('#edit_modal select').val(),
        "deadline": $('#edit_modal input').val(),
        "content": $('#edit_modal textarea').val(),
        "bullet_id": $('#edit_bullet_id').text(),
        "comp_time": $('#edit_comp_time').text()
    };
    edit_existing_bullet(obj);
    $('#edit_modal').modal('hide'); //close modal
});

document.querySelector("#delete_bullet").addEventListener('click', function() {
    let bullet_id = $('#edit_bullet_id').text();
    let task_field = $('#edit_task_field').text();
    delete_bullet_db(task_field, bullet_id);
    $('#edit_modal').modal('hide'); //close modal
});

//Helper method for editing contents of existing bullet
//accepts an entry javascript object
function edit_existing_bullet(new_entry_obj) {
    let current_bullet_id = new_entry_obj.bullet_id;
    let bullet_task_field = new_entry_obj.task_field;
    let current_list = JSON.parse(localStorage.getItem(bullet_task_field));
    let temp_bullet;
    let counter = 0;
    for(let bullet of current_list[0]){
        counter++;
        if(bullet.bullet_id == current_bullet_id) {
            temp_bullet = bullet;
            delete_bullet_db(bullet_task_field, temp_bullet.bullet_id);
            current_list = JSON.parse(localStorage.getItem(bullet_task_field));
            temp_bullet = new_entry_obj;
            current_list[0].splice(counter - 1, 0, temp_bullet); //Re-insert bullet at same spot it was before
            localStorage.setItem(bullet_task_field, JSON.stringify(current_list));
            populate_global_arrays();
            update_view(bullet_task_field);
            return;
        }
    }
}

//move a bullet from HP to LP, or LP to HP
function high_low_migration(task_field, id) {
    if (task_field != 'HP' && task_field != 'LP'){
        throw 'Wrong task_field: Cannot be completed';
    } else{
        if(task_field == 'HP') {
            let origin_list = JSON.parse(localStorage.getItem(task_field));
            let other_list = JSON.parse(localStorage.getItem('LP'));
            let temp_bullet;
            for(let bullet of origin_list[0]){
                if(bullet.bullet_id == id) { //find bullet in array
                    temp_bullet = bullet;
                    //find and remove from array HP
                    delete_bullet_db(temp_bullet.task_field, temp_bullet.bullet_id);
                    temp_bullet.task_field = 'LP';
                    //add to array LP
                    other_list[0].unshift(temp_bullet);
                    localStorage.setItem('LP', JSON.stringify(other_list));
                    populate_global_arrays();
                    update_view(task_field);
                    update_view("LP");
                    return;
                }
            }
            throw "Cannot find bullet id in task_field";
        } else { //LP
            let origin_list = JSON.parse(localStorage.getItem(task_field));
            let other_list = JSON.parse(localStorage.getItem('HP'));
            let temp_bullet;
            for(let bullet of origin_list[0]){
                if(bullet.bullet_id == id) { //find bullet in array
                    temp_bullet = bullet;
                    //find and remove from array LP
                    delete_bullet_db(temp_bullet.task_field, temp_bullet.bullet_id);
                    temp_bullet.task_field = 'HP';
                    //add to array HP
                    other_list[0].unshift(temp_bullet);
                    localStorage.setItem('HP', JSON.stringify(other_list));
                    populate_global_arrays();
                    update_view(task_field);
                    update_view("HP");
                    return;
                }
            }
            throw "Cannot find bullet id in task_field";
        }
    }
}

export { complete_migration, high_low_migration, delete_bullet_db, revert_complete_migration, archive_bullet };

//moves from LP or HP to complete
function complete_migration(task_field, id) {
    if (task_field != 'HP' && task_field != 'LP'){
        throw 'Wrong task_field: Cannot be completed';
    } else{
        let origin_list = JSON.parse(localStorage.getItem(task_field));
        let completed_list = JSON.parse(localStorage.getItem('C'));
        let temp_bullet;
        for(let bullet of origin_list[0]){
            if(bullet.bullet_id == id) { //find bullet in array
                temp_bullet = bullet;
                //find and remove from LP or HP
                delete_bullet_db(temp_bullet.task_field, temp_bullet.bullet_id);
                temp_bullet.task_field = 'C';
                const now = new Date();
                temp_bullet.comp_time = now.toISOString(); //set timestamp
                completed_list[0].unshift(temp_bullet); //insert new bullet to 'C'
                localStorage.setItem('C', JSON.stringify(completed_list));
                populate_global_arrays();
                update_view(task_field);
                update_view("C");
                return;
            }
        }
        throw "Cannot find bullet id in task_field";
    }
}

//moves from complete to LP
function revert_complete_migration(task_field, id){
    if(task_field != 'C'){
        throw 'Wrong task_field: Should be \'C\'! ';
    }
    else{
        let completed_list = JSON.parse(localStorage.getItem('C'));
        let low_priority_list = JSON.parse(localStorage.getItem('LP'));
        let temp_bullet;
        for(let bullet of completed_list[0]){
            if(bullet.bullet_id == id){
                temp_bullet = bullet;
                delete_bullet_db(temp_bullet.task_field, temp_bullet.bullet_id);
                temp_bullet.task_field = 'LP';
                temp_bullet.comp_time = null; //remove "comp_time"
                low_priority_list[0].unshift(temp_bullet); //By default moved to LP column, even if bullet was previously in HP column
                localStorage.setItem('LP', JSON.stringify(low_priority_list));
                populate_global_arrays();
                update_view(task_field);
                update_view("LP");
                return;
            }
        }
        throw "Cannot find bullet id in task_field - revert";
    }
}

/*
    Removes a bullet from complete and moves it to archive.
*/
function archive_bullet(task_field, id) {
    if(task_field != 'C'){
        throw 'Wrong task_field: Should be \'C\'! ';
    }
    else{
        let completed_list = JSON.parse(localStorage.getItem('C'));
        let archive_list = JSON.parse(localStorage.getItem('A'));
        let temp_bullet;
        for(let bullet of completed_list[0]){
            if(bullet.bullet_id == id){
                temp_bullet = bullet;
                delete_bullet_db(temp_bullet.task_field, temp_bullet.bullet_id);
                temp_bullet.task_field = 'A';
                archive_list[0].unshift(temp_bullet); //move to archive
                localStorage.setItem('A', JSON.stringify(archive_list));
                populate_global_arrays();
                update_view("C");
                update_view("A");
                return;
            }
        }
        throw "Cannot find bullet id in task_field - archive";
    }
}

/*
    When function is called, scans through the completed array for any
    bullet points that are older than 'hours' and moves them to archive.
    If hours is blank or invalid, defaults to 7 days (168 hours).
*/
function auto_archive(hours)
{
    let time;
    if(!hours || Number.isNaN(hours) || hours < 1) {time = 168 * 60 * 60 * 1000;}
    else {time = Math.floor(hours) * 60 * 60 * 1000;} //(hrs -> ms)

    let completed_list = JSON.parse(localStorage.getItem('C'));
    let date_limit = new Date(); //curr time of function call
    for(let bullet of completed_list[0])
    {
        let finish_time = bullet.comp_time;
        if(finish_time === null) {
            continue; // this should never happen, but just in case
        }
        else
        {
            let date_timestamp = new Date(finish_time); //bullet finish time
            date_timestamp.setTime(date_timestamp.getTime() + time); //add time
            if(date_timestamp < date_limit) {
                archive_bullet(bullet.task_field, bullet.bullet_id);
                console.log("auto archiving", bullet);
            }
        }
    }
}

function create_bullet(e) {
    e.preventDefault();
    let labels = document.getElementById('select2').value;
    let deadline = document.getElementById('entry_date').value;
    let content = document.getElementById('editor_text').textContent;
    let bullet_id = get_bullet_id();
    document.getElementById('editor_text').textContent = ""; //clear text box

    /* TODO: will have to change how we handle labels later; will probably have to loop
    across all label checkboxes and add the ones that have been selected to labels */
    let task_field = 'HP';

    let bullet = {
        "task_field": task_field,
        "labels": labels,
        "deadline": deadline,
        "content": content,
        "bullet_id": bullet_id,
        "comp_time": null
    };

    create_bullet_db(bullet); // CUD
}

function display_date()
{
    let arr = [];
    let today = new Date();
    const options = { weekday: 'long' };
    let gridDate;
    let gridDay;

    // Populate arr with date-day pairs
    for(let i = -1; i < 6; i++)
    {
        let day = new Date(today);
        day.setDate(day.getDate() + i); // i is an offset from today
        let dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(day); // Turns 0-6 into Sunday - Saturday
        let disp = {
            dayOfWeek: dayOfWeek.substring(0,3), // Sun - Sat
            date: day.getDate()
        }
        arr.push(disp);
    }

    // Move arr contents into display on page
    for (let j = 1; j < 8; j++) {
        gridDate = document.getElementById('dates_grid_item2' + j);
        gridDay = document.getElementById('dates_grid_item1' + j);
        gridDate.innerHTML = arr[j - 1].date;
        gridDay.innerHTML = arr[j - 1].dayOfWeek;
    }
}

/*
    Renders the task array onto its respective place in the DOM.
    task_field is a string that is either "HP", "LP", or "C"
*/
function update_view(task_field)
{
    if(task_field === "HP")
    {
        let box_hp = document.getElementById('hp_bullets');
        let bullet_points = box_hp.querySelectorAll("div > bullet-point");
        for(let b of bullet_points)
        {
            b.parentNode.removeChild(b); //clear bullet-points before rendering
        }

        for(let bullet of high_priority_array)
        {
            let new_bullet = document.createElement("bullet-point");
            new_bullet.entry = bullet;
            box_hp.appendChild(new_bullet);
        }
    }
    else if(task_field === "LP")
    {
        let box_lp = document.getElementById('lp_bullets');
        let bullet_points = box_lp.querySelectorAll("div > bullet-point");
        for(let b of bullet_points)
        {
            b.parentNode.removeChild(b); //clear bullet-points before rendering
        }
        for(let bullet of low_priority_array)
        {
            let new_bullet = document.createElement("bullet-point");
            new_bullet.entry = bullet;
            box_lp.appendChild(new_bullet);
        }
    }
    else if(task_field === "C")
    {
        let box_c = document.getElementById("c_bullets");
        let bullet_points = box_c.querySelectorAll("div > bullet-point");
        for(let b of bullet_points)
        {
            b.parentNode.removeChild(b); //clear bullet-points before rendering
        }
        for(let bullet of completed_array)
        {
            let new_bullet = document.createElement("bullet-point");
            new_bullet.entry = bullet;
            box_c.appendChild(new_bullet);
        }
    }
    else if(task_field === 'A')
    {
        let box_a = document.getElementById("a_bullets");
        let bullet_points = box_a.querySelectorAll("div > bullet-point");
        for(let b of bullet_points)
        {
            b.parentNode.removeChild(b); //clear bullet-points before rendering
        }
        for(let bullet of archive_array)
        {
            let new_bullet = document.createElement("bullet-point");
            new_bullet.entry = bullet;
            box_a.appendChild(new_bullet);
        }
    }
    else //error
    {
        let errMsg = `Attempting to render ${task_field}, this is not "HP", "LP", "C" or "A"`;
        throw errMsg;
    }
}

document.getElementById("search_submit").addEventListener("click", function() {
    let start_date = document.getElementById('start_day').value;
    let end_date = document.getElementById('end_day').value;
    let label = document.getElementById('select_search').value;

    if(start_date == "") {
        start_date = null;
    } else {
        start_date = new Date(start_date.substring(0,4), start_date.substring(5,7), start_date.substring(8,10));
    }

    if(end_date == "") {
        end_date = null;
    } else {
        end_date = new Date(end_date.substring(0,4), end_date.substring(5,7), end_date.substring(8,10));
    }

    if(label == "") {
        label = null;
    }

    document.getElementById('start_day').value = "";
    document.getElementById('end_day').value = "";
    document.getElementById('select_search').value = "";

    toggle_filter(start_date, end_date, label);
});

document.getElementById("search_on").addEventListener("click", toggle_filter_icon);

function toggle_filter_icon() {
    toggle_filter(null, null, null);
}

document.getElementById("closeModal").addEventListener("click", clear_search_modal);

function clear_search_modal() {
    document.getElementById('start_day').value = "";
    document.getElementById('end_day').value = "";
    document.getElementById('select_search').value = "";
}

// Enter key to create bullet
document.addEventListener("keydown", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
      if(selected_element == null){
          return;
      }
      else if(selected_element.id == 'editor_text'){ //If new bullet being created
        enter_new_bullet(event);
      }
    }
  });

//Helper method for enter key press create new bullet
function enter_new_bullet(event){
    let text_box_content = document.getElementById('editor_text').textContent;
    // Cancel the default action, if needed
    event.preventDefault();
    if(text_box_content != "") { //Prevent creation of empty bullets
        create_bullet(event);
    }
    else{
        let editor_box_text = document.getElementById('editor_text');
        editor_box_text.innerText = "";//If bullet is empty, clear the newline that enter key makes
    }
    reset_bullet_choices();
}

//Set default date to current day
let today_formatted = new Date();
let dd = String(today_formatted.getDate()).padStart(2, '0');
let mm = String(today_formatted.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today_formatted.getFullYear();

today_formatted = yyyy + '-' + mm + '-' + dd;
document.getElementById("entry_date").value = today_formatted;

//Helper method to clear Label/Date/HP selections after entering a new bullet
function reset_bullet_choices(){
    document.getElementById("select2").selectedIndex = 0;
    document.getElementById("entry_date").value = today_formatted;
}

//This will keep track of what element is selected for handling enter key presses (sets the appropriate element as selected_element)
let selected_element;
let default_text = document.getElementById('editor_text').textContent; //Note how this is not inside the function, meaning default_text is the default text put into the editor box on page load
window.addEventListener('mousedown', e => {
    if(e.target.tagName == 'BULLET-POINT' || e.target.tagName == 'DIV'){//Only set selected_element if a bullet point/the entry box div is clicked
        selected_element = e.target;

        if(selected_element.id == 'editor_text' && selected_element.textContent == default_text){ //Remove the instruction text from the entry box when clicked.
            document.getElementById('editor_text').textContent = "";
        }
    }
});

// handles back and forward buttons
window.onpopstate = function(event){
    if(event.state == null){
        setState("home", false);
    }else{
        setState(event.state.page, false);
    }
};

//if archive is clicked, toggle between archive page and home
document.querySelector('#archive').addEventListener('click', function(){
    var image = document.querySelector('#archive').src;
    image = image.split('/');
    image = image.pop();
    if(image == 'close.svg'){
        setState("home", true);
    }else{
        setState("archive", true);
    }
});

//if the user agrees to clear all bullets after pressing the clear button, clear storage and update view
document.querySelector('#clear').addEventListener('click', function(){
    if (window.confirm('Do you really want to delete all bullets?')){
        localStorage.clear();
        populate_global_arrays();
        update_view('C');
        update_view('HP');
        update_view('LP');
        update_view("A");
    }
});

//user clicks this to clear the archive
document.querySelector('#clear_archive').addEventListener('click', function(){
    if (window.confirm('Do you really want to empty the archive?')){
        localStorage.setItem("A", JSON.stringify({0:[]}));
        populate_global_arrays();
        update_view("A");
    }
});
