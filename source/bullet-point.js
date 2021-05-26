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
            }
        </style>
        <article class="entry">
            <p contenteditable="true"></p>
            <span class="date"></span>
            <span class="entry_label"></span>
            <span class="bullet_id"></span>
            <span class="bullet_task_field"></span>
            <!-- <br> <span class="comp_time"></span> print timestamp -->
            <button class="not-complete">Mark Complete</button>
            <button class="not-complete">Change Priority</button>
            <button class="complete">Revert Complete</button>
            <button class="general">Delete</button>
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

        let buttons = article.querySelectorAll('button');

        //show or hide the respective buttons
        if(entry.task_field == "C"){
            buttons[0].style.display = "none";
            buttons[1].style.display = "none";
        } else {
            buttons[2].style.display = "none";
        }

        //mark as complete
        buttons[0].addEventListener('click', function() {
            complete_migration(entry.task_field, entry.bullet_id);
        });

        //change priority
        buttons[1].addEventListener('click', function() {
            high_low_migration(entry.task_field, entry.bullet_id);
        });

        //revert from complete to LP (Reverts to LP even if bullet was in HP previously)
        buttons[2].addEventListener('click', function() {
            revert_complete_migration(entry.task_field, entry.bullet_id);
        });

        //delete
        buttons[3].addEventListener('click', function() {
            delete_bullet_db(entry.task_field, entry.bullet_id);
        });

    }
}

window.onload = function () {
    document.getElementById('edit').addEventListener('click', function (e) {
        var img = document.getElementById("hidden");
        img.removeAttribute("class");
    });

};
// Define a custom element
customElements.define('bullet-point', BulletPoint);

/*  let bullet = JSON.stringify({
        "task_field": task_field,
        "labels": labels,
        "deadline": deadline,
        "content": content,
        "CompTimeStamp": null
    });
*/
