# CI/CD Pipeline
## Current Status
As of 06/09/2021, our CI/CD Pipeline is equipped with an HTML Validator, an automated Jest test suite, and a PR Commenter. 

Since the last phase, we've added more Jest tests for the search feature, accessing the archive, and changing the color theme. As we recently changed this repository to be public, we'll redirect the tests to run on a Github Page we publish through this repository shortly. Since we set a goal to implement any final features and UI changes by Monday (06/08/2021), we decided not to open another sprint branch for this week. Besides that, our rules for handling pull requests and pushes to the repository remain the same as in phase 2.

## Challenges
We encountered some issues while trying to implement tests for the color theme toggle. We were unfamiliar with how to get specific attributes (such as background color) from HTML elements, so it took some research to find a way to implement the tests. There were also a couple incidents in the last sprint where members accidentally created pull requests without updating the test server, so code was mistakenly marked as passing the tests until later pull requests revealed that there was an issue. We reiterated the importance of checking that the test server has been updated before merging pull requests in another meeting, and since then the same mistake hasn't been made.

Finally, some members tried to look into setting up code coverage reporting for the Jest tests. Just adding the --coverage flag in the cofiguration file produced an empty coverage report when tests were run through Github actions. Unfortunately, we were unable to find a solution for this due to time constraints.

## Future Plans
If we had more time to work on the project, we would try to implement code coverage reports and a linter.
