require("angular-mocks");

describe('test test service', function () {
  var test,
      httpBackend;
  
  beforeEach(function (){  
    // load the module.
    module('myApp');
    
    // get your service, also get $httpBackend
    // $httpBackend will be a mock, thanks to angular-mocks.js
    inject(function($httpBackend, _test_) {
      test = _test_;      
      httpBackend = $httpBackend;
    });
  });
  
  // make sure no expectations were missed in your tests.
  // (e.g. expectGET or expectPOST)
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
 
  it('should send the msg and return the response.', function (){
    // set up some data for the http call to return and test later.
    var returnData = { message:'Deployment Successful' };
    
    // expectGET to make sure this is called once.
    httpBackend.expectGET('http://localhost:8080/api/test').respond(returnData);
    
    // make the call.
    var returnedPromise = test.hello();
    
    // set up a handler for the response, that will put the result
    // into a variable in this scope for you to test.
    var result;
    returnedPromise.then(function(response) {
      result = response;
    });
    
    // flush the backend to "execute" the request to do the expectedGET assertion.
    httpBackend.flush();
    
    // check the result. 
    // (after Angular 1.2.5: be sure to use `toEqual` and not `toBe`
    // as the object will be a copy and not the same instance.)
    expect(result).toEqual(returnData);
  });  
});