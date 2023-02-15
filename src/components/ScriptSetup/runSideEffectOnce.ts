let count = 0;

class Singleton {
  count: number;
  constructor() {
    this.count = count++;
    console.log("Singleton.count:", this.count);
  }
}

export default function runSideEffectOnce() {
  return new Singleton();
}
