# Color Themes Toggle
Date: [06-08-2021]

## Context and Problem Statement
Users will likely want to edit existing bullet points at some point, either due to mistyped information or task details/deadlines/etc. that have changed. As such, we want to implement some way for users to edit the text, date, and label fields of bullet points that have already been created. Yet we also want to avoid cluttering the UI with too many buttons to make these edits.

## Considered Options

We could choose to implement:
1. The text, date, and label fields on existing bullet points as contenteditable divs with event listeners to track when a user edits these fields. We would also need to implement checks for when the user inputs invalid information and handle these cases appropriately.
2. A separate modal that preloads input fields with the text, date, and label associated with a specific bullet point. The user can click a button to save their changes, exit the modal without saving, or delete the bullet point entirely.
3. Some combination of the two above (ex: a modal for the date and label only, with a contenteditable div for the text).

## Decision Outcome

We ultimately chose to proceed with option (2). Option (1) would be somewhat difficult to fully implement within the time available to complete the project, as we would have to add checks to make sure the user doesn't enter invalid dates/labels. It would also be less intuitive to new users, since there wouldn't be an obvious visual marker that these fields can be edited. (3) would likely confuse the user and could end up cluttering the UI with extra buttons. (2) is intuitive (most people who are aqcuainted with websites and digital applications would be able to identify an 'edit' icon) and only requires one more button per bullet point.
