import '@/demo/styles/demo.scss';
// Do we need lib styles?
// import '@/lib/scss/revengeJs.scss';

import { RevengeJs } from '../lib/revengeJs';

const myRevenge = new RevengeJs({});
myRevenge.sayHello();
