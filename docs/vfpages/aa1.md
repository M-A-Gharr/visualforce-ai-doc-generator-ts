# Visualforce Page: aa1

---

<details>
<summary>Overview</summary>

## Visualforce Page Overview: aa1

This page demonstrates various Visualforce components, controllers, extensions, and data bindings to test a documentation generator.

### Purpose of the Page
To serve as a comprehensive test case for a Visualforce documentation parser.



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
_No public properties found in associated Apex controllers/extensions._

---

## Methods
| Name | Return Type | Parameters | Visibility | Modifiers | Description |
|------|--------------|-------------|-------------|------------|--------------|
| `saveAccount` | `PageReference` | `(String accountId)` | `public` | `None` | @description This is the custom controller for TestPage.
  It handles logic related to account data.
 /
public with sharing class MyCustomController {

    // Properties
    public String myStringProperty { get; set; }
    public String selectedOption { get; set; }
    public Integer myIntegerProperty { get; private set; }
    private String privateProperty = 'secret'; // Should not be documented

    // Constructor
    public MyCustomController() {
        this.myStringProperty = 'Default Value';
        this.selectedOption = 'Option1';
        this.myIntegerProperty = 100;
        System.debug('MyCustomController initialized.');
    }

    /
      @description Saves the current Account record.
      @param accountId The ID of the account to save. (This is just an example, usually passed implicitly)
      @return PageReference null to stay on the same page. |
| `fetchContactDetails` | `void` | `()` | `public` | `None` | @description Extension controller for additional functionalities.
  @summary Handles contact details and boolean property.
 /
public with sharing class MyExtensionController {

    private final ApexPages.StandardController stdController;

    // Properties
    public Boolean myBooleanProperty { get; set; }
    public Id selectedContactId { get; set; }
    public Contact currentContact { get; private set; }

    // Constructor
    public MyExtensionController(ApexPages.StandardController controller) {
        this.stdController = controller;
        this.myBooleanProperty = true;
        this.selectedContactId = null;
        System.debug('MyExtensionController initialized for ' + controller.getId());
    }

    /
      @description Fetches details for the selected contact ID.
      This method is called via actionSupport.
      @return void |
| `doSomethingElse` | `PageReference` | `()` | `public` | `None` | @description A second extension for TestPage.
 /
public with sharing class AnotherExtension {

    private final ApexPages.StandardController stdController;

    public String anotherExtensionProperty { get; set; }

    public AnotherExtension(ApexPages.StandardController controller) {
        this.stdController = controller;
        this.anotherExtensionProperty = 'Hello from another extension!';
        System.debug('AnotherExtension initialized.');
    }

    /
      @description A simple action method from the second extension.
      @return null |

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
- No script tags detected.

</details>