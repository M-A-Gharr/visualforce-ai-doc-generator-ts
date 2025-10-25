# Visualforce Page: pageMessagesForm

---

<details>
<summary>Overview</summary>

## Visualforce Page Overview: pageMessagesForm

_No overview available._

### Purpose of the Page
_No purpose available._



### Metadata
- **API Version**: 54
- **Label**: Page Messages Form

</details>

---

<details>
<summary>Controllers / Extensions</summary>

## Key Controllers / Extensions Used
- **Standard Controller**: None
- **Custom Controller**: PageMessagesFormController
- **Extensions**: 
  None

</details>

---

<details>
<summary>Properties & Methods</summary>

## Properties
| Name | Type | Visibility | Modifiers | Description |
|------|------|-------------|------------|--------------|
| `cityName` | `String` | `public` | `None` | Property cityName of type String. |

---

## Methods
| Name | Return Type | Parameters | Visibility | Modifiers | Description |
|------|--------------|-------------|-------------|------------|--------------|
| `createCity` | `void` | `()` | `public` | `None` | Method createCity returns void and takes (). |
| `cancel` | `PageReference` | `()` | `public` | `None` | Method cancel returns PageReference and takes (). |

</details>

---

<details>
<summary>Page Structure</summary>

### Forms
- Contains **1** `apex:form` component(s)

### Inputs
The page utilizes the following input bindings:
- `{!cityName}`

### Buttons
The page includes buttons or links linked to:
- `{!cancel}`
- `{!createCity}`

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
- `PageMessagesFormController`
- `cityName`
- `cancel`
- `createCity`

### Fields
- `cityName`
- `cancel`
- `createCity`

### Custom Components
- No custom components detected.

### Scripts
- No script tags detected.

</details>