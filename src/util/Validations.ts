// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
// mui seems to also have some built-in checks, this is in addition to those
// should guarantee anystring@anystring.anystring 
export function validateEmail(email: string) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}