# Onboarding
## For Team Members
Welcome to the team! New team members should review the latest sprint review/retrospective and meeting minutes in the [meetings](https://github.com/cse110-sp21-group30/cse110-sp21-group30/tree/small-fixes/admin/meetings) folder before making any changes to the repository. Also take a look at our [pitch](https://github.com/cse110-sp21-group30/cse110-sp21-group30/tree/small-fixes/specs/pitch) documents to get a sense of our vision for the application.

To begin making changes to the repository, you can either:
1. Clone the repository by running `git clone <https://github.com/cse110-sp21-group30/cse110-sp21-group30.git>`
2. Navigate to the files in your terminal or open them in an IDE to begin making changes (open a new branch if you're changing more than just documentation)

Or:
1. Make a branch off of main or the latest sprint branch on the GitHub website
2. Begin making changes directly in this branch

For team style guidelines and pull request procedures, refer to the [cipipline](https://github.com/cse110-sp21-group30/cse110-sp21-group30/tree/small-fixes/admin/cipipeline) folder. 

To run tests on your changes locally:
1. Run `npm install --save-dev puppeteer jest-puppeteer` from the cse110-sp21-group30 folder
2. Make any desired changes to the configuration files (ex: setting headless to true in jest-puppeteer.config.js)
3. Add or remove tests from \_\_tests\_\_/script.test.js
4. Change the URLs in \_\_tests\_\_/script.test.js to your localhost name
    - you can leave the URLs as-is if you've already committed your changes on your branch and have rewired the GitHub Page to publish through this branch
6. run `npm test` from the cse110-sp21-group30 folder

To run tests on your changes through GitHub:
1. Republish the team GitHub Page through your branch
2. Either allow the tests to run automatically with new commits, run them manually from the Actions tab, or create a pull request (in which case they will also run automatically)

## For Independent Developers
If you like what we've done so far but want to make your own tweaks and additions to it, feel free to fork our repository on GitHub and add your own code to it.

To make changes on your local machine:
1. Clone your forked repository by running `git clone <https://github.com/your-username/cse110-sp21-group30.git>`
2. Navigate to the files in your terminal or open them in an IDE to begin making changes
    - You can employ your own coding style, but we suggest you adhere to the conventions for Cool Beans team members for the sake of consistency

To run tests on your local machine:
1. Run `npm install --save-dev puppeteer jest-puppeteer` from the cse110-sp21-group30 folder
2. Make any desired changes to the configuration files (ex: setting headless to true in jest-puppeteer.config.js)
3. Add or remove tests from \_\_tests\_\_/script.test.js
4. Change the URLs in \_\_tests\_\_/script.test.js to your localhost name (or the URL of your GitHub page; wherever your site is published)
5. run `npm test` from the cse110-sp21-group30 folder
