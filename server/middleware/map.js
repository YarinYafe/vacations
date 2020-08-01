let mapArray = new Array()

function saveUserInfo(token, succesfulLoginDetails) {
    let userInformatiom = {
        key: token,
        value: succesfulLoginDetails
    }
    mapArray.push(userInformatiom);
    return mapArray;
}

function checkMapForUserId(token) {
    let userId;
    for (let index = 0; index < mapArray.length; index++) {

        if (token == "Bearer" + " " + mapArray[index].key) {
            userId = mapArray[index].value.id;
        }
    }
    return userId;
}

module.exports = { saveUserInfo, checkMapForUserId }