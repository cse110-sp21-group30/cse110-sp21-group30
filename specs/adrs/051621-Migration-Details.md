# Migration Handling
Date: [05-16-2021]

## Context and Problem Statement
We needed to decide how we would like to handle migration within the context of our new design columns as described [here](051621-Bujo-Overviews.md), since we decided to no longer include the monthly/past/future tabs. 

## Considered Options
1. In order to migrate tasks from one date to another, the user would select the migrate button, and the date they want to migrate tasks to. Then, two modals/windows would open up, and the user would copy/paste the raw markdown text that contains their bullets. 
2. This approach would require a more bullet-centric approach as a whole, where the user would be able to select individual bullets that are their own contained sort of elements in a log, and choose to migrate them specifically to other dates. We could also have a feature where the user can drag/drop bullets to/from the modals that pop up when they choose to migrate. 
3. No date based migration, only allow for moving bullets between the three columns (High priority, low priority, complete). Allow for changing the date of specific bullets though.

## Decision Outcome
After our design overhaul, we decided to go with option (3). Since our new design for the BuJo does not have chronological ordering for tabs, we decided that date-based migration of bullets from one day to another didn't make sense within the context of our new design because we would no longer have daily/weekly entry pages. Bullets themselves have their own dates associated with them, and so instead we can just allow for changing the date of individiual bullets. We do want to let users easily 'migrate' bullets between the three columns of our new design though. Initially this will probably just be with buttons, if we have time we might try to allow for dragging/dropping bullets between the High Priority/Low Priority/Completed columns but for now we will focus on just using buttons for this. 