# 05/09/2021 (Potential Overhaul of Previous Design)
Meeting held over Zoom from 6-7:30PM PST

Team 30 - Cool Beans
## Attendance (Present)
Andrew Pham

Angus Yick

Deepak Karki

Eric Jin

Ikjoon Park

Joe Ikedo

Nataly Buhr

Sonika Ram

Thet Zaw
##  Agenda
### Previous Meeting 

(Finalizing the Pitch, 05/03/2021 from 6-7PM PST)

Finished building the pitch document and wireframe diagrams for the "Starting Pitch" assignment on Canvas. The front- and back-end developers met separately to begin working on their respective parts of the project.

### Discussion with TA (Deepak Karki)
- Having a login page that only requires a username is concerning; anyone can edit someone's journal if they know their name, and someone can easily guess some common names and start editing a stranger's journal.
    - If we care about privacy, Deepak strongly suggests that we don't put anything on the cloud. He believes we should consider using local storage (browser, desktop) as opposed to relying on an external database.
- We might face cross-browser compatibility issues if we decide to make use of contenteditable, but this isn't a major concern for this project. Deepak suggested that we should look into the Monaco and ProseMirror libraries as potential ways to implement a rich text editor.
- Deepak suggested that we look to Workflowy, Google Keep, and Medium as inspiration for our own bullet journal. Our current wireframe may be too similar to a diary; we should strive to remain closer to a tasklist.
- We can get rid of a larger degree of customization; Deepak mentioned that a complete editing surface is fine, but we should try to blend it into the page. A form can come across as overly-corporate.
- Finally, the TA suggested that we meet with the professor as soon as possible to get his input on our current approach. Since Deepak and our assigned TA have differing opinions on our current wireframe, it would be better to consult the professor's opinion.

### ADR
Since we plan to consult the professor about our project design, any ADRs created prior to this meeting are extremely tentative and expected to change. To meet the first phase requirements for the ADR assignment on canvas will we proceed by constructing individual documents based on our current decisions, and we will update them once we've had a chance to review our design after consulting the professor.

### CI/CD PIPELINE
We've agreed upon:
- [Comments](https://itnext.io/what-makes-a-good-code-comment-5267debd2c24) and code style
    - Comments should only be added where the code is not self-explanatory
    - Concise comments > verbose comments
    - Short comments should be preceded by // and long comments should be captured in jsDoc style
    - variable and function names will follow snake_case
    - lines should end with semicolons (except in HTML)
- [Pull requests](https://medium.com/@hugooodias/the-anatomy-of-a-perfect-pull-request-567382bb6067#:~:text=Recap-,Pull%20request%20size,of%20250%20lines%20of%20change)
    - Pull requests should include no more than 250 lines of change
    - Pull requests should only do/change one thing
        - Whenever possible, larger requests should be broken down into smaller ones
    - Titles should be self-explanatory and descriptions should cover what/why/how a piece of code was changed
    - Pull requests should be reviewed and approved by 1-2 people before being merged
- Since we have yet to cover unit testing in class, we will discuss how to approach it in a future meeting

## Tasks

### Completed Tasks

### Tasks to be Completed
- Joe, Sonika, and Nataly will handle creation of the ADR documents, with each focusing on:
    - Joe: login, migration
    - Sonika: labels, search
    - Nataly: monthly/future/past/custom view, attachments
- Nataly will handle creation of a vetting phase doc to record our decisions for the CI/CD Pipeline assignment
