import '@/demo/styles/demo.scss';
// Do we need lib styles?
// import '@/lib/scss/revengeJs.scss';

import RevengeJs from '../lib/revengeJs';

const myRevenge = new RevengeJs({});
const hello = myRevenge.sayHello('Hello from Revenge! Muhhaaar!');
// eslint-disable-next-line no-console
console.log(hello);
