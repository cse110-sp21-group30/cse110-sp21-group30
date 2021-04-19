# 04/18/2021 (Discussed Potential Implementations of BuJo)
Meeting held over Zoom from 6-7:01PM PST

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
##  Agenda
### Previous Meeting 

(Course Questions & GitHub Rules, 04/14/2021 from 2:15-2:47PM PST)

Consulted TA about the project specifications, grading, discussion sections, etc.

Determined rules for pushing changes to the team repository and established the pull-request slack channel.

### Brainstorm
Joe and Angus compiled some ideas for the project [here](https://docs.google.com/document/d/10L9EE8sobcqnZx1fjwLxcpMKJjXa0Joy33DJHRVMlD8/edit). This document contains both an outline of those features essential to a BuJo, as well as some possible implementations and desirable extra features.

In addition to reviewing this document, during the meeting we discussed a number of ways to design the visual display of our app and implement some features. Among the topics discussed were:
- Bullet points/Tasks/Events
    - Font Awesome has an icon library that we might consider implementing. The user could pick a specific icon from a menu that would act as a bullet point/tag/etc. This library may prove useful for sorting by keywords/tags if we enclose icons in div tags and only display lines associated with specific div classes.
    - We could mimic Markdown/LaTeX/etc. by having the user type in a specific character sequence into a form. After submitting they can view a reformatted version of their submission that displays the bullet or character associated with this sequence.
- Visual Display
    - Within a window, a panel to the left could act as the 'index' for the BuJo. It would be formatted similar to a file tree in an IDE, where daily logs would be nested under weekly logs, weekly logs would be nested under monthly logs, and monthly/custom/future logs would be listed in different sections.
    - We might need separate displays for when the user is simply viewing a page in their BuJo as opposed to making edits.
    - There should be buttons the user can click to log in, create new logs, etc.
- Migration
    - Uncertain whether we should leave it up to the user to handle the migration of incomplete tasks (we could remind the user to do this at the end of each day/week/month), or if we should automate this process. For the time being this is not considered a core feature.

Miro board contains some more specifics, and can be found [here](https://miro.com/welcomeonboard/FQ3kokRMkNMQv1f9sZvs9QcTl5UqGrSnz2BCgTrxBrLxwivAW7hhOy3p86LVqG01).

## Tasks

### Completed Tasks
- Created a list of key features for the project (plus some less essential, but convenient features)
- Began brainstorming possible ways to implement both the back- and front-end aspects of the project.

### Tasks to be Completed
- Nataly: create and push a file that links to the team video on Google Drive (teamintro.mp4 is too large for GitHub).
- All members should forward any questions they have for the TA to Andrew or Thet if they do not plan on being available for the 4/19 discussion section.
- All members should research similar applications, think of additional features, and be prepared to present their vision for the project sometime within the next few days during a mid-week meeting (specific date to be determined; when2meet link will be provided in the slack workspace).
