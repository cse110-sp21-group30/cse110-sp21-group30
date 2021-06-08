# 06/07/2021 (Sprint 4 Review)
Meeting held over Zoom from 6:45-7PM PST

Team 30 - Cool Beans
## Attendance
Andrew Pham

Angus Yick

Eric Jin

Ikjoon Park

Joe Ikedo

Nataly Buhr

Sonika Ram

Thet Zaw
## Overview
During the retrospective meeting we aimed to gather feedback from all members on our last sprints ways 
we would improve a future sprint if we had the time left for one. Below are the topics covered and 
points brought up by members.

### Thoughts, Comments, and Concerns
Andrew:

Greatly appreciated Thet's help with implementing the search filter. Thinks we could have done a 
better job with time management, as we all felt a bit rushed near the project deadline. Still, 
very proud of the application we've manage to produce.

Angus:

Was able to implement a lot of UI changes in this sprint - the major change being the color theme 
toggle. After this sprint, realized that the team probably could have employed better time management
strategies to avoid last-minute stress, especially going into finals week. If we had more time, would
have liked to implement more design changes.

Eric:

Mainly focused on cleanup and quality-of-life changes in this sprint. Felt that it would have been easier 
to implement these smaller changes if the code had been broken up into more files. Long files make it 
harder to keep track of certain functions and whether changes could impact the way tests are run/the 
application works. If we had another sprint, would have liked to have allocated more time to organize 
the code to make it easier to onboard members and generally improve readability.

Ikjoon:

Felt like he played a relatively minor role in this sprint and could have worked with other team members
more closely to aid with division of labor. Agrees that better time management and more planning ahead of time,
rather than in coding sessions, would have made this sprint run more smoothly.

Joe:

Implemented a series of UI improvements and more thorough tests in this sprint. Found that in larger files and
PRs, it's difficult to hunt down application- or test-breaking lines. If we had more time to work on the
project, would have liked to develop more thorough documentation that would make it easy to track dependencies
and identify lines of code that could require a revision of the tests.

Nataly:

Wasn't as hands-on with the code in this sprint; was more focused on setting up a 'game plan' for finals week
and narrowing down the remaining issues we could reasonably fix before the project deadline. Definitely agreed
that better time management would have been a plus going into finals week. If there were time for another sprint, 
would have liked to have more planning meetings and promote better organizational practices.

Sonika:

Worked on implementing UI changes, color themes, picking icons, etc. in this sprint. Definitely felt that
communication between members had improved and team efficiency increased as a result. Agrees that the team
could have benefited from better time management.

Thet:

Worked on the search modal and new editor modal, as well as handled edge cases in this sprint. Noticed that the
team became more rushed as we approached the project deadline -- also felt that we could have employed better
time management. If we had more time to work on the project, would have liked to dedicate more time to identifying
and fixing edge cases to improve the overall user experience.

### Challenges
We ran into a couple of incidents this week in which code was pushed to the sprint branch (not main) without being properly
tested. This actually lead to some issues where, when we finally did test future branches, we had a more difficult time
identifying exactly what caused our tests to fail. Ultimately these issues were a matter of changing class names or ids,
but they became a drain on time.

### Takeaways
Communication is key; team members should always try to make sure that other members are aware of changes to the code and
how they might impact our tests, future features, etc. Proper time management is also essential; specific deadlines should be
set for issues so that we can avoid excessive backlogging and future stress. Finally, thorough documentation and adherence to 
style guidelines is essential as your code base grows in size to maintain readability and make it easier to track down bugs.
