# Energion

## Introduction

> This is the back-end API setup for the GIS-GPS based connection estimation generation project deployed in conjuction with the specifics defined in the respective SRS document to allow for the same.

## Installation and Running

> npm install

> npm start

## Routes

### Welcome Route

Method | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
GET | / | None | Welcome Message

### Authentication Routes

Method | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
POST | /auth/register | fullName, userName, email, phone, passEnter, passConfirm | Success/Error Message
GET | /auth/verify/:username/:code | None | Success/Error Message
POST | /auth/verify/phone/:username | otp | Success/Error Message
POST | /auth/login | username, password | Success Message -> Token or Error Message
GET | /auth/logout | token (Header: x-access-token) or Params | Success/Error Message
POST | /auth/change-password | token, oldPassword, newPassword | Success/Error Message
GET | /auth/status | token | Success/Error Message

### Estimation Routes

Method | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
POST | /matrix/est | address, capacity | Rate Object

### Connection Routes

Method | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
POST | /connection/new | applicantName, father_husbandName, connectionAddress, contactNumber, emailAddress, permanentAddress, aadharNumber, connectionCategory, connectionType, loadDemand, voltageSupply | Success/Error Message
POST | /connection/transfer | applicationID,transferName,aadhar,address | updatedData Object / Error Message
POST | /connection/closure | applicationID,billNumber,billAmount,reason | updatedData Object / Error Message
POST | /connection/delete | applicationID | Success /Error Message
POST | /connection/update | applicationID, applicantName | data/Error
POST | /connection/mycon | email | data/Error


## To-do List

* Passport / Oauth Integration

* Finalize models.

* Organize client side redirects.

## Application URL

> Not Deployed.
