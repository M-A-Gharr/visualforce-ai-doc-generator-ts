# Visualforce Page: editRecord

---

<details>
<summary>Overview</summary>

## Visualforce Page Overview: editRecord

_No overview available._

### Purpose of the Page
_No purpose available._



### Metadata
- **API Version**: 54
- **Label**: Edit Record

</details>

---

<details>
<summary>Controllers / Extensions</summary>

## Key Controllers / Extensions Used
- **Standard Controller**: Account
- **Custom Controller**: None
- **Extensions**: 
  None

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
- `{!quicksave}`
- `{!cancel}`

</details>

---

<details>
<summary>Page Blocks</summary>

## Page Blocks on the Page
- **Block Title**: `Account details`
  **Contains Components**:
    - `apex:pageBlockButtons`
    - `apex:commandButton`
    - `apex:pageBlockSection`
    - `apex:inputField`
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
- `save`
- `quicksave`
- `cancel`
- `account`

### Fields
- `save`
- `quicksave`
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