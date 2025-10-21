# Visualforce Page: createMixedRecords

<details>
<summary>Overview</summary>

## Visualforce Page Overview: createMixedRecords

The 'createMixedRecords' Visualforce page allows users to input details for a new contact and a new opportunity. Once the user fills in the required fields and clicks the button, both records are created in Salesforce.

### Purpose of the Page
The main business function of this page is to streamline the process of creating both a new contact and a new opportunity simultaneously, enhancing efficiency in record management.



### Metadata
- **API Version**: 54
- **Label**: Create Mixed Records

</details>

<details>
<summary>Controllers / Extensions</summary>

## Key Controllers / Extensions Used
- **Standard Controller**: None
- **Custom Controller**: CreateMixedRecordsApexController
- **Extensions**: 
  None

</details>

<details>
<summary>Properties & Methods</summary>

## Properties
No public properties found in associated Apex controllers/extensions.

## Methods
| Name | Return Type | Parameters | Visibility | Modifiers | Description |
| ------ | ------------- | ------------ | ------------ | ----------- | ------------- |
| `createContactAndOpportunity` | `void` | `()` | `` | `None` |  |

</details>

<details>
<summary>Page Structure</summary>

### Forms
- Contains 1 `apex:form` component(s)

### Inputs
The page utilizes the following input bindings/fields:
- `{!contactFirstName}`
- `{!contactLastName}`
- `{!opportunityName}`

### Buttons
The page has buttons/links linked to the following actions:
- `{!createContactAndOpportunity}`

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
- `CreateMixedRecordsApexController`

### Fields
- `createContactAndOpportunity`
- `contactFirstName`
- `contactLastName`
- `opportunityName`

### Custom Components
- No custom components detected

### Scripts
- No script tags detected

</details>