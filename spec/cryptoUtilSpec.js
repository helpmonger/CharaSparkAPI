var cryptUtil = require('../services/auth/cryptoUtil');


describe("CanEncodeDecodeString", function() {

	var stringToEncrypt = "blah foo";
	var result = null;

    it("CanEncodeString", function() {
        result = cryptUtil.encrypt(stringToEncrypt);
        expect(result).toBeDefined();
        expect(result).not.toBe(stringToEncrypt);
    });


      it("CanDecodeString", function() {
        result = cryptUtil.decrypt(result);
        expect(result).toBeDefined();
        expect(result).toBe(stringToEncrypt);
    });
});

describe("CanEncodeDecodeUser", function() {

	var userToEncrypt = {id: "5532eab18a3e5e42eff85190", createdDate: new Date()};
	var result = null;

    it("CanEncodeObject", function() {
        result = cryptUtil.encrypt(userToEncrypt);
        expect(result).toBeDefined();
        expect(result).not.toBe(userToEncrypt);
    });


      it("CanDecodeObject", function() {
        result = cryptUtil.decrypt(result);
        expect(result).toBeDefined();
        expect(result.id).toBe(userToEncrypt.id);
        // expect(typeof(result.createdDate).toBe(typeof(userToEncrypt.createdDate)));
        expect(result.createdDate.toUTCString()).toEqual(userToEncrypt.createdDate.toUTCString());
    });
});


