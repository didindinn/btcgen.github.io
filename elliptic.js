class Point{
    constructor(x,y){
        if(x==null){ x=BigInt("0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798");
                    y=BigInt("0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8");
                   }
        let p=2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n;
        this.x = x;
        this.y = y;
        this.p = p;
    }

    mul(other){
        //console.log("mul");
        //return new Point(this.x, this.y);
        let n = this.add(null);
        var q = null;
        //let bytes=other.toBytes();
        for (var i=0;i<256;i++){
            //console.log(i);
            if ((other & (1n << BigInt(i)))){
                q=n.add(q);
                console.log("1");
            }
            //q = q + n
            n = n.add(n);
        }
        return q;
    }
    add(other){
        //console.log("add");
        if (!other)
            return new Point(this.x, this.y);
        let x1 = other.x;
        let y1 = other.y;
        let x2 = this.x;
        let y2 = this.y;
        let p = this.p;
        let l=0n;
        if (this.equals(other)){
            l = pow(2n * y2 % p, p-2n, p) * (3n * x2 * x2) % p;
        }else{
            l = pow(x1 - x2, p-2n, p) * (y1 - y2) % p;
        }
        let newX = (l ** 2n - x2 - x1) % p;
        let newY = (l * x2 - l * newX - y2) % p;

        return new Point(newX, newY);
    }
    toBytes(){
        //<< increases   big number in the left
        //x = self.x.to_bytes(32, "big")
        //y = self.y.to_bytes(32, "big")
        return "0x04" + BigIntToHexStr(this.x,64)+BigIntToHexStr(this.y,64);
    }
    equals(other){
        //print("equals");
        return this.x==other.x&&this.y==other.y&&this.p==other.p;
    }
}
function BigIntToHexStr(val,length){
    let str=val.toString(16);
    if(str.length>length){
        throw new Exception("length should be longer than input value's length!");
    }
    while(str.length<length){
        str="0"+str;    
    }
    console.log(val);
    console.log(str);
    return str;
}
function pow( base, exp, mod ){
    if (exp == 0) return 1n;
    if (exp % 2n == 0){
        po=pow( base, (exp / 2n),mod);
        return (po*po) % mod;
    }
    else {
        return (base * pow( base, (exp - 1n), mod)) % mod;
    }
}

function pow2(exp){

}