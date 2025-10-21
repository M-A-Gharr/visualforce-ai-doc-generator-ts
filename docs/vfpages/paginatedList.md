# Visualforce Page: paginatedList

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

<details>
<summary>Controllers / Extensions</summary>

## Key Controllers / Extensions Used
- **Standard Controller**: Account
- **Custom Controller**: None
- **Extensions**: 
  - PaginatedListControllerLwc

</details>

<details>
<summary>Properties & Methods</summary>

## Properties
| Name | Type | Visibility | Modifiers | Description |
| ------ | ------ | ------------ | ----------- | ------------- |
| `records` | `List<Account>` | `public` | `AuraEnabled` |  |
| `nextPageToken` | `Integer` | `public` | `AuraEnabled` |  |

## Methods
| Name | Return Type | Parameters | Visibility | Modifiers | Description |
| ------ | ------------- | ------------ | ------------ | ----------- | ------------- |
| `getAccountsPaginated` | `PaginatedAccounts` | `(Integer pageSize,
        Integer pageToken)` | `` | `None` |  |

</details>

<details>
<summary>Page Structure</summary>

### Forms
- Contains 1 `apex:form` component(s)

### Inputs
- No input bindings (`apex:inputField`, `apex:inputText`, etc.) detected

### Buttons
The page has buttons/links linked to the following actions:
- `{!first}`
- `{!previous}`
- `{!next}`
- `{!last}`

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
- `PaginatedListControllerLwc`

### Fields
- No field dependencies detected

### Custom Components
- No custom components detected

### Scripts
- No script tags detected

</details>