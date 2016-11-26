# is-global-exec

[![Build Status](https://travis-ci.org/QingWei-Li/is-global-exec.svg?branch=master)](https://travis-ci.org/QingWei-Li/is-global-exec)
[![npm](https://img.shields.io/npm/v/is-global-exec.svg?maxAge=2592000)](https://www.npmjs.com/package/is-global-exec)

> Checks whether executable is global.

## Installation
```shell
npm i is-global-exec -S
```

## Usage
test/test
```javascript
var isGlobal = require('is-global-exec')
console.log(isGlobal())
```

run script
```shell
$ node test/test
# -> false # 'test/test' is local executable

$ test/test
# false # 'test/test' is local executable

# if 'test/test' is install global, it will print 'true'
```

## License
MIT

