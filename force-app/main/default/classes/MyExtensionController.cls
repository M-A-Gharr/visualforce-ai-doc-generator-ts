/**
 * @description Extension controller for additional functionalities.
 * @summary Handles contact details and boolean property.
 */
public with sharing class MyExtensionController {

    private final ApexPages.StandardController stdController;

    // Properties
    public Boolean myBooleanProperty { get; set; }
    public Id selectedContactId { get; set; }
    public Contact currentContact { get; private set; } // Should be documented

    // Constructor
    public MyExtensionController(ApexPages.StandardController controller) {
        this.stdController = controller;
        this.myBooleanProperty = true;
        this.selectedContactId = null;
        System.debug('MyExtensionController initialized for ' + controller.getId());
    }

    /**
     * @description Fetches details for the selected contact ID.
     * This method is called via actionSupport.
     * @return void
     */
    public void fetchContactDetails() {
        if (selectedContactId != null) {
            this.currentContact = [SELECT Id, Name, Email FROM Contact WHERE Id = :selectedContactId LIMIT 1];
            System.debug('Fetched contact: ' + currentContact?.Name);
        } else {
            this.currentContact = null;
        }
    }

    // A private method (should not be documented)
    private void internalMethod() {
        System.debug('Internal logic.');
    }

    // A static method (often not part of controller instance, but good to test)
    public static String getStaticInfo() {
        return 'Some static info';
    }
}