// Bullet point/entry custom component


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
        article.querySelectorAll('span')[0].append(entry.deadline);
        article.querySelectorAll('span')[1].append(entry.labels);
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
