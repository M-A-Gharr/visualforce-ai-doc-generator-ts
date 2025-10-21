# Visualforce Page: editRecord

<details>
<summary>Overview</summary>

## Visualforce Page Overview: editRecord

The 'editRecord' Visualforce page is designed to allow users to edit account details in the Salesforce system. It presents a form that includes input fields for various account attributes such as Name, Type, Phone, and Number of Employees.

### Purpose of the Page
The main business function of this page is to facilitate the modification of existing account records, enabling users to update crucial account information efficiently.



### Metadata
- **API Version**: 54
- **Label**: Edit Record

</details>

<details>
<summary>Controllers / Extensions</summary>

## Key Controllers / Extensions Used
- **Standard Controller**: Account
- **Custom Controller**: None
- **Extensions**: 
  None

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
- `{!quicksave}`
- `{!cancel}`

</details>

<details>
<summary>Page Blocks</summary>
## Page Blocks on the Page
No `apex:pageBlock` components detected.
</details>

<details>
<summary>AJAX Interactions</summary>

- No `apex:actionSupport` components detected

- No `apex:outputPanel` components with an ID detected

</details>

<details>
<summary>Dependencies & Scripts</summary>

### Objects
- `Account`

### Fields
- `save`
- `quicksave`
- `cancel`
- `account.Name`
- `account.Type`
- `account.Phone`
- `account.NumberOfEmployees`

### Custom Components
- No custom components detected

### Scripts
- No script tags detected

</details>