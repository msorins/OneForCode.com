'use strict'

import {resolve, basename} from 'path'
import test from 'ava'
import Tacks, {Dir as dir, File as file} from 'tacks'
import exec from 'sync-exec'

const moduleName = 'test-module'
const base = resolve(__dirname, basename(__filename, '.js'))
const testModuleDir = resolve(base, moduleName)
const useGlobalDir = resolve(base, 'use-global')
const useLocalDir = resolve(base, 'use-local')
const fixture = new Tacks(dir({
  'test-module': dir({
    'package.json': file({
      name: 'test-module',
      bin: {'test-module': './bin'},
      main: './bin',
      version: '1.0.0'
    }),
    'bin': file('#!/usr/bin/env node\n' +
      'var isGlobal = require(\'' + resolve('./') + '\')()\n' +
      'process.exit(isGlobal ? 0 : 1)')
  }),
  'use-global': dir({
    'package.json': file({
      name: 'use-global-module',
      scripts: {
        start: 'test-module'
      }
    })
  }),
  'use-local': dir({
    'package.json': file({
      name: 'use-local-module',
      scripts: {
        start: 'test-module'
      }
    })
  })
}))

test.before(t => {
  fixture.create(base)
  t.pass()
})

test.after.always(t => {
  exec(`cd ${moduleName} && npm unlink`)
  fixture.remove(base)
  t.pass()
})

test('is local', t => {
  t.is(exec('node ' + testModuleDir).status, 1)
})

test('is global', t => {
  t.is(exec(`cd ${testModuleDir} && npm link && ${moduleName}`).status, 0)
})

test('use local exec', t => {
  t.is(exec(`cd ${useLocalDir} && npm i ${testModuleDir} -D && npm start`).status, 1)
})

test('use global exec', t => {
  t.is(exec(`cd ${useGlobalDir} && npm start`).status, 0)
})
