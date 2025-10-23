# Visualforce Page: paginatedList

---

<details>
<summary>Overview</summary>

## Visualforce Page Overview: paginatedList

This page displays a paginated list of accounts.

### Purpose of the Page
Allow users to browse accounts with pagination.



### Metadata
- **API Version**: 54
- **Label**: Paginated List

</details>

---

<details>
<summary>Controllers / Extensions</summary>

## Key Controllers / Extensions Used
- **Standard Controller**: Account
- **Custom Controller**: None
- **Extensions**: 
  - PaginatedListControllerLwc

</details>

---

<details>
<summary>Properties & Methods</summary>

## Properties
| Name | Type | Visibility | Modifiers | Description |
|------|------|-------------|------------|--------------|
| `PaginatedAccounts` | `class` | `public` | `None` | No description. |
| `records` | `List<Account>` | `public` | `None` | A list of account records being displayed in the paginated view. |
| `nextPageToken` | `Integer` | `public` | `None` | A token that facilitates fetching the next set of records for pagination. |

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
The page includes buttons or links linked to:
- `{!first}`
- `{!previous}`
- `{!next}`
- `{!last}`

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
- `PaginatedListControllerLwc`

### Fields
- `accounts`
- `account.Name`
- `account.Type`
- `account.Phone`
- `account.NumberOfEmployees`
- `first`
- `previous`
- `next`
- `last`

### Custom Components
- No custom components detected.

### Scripts
- No script tags detected.

</details>