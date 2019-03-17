# Routes

## Authentication

> URL: /api/auth

Method | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
GET | /status | token | Success / Error Message
GET | /verify/:username/:code | None | Success / Error Message
GET | /logout | token (Header: x-access-token) or Params | Success / Error Message
POST | /register | fullName, userName, email, phone, passEnter, passConfirm | Success / Error Message
POST | /login | username, password | Token / Error Message
POST | /change-password | token, oldPassword, newPassword | Success / Error Message
POST | /forgot | id |  Success / Error Message
POST | /reset/:id/:code | password | Success / Error Message


## Estimation

Method | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
POST | /api/estimate | address, capacity | Rate Object

## Connection

> URL: /api/connection

> Access: 1

Method | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
POST | /new | applicantName, father_husbandName, connectionAddress, contactNumber, emailAddress, permanentAddress, aadharNumber, connectionCategory, connectionType, loadDemand, voltageSupply | Success/Error Message
POST | /transfer | applicationID,transferName,aadhar,address | updatedData Object / Error Message
POST | /closure | applicationID,billNumber,billAmount,reason | updatedData Object / Error Message
POST | /delete | applicationID | Success /Error Message
POST | /update | applicationID, applicantName | data/Error
POST | /mycon | email | data/Error

## Admin

> URL: /api/admin

> Access: 5

Method | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
GET | /getApplications | filter in query ( pending, accepted, rejected) | Success / Error Message
POST | /approveApplication | id, lineman | Success / Error Message
POST | /rejectApplication | id, type (user, finance, availability), reason | Success / Error Message
GET | /getLineman | None | Success / Error Message
GET | /getUsers | None | Success / Error Message
POST | /modifyAccess | id, level | Success / Error Message

## Lineman

> URL: /api/lineman

> Access: 2

Method | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
GET | /pending | None | Success / Error Message
POST | /complete | id | Success / Error Message