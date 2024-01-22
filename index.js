const person = {
  firstName: 'John',
  sayHi: function () {
    console.log(`Hi, ${this.firstName}!`);
  },
};
person.sayHi();
