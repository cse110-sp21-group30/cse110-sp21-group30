# Bullet Journal Section/Overviews
Date: [05-10-2021]

## Context and Problem Statement
Bullet journals are often organized by date so that an author/user can easily find what assignment or task needs to be completed by a certain time. While daily/weekly/monthly/yearly overviews are common, it's possible for a bullet journal to be organized by different criteria.

## Considered Options
We could choose to implement:
1. Daily/Weekly/Monthly/Yearly Views
2. Monthly/Past/Future/Custom Views

## Decision Outcome

Chosen option: (2), because these views would allow the user to search for specific entries by date (we found that daily/weekly overviews were not essential as they are encompassed by the monthly view, and the yearly overview is unlikely to be in high demand since most users won't be concerned with far-off deadlines. The future view is provided to allow the user to schedule tasks or assignments far in advance if needed. The past view allows the user to reflect on previous schedules and tasks completed. The custom view allows the user to maintain a separate collection of non-dated entries, which may include low-priority tasks or miscellaneous notes. Journal entries marked with no date will be displayed under the custom view. Journal entries dated with the current month will be displayed under the monthly view. Journal entries marked with a date older/further ahead than the current month will be displayed under the past and future views, respectively.
