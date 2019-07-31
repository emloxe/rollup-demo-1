var addArray = function addArray(arr) {
    var result = arr.reduce(function (a, b) {
        return a + b;
    }, 0);
    return result;
};

export default addArray;