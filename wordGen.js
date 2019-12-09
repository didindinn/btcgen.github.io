function BigIntToWord(bigInt){
    //console.log(BigIntToWord);
    var hexNum = bigInt.toString(16); // radix is 16

    return CryptoJS.enc.Hex.parse(hexNum);
}

function GetBigInt(hash){
    
    var str=hash.toString(CryptoJS.enc.Hex);
    return BigInt("0x"+hash.toString(CryptoJS.enc.Hex),16);
}