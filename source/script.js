var high_priority_array = [];
var low_priority_array = [];
var completed_array = [];
// var id = 0;


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

function delete_bullet_db(task_field, index){
    let origin_list = JSON.parse(localStorage.getItem(task_field)).splice(index, 1);
    localStorage.setItem(task_field, origin_list);
    //call update_view(task_field) here??
}
/* localstorage obj
{
    HP: {
        0: [post1, post2, post3]
    }
    LP: {
        0: []
    }
    C: {
        0: []
    }
}
*/

function create_bullet_db(bullet){
    let origin_list = JSON.parse(localStorage.getItem(bullet.task_field));  //{0: [one,two,three]} 
    origin_list[0].push(bullet);
    localStorage.setItem(bullet.task_field, JSON.stringify(origin_list));
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

document.addEventListener('DOMContentLoaded', function(){
    //localStorage.clear(); //for testing, comment out to preserve local storage
    populate_global_arrays(); //load arrays when page loads
    display_date(); // load up the dates
    updateView("HP");
    updateView("LP");
    updateView("C");
    /*
    fetch("test.json")
    .then(response => response.json())
    .then(entries => {
        entries.forEach((entry) => {
            console.log(entry);
            let new_bullet;
            new_bullet = document.createElement("bullet-point");
            new_bullet.entry = entry;

            let section = document.getElementById('box_hp');
            section.appendChild(new_bullet);
        })
    })
    */
});

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


function updateView(task_field) //("HP")
{ 
 //clear the children of the header before appending
 /*
 let new_bullet = document.createElement("bullet-point");
 new_bullet.entry = entry;
 let section = document.getElementById('box_hp').appendChild(new_bullet);
 */

 if(task_field === "HP") {
     let hp_header = document.getElementById("high_priority_header");
    for(let bullet of high_priority_array) {
       let hp = document.createElement('div');
       hp.textContent = bullet.content;
       hp_header.appendChild(hp);
    }
 } else if(task_field === "LP") {
    let lp_header = document.getElementById("low_priority_header");
   for(let bullet of low_priority_array) {
      let lp = document.createElement('div');
      lp.textContent = bullet.content;
      lp_header.appendChild(lp);
   }
} else if(task_field === "C") {
    let c_header = document.getElementById("complete_header");
   for(let bullet of completed_array) {
      let cp = document.createElement('div');
      cp.textContent = bullet.content;
      c_header.appendChild(cp);
   }
}
 
}
