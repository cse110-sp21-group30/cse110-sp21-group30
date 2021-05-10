# Migration Handling
Date: [05-10-2021]

## Context and Problem Statement
We want to allow the user to be able to migrate any unfinished tasks/bullets to future logs of their Bullet Journal. This should be done in a way that promotes ease of use and helps users identify any lingering tasks that need completion. 

## Considered Options
1. In order to migrate tasks, the user would select the migrate button, and the date they want to migrate tasks to. Then, two modals/windows would open up, and the user would copy/paste the raw markdown text that contains their bullets. 
2. This approach would require a more bullet-centric approach as a whole, where the user would be able to select individual bullets that are their own contained sort of elements in a log, and choose to migrate them specifically. We could also have a feature where the user can drag/drop bullets to/from the modals that pop up when they choose to migrate. 

## Decision Outcome
We initially decided on option (1). This is because our concept of the overall BuJo was to have the user write entries in markdown (we were assuming they would have prior knowledge). Because of this structure, we thought it would be simplest in terms of development to have the user manually select the text they wanted to migrate. However, we are now re-working our BuJo concept after meeting with TA Deepak, because there were concerns that we needed a more bullet-centric design, rather than a text notepad approach. So we are deciding to go with option (2), because it is more in line with the BuJo philosophy of keeping bullets as the heart of the application. In addition, option (1) creates more work for the user and decreases ease of use. We may not be able to implement the drag and drop feature of option (2), so it might just be a checkbox/arrow button instead. 