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
1. Login to AWS cli with a user that has permission to deploy the serverless application with `aws configure`. An IAM user with the `AccountAdministrator` role is sufficient, if excessive.
2. Run `serverless deploy` and note the `endpoints` section in the command output.
3. Access the HTTP GET endpoint of the Lambda.

Run `serverless remove` to remove all resources when finished testing.

## Deployment (CI/CD)
Changes pushed to the master branch will be automatically deployed using serverless and Github Actions.

If forking this repository, you must add two new Secrets to the repository to enable CD.
+ `AWS_ACCESS_KEY_ID`
+ `AWS_SECRET_ACCESS_KEY`

The AWS user must have permissions to deploy the application and associated resources. The `AccountAdministrator` role is sufficient, if excessive.

## Monitoring
Once the application is deployed

TODO:
`#https://signin.aws.amazon.com/switchrole?account=your_account_ID_or_alias&roleName=optional_path/role_name`

## Assumptions
+ There is no state in the application.
+ This application does not need to access any external resources.
+ This is not a business-critical application that requires high availability.
+ The application will be monitored by a single team with a single set of privileges.
+ The application only needs to be deployed to a single region.

## TODO
+ Add IAM role that operators can use for monitoring the system. Not allowed to redeploy/modify code.
+ Add ability for users to assume the operator role.  
https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_permissions-to-switch.html
+ Add synthetic load / probes to test api health.
+ Add email alerts for high server error rate (500s).
+ Look at automatically rolling back cloudformation if health check fails within `n` minutes after deployment.
+ Add documentation for monitoring: login, logs, alerts, metrics.

## Future work and considerations
+ Add a custom domain name for accessing the API, rather then the one it automatically generates (e.g. "https://q4epyanwsk.execute-api.ap-southeast-2.amazonaws.com/dev/hello")/
+ Use more restrictive IAM roles for deployment, rather than `AccountAdministrator`. We do require the ability to create custom IAM roles though which is a highly privileged operation, so our options for restricting privilege escalation vectors may be limited.
+ Verify that IAM roles assigned to the Lambda are minimally-privileged.
+ Support rollout to multiple environments, such as staging or production.
+ Support automatic rollbacks in case of issues after a new deployment.
+ Investigate scaling of Lambda to determine max number of requests and associated latency.
+ Consider using [Application Auto Scaling](https://docs.aws.amazon.com/lambda/latest/dg/invocation-scaling.html) to automatically provision standby instances in response to burst load and therefore reduce average latency in such situations.