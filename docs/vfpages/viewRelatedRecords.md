# Visualforce Page: viewRelatedRecords

<details>
<summary>Overview</summary>

## Visualforce Page Overview: viewRelatedRecords

The Visualforce page 'viewRelatedRecords' displays a list of contacts related to a specific Account, showing their names, titles, phone numbers, and email addresses.

### Purpose of the Page
The main business function of this page is to provide users with quick access to related contact information for better account management and interaction.



### Metadata
- **API Version**: 54
- **Label**: View Related Records

</details>

<details>
<summary>Controllers / Extensions</summary>

## Key Controllers / Extensions Used
- **Standard Controller**: Account
- **Custom Controller**: None
- **Extensions**: 
  - ViewRelatedRecordsController

</details>

<details>
<summary>Properties & Methods</summary>

## Properties
No public properties found in associated Apex controllers/extensions.

## Methods
| Name | Return Type | Parameters | Visibility | Modifiers | Description |
| ------ | ------------- | ------------ | ------------ | ----------- | ------------- |
| `getRelatedContacts` | `void` | `()` | `` | `None` |  |

</details>

<details>
<summary>Page Structure</summary>

### Forms
- Contains 1 `apex:form` component(s)

### Inputs
- No input bindings (`apex:inputField`, `apex:inputText`, etc.) detected

### Buttons
- No button actions (`apex:commandButton`, `apex:button`, `apex:commandLink`) detected

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
- `ViewRelatedRecordsController`

### Fields
- `getRelatedContacts`
- `contacts`
- `contact.Id`
- `contact.Name`
- `contact.Title`
- `contact.Phone`
- `contact.Email`

### Custom Components
- No custom components detected

### Scripts
- No script tags detected

</details>