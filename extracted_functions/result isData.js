context.set("counter", (context.get("counter")||0)+1);
node.status({fill:"red",shape:"ring",text: `${context.get("counter")}`});

var isString = typeof msg.payload == 'string';
var isData = false;

if(Array.isArray(msg.payload) && msg.payload.length > 0){
    isData = true            
}

if(isData && !isString) {
    return [msg, null];
} else {
    return [null, msg];
}
