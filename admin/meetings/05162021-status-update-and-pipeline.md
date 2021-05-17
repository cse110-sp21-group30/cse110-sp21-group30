# 05/16/2021 (Initiating the CI/CD Pipeline, Updating Docs, Catching up with Canvas Assignments)
Meeting held over Zoom from 6-9PM PST

Team 30 - Cool Beans
## Attendance (Present)
Andrew Pham

Angus Yick

Eric Jin

Ikjoon Park

Joe Ikedo

Nataly Buhr

Sonika Ram

Thet Zaw
## Agenda
### Previous Meeting
(Group Coding Session, 05/15/2021 from 1-2:25PM PST)
Team members broke up according to original front- and back-end teams to focus on the UI/behind-the-scenes components of the application. A basic skeleton for the project was created.

### CI/CD Pipeline
For now we have added an HTML Validator (we considered adding a spell-checker, but it was deemed non-essential and cluttered the actions tab without a wordlist). In the future we plan to add more workflows that will check our Javascript files, run unit tests, and potentially generate documentation. We also decided to proceed with two "layers" of pull requests before anything is pushed to the main branch; a direct branch off of main for the implementation of a specific feature, and further branches off of that for individual developers to submit their proposed modifications (outside of group coding sessions).

### Updating Documents
Updated versions of the ADRs, pitch documents, wireframe, roadmap, etc. are still under development and will be posted to the repository shortly.

### Canvas Assignments
- During the meeting we filmed the Team Status Video, in which we briefly covered our skeleton code, pipeline, team status, challenges, and plans for future sprints.
- A when2meet was posted on the group slack workspace to determine a good meeting time for the Sprint Review and Retrospective assignments

### Other
A few members brought up concerns/suggestions for the project, including:
- The concern that storing all bullet points in a single array, stringifying this array, and storing this array in localStorage may lead to storage issues. (The professor raised a similar concern in class.)
    - The backend developers will consider this a non-pressing concern as they do not expect users to require a significant amount of storage--at least not enough to surpass the limit per string.
- The possibility of creating different custom components for different bullet point types (High/Low Priority, Complete, Archive) as opposed to one component for all bullet points with buttons/menu items that change according to the type. If a bullet point is changed to a different type, its contents (text, label, date) are stored in a new component and added to the appropriate section, while the old element is removed and deleted.
    - This is under consideration as the back- and front-end have yet to resolve how we will track user interactions with the application and make changes to the DOM.
- The possibility of changing the display so sections have no borders, sections have a colored header, and bullet points have no color/border. Hovering over a bullet point would make a drop-down menu visible to one side, from which the user could change the date, label, section, etc.
    - Front-end developers are encouraged to change the current display in the skeleton code to better match this vision if they have the time before our next sprint, though this is considered a low-priority modification.

## Tasks

### Completed Tasks
- Completed the Team Status Video

### Tasks to be Completed
- We still need to finish updating all design documents on the repository
- We need to complete the following assignments on Canvas:
    - Agile Video (due 5/17)
        - Eric has offered to edit the video
        - The video just needs to be submitted
    - CI/CD Phase 1 (due 5/17)
        - Specifically, we need to implement some workflows (actions), record a video explaining them, and craft a 2-page status report
        - Nataly has offered to handle the phase 1 documents and video as she is most acquainted with the currently-available workflow
    - 1st Sprint Meeting -Notes- (due 5/18)
    - Retrospective -Notes- (due 5/18)
