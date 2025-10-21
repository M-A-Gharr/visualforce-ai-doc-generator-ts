# Visualforce Page: aa1

<details>
<summary>Overview</summary>

## Visualforce Page Overview: aa1

This page demonstrates various Visualforce components, controllers,

### Purpose of the Page
To serve as a comprehensive test case for a Visualforce documentation parser.



### Metadata
- **API Version**: 56
- **Label**: Comprehensive Test Page

</details>

<details>
<summary>Controllers / Extensions</summary>

## Key Controllers / Extensions Used
- **Standard Controller**: Account
- **Custom Controller**: MyCustomController
- **Extensions**: 
  - MyExtensionController
  - AnotherExtension

</details>

<details>
<summary>Properties & Methods</summary>

## Properties
No public properties found in associated Apex controllers/extensions.

## Methods
| Name | Return Type | Parameters | Visibility | Modifiers | Description |
| ------ | ------------- | ------------ | ------------ | ----------- | ------------- |
| `saveAccount` | `PageReference` | `(String accountId)` | `public` | `None` |  |
| `isValid` | `Boolean` | `()` | `public` | `None` |  |
| `doSomethingInner` | `void` | `()` | `public` | `None` |  |
| `processData` | `void` | `(List<String> dataList, Integer quantity)` | `public` | `None` |  |
| `saveAccount` | `PageReference` | `(String accountId)` | `public` | `None` |  |
| `isValid` | `Boolean` | `()` | `public` | `None` |  |
| `doSomethingInner` | `void` | `()` | `public` | `None` |  |
| `processData` | `void` | `(List<String> dataList, Integer quantity)` | `public` | `None` |  |
| `fetchContactDetails` | `void` | `()` | `public` | `None` |  |
| `internalMethod` | `void` | `()` | `private` | `None` |  |
| `getStaticInfo` | `String` | `()` | `public` | `static` |  |
| `fetchContactDetails` | `void` | `()` | `public` | `None` |  |
| `internalMethod` | `void` | `()` | `private` | `None` |  |
| `getStaticInfo` | `String` | `()` | `public` | `static` |  |
| `doSomethingElse` | `PageReference` | `()` | `public` | `None` |  |
| `doSomethingElse` | `PageReference` | `()` | `public` | `None` |  |

</details>

<details>
<summary>Page Structure</summary>

### Forms
- Contains 1 `apex:form` component(s)

### Inputs
The page utilizes the following input bindings/fields:
- `{!Account.Name}`
- `{!myCustomController.myStringProperty}`
- `{!MyExtensionController.myBooleanProperty}`
- `{!myCustomController.selectedOption}`

### Buttons
The page has buttons/links linked to the following actions:
- `{!myCustomController.saveAccount}`
- `{!Account.delete}`

</details>

<details>
<summary>Page Blocks</summary>
## Page Blocks on the Page
No `apex:pageBlock` components detected.
</details>

<details>
<summary>AJAX Interactions</summary>

The page includes `apex:actionSupport` components:
- **Event**: `onmouseover`
  
  - **Action**: `{!MyExtensionController.fetchContactDetails}`
  - **Status**: `loadingStatus`

### Output Panels
- **ID**: `contactDetailPanel`
  - **Layout**: block
  - **Content Preview**: "<h3>Contact Details (AJAX Loaded)      <p>Details for contact ID: {!MyExtensionController.selectedContactId}"

</details>

<details>
<summary>Dependencies & Scripts</summary>

### Objects
- `Account`
- `MyCustomController`
- `MyExtensionController`
- `AnotherExtension`
- `User`
- `CurrentPageContext`

### Fields
- `$User`
- `Account`
- `$CurrentPage`
- `$Organization`
- `MyExtensionController`
- `MyCustomController`

### Custom Components
- `<c:MyCustomHeader>`

### Scripts
- inline: `
        function greet() {
            console.log('Hello from a script on {!Account.Name} page!');
            // This is a comment inside a script
            var myVar = '{!MyCustomController.myStringProperty}';
        }
        window.onload = greet;
    `
- inline: ``

</details>