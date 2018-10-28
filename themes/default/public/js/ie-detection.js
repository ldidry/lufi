function confirmExit() {
    console.log(i18n.confirmExit);
    return i18n.confirmExit;
}

// Is the browser IE?
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// If the browser is IE, add readAsBinaryString function and store the data
if (isIE == true){
    if (FileReader.prototype.readAsBinaryString === undefined) {
        FileReader.prototype.readAsBinaryString = function (fileData) {
                var binary = "";
                var pt = this;
                var reader = new FileReader();
                reader.onload = function (e) {
                    var bytes = new Uint8Array(reader.result);
                    var length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    //pt.result  - readonly so assign content to another property
                    pt.content = binary;
                    $(pt).trigger('onloadend');
                }
            reader.readAsArrayBuffer(fileData);
        }
    }
}
