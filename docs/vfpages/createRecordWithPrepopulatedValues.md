# Visualforce Page: createRecordWithPrepopulatedValues

<details>
<summary>Overview</summary>

## Visualforce Page Overview: createRecordWithPrepopulatedValues

The 'createRecordWithPrepopulatedValues' Visualforce page allows users to create a new Account record with prepopulated fields. It includes input fields for Account Name, Type, Phone, and Number of Employees, enabling users to easily edit and save the account details.

### Purpose of the Page
The main business function of this page is to streamline the process of creating new Account records in Salesforce by providing a user-friendly interface with essential fields prefilled, thereby enhancing user efficiency and data accuracy.



### Metadata
- **API Version**: 54
- **Label**: Create Record with Prepopulated Values

</details>

<details>
<summary>Controllers / Extensions</summary>

## Key Controllers / Extensions Used
- **Standard Controller**: Account
- **Custom Controller**: None
- **Extensions**: 
  - CreateRecordPrepopulatedController

</details>

<details>
<summary>Properties & Methods</summary>

## Properties
No public properties found in associated Apex controllers/extensions.

## Methods
No public methods found in associated Apex controllers/extensions.

</details>

<details>
<summary>Page Structure</summary>

### Forms
- Contains 1 `apex:form` component(s)

### Inputs
The page utilizes the following input bindings/fields:
- `{!account.Name}`
- `{!account.Type}`
- `{!account.Phone}`
- `{!account.NumberOfEmployees}`

### Buttons
The page has buttons/links linked to the following actions:
- `{!save}`
- `{!cancel}`

</details>

<details>
<summary>AJAX Interactions</summary>

- No `apex:actionSupport` components detected

- No `apex:outputPanel` components with an ID detected

</details>

<details>
<summary>Dependencies & Scripts</summary>

### Objects
- No SObject dependencies detected

### Fields
- No field dependencies detected

### Custom Components
- No custom components detected

### Scripts
- No script tags detected

</details>