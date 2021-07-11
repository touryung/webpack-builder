import add from "../../common/index";
import { sub } from "./sub";

class Person {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log(this.name);
  }
}

const p = new Person("老王");
p.say();

console.log(add(1, 2));
console.log(sub(1, 2));
