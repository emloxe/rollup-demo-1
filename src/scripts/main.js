import '../styles/main.scss';
import { sayHelloTo } from './modules/a';
import addArray from './modules/b';
import debug from 'debug';
var log = debug('app:log');

if ('development' !== 'production') {
    // Enable the logger.
    debug.enable('*');
    log('Logging is enabled!');
    document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
} else {
    debug.disable();
} // Run some functions from our imported modules.


alert(6);
var result1 = sayHelloTo('Jason');
var result2 = addArray([1, 2, 3, 4]); // Print the results on the page.

var printTarget = document.getElementsByClassName('debug__output')[0];
printTarget.innerText = 'sayHelloTo(\'Jason\') => '.concat(result1, '\n\n');
printTarget.innerText += 'addArray([1, 2, 3, 4]) => '.concat(result2);