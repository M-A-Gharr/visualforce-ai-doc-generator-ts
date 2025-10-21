/**
 * @description This is the custom controller for TestPage.
 * It handles logic related to account data.
 */
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

    /**
     * @description Saves the current Account record.
     * @param accountId The ID of the account to save. (This is just an example, usually passed implicitly)
     * @return PageReference null to stay on the same page.
     */
    public PageReference saveAccount(String accountId) {
        // Logic to save the account
        System.debug('Saving account: ' + accountId);
        return null;
    }

    // A method that returns a boolean
    public Boolean isValid() {
        return true;
    }

    // An inner class (should be parsed if public)
    public class InnerHelper {
        public String helperProperty { get; set; }
        public InnerHelper() {
            helperProperty = 'Inner helper data';
        }
        public void doSomethingInner() {
            System.debug('Inner helper doing something.');
        }
    }

    // Another public method with parameters
    public void processData(List<String> dataList, Integer quantity) {
        System.debug('Processing ' + quantity + ' items: ' + dataList);
    }
}