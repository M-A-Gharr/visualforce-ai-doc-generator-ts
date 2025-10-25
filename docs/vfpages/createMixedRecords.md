# Visualforce Page: createMixedRecords

---

<details>
<summary>Overview</summary>

## Visualforce Page Overview: createMixedRecords

_No overview available._

### Purpose of the Page
_No purpose available._



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
| `contactFirstName` | `String` | `public` | `None` | Property contactFirstName of type String. |
| `contactLastName` | `String` | `public` | `None` | Property contactLastName of type String. |
| `opportunityName` | `String` | `public` | `None` | Property opportunityName of type String. |

---

## Methods
| Name | Return Type | Parameters | Visibility | Modifiers | Description |
|------|--------------|-------------|-------------|------------|--------------|
| `createContactAndOpportunity` | `void` | `()` | `public` | `None` | Method createContactAndOpportunity returns void and takes (). |

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
- **Block Title**: `Records To Create`
  **Contains Components**:
    - `apex:pageBlockButtons`
    - `apex:commandButton`
    - `apex:pageBlockSection`
    - `apex:inputText`
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
- `createContactAndOpportunity`
- `contactFirstName`
- `contactLastName`
- `opportunityName`

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