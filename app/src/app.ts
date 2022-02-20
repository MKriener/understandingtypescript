import _ from 'lodash';

declare let GLOBAL: string;

console.log(_.shuffle([1,2,3]));

console.log(GLOBAL);