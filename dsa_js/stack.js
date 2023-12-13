class Stack {
  constructor() {
    this.result = [];
    this.index = 0;
  }

  push(number) {
    this.result[this.index] = number;
    this.index += 1;
  }

  pop() {
    this.result;
  }

  show() {
    return this.result;
  }
}

stack = new Stack();

stack.push(54);
stack.push(55);
stack.push(56);

console.log(stack.show());

stack.pop();

console.log(stack.show());
