var test = require('tap').test;
var alpha = require('../main').alphabetize;
test('make sure it works', function(t){
	var testObj = {"b": 1, "a": 2};
	var testStr = '{"b": 1, "a": 2}';
	
	var str1 = alpha(testObj);
	t.ok(str1);

	var str2 = alpha(testObj);
	t.ok(str2);

	t.equal(str1, str2, 'shouldnt matter if we used string or json');

	var obj1 = JSON.parse(str1);
	var obj2 = JSON.parse(str2);

	t.notOk(obj1 === obj2, 'object identity by reference');
	t.end();
});