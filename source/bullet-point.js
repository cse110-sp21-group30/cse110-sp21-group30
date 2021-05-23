// Bullet point/entry custom component

import { complete_migration, high_low_migration, updateView, populate_global_arrays, delete_bullet_db } from './script.js';

class BulletPoint extends HTMLElement {
    constructor() {
        super();

        // Templated HTML content
        const template = document.createElement('template');

        //style is currently a temp fix, just so we can see where one entry ends and the next one begins
        template.innerHTML=`
        <style>
            .entry {
                border: 2px solid black;
                border-radius: 5px;
            }
        </style>
        <article class="entry">
            <p contenteditable="true"></p>
            <span class="date"></span>
            <span class="entry_label"></span>
            <span class="bullet_id"></span>
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

        //revert from complete to HP or LP
        buttons[2].addEventListener('click', function() {
            console.log("reverting");
        });

        //delete
        buttons[3].addEventListener('click', function() {
            delete_bullet_db(entry.task_field, entry.bullet_id);
            populate_global_arrays();
            updateView(entry.task_field);
        });

    }
}

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
