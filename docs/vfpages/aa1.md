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
| `saveAccount` | `PageReference` | `(String accountId)` | `` | `None` |  |
| `isValid` | `Boolean` | `()` | `` | `None` |  |
| `doSomethingInner` | `void` | `()` | `` | `None` |  |
| `processData` | `void` | `(List<String> dataList, Integer quantity)` | `` | `None` |  |
| `fetchContactDetails` | `void` | `()` | `` | `None` |  |
| `getStaticInfo` | `String` | `()` | `` | `None` |  |
| `doSomethingElse` | `PageReference` | `()` | `` | `None` |  |

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
- `CurrentPage`
- `Organization`
- `Contact`

### Fields
- `$User.FirstName`
- `Account.Name`
- `Account.Contacts.size`
- `$CurrentPage.parameters.recordId`
- `$Organization.Name`
- `myCustomController.myStringProperty`
- `MyExtensionController.myBooleanProperty`
- `myCustomController.selectedOption`
- `myCustomController.saveAccount`
- `Account.delete`
- `Account.Contacts`
- `MyExtensionController.fetchContactDetails`
- `con.Id`
- `MyExtensionController.selectedContactId`
- `con.Name`
- `con.Title`
- `MyCustomController.myStringProperty`

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