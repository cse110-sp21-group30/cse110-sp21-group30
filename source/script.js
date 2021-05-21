var high_priority_array = [];
var low_priority_array = [];
var completed_array = [];

document.addEventListener('DOMContentLoaded', function(){
    localStorage.clear(); //for testing, comment out to preserve local storage
    populate_global_arrays(); //load arrays when page loads
    display_date(); // load up the dates
    updateView("HP");
    updateView("LP");
    updateView("C");
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
    }
}
*/

function delete_bullet_db(task_field, index){
    let origin_list = JSON.parse(localStorage.getItem(task_field)).splice(index, 1);
    localStorage.setItem(task_field, origin_list);
    //call update_view(task_field) here??
}

function create_bullet_db(bullet){
    let origin_list = JSON.parse(localStorage.getItem(bullet.task_field));  // {0: [{bullet1},{bullet2} ...]}
    origin_list[0].push(bullet); //unshift() if we want to prepend??
    localStorage.setItem(bullet.task_field, JSON.stringify(origin_list));
}

//move a bullet from HP to LP, or LP to HP
function high_low_migration(task_field, index) {
    let origin_list = JSON.parse(localStorage.getItem(task_field));
    let temp_bullet = origin_list[index];

    if (task_field == 'HP') {
        delete_bullet_db(task_field, index);
        temp_bullet.task_field = 'LP';
        create_bullet_db(temp_bullet);
    } else if (task_field == 'LP') {
        delete_bullet_db(task_field, index);
        temp_bullet.task_field = 'HP';
        create_bullet_db(temp_bullet);
    } else {
        console.log('Wrong task_field: Cannot be completed');
    }
}

//mark a bullet as complete, move it from HP or LP to C.
function complete_migration(task_field, index) {
    if (task_field != 'HP' && task_field != 'LP'){
        console.log('Wrong task_field: Cannot be completed');
    } else{
        let origin_list = JSON.parse(localStorage.getItem(task_field));
        let completed_list = JSON.parse(localStorage.getItem('C'));
        let temp_bullet = temp_list[index];

        delete_bullet_db(task_field, index);
        temp_bullet.task_field = 'C';
        completed_list.prepend(temp_bullet);
        localStorage.setItem('C', completed_list);
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
    /* TODO: will have to change how we handle labels later; will probably have to loop
    across all label checkboxes and add the ones that have been selected to labels */

    if (task_field == true) {
        task_field = 'HP';
    }
    else{
        task_field = 'LP';
    }

    let bullet = {
        "task_field": task_field,
        "labels": labels,
        "deadline": deadline,
        "content": content,
        "CompTimeStamp": null
    };

    create_bullet_db(bullet); // CUD
    populate_global_arrays(); // READ
    updateView(task_field);
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
function updateView(task_field)
{
    if(task_field === "HP")
    {
        let box_hp = document.getElementById('box_hp');
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
        let box_lp = document.getElementById('box_lp');
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
        let box_c = document.getElementById("box_c");
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
