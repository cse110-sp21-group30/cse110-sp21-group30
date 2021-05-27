// Bullet point/entry custom component

import { complete_migration, high_low_migration, delete_bullet_db, revert_complete_migration } from './script.js';

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
            }
            .hide-hover {
                display: none;
                cursor: pointer;
            }
            .entry:hover > .hide-hover {
                display: inline;
                margin-right: 5%;
                width:7%;
                height: 7%;
            }
        </style>
        <article class="entry">
            <p contenteditable="true"></p>
            <span class="date"></span>
            <span class="entry_label"></span>
            <span class="bullet_id"></span>
            <span class="bullet_task_field"></span>
            <!-- <br> <span class="comp_time"></span> print timestamp -->
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
        let entryObj = {
            'task_field': this.shadowRoot.querySelector('.bullet_task_field').innerText,
            'labels': this.shadowRoot.querySelector('.entry_label').innerText,
            'deadline': this.shadowRoot.querySelector('.date').innerText,
            'content': this.shadowRoot.querySelector('p').innerText,
            'bullet_id': this.shadowRoot.querySelector('.bullet_id').innerText,
            //'comp_time': this.shadowRoot.querySelector('.comp_time').innerText
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
        spans[0].append(entry.deadline);
        spans[1].append(entry.labels);
        spans[2].append(entry.bullet_id);
        spans[3].append(entry.task_field);
        spans[3].style.display = "none";
        //spans[4].append(entry.comp_time); // uncomment to print timestamp

        //show or hide the respective buttons
        if (entry.task_field == "C") {
            //create revert complete
            let button_rev = document.createElement("img");
            button_rev.className = "undo-complete hide-hover";
            button_rev.src = "./images/revert.svg";
            button_rev.addEventListener('click', function () {
                //(Reverts to LP even if bullet was in HP previously)
                revert_complete_migration(entry.task_field, entry.bullet_id);
            });
            article.append(button_rev);
            //create delete
            let button_del = document.createElement("img");
            button_del.src = "./images/trash.svg"
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
            button_comp.addEventListener('click', function () {
                complete_migration(entry.task_field, entry.bullet_id);
            });
            article.append(button_comp);
            //create change priority
            let button_pri = document.createElement("img");
            button_pri.className = "change-priority hide-hover";
            button_pri.src = "./images/change.svg";
            button_pri.addEventListener('click', function () {
                high_low_migration(entry.task_field, entry.bullet_id);
            });
            article.append(button_pri);
            //add delete
            let button_del = document.createElement("img");
            button_del.className = "del hide-hover";
            button_del.src = "./images/trash.svg";
            button_del.addEventListener('click', function () {
                delete_bullet_db(entry.task_field, entry.bullet_id);
            });
            article.append(button_del);
        }
    }
}

window.onload = function () {
    let column_view_fix = document.getElementById("column_view");
    document.getElementById('edit').addEventListener('click', function (e) {
        var img = document.getElementById("hidden");
        if (img.classList.contains("hidden")) {
            img.removeAttribute("class");
            column_view_fix.style.height="32em";
            column_view_fix.style.maxHeight="68vh";
            column_view_fix.style.marginBottom="120px";
        }
        else {
            img.setAttribute("class", "hidden");
            column_view_fix.style.height = "85vh";
            column_view_fix.style.maxHeight = "100vh";
            column_view_fix.style.marginBottom = "0px";
        }

});
    document.getElementById('close').addEventListener('click', function (e) {
        var img = document.getElementById("hidden");
        img.setAttribute("class", "hidden");
        column_view_fix.style.height = "85vh";
        column_view_fix.style.maxHeight = "100vh";
        column_view_fix.style.marginBottom = "0px";
    });

};


// Define a custom element
customElements.define('bullet-point', BulletPoint);

/*  let bullet = JSON.stringify({
        "task_field": task_field,
        "labels": labels,
        "deadline": deadline,
        "content": content,
        "comp_time": null
    });
*/
