function getPublicAddress(privkey/*BigInt*/){
    let SPEC256k1 = new Point();
    //pk = int.from_bytes(privkey, "big")
    let pk = privkey;
    //hash160 = ripemd160(sha256((SPEC256k1 * pk).toBytes()));
    let publicKey=SPEC256k1.mul(pk).x;//+((0x02n))*(2n**256n);
    let pubKeyStr="02"+publicKey.toString(16);
    console.log(pubKeyStr);
    //console.log(privkey.toString(16));
    
    let pubKeyWord=CryptoJS.enc.Hex.parse(pubKeyStr);
    console.log(pubKeyWord);
    let hash160=CryptoJS.RIPEMD160(CryptoJS.SHA256((
        (CryptoJS.enc.Hex.parse(pubKeyStr)))));//word array
    let hash160str=hash160.toString(CryptoJS.enc.Hex);
    hash160str="00"+hash160str;
    console.log(hash160str);
    
    var shasha =CryptoJS.SHA256( CryptoJS.SHA256(CryptoJS.enc.Hex.parse(hash160str))).toString(CryptoJS.enc.Hex);
    console.log(shasha);
    let checksum=shasha.substring(0,8);
    console.log("checksum:"+checksum);  
    let address=hash160str+checksum;
    console.log("address:"+address);
    
    //let address =GetBigInt(hash160)>>8n;//0xff 255=2^8-1
    //let shasha=GetBigInt(CryptoJS.SHA256(CryptoJS.SHA256(BigIntToWord(address))));
    
    //GetBigInt(shasha))[:4]
    //shasha=shasha>>8n;
    //shasha=shasha&(1n<<256n-1n);
    //shasha=shasha<<8n;
    //console.log(BigInt("0x"+address).toString(16));
    //address = b58(address);
    address=base58.encode(from_hex(address));
    return address;
}

function getWif(privkey/*BigInt*/){
    let wif=(BigInt(0x80)<<8n)|(privkey);
}
/*
def getWif(privkey):
    wif = b"\x80" + privkey
    wif = b58(wif + sha256(sha256(wif))[:4])
    return wif
BITCOIN_ALPHABET = \
    b'123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

*/