var high_priority_array = [];
var low_priority_array = [];
var completed_array = [];

document.addEventListener('DOMContentLoaded', function(){
    //localStorage.clear(); //for testing, comment out to preserve local storage
    populate_global_arrays(); //load arrays when page loads
    display_date(); // load up the dates
    update_view("HP");
    update_view("LP");
    update_view("C");
});

function populate_global_arrays() {
    if (localStorage.getItem("HP") === null) {
        localStorage.setItem("HP", JSON.stringify({0:[]}));
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
    high_priority_array = JSON.parse(localStorage.getItem("HP"))[0];
    low_priority_array = JSON.parse(localStorage.getItem("LP"))[0];
    completed_array = JSON.parse(localStorage.getItem("C"))[0];
}

/* localstorage obj
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
                if(bullet.bullet_id == id) {
                    temp_bullet = bullet;
                    delete_bullet_db(temp_bullet.task_field, temp_bullet.bullet_id);
                    temp_bullet.task_field = 'LP';
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
                if(bullet.bullet_id == id) {
                    temp_bullet = bullet;
                    delete_bullet_db(temp_bullet.task_field, temp_bullet.bullet_id);
                    temp_bullet.task_field = 'HP';
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

export { complete_migration, high_low_migration, delete_bullet_db, revert_complete_migration };

//moves from LP or HP to complete
function complete_migration(task_field, id) {
    if (task_field != 'HP' && task_field != 'LP'){
        throw 'Wrong task_field: Cannot be completed';
    } else{
        let origin_list = JSON.parse(localStorage.getItem(task_field));
        let completed_list = JSON.parse(localStorage.getItem('C'));
        let temp_bullet;
        for(let bullet of origin_list[0]){
            if(bullet.bullet_id == id) {
                temp_bullet = bullet;
                delete_bullet_db(temp_bullet.task_field, temp_bullet.bullet_id);
                temp_bullet.task_field = 'C';
                completed_list[0].unshift(temp_bullet); //insert removed bullet to 'C'
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
                low_priority_list[0].unshift(temp_bullet); //By default moved to LP column, even if bullet was previously in HP column
                localStorage.setItem('LP', JSON.stringify(low_priority_list));
                populate_global_arrays();
                update_view(task_field);
                update_view("LP");
                return;
            }
        }
        throw "Cannot find bullet id in task_field";
    }
}


/* press enter to submit the text post rather than pressing the button
let textBox = document.getElementById('editor_text');

textBox.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        console.log('yes');
    }
});
*/

let submitPost = document.getElementById('get_text');
submitPost.addEventListener('click', function(e){
    create_bullet(e);
});

function create_bullet(e) {
    e.preventDefault();
    let task_field = document.getElementById('check_priority').checked;
    let labels = document.getElementById('select2').value;
    let deadline = document.getElementById('entry_date').value;
    let content = document.getElementById('editor_text').textContent;
    let bullet_id = get_bullet_id();
    document.getElementById('editor_text').textContent = ""; //clear text box, temp fix?

    /* TODO: will have to change how we handle labels later; will probably have to loop
    across all label checkboxes and add the ones that have been selected to labels */

    if (task_field == true) {
        task_field = 'HP';
    }
    else {
        task_field = 'LP';
    }

    let bullet = {
        "task_field": task_field,
        "labels": labels,
        "deadline": deadline,
        "content": content,
        "bullet_id": bullet_id,
        "CompTimeStamp": null
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
            let section = box_hp.appendChild(new_bullet);
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
            let section = box_lp.appendChild(new_bullet);
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
            let section = box_c.appendChild(new_bullet);
        }
    }
    else //error
    {
        let errMsg = `Attempting to render ${task_field}, this is not "HP", "LP", or "C"`;
        throw errMsg;
    }
}

// Enter key to create bullet
document.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
      if(selected_element == null){
          return;
      }
      else if(selected_element.id == 'editor_text'){ //If new bullet being created
        enter_new_bullet(event);
      }
      else if(selected_element.tagName == 'BULLET-POINT'){
          let current_bullet_id = selected_element.shadowRoot.querySelector('span.bullet_id');
          let current_bullet_content = selected_element.shadowRoot.querySelector('p');
          let new_content = current_bullet_content.innerText;  
          new_content = new_content.replace(/\n/g, "");  //Remove the newline created in the bullet content when enter key is pressed   
          let bullet_task_field = selected_element.shadowRoot.querySelector('span.bullet_task_field').innerText;
          edit_exisitng_bullet(current_bullet_id, new_content, bullet_task_field);
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
}

//Helper method for editing contents of existing bullet
function edit_exisitng_bullet(current_bullet_id, new_content, bullet_task_field){
    let current_list = JSON.parse(localStorage.getItem(bullet_task_field));
    let temp_bullet;
    let counter = 0;
    for(let bullet of current_list[0]){ 
        counter = counter + 1;
        if(bullet.bullet_id == current_bullet_id.innerText) {
            temp_bullet = bullet;
            delete_bullet_db(bullet_task_field, temp_bullet.bullet_id);
            current_list = JSON.parse(localStorage.getItem(bullet_task_field));
            temp_bullet.task_field = bullet_task_field;
            temp_bullet.content = new_content;
            current_list[0].splice(counter -1, 0, temp_bullet); //Re-insert bullet at same spot it was before                    
            localStorage.setItem(bullet_task_field, JSON.stringify(current_list));
            populate_global_arrays();
            update_view(bullet_task_field);
            return;
        }
    }
}

//This will keep track of what element is selected for handling enter key presses (sets the appropriate element as selected_element)
let selected_element;
window.onclick = e => {
    if(e.target.tagName == 'BULLET-POINT' || e.target.tagName == 'DIV'){//Only set selected_element if a bullet point/the entry box div is clicked
        selected_element = e.target;

        if(selected_element.id == 'editor_text'){ //Remove the instruction text from the entry box when clicked.
            document.getElementById('editor_text').textContent = "";
        }
    }
} 
