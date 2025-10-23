# Visualforce Page: binding

---

<details>
<summary>Overview</summary>

## Visualforce Page Overview: binding

This Visualforce page allows users to input a course name, which is then displayed dynamically as they type.

### Purpose of the Page
The purpose of this page is to demonstrate data binding in Visualforce, where changes to the input field update the output panel in real time.



### Metadata
- **API Version**: 54
- **Label**: Binding

</details>

---

<details>
<summary>Controllers / Extensions</summary>

## Key Controllers / Extensions Used
- **Standard Controller**: None
- **Custom Controller**: BindingController
- **Extensions**: 
  None

</details>

---

<details>
<summary>Properties & Methods</summary>

## Properties
| Name | Type | Visibility | Modifiers | Description |
|------|------|-------------|------------|--------------|
| `courseName` | `String` | `public` | `None` | A string property that holds the name of the course entered by the user. |

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
- `{!courseName}`

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

The page includes `apex:actionSupport` components:
- **Event**: `onchange`
  - **Re-renders**: `courseInfo`
  
  

### Output Panels
- **ID**: `courseInfo`
  - **Layout**: `block (default)`
  - **Content Preview**: "No content."

</details>

---

<details>
<summary>Dependencies & Scripts</summary>

### Objects
- `BindingController`

### Fields
- `courseName`

### Custom Components
- No custom components detected.

### Scripts
- No script tags detected.

</details>