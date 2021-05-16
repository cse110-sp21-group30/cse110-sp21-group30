# User Login Details
Date: [05-16-2021]

## Context and Problem Statement
We want to allow users to access their personal Bullet Journal's in a hassle-free way. How we handle login-details will affect 
ease of use and security. 

## Considered Options
1. We could allow users to only login with their username (no password), similar to how When2Meet handles logins. 
2. Ask users to create a password as well as a username in order to login to their BuJo. 
3. Instead of using AWS for a database, we can just use local storage so that there is no security/privacy concerns, and no need for a login/password. 
4. We could use AWS for a database, and use a third party service like firebase for authentification/security. 

## Decision Outcome
After discussing with professor Powell and TA Deepak, we have decided to use local storage instead of a database server, so option (3). This is because the professor advised against a 'middle of the road' approach to security. He mentioned that we could use firebase for a third party approach to authentification (option 4). We decided though that using an AWS database and learning to incorporate the third party authentification would take too much time though. Since everything will be stored locally, we now have no need for a login/password. Nataly suggested including a local passphrase/security question, but we've decided to only implement this later if we have time. 
