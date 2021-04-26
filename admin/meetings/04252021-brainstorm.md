# 04/25/2021 (Brainstorm Continued)
Meeting held over Zoom from 6-7:25PM PST

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

(Brainstorm, 04/22/2021 from 12:30-1:33PM PST)

Continued brainstorming ways to implement the back- and front-end of the project, tried to solidify our project vision.

### Brainstorm (Part 3)

In this meeting we specifically addressed many of the points laid out in the "Brainstorming Activity" assignment:
- Project Pitch
    - Will hold another meeting for this once we've locked down all the other points; need to involve the TA in this one.
- Overarching Decisions
    - There is a Google doc available [here](https://docs.google.com/document/d/1KX4YjW_7OkNElgfTjipk1msMMCtimd-6wryPgpKA9FI/edit) which lays out our major decisions. In less detail, these are the decisions made:
        - So long as this is allowed, we plan to forgo separate Daily/Weekly tabs in favor of a singly Monthly tab.
        - We plan to maintain a back-end database.
        - We plan to maintain a single JSON file per use which will store all of their journal entries as objects with attributes for main body content, title, date, etc.
        - We plan to make journal entry creation on our application similar to post creation on tumblr. 
        - We plan to only allow one journal entry per day as opposed to multiple (for the time being; we may implement the latter if time alows).
        - Migration will be implemented as part of the pop-up editor.
        - We plan to maintain a minimalistic visual interface with 2 main theme colors, and light/dark modes.
- User Centered Thinking
    - The Google doc linked above also contains several user stories/use cases. In less detail, these are the main problems/features addressed by the stories:
        - User wants to migrate the contents of today's journal entry to tomorrow's
        - User wants to make a note for the month that isn't tied to any specific day
        - User wants to make a custom (undated) entry
        - User wants to view yesterday's entry
        - User wants to view previous journal entries
        - User wants to create a new journal entry
        - User wants to add a label to a specific entry
        - User wants to add a new entry to the future log
- System Diagrams
    - We briefly went over what such a diagram might look like [here](https://docs.google.com/drawings/d/1ETju50DMJzqVEBbw5LtZryR1ybEqVeuQLSC5bNhTj_g/edit), though we plan to go into more detail in a future meeting.
- Interface Design
    - Different team members have provided different fat marker designs of their own vision for the project in the slack workspace; we will narrow down a specific design as the other points are completed.
- Project Roadmap
    - For now, our goals are:
        - Week 7: Have a Minimum Viable Product ready (should be able to create a post on the front-end and store in the back-end, view posts in the monthly tab, and handle GET/POST requests).
        - Week 8: Our own version of Markdown and tabs/labels should be implemented
        - Week 9: Migration should be implemented
        - Week 10: Finishing touches

We also gathered questions for the TA:
- Is it necessary for our BuJo implementation to allow for both diary-style and tasklist-style entries? Or is it alright to only focus on one type that best matches the 'problem' we want to solve (track mood and recording daily events vs. easy organization of events/deadlines)
- Do we need to implement Daily/Weekly/Monthly sections all as separate entities? Or is it fine to just implement a Monthly section where the user can choose to view individual daily entries?

## Tasks

### Completed Tasks

- Continued brainstorming possible ways to implement both the back- and front-end.
    - Delved into more specifics as to what languages we're considering using, how we'll store entries, how front- and back-ends will interact, etc.

### Tasks to be Completed
- All members should continue thinking of the points addressed above and bring up any new ideas/concerns in the next meeting.
- All members should contribute to the effort of migrating user stories, brainstorming documents, and other artifacts into the specs folder.
