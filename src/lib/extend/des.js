// des加密/解密
layui.define(function (exports) {
    // des解密
    function decryptByDESModeCBC (encrypted, key, iv) {
        var hkey = CryptoJS.enc.Utf8.parse(key);
        var hiv = CryptoJS.enc.Utf8.parse(iv);
        var decrypted = CryptoJS.DES.decrypt(encrypted, hkey,
            {
                iv: hiv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        console.log(encrypted)
        console.log(decrypted.toString(CryptoJS.enc.Utf8))

        return decrypted.toString(CryptoJS.enc.Utf8);
    };
    // des加密
    function encryptByDESModeCBC (encrypted, key, iv) {
        var key = CryptoJS.enc.Utf8.parse(key);
        var iv = CryptoJS.enc.Utf8.parse(iv);
        var encrypted = CryptoJS.DES.encrypt(encrypted, key,
            {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        return encrypted.toString();    //返回的是base64格式的密文
    }

    exports('des', { decrypt: decryptByDESModeCBC, encrypt: encryptByDESModeCBC });
});
