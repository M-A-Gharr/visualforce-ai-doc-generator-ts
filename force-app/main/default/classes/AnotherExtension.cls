/**
 * @description A second extension for TestPage.
 */
public with sharing class AnotherExtension {

    private final ApexPages.StandardController stdController;

    public String anotherExtensionProperty { get; set; }

    public AnotherExtension(ApexPages.StandardController controller) {
        this.stdController = controller;
        this.anotherExtensionProperty = 'Hello from another extension!';
        System.debug('AnotherExtension initialized.');
    }

    /**
     * @description A simple action method from the second extension.
     * @return null
     */
    public PageReference doSomethingElse() {
        System.debug('Another extension doing something.');
        return null;
    }
}