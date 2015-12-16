User Agent Device Mapper
=========

A small library to map user agents to either (desktop, mobile, tablet) device types.

## Installation

  npm install user-agent-device-mapper --save

## Usage

  var uaMapper = require('user-agent-device-mapper');

  var deviceType = uaMapper.getDeviceType('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36');

  console.log('device type: ', deviceType);

## Tests

  npm test

## Contributing

Nino Ulsamer, Divvit AB

## Release History

* 0.0.1 Initial release
