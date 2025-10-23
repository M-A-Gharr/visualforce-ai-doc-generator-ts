# Visualforce Page: createRecordWithPrepopulatedValues

---

<details>
<summary>Overview</summary>

## Visualforce Page Overview: createRecordWithPrepopulatedValues

The 'createRecordWithPrepopulatedValues' Visualforce page is designed to facilitate the creation of new Account records in Salesforce, pre-populating certain fields for user convenience.

### Purpose of the Page
Its main purpose is to provide an intuitive user interface where users can easily input or modify Account details, enhancing the efficiency of record creation.



### Metadata
- **API Version**: 54
- **Label**: Create Record with Prepopulated Values

</details>

---

<details>
<summary>Controllers / Extensions</summary>

## Key Controllers / Extensions Used
- **Standard Controller**: Account
- **Custom Controller**: None
- **Extensions**: 
  - CreateRecordPrepopulatedController

</details>

---

<details>
<summary>Properties & Methods</summary>

## Properties
_No public properties found in associated Apex controllers/extensions._

---

## Methods
_No public methods found in associated Apex controllers/extensions._

</details>

---

<details>
<summary>Page Structure</summary>

### Forms
- Contains **1** `apex:form` component(s)

### Inputs
The page utilizes the following input bindings:
- `{!account.Name}`
- `{!account.Type}`
- `{!account.Phone}`
- `{!account.NumberOfEmployees}`

### Buttons
The page includes buttons or links linked to:
- `{!save}`
- `{!cancel}`

</details>

---

<details>
<summary>Page Blocks</summary>

## Page Blocks on the Page
- **Title**: `Account details`

</details>

---

<details>
<summary>AJAX Interactions</summary>

- No `apex:actionSupport` components detected.

- No `apex:outputPanel` components detected.

</details>

---

<details>
<summary>Dependencies & Scripts</summary>

### Objects
- `Account`
- `CreateRecordPrepopulatedController`

### Fields
- `save`
- `cancel`
- `account.Name`
- `account.Type`
- `account.Phone`
- `account.NumberOfEmployees`

### Custom Components
- No custom components detected.

### Scripts
- No script tags detected.

</details>