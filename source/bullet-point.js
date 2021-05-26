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
        return this.getAttribute('entry');
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
        if(entry.task_field == "C")
        {
            //create revert complete
            let button_rev = document.createElement("button");
            button_rev.className = "undo-complete hide-hover";
            button_rev.textContent = "Revert Complete";
            button_rev.addEventListener('click', function() {
                //(Reverts to LP even if bullet was in HP previously)
                revert_complete_migration(entry.task_field, entry.bullet_id);
            });
            article.append(button_rev);
            //create delete
            let button_del = document.createElement("button");
            button_del.className = "del hide-hover";
            button_del.textContent = "Delete";
            button_del.addEventListener('click', function() {
                delete_bullet_db(entry.task_field, entry.bullet_id);
            });
            article.append(button_del);
        }
        else
        {
            //create "mark complete"
            let button_comp = document.createElement("button");
            button_comp.className = "mark-complete hide-hover";
            button_comp.textContent = "Mark Complete";
            button_comp.addEventListener('click', function() {
                complete_migration(entry.task_field, entry.bullet_id);
            });
            article.append(button_comp);
            //create change priority
            let button_pri = document.createElement("button");
            button_pri.className = "change-priority hide-hover";
            button_pri.textContent = "Change Priority";
            button_pri.addEventListener('click', function() {
                high_low_migration(entry.task_field, entry.bullet_id);
            });
            article.append(button_pri);
            //add delete
            let button_del = document.createElement("button");
            button_del.className = "del hide-hover";
            button_del.textContent = "Delete";
            button_del.addEventListener('click', function() {
                delete_bullet_db(entry.task_field, entry.bullet_id);
            });
            article.append(button_del);
        }
    }
}

window.onload = function () {
    document.getElementById('edit').addEventListener('click', function (e) {
        var img = document.getElementById("hidden");
        img.removeAttribute("class");
    });
    document.getElementById('close').addEventListener('click', function (e) {
        var img = document.getElementById("hidden");
        img.setAttribute("class", "hidden")
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
