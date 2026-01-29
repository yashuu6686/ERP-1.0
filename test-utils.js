const { getNestedValue, setNestedValue } = require('./src/components/CommonForm/formUtils');

const testObj = {
    user: {
        profile: {
            name: 'John'
        }
    }
};

console.log('Testing getNestedValue:');
console.log('user.profile.name:', getNestedValue(testObj, 'user.profile.name'));
console.log('user.invalid:', getNestedValue(testObj, 'user.invalid'));

console.log('\nTesting setNestedValue:');
const updatedObj = setNestedValue(testObj, 'user.profile.age', 30);
console.log('Original age:', getNestedValue(testObj, 'user.profile.age'));
console.log('Updated age:', getNestedValue(updatedObj, 'user.profile.age'));
console.log('Updated Obj Structure:', JSON.stringify(updatedObj, null, 2));

const deepUpdate = setNestedValue(updatedObj, 'address.city.zip', '12345');
console.log('\nDeep Nested Update:');
console.log('Zip:', getNestedValue(deepUpdate, 'address.city.zip'));
console.log('Deep Update Structure:', JSON.stringify(deepUpdate, null, 2));
