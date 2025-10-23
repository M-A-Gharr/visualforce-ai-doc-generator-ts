# Visualforce Page: viewRelatedRecords

---

<details>
<summary>Overview</summary>

## Visualforce Page Overview: viewRelatedRecords

The 'viewRelatedRecords' page is a Visualforce page designed to display a list of contacts related to a specific Account record.

### Purpose of the Page
It serves to retrieve and present related contact information, including their names, titles, phone numbers, and email addresses, enhancing data visibility and accessibility for users.



### Metadata
- **API Version**: 54
- **Label**: View Related Records

</details>

---

<details>
<summary>Controllers / Extensions</summary>

## Key Controllers / Extensions Used
- **Standard Controller**: Account
- **Custom Controller**: None
- **Extensions**: 
  - ViewRelatedRecordsController

</details>

---

<details>
<summary>Properties & Methods</summary>

## Properties
| Name | Type | Visibility | Modifiers | Description |
|------|------|-------------|------------|--------------|
| `contacts` | `List<Contact>` | `public` | `None` | A list of contact records related to the Account being viewed, which are retrieved for display in the page. |

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
- No input bindings detected

### Buttons
- No actionable buttons or links detected

</details>

---

<details>
<summary>Page Blocks</summary>

## Page Blocks on the Page
_No `apex:pageBlock` components detected._

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
- No custom components detected.

### Scripts
- No script tags detected.

</details>