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
2. Run `serverless deploy` and note of the `endpoints` section in the command output.
3. Access the HTTP GET endpoint of the Lambda.

Run `serverless remove` to remove all resources when finished testing.

## Deployment (CI/CD)
Changes to the master branch

## Monitoring
Once the application is deployed

## Assumptions
+ There is no state in the application.

## Future work and considerations
+ Use more restrictive IAM roles for deployment.
+ Verify that IAM roles assigned to the Lambda are minimally-privileged.