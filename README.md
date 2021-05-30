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

### Testing locally
1. Run `serverless invoke local --function hello`

### Testing in AWS
1. Login to AWS cli with a user that has permission to deploy the serverless application with `aws configure`. An IAM user with the `AccountAdministrator` role is sufficient, if excessive.
2. Run `serverless deploy --region ap-southeast-2 --stage localdev` and note the `endpoints` section in the command output.
3. Access the HTTP GET endpoint of the Lambda.

Run `serverless remove --region ap-southeast-2 --stage localdev` to remove all resources when finished testing. You may also 

## Deployment (CI/CD)
Changes pushed to the master branch will be automatically deployed using serverless and Github Actions.

If forking this repository, you must add two new Secrets to the repository to enable CD.
+ `AWS_ACCESS_KEY_ID`
+ `AWS_SECRET_ACCESS_KEY`

The AWS user must have permissions to deploy the application and associated resources. The `AccountAdministrator` role is sufficient, if excessive.

You may delete the `dev` and `prod` CloudFormation stacks in `ap-southeast-2` to remove all resources deployed by the pipeline.

## Monitoring
Once the application is deployed, you can assign IAM users access to monitor the application by adding them to the `aws-node-project-(dev|prod)-HelloOperators-*` user group which is automatically provisioned.

Users assigned to this role can:
+ View logs from the application sent to CloudWatch.
+ View metrics and dashboards for the API Gateway and Lambda function.
+ View CloudFormation deployment history.
+ View the application source code package.

They cannot:
+ Make changes to any resources (including making changes to provisioned concurreny).
+ Deploy new code.

Any changes must follow the CI process after a merged commit to the `master` branch.

## Assumptions
+ There is no state in the application.
+ The application does not need to access any external resources.
+ This is not a business-critical application that requires high availability.
+ The application will be monitored by a single team with a single set of privileges.
+ The application only needs to be deployed to a single region.
+ The application is used infrequently with an expected average request rate of 1 request per minute.
+ There is no authentication required to access the public GET api.
+ The GET api should be accessible from the internet.

## TODO
+ Add email alerts for high server error rate (500s).
+ Add documentation for monitoring: login, logs, alerts, metrics.
+ Add application health check that must pass before proceeding to production

## Future work and considerations
+ Add a custom domain name for accessing the API, rather then the one it automatically generates (e.g. "https://q4epyanwsk.execute-api.ap-southeast-2.amazonaws.com/dev/hello")/
+ Use more restrictive IAM roles for deployment, rather than `AccountAdministrator`. We do require the ability to create custom IAM roles though which is a highly privileged operation, so our options for restricting privilege escalation vectors may be limited.
+ Verify that IAM roles assigned to the Lambda are minimally-privileged.
+ Restrict permissions assigned to the `HelloOperatorsPolicy` further in line with the principle of least privilege.
+ Look at automatically rolling back cloudformation if health check fails within `n` minutes after deployment.
+ Investigate scaling of Lambda to determine max number of requests and associated latency.
+ Consider using [Application Auto Scaling](https://docs.aws.amazon.com/lambda/latest/dg/invocation-scaling.html) to automatically provision standby instances in response to burst load and therefore reduce average latency in such situations.
+ Add code linter and analysis for all PRs.
+ Add automated tests for the application (once it actually does something :P)
+ Add automated tests for the entire infrastructure. e.g. Upon PR, we spin up a full environment, run tests, and then tear it down. That way we can be confident that anything in `master` has been fully tested and working.
+ Refactor CloudFormation templates in serverless.yml into multiple files rather than declaring them inline.
+ Allow seperate credentials in CI/CD pipeline for dev and production deployments.
+ Create a Dashboard in CloudWatch which shows both infrastructure (Lambda) and application (API Gateway + CloudWatch Logs).
+ Don't include README.md in the package uploaded to Lambda.
+ Add probes to test api health with CloudWatch Synthetics.
+ Add alerts for: high request latency, application errors, and 500 server errors. Need to determine appropriate thresholds.