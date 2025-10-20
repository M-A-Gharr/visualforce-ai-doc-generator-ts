# Visualforce Page: interoperability

<details>
<summary>Overview</summary>

## Visualforce Page Overview: interoperability

The Visualforce page named 'interoperability' demonstrates how Lightning Web Components (LWC) can be integrated within Visualforce pages using Lightning Out. It allows users to interact with LWC by triggering methods and setting properties through buttons. The page includes an LWC and displays messages based on interactions, illustrating live updates in response to user actions.

### Purpose of the Page
The main business function of this page is to serve as a demonstration tool for developers, showcasing the interoperability between Visualforce and Lightning Web Components, thereby facilitating the use of modern web components within Salesforce's legacy Visualforce framework.



### Metadata
- **API Version**: 54
- **Label**: Interoperability

</details>

<details>
<summary>Controllers / Extensions</summary>

## Key Controllers / Extensions Used
- **Standard Controller**: None
- **Custom Controller**: None
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
- No input bindings (`apex:inputField`, `apex:inputText`, etc.) detected

### Buttons
- No button actions (`apex:commandButton`, `apex:button`, `apex:commandLink`) detected

</details>

<details>
<summary>AJAX Interactions</summary>

- No `apex:actionSupport` components detected

- No `apex:outputPanel` components with an ID detected

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
- inline: `
        var timesListened = 1;

        $Lightning.use('c:LWCContainerApp', function () {
            $Lightning.createComponent(
                'c:interoperability',
                { label: 'Initial label value' },
                'lwc-container',
                function (cmp) {
                    console.log('LWC added to Visualforce page:' + cmp);
                    var lwc = document.querySelector('c-interoperability');
                    lwc.addEventListener('buttonclicked', handleLWCEvent);
                }
            );
        });

        function handleLWCEvent() {
            document.querySelector('p.messages').textContent =
                timesListened + ' messages listened from LWC';
            timesListened++;
        }

        function callLWCMethod(event) {
            var lwc = document.querySelector('c-interoperability');
            lwc.doWhatever();
        }

        function setLWCProperty(event) {
            var lwc = document.querySelector('c-interoperability');
            lwc.label = 'The label property was updated from Visualforce';
        }
    `

</details>