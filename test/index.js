var should = require('chai').should(),
   userAgentMapper = require('../index'),
   getDeviceType = userAgentMapper.getDeviceType;

describe('#getDeviceType', function() {
   it('detects Chrome as desktop', function() {
      getDeviceType('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36')
         .should.equal('desktop');
   });

   it('detects IE as desktop', function() {
      getDeviceType('Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko')
         .should.equal('desktop');
   });

   it ('detects iPad as tablet', function() {
      getDeviceType('Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1')
         .should.equal('tablet');
   });

   it('detects Android as mobile', function() {
      getDeviceType('Mozilla/5.0 (Linux; U; Android 4.0.3; de-ch; HTC Sensation Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30')
         .should.equal('mobile');
   });

   it('detects Blackberry as mobile', function() {
      getDeviceType('Mozilla/5.0 (BlackBerry; U; BlackBerry 9850; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.254 Mobile Safari/534.11+')
         .should.equal('mobile');
   });

   it('detects iPhone OS 4.0 as mobile', function() {
      getDeviceType('Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7')
         .should.equal('mobile');
   });

   it('detects iPhone OS 6.0 as mobile', function() {
      getDeviceType('Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_4 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B350 Safari/8536.25')
         .should.equal('mobile');
   });

   it('detects Android tablet as tablet', function() {
      getDeviceType('mozilla/5.0_(linux;_u;_android_3.1;_en-us;_gt-p7510_build/hmj37)_applewebkit/534.13_(khtml,_like_gecko)_version/4.0_safari/534.13')
         .should.equal('tablet');
   });

   it('Ensure cache is being used for tablet', function() {
      const ua = 'mozilla/5.0_(linux;_u;_android_3.1;_en-us;_gt-p7510_build/hmj37)_applewebkit/534.13_(khtml,_like_gecko)_version/4.0_safari/534.13';
      getDeviceType(ua).should.equal('tablet');
      userAgentMapper._getElemFromCache(ua).should.equal('tablet');
   });

   it('Ensure cache is being used for mobile', function() {
      const ua = 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9850; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.254 Mobile Safari/534.11+';
      getDeviceType(ua).should.equal('mobile');
      userAgentMapper._getElemFromCache(ua).should.equal('mobile');
   });

   it('Ensure cache is being used for desktop', function() {
      const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36';
      getDeviceType(ua).should.equal('desktop');
      userAgentMapper._getElemFromCache(ua).should.equal('desktop');
   });

   it('Ensure cache is size is limited', function () {
      this.timeout(5000);
      const cacheMaxSize = userAgentMapper._getCacheMaxSize()
      for (var i = 0; i < cacheMaxSize * 2; i++) {
         getDeviceType(i + ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36');
      }
      userAgentMapper._getCacheSize().should.equal(cacheMaxSize);
   });

   it('Undefined UA should return desktop.', function() {
      getDeviceType(undefined)
         .should.equal('desktop');
   });
   it('Null UA should return desktop.', function() {
      getDeviceType(null)
         .should.equal('desktop');
   });
   it('Empty UA should return desktop.', function() {
      getDeviceType('')
         .should.equal('desktop');
   });
});
