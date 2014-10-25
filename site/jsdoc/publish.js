/*eslint no-nested-ternary:0, space-infix-ops: 0 */
/**
    @overview Builds a tree-like JSON string from the doclet data.
    @version 0.0.3
    @example
        ./jsdoc scratch/jsdoc_test.js -t templates/haruki -d console -q format=xml
 */
'use strict';

var fs = require('jsdoc/fs'),
    helper = require('jsdoc/util/templateHelper'),
    _ = require( 'underscore' ),
    path = require('jsdoc/path'),
    outdir = env.opts.destination,
    conf = env.conf.templates || {},
    sourceRootPath = conf.sourceRootPath;

function shortenPaths( files, commonPrefix ) {
//  // always use forward slashes
//  var regexp = new RegExp( '\\\\', 'g' );
//
//  var prefix = commonPrefix.toLowerCase().replace( regexp, "/" );
//
//  Object.keys( files ).forEach( function ( file ) {
//    files[file].shortened = files[file]
//      .resolved
//      .toLowerCase()
//      .replace( regexp, '/' )
//      .replace( prefix, '' );
//  } );

  Object.keys(files).forEach(function(file) {
    files[file].shortened = files[file].resolved.replace(commonPrefix, '')
      // always use forward slashes
      .replace(/\\/g, '/');
  });

  return files;
}

function getPathFromDoclet( doclet ) {
  if ( !doclet.meta ) {
    return;
  }

  return path.normalize(doclet.meta.path && doclet.meta.path !== 'null' ?
    doclet.meta.path + '/' + doclet.meta.filename :
    doclet.meta.filename);
}

