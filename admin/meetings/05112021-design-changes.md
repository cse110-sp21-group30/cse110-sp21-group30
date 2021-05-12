# 05/11/2021 (Overhaul of Previous Design)
Meeting held over Zoom from 6-8PM PST

Team 30 - Cool Beans
## Attendance (Present)
Andrew Pham

Eric Jin

Ikjoon Park

Joe Ikedo

Nataly Buhr

Sonika Ram

Thet Zaw
##  Agenda
### Previous Meeting 

(Potential Overhaul of Design, 05/09/2021 from 6-7:30PM PST)

TA alerted us to potential red flags in our previous design, and a few members (Andrew, Thet, Joe, Nataly) agreed to make time to discuss potential changes with the professor during office hours. The team also laid out general rules for commenting/code style and how to handle pull requests.

### Professor's Comments
All members were brought up to speed on the advice/concerns given by the professor during office hours:
- Security Concerns
    - Either we implement a full login system (username and password, with some form of password encryption or other security feature) or none at all
    - Security problems get baked in during development; once they’re baked in, it’s difficult to mitigate them
    - Journals in general are personal artifacts - in some cases they’re sensitive (diaries, works in progress, etc.). Professor is suspect of even storing them online
    - A multi-user login journal seems to defy the use case (a group tasking system might work, but we’d still want a full authentication system and secure backend)
- Rapid Capture
    - The likelihood of a user wanting to look at past journals is far less than them wanting to look at future ones, so any reflection features should be put on the backburner (the user should still be able to access old entries somehow)
- Markdown
    - If we want a Markdown editor, then like a login feature, we need to outsource a component
- “Extra Notes” Concern
    - We’re not helping the user choose whether we want them to take notes or quick bullets
    - This section can be too distracting; the user may end up using it as a notepad
- Contenteditable
    - Professor is okay with us using contenteditable - his assistant even used it in a bullet-making demo; we may face issues with OperaMini, span elements, etc., but as long as we use it well and understand these limitations this is fine

### Design Changes
Changes to the design will be visually captured in the new wireframe [here](https://miro.com/app/board/o9J_lEqYKDA=/). The new design consists of:
- High Priority/Incomplete/Complete columns and an Archive instead of Monthly/Past/Future/Custom tabs
    - This way the user can easily identify what tasks/events they should focus on, what has recently been completed, and tasks/events that will be coming up in the future. Items in both High Priority and Incomplete can be marked as complete (and then automatically moved into Complete). Items can also be migrated between Incomplete and High Priority
    - The Complete column will only display items that have been completed within the past week or so. Everything else will automatically be moved to the Archive.
- Bullet points as "first class citizens" as opposed to full journals
    - Each bullet point will contain text content, an associated date and label, and potentially an image/sound file. The background color for a bullet point will by default be light grey, but the background color will change based on whether a bullet point is marked with the current date or a date within the next few days, as well as whether it is marked as complete or not. Bullet points can only be initially created through the editor, but they can be edited (any field; text, date, label, etc.) or deleted from any column.
- The new header will allow the user to search by date or label, will have a button the user can click to view the Archive, and will display seven dates beginning with the previous day (to help the user orient themselves in their schedule and determine if items need to be moved to High Priority).
- Instead of a create button, there will be an editor similar to the text entry areas in Slack, Messenger, etc. that is always available at the bottom of the window. By default bullet points will be placed in Incomplete, but the user can specify for a bullet point to be placed in High Priority. Bullet points are by default placed at the top of whichever column they are added to, though we plan to add "grab and drop" functionality to them later, if time allows.
- Instead of an external database and login system, we will simply store user information in the browser's localStorage. We may add a security question screen later to prevent anyone borrowing the user's computer from attaining immediate access to their journal.

### Team Changes
Considering the changes made to our design for the project, the front- and back-end teams will be merged into one. Members who were previously part of the back-end team will still mainly focus on storing and retrieving bullet journal contents from the browser's localStorage.

## Tasks

### Completed Tasks
- We developed a new design for our website that incorporates the feedback from the professor and TA

### Tasks to be Completed
- After a final meeting to confirm all the changes to the project's design, we need to reflect these changes in our ADRs, use cases, wireframes, etc., and potentially our pitch document.
- We will hold another meeting on 5/12 to continue working on the CI/CD Pipeline assignment
- We need to consult the TA/professor on how to access our wiki as we're currently unable to, and it seems like we need to either make our repo public or pay to upgrade our group account (need to confirm this) to be able to access it. If this issue persists and we're unable to reach the TA/professor we'll create a wiki directory and place the appropriate documents there in the meantime.
