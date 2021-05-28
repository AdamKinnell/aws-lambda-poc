# aws-lambda-poc

## Overview

## Development

### Prerequisites
+ Install [node.js 14.17.0](https://nodejs.org/en/)  
  `cinst nvm -y` with Chocolatey  
  `nvm install 14.17.0`  
  `nvm use 14.17.0`  
+ Install [serverless](https://github.com/serverless/serverless)  
  `npm install -g serverless`
+ Install [AWS cli](https://aws.amazon.com/cli/)  
  `cinst awscli -y` with Chocolatey
+ Login to AWS cli with an account

### Testing locally
1. Run `serverless invoke local --function hello`

### Testing in AWS
1. Login to AWS cli with a user that has permission to deploy the serverless application (Assigned the 'AdministratorAccess' role).
2. Run `serverless deploy` and note the `endpoints` section in the command output.
3. Access the HTTP GET endpoint of the Lambda.

Run `serverless remove` to remove all resources when finished testing.

## Deployment (CI/CD)
Changes pushed to the master branch will be automatically deployed using serverless and Github Actions.

If forking this repository, you must add two new Secrets to the repository to enable CD.
+ `AWS_ACCESS_KEY_ID`
+ `AWS_SECRET_ACCESS_KEY`

The AWS user must have permissions to deploy the application and associated resources.

## Monitoring
Once the application is deployed

## Assumptions
+ There is no state in the application.
+ This application does not need to access any external resources.
+ This is not a business-critical application that requires high availability.
+ The application will be monitored by a single team with a single set of privileges.

## Future work and considerations
+ Use more restrictive IAM roles for deployment.
+ Verify that IAM roles assigned to the Lambda are minimally-privileged.
+ Investigate incremental rollout of new Lambda code versions.
+ Investigate scaling of Lambda to determine max number of requests
+ Support rollout to multiple environments, such as staging or prod.
+ Support automatic rollbacks in case of issues after a new deployment.