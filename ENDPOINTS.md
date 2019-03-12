#Routes

## Authentication Routes

* URL: /api/auth

Method | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
POST | /register | fullName, userName, email, phone, passEnter, passConfirm | Success/Error Message
GET | /verify/:username/:code | None | Success/Error Message
POST | /login | username, password | Success Message -> Token or Error Message
GET | /logout | token (Header: x-access-token) or Params | Success/Error Message
POST | /change-password | token, oldPassword, newPassword | Success/Error Message
GET | /status | token | Success/Error Message

## Estimation Routes

Method | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
POST | /api/estimate | address, capacity | Rate Object

## Connection Routes

> URL: /api/connection

Method | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
POST | /new | applicantName, father_husbandName, connectionAddress, contactNumber, emailAddress, permanentAddress, aadharNumber, connectionCategory, connectionType, loadDemand, voltageSupply | Success/Error Message
POST | /transfer | applicationID,transferName,aadhar,address | updatedData Object / Error Message
POST | /closure | applicationID,billNumber,billAmount,reason | updatedData Object / Error Message
POST | /delete | applicationID | Success /Error Message
POST | /update | applicationID, applicantName | data/Error
POST | /mycon | email | data/Error
