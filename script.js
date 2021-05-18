var high_priority_array = [];
var low_priority_array = [];
var completed_array = [];
// var id = 0;


function populate_global_arrays() {
    if (localStorage.getItem("HP") === null) {
        localStorage.setItem("HP", JSON.stringify([]));
    }
    if (localStorage.getItem("LP") === null) {
        localStorage.setItem("LP", JSON.stringify([]));
    }
    if (localStorage.getItem("C") === null) {
        localStorage.setItem("C", JSON.stringify([]));
    }

    high_priority_array = JSON.parse(localStorage.getItem("HP"));
    low_priority_array = JSON.parse(localStorage.getItem("LP"));
    completed_array = JSON.parse(localStorage.getItem("C"));
}

function delete_bullet_db(task_field, index){
    let origin_list = JSON.parse(localStorage.getItem(task_field)).splice(index, 1);
    localStorage.setItem(task_field, origin_list);
}

function create_bullet_db(bullet){
    let origin_list = JSON.parse(localStorage.getItem(bullet.task_field));
    origin_list.append(bullet);
    localStorage.setItem(bullet.task_field, origin_list);
}

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

function complete_migration(task_field, index) {
    if (task_field != 'HP' || task_field != 'LP'){
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

function create_bullet(e) {
    e.preventDefault();
    var task_field = document.getElementById('bullet_task_field').value;
    var labels = document.getElementById('bullet_labels').value;
    var deadline = document.getElementById('bullet_deadline').value;
    var content = document.getElementById('bullet_contents').value;
    /* TODO: will have to change how we handle labels later; will probably have to loop
    across all label checkboxes and add the ones that have been selected to labels */
    let bullet = JSON.stringify({
        "task_field": task_field,
        "labels": labels,
        "deadline": deadline,
        "content": content,
        "CompTimeStamp": null
    });

    create_bullet_db(bullet); // CUD
    populate_global_arrays(); // READ
    updateView();
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

// When the user first opens the page, load up the dates
window.onload = display_date;

//TODO
function updateView() {

}
