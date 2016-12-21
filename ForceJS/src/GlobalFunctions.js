
var GlobalFunctions = {
    /**
     * SOURCE: http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
     * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
     * @param obj1
     * @param obj2
     * @returns obj3 a new object based on obj1 and obj2
     */
    mergeDictionaries: function (obj1,obj2) {
        var obj3 = {};
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    },

    isJSON: function (str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },

    isNumberType: function (str, transformer) {
        var toCheck = str
        if (str[0] === "0") {
            toCheck = str.split(str[0])[1]
        }
        if (transformer(str).toString() === toCheck) {
            return true
        }
        return false
    },
    isInt: function (str) {
        return this.isNumberType(str, parseInt)
    },
    isFloat: function (str) {
       return this.isNumberType(str, parseFloat)
    },
    isNumber: function (str) {
        return this.isInt(str) || this.isFloat(str)
    }
}

export default GlobalFunctions