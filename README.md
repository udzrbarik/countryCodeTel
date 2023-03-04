# countryCodeTel
A simple phone number field enhancement for HTML input fields

To start you define a class, where you pass the ID of the input field and the default countrycode phone prefix
`
let phoneField = new CountrycodeForm('phoneFieldID', '+1');
`

After that you just call the init method of the newly created class.
`
phoneField.init();
`
