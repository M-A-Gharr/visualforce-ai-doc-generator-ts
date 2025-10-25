# Visualforce Page: aa1

---

<details>
<summary>Overview</summary>

## Visualforce Page Overview: aa1

_No overview available._

### Purpose of the Page
_No purpose available._



### Metadata
- **API Version**: 56
- **Label**: Comprehensive Test Page

</details>

---

<details>
<summary>Controllers / Extensions</summary>

## Key Controllers / Extensions Used
- **Standard Controller**: Account
- **Custom Controller**: MyCustomController
- **Extensions**: 
  - MyExtensionController
  - AnotherExtension

</details>

---

<details>
<summary>Properties & Methods</summary>

## Properties
| Name | Type | Visibility | Modifiers | Description |
|------|------|-------------|------------|--------------|
| `myStringProperty` | `String` | `public` | `None` | Property myStringProperty of type String. |
| `selectedOption` | `String` | `public` | `None` | Property selectedOption of type String. |
| `helperProperty` | `String` | `public` | `None` | Property helperProperty of type String. |
| `myBooleanProperty` | `Boolean` | `public` | `None` | Property myBooleanProperty of type Boolean. |
| `selectedContactId` | `Id` | `public` | `None` | Property selectedContactId of type Id. |
| `anotherExtensionProperty` | `String` | `public` | `None` | Property anotherExtensionProperty of type String. |

---

## Methods
| Name | Return Type | Parameters | Visibility | Modifiers | Description |
|------|--------------|-------------|-------------|------------|--------------|
| `saveAccount` | `PageReference` | `(String accountId)` | `public` | `None` | Method saveAccount returns PageReference and takes (String accountId). |
| `isValid` | `Boolean` | `()` | `public` | `None` | Method isValid returns Boolean and takes (). |
| `doSomethingInner` | `void` | `()` | `public` | `None` | Method doSomethingInner returns void and takes (). |
| `processData` | `void` | `(List<String> dataList, Integer quantity)` | `public` | `None` | Method processData returns void and takes (List<String> dataList, Integer quantity). |
| `fetchContactDetails` | `void` | `()` | `public` | `None` | Method fetchContactDetails returns void and takes (). |
| `internalMethod` | `void` | `()` | `private` | `None` | Method internalMethod returns void and takes (). |
| `doSomethingElse` | `PageReference` | `()` | `public` | `None` | Method doSomethingElse returns PageReference and takes (). |

</details>

---

<details>
<summary>Page Structure</summary>

### Forms
- Contains **1** `apex:form` component(s)

### Inputs
The page utilizes the following input bindings:
- `{!Account.Name}`
- `{!myCustomController.myStringProperty}`
- `{!MyExtensionController.myBooleanProperty}`

### Buttons
The page includes buttons or links linked to:
- `{!myCustomController.saveAccount}`

</details>

---

<details>
<summary>Page Blocks</summary>

## Page Blocks on the Page
- **Block Title**: `Page Information for {!$User.FirstName}`
  **Contains Components**:
    - `No specific items detected`
- **Block Title**: `Account Details`
  **Contains Components**:
    - `apex:pageBlockSection`
    - `apex:inputField`
    - `apex:inputText`
    - `apex:inputCheckbox`
    - `apex:selectList`
    - `apex:selectOption`
    - `apex:pageBlockButtons`
    - `apex:commandButton`
    - `apex:button`
    - `apex:commandLink`
- **Block Title**: `Associated Contacts`
  **Contains Components**:
    - `apex:dataTable`
    - `apex:column`
    - `apex:outputPanel`
    - `apex:actionSupport`
    - `apex:param`
</details>

---

<details>
<summary>AJAX Interactions</summary>

The page includes `apex:actionSupport` components:
- **Event**: `onmouseover`
  - **Re-renders**: `contactDetailPanel,statusPanel`
  - **Action**: `{!MyExtensionController.fetchContactDetails}`
  - **Status**: `loadingStatus`

### Output Panels
- **ID**: `contactDetailPanel`
  - **Layout**: `block` 
  - **Content Preview**: "<h3>Contact Details (AJAX Loaded)</h3> <apex:actionStatus id="loadingStatus" startText="Load..."

---

<details>
<summary>Dependencies & Scripts</summary>

### Objects
- `Account`
- `MyCustomController`
- `MyExtensionController`
- `AnotherExtension`
- `myCustomController`
- `con`

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
The page includes the following script resources or inline blocks:
- **external**: `/soap/ajax/30.0/connection.js`

</details>