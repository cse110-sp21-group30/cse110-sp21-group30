import { complete_migration, high_low_migration, delete_bullet_db, revert_complete_migration, archive_bullet, remove_filter } from './script.js';
/*
    Bullet Point Creation and custom Web Components
*/
class BulletPoint extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');

        //CSS styling for the templete element
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
                overflow: auto;
                overflow-x: auto;
            }
            .entry .move-archive {
                float: right;
            }
            .entry .edit {
                float: right;
            }
            .entry .del{
                float:right;
            }
            .hide-hover {
                display: none;
                cursor: pointer;
                filter: var(--bullet_icon_filter);
            }
            .entry_label {
                color: var(--entry_label_color);
                border-width: 2px;
            }
            .entry:hover > .hide-hover {
                display: inline;
                margin-right: 5%;
                width: 7%;
                height: 7%;
                filter: var(--bullet_icon_filter);
            }
            ::-webkit-scrollbar {
                width: 5px;
                height: 8px;
            }
            ::-webkit-scrollbar-track {
                box-shadow: inset 0 0 2px grey;
                border-radius: 20px;
            }
            ::-webkit-scrollbar-thumb {
                background: LightGrey;
                border-radius: 10px;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: grey;
            }

        </style>
        <article class="entry">
            <p></p>
            <span class="date"></span>
            <span class="entry_label"></span>
            <span class="bullet_id"></span>
            <span class="bullet_task_field"></span>
            <span class="comp_time"></span>
            <!-- buttons go here-->
        </article>
        `;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }


    /*
        Create JSON Object based on user inputs
    */
    get entry() {
        let ymd_date = "";
        if(this.shadowRoot.querySelector('.date').innerText.length > 1)
        {
            let dates = this.shadowRoot.querySelector('.date').innerText.split('-'); //in the form MM-DD-YYYY
            ymd_date = `${dates[2]}-${dates[0]}-${dates[1]}`
        }
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

    /*
        Set web components for display including icons within each bullets
    */
    set entry(entry) {
        let article = this.shadowRoot.querySelector('article');
        article.querySelector('p').append(entry.content);
        let spans = article.querySelectorAll('span');
        let mdy_date = "";
        if(entry.deadline.length > 1)
        {
            let dates = entry.deadline.split('-'); //entry.deadline is formatted YYYY-MM-DD
            mdy_date = `${dates[1]}-${dates[2]}-${dates[0]}`;
        }
        spans[0].append(mdy_date);
        spans[1].append(entry.labels);
        spans[2].append(entry.bullet_id);
        spans[2].style.display = "none";
        spans[3].append(entry.task_field);
        spans[3].style.display = "none";
        spans[4].append(entry.comp_time);
        spans[4].style.display = "none";

        spans[1].style.borderStyle='solid';

        // give the label a color
        if (entry.labels == 'fitness') {
            spans[1].style.background='LightGreen';
            spans[1].style.borderColor='Green';
        } else if (entry.labels == 'school') {
            spans[1].style.background='Plum';
            spans[1].style.borderColor='DarkOrchid';
        } else if (entry.labels == 'work') {
            spans[1].style.background='LightSalmon';
            spans[1].style.borderColor='OrangeRed';
        } else if (entry.labels == 'personal') {
            spans[1].style.background='LightBlue';
            spans[1].style.borderColor='DeepSkyBlue';
        } else {
            spans[1].style.borderStyle='';
        }
        spans[1].style.borderRadius='8px';
        spans[1].style.padding='1px 2px 1px 2px';

        //show or hide the respective buttons based on column (Backlogs, In Progress, Complete)
        if (entry.task_field == "C") {

            //create revert complete (left arrow)
            let button_rev = document.createElement("img");
            button_rev.className = "undo-complete hide-hover";
            button_rev.src = "./images/left-arrow.svg";
            button_rev.style.width="20px";
            button_rev.style.verticalAlign="bottom";
            button_rev.style.marginLeft="1px";
            button_rev.style.marginRight="1px";
            button_rev.addEventListener('click', function () {
                revert_complete_migration(entry.task_field, entry.bullet_id);
            });
            article.append(button_rev);

            //create editing icon and functionality
            let button_edit = document.createElement("img");
            button_edit.className = "edit hide-hover";
            button_edit.src = "./images/edit.svg";
            button_edit.style.width="20px";
            button_edit.style.verticalAlign="bottom";
            button_edit.style.marginLeft="2px";
            button_edit.style.marginRight="1px";
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

            //create delete icon and functionality
            let button_del = document.createElement("img");
            button_del.src = "./images/trash.svg"
            button_del.style.width="20px";
            button_del.style.verticalAlign="bottom";
            button_del.style.marginLeft="3px"; 
            button_del.style.marginRight="1px";
            button_del.className = "del hide-hover";
            button_del.addEventListener('click', function () {
                delete_bullet_db(entry.task_field, entry.bullet_id);
            });
            article.append(button_del);

            //add archive icon and functionality
            let button_archive = document.createElement("img");
            button_archive.src = "./images/move_to_archive.svg";
            button_archive.style.width="20px";
            button_archive.style.verticalAlign="bottom";
            button_archive.style.marginLeft="1px";
            button_archive.style.marginRight="1px";
            button_archive.className = "move-archive hide-hover";
            button_archive.addEventListener('click', function () {
                archive_bullet(entry.task_field, entry.bullet_id);
            });
            article.append(button_archive);
        }
        else if(entry.task_field == "A") {
            //create delete
            let button_del = document.createElement("img");
            button_del.src = "./images/trash.svg"
            button_del.style.width="20px";
            button_del.style.verticalAlign="bottom";
            button_del.style.marginLeft="1px";
            button_del.style.marginRight="1px";
            button_del.className = "del hide-hover";
            button_del.addEventListener('click', function () {
                delete_bullet_db(entry.task_field, entry.bullet_id);
            });
            article.append(button_del);
        }
        else if (entry.task_field == "HP"){
            //create change priority (right arrow)
            let button_pri = document.createElement("img");
            button_pri.className = "change-priority hide-hover";
            button_pri.src = "./images/right-arrow.svg";
            button_pri.style.width="20px";
            button_pri.style.verticalAlign="bottom";
            button_pri.style.marginLeft="1px";
            button_pri.style.marginRight="1px";
            button_pri.addEventListener('click', function () {
                high_low_migration(entry.task_field, entry.bullet_id);
            });
            article.append(button_pri);

            //create editing icon and functionality
            let button_edit = document.createElement("img");
            button_edit.className = "edit hide-hover";
            button_edit.src = "./images/edit.svg";
            button_edit.style.width="20px";
            button_edit.style.verticalAlign="bottom";
            button_edit.style.marginLeft="2px";
            button_edit.style.marginRight="1px";
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

            //create delete icon and functionality
            let button_del = document.createElement("img");
            button_del.src = "./images/trash.svg"
            button_del.style.width="20px";
            button_del.style.verticalAlign="bottom";
            button_del.style.marginLeft="1px";
            button_del.style.marginRight="1px";
            button_del.className = "del hide-hover";
            button_del.addEventListener('click', function () {
                    delete_bullet_db(entry.task_field, entry.bullet_id);
            });
            article.append(button_del);
        }
        else { 
            //create change priority (left arrow)
            let button_pri = document.createElement("img");
            button_pri.className = "change-priority hide-hover";
            button_pri.src = "./images/left-arrow.svg";
            button_pri.style.width="20px";
            button_pri.style.verticalAlign="bottom";
            button_pri.style.marginLeft="1px";
            button_pri.style.marginRight="1px";
            button_pri.addEventListener('click', function () {
                high_low_migration(entry.task_field, entry.bullet_id);
            });
            article.append(button_pri);

            //create "mark complete" (right arrow)
            let button_comp = document.createElement("img");
            button_comp.className = "mark-complete hide-hover";
            button_comp.src = "./images/right-arrow.svg";
            button_comp.style.width="20px";
            button_comp.style.verticalAlign="bottom";
            button_comp.style.marginLeft="1px";
            button_comp.style.marginRight="1px";
            button_comp.addEventListener('click', function () {
                complete_migration(entry.task_field, entry.bullet_id);
            });
            article.append(button_comp);
            
            //create editing icon and functionality
            let button_edit = document.createElement("img");
            button_edit.className = "edit hide-hover";
            button_edit.src = "./images/edit.svg";
            button_edit.style.width="20px";
            button_edit.style.verticalAlign="bottom";
            button_edit.style.marginLeft="2px";
            button_edit.style.marginRight="1px";
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

            //create delete icon and functionality
            let button_del = document.createElement("img");
            button_del.src = "./images/trash.svg"
            button_del.style.width="20px";
            button_del.style.verticalAlign="bottom";
            button_del.style.marginLeft="1px";
            button_del.style.marginRight="1px";
            button_del.className = "del hide-hover";
            button_del.addEventListener('click', function () {
                    delete_bullet_db(entry.task_field, entry.bullet_id);
            });
            article.append(button_del);
        }
    }
}

/*
    Editor icons used to open and close the editor and disable editing and searching in archive view
*/
window.onload = function () {
    let column_view_fix = document.getElementById("column_view");
    document.getElementById('edit').addEventListener('click', function (e) {
        remove_filter();
        document.getElementById("search_off").style.display = "inline-block";
        document.getElementById("search_on").style.display = "none";
        var img = document.getElementById("hidden");
        if (img.classList.contains("hidden")) {
            img.removeAttribute("class");
            column_view_fix.style.height="68vh"; 
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

/*
    Helper function for setting setting ID for complete column
*/
function set_complete_column_id(){
    if(document.getElementById('box_c_standard') != null){
        document.getElementById('box_c_standard').id = 'box_c';
    }
    else if(document.getElementById('box_c') != null){
        document.getElementById('box_c').id = 'box_c_standard';
    }
}

customElements.define('bullet-point', BulletPoint);

