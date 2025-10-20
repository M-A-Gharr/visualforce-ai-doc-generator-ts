# Visualforce Page: interoperability

<details>
<summary>Overview</summary>

## Visualforce Page Overview: interoperability

No overview found.

### Purpose of the Page
No purpose found.



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