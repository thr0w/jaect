var jaect = require('..'), fs = require('fs'),
  path = require('path'), expect = require('chai').expect,  esprima = require('esprima-fb'), escodegen = require('escodegen-ts')

var root = __dirname + '/'

describe('ReactCase', function () {
  add_dir('react-components/')
  function add_dir (folder) {
    var files = fs.readdirSync(root + folder)
    files.forEach(function (file) {
      var stat = fs.statSync(root + folder + file)
      if (stat.isDirectory()) add_dir(folder + file + '/')
      else if (stat.isFile())  createTest(folder, file)
    })
  }
})

function createTest (folder, file) {
  try {
    var title = folder + file
    var md = parse_md(fs.readFileSync(root + folder + file, 'utf8'))
    if (typeof md.pending !== 'undefined')
      xit(title)
    else
      it(title, function () {
        var name = path.basename(file, '.md')
        if (md.error) {
          expect(function () {
            jaect_compile(name, md.jade)
          }).to.throws(md.error)
        } else {
          var actual_js = jaect_compile(name, md.jade)
          var expected = format_src('expected', md.javascript)
          var actual = format_src('actual', actual_js.code)
          expect(actual).to.be.equal(expected)
        }

      })
  } catch(e) {
    xit(title)
  }
}

function jaect_compile (name, src) {
  return jaect.compileComponent(src, {
    format: gen_format,
    sourceFileName: name,
    sourceContent: src
  })
}

function parse_md (text) {
  var lines = text.split('\n')
  var ret = {}
  var name, actual
  lines.forEach(function (line, idx) {
    var code_match = /^\s*```/.test(line)
    if (actual) {
      if (line == '```') {
        ret[name] = actual.join('\n')
        actual = null
        return
      }
      if (code_match) throw new Error('Line ' + idx + ': has another code openned')
      actual.push(line)
    } else {
      if (code_match) {
        name = line.replace(/^\s*```\s*/, '')
        actual = []
      }
    }
  })
  return ret
}

function format_src (tp, src) {
  try {
    var ast = esprima.parse(src, {sourceType: 'module'})
    var ret = escodegen.generate(ast, gen_format)
    return ret
  } catch(e) {
    var err = new Error(tp + ': ' + e.message + '\n' + src)
    err.stack = e.stack
    throw err
  }
}

var gen_format = {
  format: {
    indent: {
      style: '    ',
      base: 0,
      adjustMultilineComment: false
    },
    newline: '\n',
    space: ' ',
    json: false,
    renumber: false,
    hexadecimal: false,
    quotes: 'single',
    escapeless: false,
    compact: false,
    parentheses: true,
    semicolons: true,
    safeConcatenation: false
  }
}
