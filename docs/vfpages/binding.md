# Visualforce Page: binding

<details>
<summary>Overview</summary>

## Visualforce Page Overview: binding

This Visualforce page allows users to input a course name, which is then displayed on the page when the input changes. It utilizes an action support element to re-render a section of the page with the updated course name without needing a full page refresh.

### Purpose of the Page
The main business function of this page is to enable users to dynamically submit and view course names, enhancing user interaction and data entry efficiency.



### Metadata
- **API Version**: 54
- **Label**: Binding

</details>

<details>
<summary>Controllers / Extensions</summary>

## Key Controllers / Extensions Used
- **Standard Controller**: None
- **Custom Controller**: BindingController
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
- `{!courseName}`

### Buttons
- No button actions (`apex:commandButton`, `apex:button`, `apex:commandLink`) detected

</details>

<details>
<summary>AJAX Interactions</summary>

The page includes `apex:actionSupport` components:
- **Event**: `onchange`
  - **Re-renders**: `courseInfo`
  
  

### Output Panels
- **ID**: `courseInfo`
  - **Layout**: 
  - **Content Preview**: ""

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