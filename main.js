(function(exports, _){

	function _alphabetize(obj){
		if (_.isArray(obj)){
			var result = [];
			_.each(obj, function(el){
				result.push(_alphabetize(el));
			});
			var resultStr = '[';
			for(var i=0; i < result.length; i++){
				var item = result[i];
				// JSON.stringify converts undefined to null in an Array
				if (item === undefined) item = null;
				resultStr += item;
				if(i !== result.length - 1){
					resultStr += ',';
				}
			}
			resultStr += ']';
			return resultStr;
		} else if(_.isObject(obj)){
			var result = [];
			_.each(obj, function(val, key){
				var res = _alphabetize(val);
				// since we are returning a string, we need to drop undefined since
				// JSON.parse doesn't handle it
				if (res !== undefined) {
					result.push({
						key: key,
						val: res
					});
				}
			});
			result = result.sort(function(a, b){
				if(a.key < b.key){
					return -1;
				}
				return 1;
			});

			var resultStr = '{';
			for(var item, i = 0; item = result[i]; i++){
				resultStr += '"' + item.key + '"' + ':' + item.val;
				if (i !== result.length - 1){
					resultStr += ',';
				}
			}
			resultStr += '}';
			return resultStr;
		} else{
			// strings, booleans, numbers, NaN, Date, undefined and null can
			// just be stringified
			return JSON.stringify(obj);
		}
	}

	function alphabetize(arg){
		if(typeof arg === 'string'){
			return _alphabetize(JSON.parse(arg));
		} else {
			return _alphabetize(arg);
		}
	}

	exports.alphabetize = alphabetize;

})(exports, require('underscore'));

// run in node at command line
if (require.main === module){
	process.stdout.write(exports.alphabetize(process.argv[2]));
}
