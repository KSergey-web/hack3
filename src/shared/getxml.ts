export const getXML = (xmldata: string) => {
    let xmlData = `<?xml version="1.0"?>
    <note xmlns="http://msiter.ru"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://msiter.ru note.xsd">
       <to>Tove</to>
       <from>Jani</from>
       <heading>Напоминание</heading>
       <body>Не забудь обо мне в эти выходные!</body>
    </note>`
    
    var parser = require('fast-xml-parser');
    var he = require('he');
    
    var options = {
        attributeNamePrefix : "@_",
        attrNodeName: "attr", //default is 'false'
        textNodeName : "#text",
        ignoreAttributes : true,
        ignoreNameSpace : false,
        allowBooleanAttributes : false,
        parseNodeValue : true,
        parseAttributeValue : false,
        trimValues: true,
        cdataTagName: "__cdata", //default is 'false'
        cdataPositionChar: "\\c",
        parseTrueNumberOnly: false,
        numParseOptions:{
          hex: true,
          leadingZeros: true,
          //skipLike: /\+[0-9]{10}/
        },
        arrayMode: false, //"strict"
        attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
        tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
        stopNodes: ["parse-me-as-string"]
    };
    
    if( parser.validate(xmlData) === true) { //optional (it'll return an object in case it's not valid)
        var jsonObj = parser.parse(xmlData,options);
    }
    
    // Intermediate obj
    var tObj = parser.getTraversalObj(xmlData,options);
    var jsonObj = parser.convertToJson(tObj,options);
    
  var jsonObj = parser.parse(xmlData ,options );
  return jsonObj;

  }

  () => {}