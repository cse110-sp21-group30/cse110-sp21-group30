// Bullet point/entry custom component

//import { complete_migration } from './script.js';

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
            <button>Mark Complete</button>
            <button>Change Priority</button>
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
        buttons[0].addEventListener('click', function(){
            console.log('clicked complete on post ID ', entry);
            //complete_migration() here 
        });
        buttons[1].addEventListener('click', function(){
            console.log('clicked change priority on post ID');
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
