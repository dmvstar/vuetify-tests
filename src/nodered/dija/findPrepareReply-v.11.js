//------------------------------------------------
    //Date manipulation package
    //adds a leading zero to number < 10
function addZero(number) {
    if (number < 10) {
        return '0' + number;
    } else {
        return number;
    }
}
    //adds up to 2 leading zeros to number < 100
function addTwoZero(number) {
    if (number < 10) {
        return '00' + number;
    } else if (number < 100) {
        return '0' + number;
    } else {
        return number;
    }
}
    //equivalent of toISOString() but for local time
    //returns "YYYY-MM-DDTHH:MM:SS.sss"
//@ts-ignore
Date.prototype.toLocalString = function () {
    const year = this.getFullYear();
    const month = addZero(this.getMonth() + 1);
    const day = addZero(this.getDate());
    const hour = addZero(this.getHours());
    const minute = addZero(this.getMinutes());
    const second = addZero(this.getSeconds());
    const millisec = addTwoZero(this.getMilliseconds());
    return "" + year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second + '.' + millisec;
}
//------------------------------------------------
function indexOfClient(array, clientId) {
    for (var i in array) {
        if (array[i].id == clientId) {
            return i;
        }
    }
    return -1;
}

function indexOfAddress(client, addressTypeCode) {
    for (var i in client.addresses) {
        if (client.addresses[i].typeId == addressTypeCode) {
            return i;
        }
    }
    return -1;
}

function indexOfDocument(client, documentTypeCode) {
    for (var i in client.documents) {
        if (client.documents[i].typeId == documentTypeCode) {
            return i;
        }
    }
    return -1;
}



var input = msg.payload;
var output = [];

for (let i = 0; i <  input.length; i++) {
    var client = {};
    client.id               = input[i]['Client.Id'];
    client.stateCode        = input[i]['Client.StateCode'];
    client.name             = input[i]['Client.Name'];
    client.namelat          = input[i]['Client.NameLAT'];
    client.scroogeId        = input[i]['Client.ScroogeId'];
    client.scroogeCode      = input[i]['Client.ScroogeCode'];
    client.birtday         = input[i]['Client.BirtDay'].toLocalString();
    client.birthSurname     = input[i]['Client.BirthSurname'];
    client.gender           = input[i]['Client.Gender'];
    client.marriageStatus   = input[i]['Client.MarriageStatus'];
    client.phone            = input[i]['Client.Phone'];
    client.isMain           = input[i]['IsMain'];
    client.isVerified       = input[i]['IsVerified'];
    
    client.identCode = input[i]['Client.IdentCode'] == null ? 6 : input[i]['Client.IdentCode'];
    client.identName        = input[i]['Client.IdentDesc'];
    client.lastName        = input[i]['Client.LastName'];
    client.firstName        = input[i]['Client.FirstName'];
    client.fatherName        = input[i]['Client.FatherName'];
    
       client.clientType        = input[i]['Client.Type']=="FIZSPD"?"FOP":input[i]['Client.Type'];
       client.smStateCode        = input[i]['client.Stan'];
       client.cliResidencyFlag  = input[i]['client.clresident']=="rez"?1:0;
    
    var address = {};
    address.typeId          = input[i]['Address.Type'];
    address.type            = input[i]['Address.Desc'];
    address.state           = input[i]['Address.State'];
    address.postalCode      = input[i]['Address.PostalCode'];
    address.town            = input[i]['Address.Town'];
    address.street          = input[i]['Address.Street'];
    address.houseNumber     = input[i]['Address.HouseNumber'];
    address.flatNumber      = input[i]['Address.FlatNumber'];
    address.country         = input[i]['Address.Country'];
    
    var doc = {};
    doc.typeId              = input[i]['Document.TypeId'];
    doc.type                = input[i]['Document.Type'];
    doc.series              = input[i]['Document.Series'];
    doc.number              = input[i]['Document.Number'];
    doc.registrationDate    = input[i]['Document.RegistrationDate'];
    doc.name                = input[i]['Document.Name'];
    doc.unsr                = input[i]['Document.FormSeries'];
    
    var clientIndex = indexOfClient(output, client.id)
    if (clientIndex == -1) {
        client.addresses = [address];
        client.documents = [doc];
        output.push(client);
    } else {
        var addressIndex = indexOfAddress(output[clientIndex], address.typeId)
        if (addressIndex == -1) {
           output[clientIndex].addresses.push(address); 
        }
        var docIndex = indexOfDocument(output[clientIndex], doc.typeId)
        if (docIndex == -1) {
            output[clientIndex].documents.push(doc);
        }
    }
}
msg.time = [];

msg.payload = output.filter(x => x.clientType !== "FOP");

const map = {
    "NEED_UPDATE": "COMPLETE_CLIENT",
    "READY_CLIENT": "COMPLETE_CLIENT",
    "IDENT_CLIENT": "COMPLETE_CLIENT"
}
for (let client of msg.payload) {
    if (client.smStateCode) {
        client.smStateCode = map[client.smStateCode] || client.smStateCode;
    }
}
for (let client of msg.payload){
    msg.time.push(client.birtday)
}
return msg;