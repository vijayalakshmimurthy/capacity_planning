// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
/** This is for local services using which we are using from performance/prelive box. */
export const environment = {
  production: false,
  // base_url: 'http://10.13.54.63:61006/',
  // base_url: 'http://10.13.54.63:61007/cdpr/',
  // base_url: 'http://10.13.54.63/srimsCDPR/',
  base_url: 'http://10.52.35.46:61010/srimsCPtest/',
  logout_url: '',
  Angular7_url : '',
  map_key: 'AIzaSyBHr8qHBBS85IA-WpeHscRBE_MZkQM8XBs',
  no_Base_url: 'http://10.52.35.46:61010/srims-networkoptimizationservice',
  no_url_trackpage: 'http://10.52.35.46:61010/srims-networkoptimization',
  cst: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
