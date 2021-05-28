'use strict';

module.exports.hello = async event => {
    let statusCodeValue;
    let messageValue;
    switch (Math.floor(Math.random() * 6) + 1) {
        case 1:
            // 16% chance
            statusCodeValue = 400;
            messageValue = 'Error: You did something wrong!';
            break;
        case 2:
            // 16% chance
            statusCodeValue = 500;
            messageValue = 'Error: Oops! We did something wrong.';
            break;
        default:
            // 66% chance
            statusCodeValue = 200;
            messageValue = 'All good! Your function executed successfully.';
    }
    return {
        statusCode: statusCodeValue,
        body: JSON.stringify(
            {
                message: messageValue,
                input: event,
            },
            null,
            2
        ),
    };
};