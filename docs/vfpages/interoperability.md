# Visualforce Page: interoperability

---

<details>
<summary>Overview</summary>

## Visualforce Page Overview: interoperability

The Interoperability Visualforce page demonstrates how to integrate Lightning web components within Visualforce pages using Lightning Out.

### Purpose of the Page
Its purpose is to guide developers through the steps to include Lightning components, create event listeners, and interact with these components from Visualforce.



### Metadata
- **API Version**: 54
- **Label**: Interoperability

</details>

---

<details>
<summary>Controllers / Extensions</summary>

## Key Controllers / Extensions Used
- **Standard Controller**: None
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
- No input bindings detected

### Buttons
- No actionable buttons or links detected

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
- No SObject dependencies detected.

### Fields
- No field dependencies detected.

### Custom Components
- No custom components detected.

### Scripts
- **inline**: `
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