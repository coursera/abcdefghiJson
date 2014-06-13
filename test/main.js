var test = require('tap').test;
var alpha = require('../main').alphabetize;
test('make sure it works', function(t){
	var testObj = {"b": 1, "a": 2};
	var testStr = '{"b": 1, "a": 2}';
	var testNewLine = {n:'\nbleep\n', b: '\nblargh\n'};
	var testNaNAndUndefined = {n:NaN, b: undefined};
	var testUndefinedInArray = [undefined, NaN, null, {b:1}];

	var str1 = alpha(testObj);
	t.ok(str1);

	var str2 = alpha(testStr);
	t.ok(str2);

	t.equal(str1, str2, 'shouldnt matter if we used string or json');

	var str3 = alpha(testNewLine);
	JSON.parse(str3);

	var str4 = alpha(testNaNAndUndefined);
	var obj4 = JSON.parse(str4);
	t.equal(Object.keys(obj4).length, 1, 'should drop undefined');
	t.equal(obj4.n, null, 'should convert NaN to null');

	var str5 = alpha(testUndefinedInArray);
	var obj5 = JSON.parse(str5);
	t.equal(obj5.length, 4, 'should not drop undefined in Array');
	t.equal(obj5[0], null, 'should convert undefined to null in Array');

	var obj1 = JSON.parse(str1);
	var obj2 = JSON.parse(str2);

	t.notOk(obj1 === obj2, 'object identity by reference');
	t.end();
});
