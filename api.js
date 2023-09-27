const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);

        // Validate the request body
        if (!isValidEmployee(requestBody)) {
            return createResponse(400, 'Invalid employee data');
        }

        // Generate a unique employee ID or use a UUID
        const employeeId = generateEmployeeId();

        // Save the employee data to DynamoDB
        await saveEmployeeToDynamoDB(employeeId, requestBody);

        return createResponse(201, 'Employee created successfully');
    } catch (error) {
        console.error('Error:', error);
        return createResponse(500, 'Internal server error');
    }
};

function isValidEmployee(employee) {
    // Implement your validation logic here
    // For example, check if required fields are present and have valid values
    return (
        employee.firstName &&
        employee.lastName &&
        employee.email &&
        employee.dateOfBirth &&
        // Add more validations here
        true
    );
}

function generateEmployeeId() {
    // Generate a unique ID, e.g., using a UUID library
    // Replace with your implementation
    return 'EMP' + Date.now();
}

async function saveEmployeeToDynamoDB(employeeId, employeeData) {
    const params = {
        TableName: 'EmployeeTable', // Replace with your DynamoDB table name
        Item: {
            employeeId,
            ...employeeData,
        },
    };
    await dynamoDB.put(params).promise();
}

function createResponse(statusCode, message) {
    return {
        statusCode,
        body: JSON.stringify({ message }),
    };
}
