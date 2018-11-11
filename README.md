# Energion

## Introduction

> This is the GIS-GPS based connection estimation generation project deployed in conjuction with the specifics defined in the respective SRS document to allow for the same. Also, this is the second version.

## Installation and Running

> npm i

> ng build

> npm start

## Routes

### Authentication Routes

> Url: /api/auth

Method | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
POST | /register | fullName, userName, email, phone, passEnter, passConfirm | Success/Error Message
GET | /verify/:username/:code | None | Success/Error Message
POST | /login | username, password | Success Message -> Token or Error Message
GET | /logout | token (Header: x-access-token) or Params | Success/Error Message
POST | /change-password | token, oldPassword, newPassword | Success/Error Message
GET | /status | token | Success/Error Message

### Estimation Routes

> Url: /api/matrix

Method | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
POST | /est | address, capacity | Rate Object

### Connection Routes

> Url: /api/connection

Method | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
POST | /new | applicantName, father_husbandName, connectionAddress, contactNumber, emailAddress, permanentAddress, aadharNumber, connectionCategory, connectionType, loadDemand, voltageSupply | Success/Error Message
POST | /transfer | applicationID,transferName,aadhar,address | updatedData Object / Error Message
POST | /closure | applicationID,billNumber,billAmount,reason | updatedData Object / Error Message
POST | /delete | applicationID | Success /Error Message
POST | /update | applicationID, applicantName | data/Error
POST | /mycon | email | data/Error


## To-do List

* Dashboards

* Apps

* Load Balancing

* Production Setup

## Application URL

> https://energion.metaxyt.cf
