// Bullet point/entry custom component

import { complete_migration, high_low_migration, delete_bullet_db, revert_complete_migration, archive_bullet,remove_filter} from './script.js';

class BulletPoint extends HTMLElement {
    constructor() {
        super();

        // Templated HTML content
        const template = document.createElement('template');

        //style is currently a temp fix, just so we can see where one entry ends and the next one begins
        template.innerHTML=`
        <style>
            .entry {
                margin-top:1%;
                border: 2px solid black;
                border-radius: 5px;
                padding: 5px;
                background-color: var(--bullet_bg);
                color: var(--bullet_color);
                border-color: var(--bullet_border);
            }
            .hide-hover {
                display: none;
                cursor: pointer;
                filter: var(--bullet_icon_filter);
            }
            .entry_label {
                color: var(--entry_label_color);
            }
            .entry:hover > .hide-hover {
                display: inline;
                margin-right: 5%;
                width:7%;
                height: 7%;
                filter: var(--bullet_icon_filter);
            }

        </style>
        <article class="entry">
            <p></p>
            <span class="date"></span>
            <span class="entry_label"></span>
            <span class="bullet_id"></span>
            <span class="bullet_task_field"></span>
            <span class="comp_time"></span>
            <br>
            <!-- buttons go here-->
        </article>
        `;

        // Create a shadow root for the component
        this.attachShadow({ mode: 'open' });

        // Attach cloned content of template to shadow DOM
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    get entry() {
        let dates = this.shadowRoot.querySelector('.date').innerText.split('-'); //in the form MM-DD-YYYY
        let ymd_date = `${dates[2]}-${dates[0]}-${dates[1]}`
        let entryObj = {
            'task_field': this.shadowRoot.querySelector('.bullet_task_field').innerText,
            'labels': this.shadowRoot.querySelector('.entry_label').innerText,
            'deadline': ymd_date,
            'content': this.shadowRoot.querySelector('p').innerText,
            'bullet_id': this.shadowRoot.querySelector('.bullet_id').innerText,
            'comp_time': this.shadowRoot.querySelector('.comp_time').innerText
        };

        return entryObj;
    }

    // Outside functions can refer to set() when a bullet is first created or loaded into
    // the DOM from localStorage
    set entry(entry) {
        let article = this.shadowRoot.querySelector('article');

        // Set contents
        article.querySelector('p').append(entry.content);
        let spans = article.querySelectorAll('span');
        let dates = entry.deadline.split('-'); //entry.deadline is formatted YYYY-MM-DD
        let mdy_date = `${dates[1]}-${dates[2]}-${dates[0]}`;
        spans[0].append(mdy_date);
        spans[1].append(entry.labels);
        spans[2].append(entry.bullet_id);
        spans[2].style.display = "none";
        spans[3].append(entry.task_field);
        spans[3].style.display = "none";
        spans[4].append(entry.comp_time);
        spans[4].style.display = "none";

        // give the label a color
        if (entry.labels == 'fitness') {
            spans[1].style.background='LightSkyBlue';
        } else if (entry.labels == 'school') {
            spans[1].style.background='Plum';
        } else if (entry.labels == 'work') {
            spans[1].style.background='Silver';
        } else if (entry.labels == 'personal') {
            spans[1].style.background='Wheat';
        }
        spans[1].style.borderRadius='8px';
        spans[1].style.padding='1px 3px 1px 3px';

        //show or hide the respective buttons
        if (entry.task_field == "C") {
            //create revert complete
            let button_rev = document.createElement("img");
            button_rev.className = "undo-complete hide-hover";
            button_rev.src = "./images/revert.svg";
            button_rev.style.maxWidth="20px";
            button_rev.addEventListener('click', function () {
                //(Reverts to LP even if bullet was in HP previously)
                revert_complete_migration(entry.task_field, entry.bullet_id);
            });
            article.append(button_rev);
            //add send to archive
            let button_archive = document.createElement("img");
            button_archive.src = "./images/move_to_archive.svg";
            button_archive.style.maxWidth="20px";
            button_archive.className = "del hide-hover";
            button_archive.addEventListener('click', function () {
                archive_bullet(entry.task_field, entry.bullet_id);
            });
            article.append(button_archive);
            //add edit
            let button_edit = document.createElement("img");
            button_edit.className = "edit hide-hover";
            button_edit.src = "./images/edit.svg";
            button_edit.style.maxWidth="20px";
            button_edit.addEventListener('click', function () {
                $('#edit_modal').modal({
                    backdrop: 'static',
                    keyboard: false
                });
                $('#edit_modal textarea').val(entry.content);
                $('#edit_modal input').val(entry.deadline);
                $('#edit_modal select').val(entry.labels);
                $('#edit_bullet_id').text(entry.bullet_id);
                $('#edit_task_field').text(entry.task_field);
                $('#edit_comp_time').text(entry.comp_time);
            });
            article.append(button_edit);
        }
        else if(entry.task_field == "A") {
            //create delete
            let button_del = document.createElement("img");
            button_del.src = "./images/trash.svg"
            button_del.style.maxWidth="20px";
            button_del.className = "del hide-hover";
            button_del.addEventListener('click', function () {
                delete_bullet_db(entry.task_field, entry.bullet_id);
            });
            article.append(button_del);
        }
        else {
            //create "mark complete"
            let button_comp = document.createElement("img");
            button_comp.className = "mark-complete hide-hover";
            button_comp.src = "./images/complete.svg";
            button_comp.style.maxWidth="20px";
            button_comp.addEventListener('click', function () {
                complete_migration(entry.task_field, entry.bullet_id);
            });
            article.append(button_comp);
            //create change priority
            let button_pri = document.createElement("img");
            button_pri.className = "change-priority hide-hover";
            button_pri.src = "./images/change.svg";
            button_pri.style.maxWidth="20px";
            button_pri.addEventListener('click', function () {
                high_low_migration(entry.task_field, entry.bullet_id);
            });
            article.append(button_pri);
            //add edit
            let button_edit = document.createElement("img");
            button_edit.className = "edit hide-hover";
            button_edit.src = "./images/edit.svg";
            button_edit.style.maxWidth="20px";
            button_edit.addEventListener('click', function () {
                $('#edit_modal').modal({
                    backdrop: 'static',
                    keyboard: false
                });
                $('#edit_modal textarea').val(entry.content);
                $('#edit_modal input').val(entry.deadline);
                $('#edit_modal select').val(entry.labels);
                $('#edit_bullet_id').text(entry.bullet_id);
                $('#edit_task_field').text(entry.task_field);
                $('#edit_comp_time').text(entry.comp_time);
            });
            article.append(button_edit);
        }
    }
}

window.onload = function () {
    let column_view_fix = document.getElementById("column_view");
    document.getElementById('edit').addEventListener('click', function (e) {
        remove_filter();
        document.getElementById("search_off").style.display = "inline-block";
        document.getElementById("search_on").style.display = "none";
        var img = document.getElementById("hidden");
        if (img.classList.contains("hidden")) {
            img.removeAttribute("class");
            column_view_fix.style.height="68vh"; // Changed from 32 to 50
            column_view_fix.style.maxHeight="100vh";
            column_view_fix.style.marginBottom="120px";
            set_complete_column_id();
            document.getElementById('edit').style.visibility = 'hidden';
        }
        else {
            img.setAttribute("class", "hidden");
            column_view_fix.style.height = "85vh";
            column_view_fix.style.marginBottom = "0px";
            set_complete_column_id();
        }

});
    document.getElementById('close').addEventListener('click', function (e) {
        var img = document.getElementById("hidden");
        img.setAttribute("class", "hidden");
        column_view_fix.style.height = "85vh";
        column_view_fix.style.marginBottom = "0px";
        set_complete_column_id();
        document.getElementById('edit').style.visibility = 'visible';
    });

};

//Helper for setting complete column as specific id to make it shorter than other columns when editor is not open
function set_complete_column_id(){
    if(document.getElementById('box_c_standard') != null){
        document.getElementById('box_c_standard').id = 'box_c';
    }
    else if(document.getElementById('box_c') != null){
        document.getElementById('box_c').id = 'box_c_standard';
    }
}

// Define a custom element
customElements.define('bullet-point', BulletPoint);

/*
    let bullet = {
        "task_field": task_field,
        "labels": labels,
        "deadline": deadline, //YYYY-MM-DD
        "content": content,
        "bullet_id": id
        "comp_time": null
    };
*/