function graft(parentNode, childNodes, parentLongname, parentName) {
    childNodes
    .filter(function (element) {
        return (element.memberof === parentLongname);
    })
    .forEach(function (element, index) {
        var i,
            len;

        if (element.kind === 'namespace') {
            if (! parentNode.namespaces) {
                parentNode.namespaces = [];
            }

            var thisNamespace = {
                'name': element.name,
                'description': element.description || '',
                'access': element.access || '',
                'virtual': !!element.virtual
            };

            parentNode.namespaces.push(thisNamespace);

            graft(thisNamespace, childNodes, element.longname, element.name);
        }
        else if (element.kind === 'mixin') {
            if (! parentNode.mixins) {
                parentNode.mixins = [];
            }

            var thisMixin = {
                'name': element.name,
                'description': element.description || '',
                'access': element.access || '',
                'virtual': !!element.virtual
            };

            parentNode.mixins.push(thisMixin);

            graft(thisMixin, childNodes, element.longname, element.name);
        }
        else if (element.kind === 'function') {
            if (! parentNode.functions) {
                parentNode.functions = [];
            }

            var thisFunction = {
                'name': element.name,
                'access': element.access || '',
                'attribs': helper.getAttribs(element),
                'description': element.description || '',
                'summary': element.summary,
                'filename': element.meta.shortpath,
                'line': element.meta.lineno,
                'parameters': [ ],
                'examples': []
            };

            parentNode.functions.push(thisFunction);

            if (element.returns) {
                thisFunction.returns = {
                    'type': element.returns[0].type? (element.returns[0].type.names.length === 1? element.returns[0].type.names[0] : element.returns[0].type.names) : '',
                    'description': element.returns[0].description || ''
                };
            }

            if (element.examples) {
                for (i = 0, len = element.examples.length; i < len; i++) {
                    thisFunction.examples.push(element.examples[i]);
                }
            }

            if (element.params) {
                for (i = 0, len = element.params.length; i < len; i++) {
                    thisFunction.parameters.push({
                        'name': element.params[i].name,
                        'type': element.params[i].type? (element.params[i].type.names.length === 1? element.params[i].type.names[0] : element.params[i].type.names) : '',
                        'description': element.params[i].description || '',
                        'default': element.params[i].defaultvalue || '',
                        'optional': typeof element.params[i].optional === 'boolean'? element.params[i].optional : '',
                        'nullable': typeof element.params[i].nullable === 'boolean'? element.params[i].nullable : ''
                    });
                }
            }
        }
        else if (element.kind === 'member') {
            if (! parentNode.properties) {
                parentNode.properties = [];
            }
            parentNode.properties.push({
                'name': element.name,
                'access': element.access || '',
                'virtual': !!element.virtual,
                'filename': element.meta.shortpath,
                'line': element.meta.lineno,
                'description': element.description || '',
                'type': element.type? (element.type.length === 1? element.type[0] : element.type) : ''
            });
        }

        else if (element.kind === 'event') {
            if (! parentNode.events) {
                parentNode.events = [];
            }

            var thisEvent = {
                'name': element.name,
                'access': element.access || '',
                'virtual': !!element.virtual,
                'description': element.description || '',
                'parameters': [],
                'examples': []
            };

            parentNode.events.push(thisEvent);

            if (element.returns) {
                thisEvent.returns = {
                    'type': element.returns.type? (element.returns.type.names.length === 1? element.returns.type.names[0] : element.returns.type.names) : '',
                    'description': element.returns.description || ''
                };
            }

            if (element.examples) {
                for (i = 0, len = element.examples.length; i < len; i++) {
                    thisEvent.examples.push(element.examples[i]);
                }
            }

            if (element.params) {
                for (i = 0, len = element.params.length; i < len; i++) {
                    thisEvent.parameters.push({
                        'name': element.params[i].name,
                        'type': element.params[i].type? (element.params[i].type.names.length === 1? element.params[i].type.names[0] : element.params[i].type.names) : '',
                        'description': element.params[i].description || '',
                        'default': element.params[i].defaultvalue || '',
                        'optional': typeof element.params[i].optional === 'boolean'? element.params[i].optional : '',
                        'nullable': typeof element.params[i].nullable === 'boolean'? element.params[i].nullable : ''
                    });
                }
            }
        }
        else if (element.kind === 'class') {
            if (! parentNode.classes) {
                parentNode.classes = [];
            }

            var thisClass = {
                'name': element.name,
                'description': element.classdesc || '',
                'extends': element.augments || [],
                'access': element.access || '',
                'virtual': !!element.virtual,
                'fires': element.fires || '',
                'constructor': {
                    'name': element.name,
                    'description': element.description || '',
                    'summary': element.summary,
                    'filename': element.meta.shortpath,
                    'line': element.meta.lineno,
                    'parameters': [],
                    'examples': []
                }
            };

            parentNode.classes.push(thisClass);

            if (element.examples) {
                for (i = 0, len = element.examples.length; i < len; i++) {
                    thisClass.constructor.examples.push(element.examples[i]);
                }
            }

            if (element.params) {
                for (i = 0, len = element.params.length; i < len; i++) {
                    thisClass.constructor.parameters.push({
                        'name': element.params[i].name,
                        'type': element.params[i].type? (element.params[i].type.names.length === 1? element.params[i].type.names[0] : element.params[i].type.names) : '',
                        'description': element.params[i].description || '',
                        'default': element.params[i].defaultvalue || '',
                        'optional': typeof element.params[i].optional === 'boolean'? element.params[i].optional : '',
                        'nullable': typeof element.params[i].nullable === 'boolean'? element.params[i].nullable : ''
                    });
                }
            }

            graft(thisClass, childNodes, element.longname, element.name);
       }
    });
}

/**
    @param {TAFFY} data
    @param {object} opts
 */
exports.publish = function(data, opts) {
  var sourceFiles = {};
  var sourceFilePaths = [];
  data().each(function(doclet) {
    var sourcePath;
    if (doclet.meta) {
      sourcePath = getPathFromDoclet(doclet);
      sourceFiles[sourcePath] = {
        resolved  : sourcePath,
        shortened : null
      };
      sourceFilePaths.push(sourcePath);
    }
  });
  if (sourceFilePaths.length) {
    var payload = sourceRootPath;
    if (!payload) {
      payload = path.commonPrefix(sourceFilePaths);
    }
    sourceFiles = shortenPaths(sourceFiles, payload);
  }
  data().each(function(doclet) {
    // var url = helper.createLink( doclet );
    // helper.registerLink( doclet.longname, url );

    // add a shortened version of the full path
    var docletPath;
    if (doclet.meta) {
      docletPath = getPathFromDoclet(doclet);
      if (!_.isEmpty(sourceFiles[docletPath])) {
        docletPath = sourceFiles[docletPath].shortened;
        if (docletPath) {
          doclet.meta.shortpath = docletPath;
        }
      }
    }
  });

  var root = {},
      docs;

  data({undocumented: true}).remove();
  docs = data().get(); // <-- an array of Doclet objects

  graft(root, docs);

  var outpath = path.join(outdir, "jsdoc.json");
  var output = JSON.stringify(root, null, 2);
  fs.writeFileSync( outpath, output, 'utf8' );
};
