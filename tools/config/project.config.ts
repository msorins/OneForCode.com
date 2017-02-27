import { join } from 'path';

import { SeedConfig } from './seed.config';
// import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,

      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    //MATERIALIZE STUFF
    this.addPackageBundles({
      name: 'materialize-css',
      path: 'node_modules/materialize-css/dist/js/materialize.js',
      packageMeta: {
        main: 'materialize.js',
        defaultExtension: 'js',
        format: 'global'
      }
    });

    this.addPackageBundles({
      name: 'angular2-materialize',
      path: 'node_modules/angular2-materialize/dist/index.js',
      packageMeta: {
        main: 'materialize-directive.js',
        defaultExtension: 'js'
      }
    });

    //FIREBASE STUFF
    this.addPackageBundles({
      name: 'firebase',
      path: 'node_modules/firebase/firebase.js',
      packageMeta: {
        main: 'firebase.js',
        defaultExtension: 'js'
      }
    });

    // Add AngularFire configuration to SystemJS
    this.addPackageBundles({
      name: 'angularfire2',
      path: 'node_modules/angularfire2/bundles/angularfire2.umd.js',
      packageMeta: {
        main: 'angularfire2.js',
        defaultExtension: 'js'
      }
    });

    // Add Text editor configuration
    this.addPackageBundles({
      name: 'ng2-ckeditor',
      path: 'node_modules/ng2-ckeditor',
      packageMeta: {
        main: 'lib/index.js',
        defaultExtension: 'js'
      }
    });

    // Add Bootstrap Popover
    this.addPackageBundles({
      name: 'ngx-popover',
      path: 'node_modules/ngx-popover',
      packageMeta: {
        main: 'index.js',
        defaultExtension: 'js'
      }
    });

    // Add packages (e.g. lodash)
    // let additionalPackages: ExtendPackages[] = [{
    //   name: 'lodash',
    //   path: `${this.APP_BASE}node_modules/lodash/lodash.js`,
    //   packageMeta: {
    //     main: 'index.js',
    //     defaultExtension: 'js'
    //   }
    // }];
    //
    // or
    //
    // let additionalPackages: ExtendPackages[] = [];
    //
    // additionalPackages.push({
    //   name: 'lodash',
    //   path: `${this.APP_BASE}node_modules/lodash/lodash.js`,
    //   packageMeta: {
    //     main: 'index.js',
    //     defaultExtension: 'js'
    //   }
    // });
    //
    // this.addPackagesBundles(additionalPackages);

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
