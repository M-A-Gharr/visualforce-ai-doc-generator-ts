# Visualforce Page: createMixedRecords

---

<details>
<summary>Overview</summary>

## Visualforce Page Overview: createMixedRecords

The 'createMixedRecords' Visualforce page allows users to input details for creating a new contact and a new opportunity simultaneously.

### Purpose of the Page
Its purpose is to simplify the data entry process by providing a single form to capture relevant information needed to create both records in Salesforce.



### Metadata
- **API Version**: 54
- **Label**: Create Mixed Records

</details>

---

<details>
<summary>Controllers / Extensions</summary>

## Key Controllers / Extensions Used
- **Standard Controller**: None
- **Custom Controller**: CreateMixedRecordsApexController
- **Extensions**: 
  None

</details>

---

<details>
<summary>Properties & Methods</summary>

## Properties
| Name | Type | Visibility | Modifiers | Description |
|------|------|-------------|------------|--------------|
| `contactFirstName` | `String` | `public` | `None` | The first name of the contact to be created. |
| `contactLastName` | `String` | `public` | `None` | The last name of the contact to be created. |
| `opportunityName` | `String` | `public` | `None` | The name of the opportunity to be created. |

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
- `{!contactFirstName}`
- `{!contactLastName}`
- `{!opportunityName}`

### Buttons
The page includes buttons or links linked to:
- `{!createContactAndOpportunity}`

</details>

---

<details>
<summary>Page Blocks</summary>

## Page Blocks on the Page
- **Title**: `Records To Create`

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
- `CreateMixedRecordsApexController`

### Fields
- `createContactAndOpportunity`
- `contactFirstName`
- `contactLastName`
- `opportunityName`

### Custom Components
- No custom components detected.

### Scripts
- No script tags detected.

</details>