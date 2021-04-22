# 04/22/2021 (Brainstorm Continued)
Meeting held over Zoom from 12:30-1:33PM PST

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

(Brainstorm, 04/18/2021 from 6-7:01PM PST)

Began brainstorming ways to implement the back- and front-end of the project.

### Brainstorm (Part 2)

Miro board continues to offer specifics on ideas for the project, and can be found [here](https://miro.com/welcomeonboard/FQ3kokRMkNMQv1f9sZvs9QcTl5UqGrSnz2BCgTrxBrLxwivAW7hhOy3p86LVqG01).
There is an additional notes document available [here](https://docs.google.com/document/d/1KX4YjW_7OkNElgfTjipk1msMMCtimd-6wryPgpKA9FI/edit), as well.

In this meeting we went over several proposed implementations of the project, which are detailed in the Google document linked above. After reviewing all suggestions we determined that:
- Beyond basic features, such as variation in bullets and separate overviews for daily/weekly/etc. logs, we want to provide migration of tasks and easy sorting through a list of tasks.
- There should be separate edit/view screens (the view screen could be the default, and we could generate a pop-up when the user wants to edit or create new entries).
- Given the time constraint for this project, the user will likely have to make entries in a format similar to Markdown, though we'll aim to provide buttons and drop-down menus for them to change fonts, text colors, etc.
- We aim to implement a backend that will require users to log in and provide lightweight storage for users' notes.

While we may still make changes to our application's design, we will aim to match many of Andrew's suggestions:
- A side panel for Past, Future, Daily, Weekly, Monthly, and Custom logs.
    - Past dashboard will display all journal entries with a date less than the current date.
    - Future dashboard will display all journal entries with a date greater than the current month.
    - Daily dashboard will only display the journal entry for the current date.
    - Weekly dashboard will display all journal entries for the current week.
    - Monthly dashboard will display all journal entries for the current month, with a panel to one side where the user can make notes for the month as a whole (without attributing a specific date).
- There will be one journal entry per day (we may allow for more later), and we will likely store entries in a JSON file for rapid sorting. Journal entries will be displayed in a list format (for any dashboard) rather than a calendar format.
- The user will be able to create new journal entries by clicking a create button, which will open a pop-up editing screen that will have them enter tasks, notes, etc. in a format similar to Markdown.
- The user will be able to migrate tasks by changing the date of any entry.

## Tasks

### Completed Tasks

- Determined that we do want a back-end for our project.
- Continued brainstorming possible ways to implement both the back- and front-end.

### Tasks to be Completed
- All members should continue thinking of user stories/use cases, ways to implement the project, and priority with which we should implement new features.
- Members should again consider whether they prefer to focus on being a back-end, front-end, or full-stack developer (roles aren't set in stone; individuals will still be moved to work on certain features as needed).
