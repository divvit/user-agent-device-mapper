var should = require('chai').should(),
   userAgentMapper = require('../index'),
   getDeviceType = userAgentMapper.getDeviceType;

describe('#getDeviceType', function() {
   it('detects Chrome browser as desktop', function() {
      getDeviceType('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36')
         .should.equal('desktop');
   });
});
