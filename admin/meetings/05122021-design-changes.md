# 05/12/2021 (Overhaul of Previous Design Part 2)
Meeting held over Zoom from 1:45-2:45PM PST

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

(Overhaul of Previous Design, 05/11/2021 from 6-8PM PST)

We began changing our project design in response to the TA and professor's advice and concerns.

### Further Changes
As before, changes to the design will be visually captured in the new wireframe [here](https://miro.com/app/board/o9J_lEqYKDA=/). The new changes discussed include:
- There will be a predefined set of labels that the user can choose from to add to their bullet points (a few like Deadline, Event, School, etc.). Each label will be assigned a specific color so the user can easily see what label is attached to a bullet point (if there is one attached at all)
- When we change the display according to a user's search terms, we'll simply set bullet points to be invisible if they don't meet these terms, rather than remove them from the display entirely. Then to exit the search we'll simply set every bullet point to visible again
- For the time being we'll keep track of where bullet points should be displayed (High/Low Priority, Complete, Archive), but not necessarily the order in which they are displayed. Once a basic skeleton for the project is laid out we can look into displaying in order of date, or some other order specified by the user (by drag-and drop, or move up/down buttons)
- If we finish implementing other aspects of the project first, we'll potentially add a migration feature to move bullet points from the Archive to Low Priority. This isn't considered an essential feature for the time being (as Completed acts as a 'buffer' station where the user can choose to move a bullet point back to Low Priority before it gets moved to the Archive)
- By default, completed items will be PREpended to Complete, and other items will be APpended to High Priority and Low Priority (during migration or initial creation). This is so that incomplete items show up in order of which they were added to a section (which is more likely than not to be the order in which the user wants to complete them, anyways) and so a user has quicker access to items they completed most recently

## Tasks

### Completed Tasks
- We finished discussing the changes to our project design

### Tasks to be Completed
- We need to reflect the changes to our design in our ADRs, use cases, wireframes, etc., and potentially our pitch document.
- We need to begin preparing documents for the CI/CD Pipeline phase 1
    - The professor and TAs have acknowledged that a repo wiki is a paid feature, so now we can just create a separate folder for the pipeline and store all the documents as .md or .png files in that folder
- We need to hold a group coding session to build the basic skeleton of our project so we can submit the Team Status Video on time. Our focus for the skeleton should be to recreate the wireframe with an html doc and add some interactive features (at least the editor should be somewhat functional, so we can create bullet points and have them be displayed in the correct section - saving to localStorage or querying based on search terms is considered less of a priority)
