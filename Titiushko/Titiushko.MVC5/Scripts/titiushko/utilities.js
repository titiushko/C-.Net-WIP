/**
 * Capitalize the first character of a string
 */
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

/**
 * Get text in format title
 */
String.prototype.toFormatTitle = function () {
    var result = "";
    this.split(' ').forEach(function (word1) {
        var term = "";
        word1.split('-').forEach(function (word2) {
            term += word2.capitalizeFirstLetter() + "-";
        });
        result += term.substring(0, term.length - 1) + " ";
    });
    return result.trim();
};

/**
 * Array remove
 */
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

/**
 * Transform string to slug string
 */
String.prototype.toSlug = function () {
    var text = this.trim().toLowerCase();
    text = text.replace("_", "-");
    text = text.replace(/\s+/gi, ' ');
    text = text.replace(/[^\w\s]+/g, "");
    text = text.replace(/\s+/g, "-");
    for (var i = 0; i < text.length; i++) {
        if (text[0] === "-") {
            text = text.substring(1);
            i++;
        }
        else {
            break;
        }
    }
    return text;
};

/**
 * Evaluate if an array is null
 */
Array.prototype.isNull = function () {
    return this.join().replace(/,/g, '').length === 0;
};

/**
 * Disable function
 */
jQuery.fn.extend({
    disable: function (state) {
        return this.each(function () {
            this.disabled = state;
        });
    }
});

/**
 * Determine what type of variable it are working with
 */
function TypeOf(object) {
    if (object === null) return "Null";
    else if (object === undefined) return "Undefined";
    else if (object.constructor === String) return "String";
    else if (object.constructor === Array) return "Array";
    else if (object.constructor === Object) return "Object";
    else if (object.constructor === Boolean) return "Boolean";
    else return "Don't know";
}

/**
 * Determine if the value of a variable is null or empty
 */
function IsNullOrEmpty(data) {
    if (typeof data == "number" || typeof data == "boolean") return false;
    if (typeof data == "undefined" || data === null) return true;
    if (typeof data.length != "undefined") return data.length == 0;
    var count = 0;
    for (var i in data) if (data.hasOwnProperty(i)) count++;
    return count == 0;
}

/**
 * Open URL in new window
 */
function OpenNewWindow(url, windowName) {
    var new_window = window.open(url, windowName, "width=600, height=600, left=0, top=0, scrollbars=yes");
    if (window.focus) new_window.focus();
}

/*
 * Remove all classes found from sub-elements
 */
$.fn.cleanClassChildren = function (listClass) {
    if (listClass != undefined && listClass != "") {
        var arrayClass = listClass.split(/[^\w-]+/g);
        for (var i = 0; i < arrayClass.length; i++) {
            var className = arrayClass[i].trim();
            this.find("." + className).removeClass(className);
        }
    }
    return this;
};

/*
 * Remove items that are unnecessary
 */
$.fn.removeUseless = function (removeExtra) {
    this.find("head, meta, title, link, style, script").remove();
    if (removeExtra != undefined && removeExtra != "") this.find(removeExtra).remove();
    return this;
};

/*
 * Convert a string to a jQuery object
 */
String.prototype.toJQuery = function (config) {
    config = config != undefined ? config : new Object();
    config.removeElements = config.removeElements != undefined ? config.removeElements : true;
    config.removeExtra = config.removeExtra != undefined ? config.removeExtra : "";
    config.addTargetBlank = config.addTargetBlank != undefined ? config.addTargetBlank : true;

    var $element = $("<div/>").append($($.parseHTML(this.toString())));

    if (config.removeElements) $element.removeUseless(config.removeExtra);
    if (config.addTargetBlank) $element.find("a").each(function () { $(this).attr("target", "_blank"); });

    return $element;
};

/*
 * Get string in html string format
 */
String.prototype.toHtml = function () {
    return this.toJQuery().html();
};

/**
 * Evaluate if the value is true
 */
String.prototype.isTrue = function () {
    return this.toUpperCase() === Titiushko.Constants.TRUE;
};

/**
 * Evaluate if the value is false
 */
String.prototype.isFalse = function () {
    return this.toUpperCase() === Titiushko.Constants.FALSE;
};

$.fn.toData = function () {
    var $this = this;
    var data = new Object();
    $this.find("*").each(function () {
        var attribute = $(this).attr("id");
        if (attribute != undefined && data[attribute] == undefined) data[attribute] = $(this).val();
        attribute = $(this).attr("name");
        if (attribute != undefined && data[attribute] == undefined) data[attribute] = $(this).val();
    });
    return data;
};