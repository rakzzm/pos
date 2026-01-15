/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/payroll/route";
exports.ids = ["app/api/payroll/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpayroll%2Froute&page=%2Fapi%2Fpayroll%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpayroll%2Froute.ts&appDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpayroll%2Froute&page=%2Fapi%2Fpayroll%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpayroll%2Froute.ts&appDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_rakzzm_Documents_Applications_Advakkad_POS_Application_src_app_api_payroll_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/payroll/route.ts */ \"(rsc)/./src/app/api/payroll/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"standalone\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/payroll/route\",\n        pathname: \"/api/payroll\",\n        filename: \"route\",\n        bundlePath: \"app/api/payroll/route\"\n    },\n    resolvedPagePath: \"/Users/rakzzm/Documents/Applications/Advakkad POS Application/src/app/api/payroll/route.ts\",\n    nextConfigOutput,\n    userland: _Users_rakzzm_Documents_Applications_Advakkad_POS_Application_src_app_api_payroll_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwYXlyb2xsJTJGcm91dGUmcGFnZT0lMkZhcGklMkZwYXlyb2xsJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcGF5cm9sbCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnJha3p6bSUyRkRvY3VtZW50cyUyRkFwcGxpY2F0aW9ucyUyRkFkdmFra2FkJTIwUE9TJTIwQXBwbGljYXRpb24lMkZzcmMlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGcmFrenptJTJGRG9jdW1lbnRzJTJGQXBwbGljYXRpb25zJTJGQWR2YWtrYWQlMjBQT1MlMjBBcHBsaWNhdGlvbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD1zdGFuZGFsb25lJnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzBDO0FBQ3ZIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvcmFrenptL0RvY3VtZW50cy9BcHBsaWNhdGlvbnMvQWR2YWtrYWQgUE9TIEFwcGxpY2F0aW9uL3NyYy9hcHAvYXBpL3BheXJvbGwvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwic3RhbmRhbG9uZVwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9wYXlyb2xsL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcGF5cm9sbFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvcGF5cm9sbC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9yYWt6em0vRG9jdW1lbnRzL0FwcGxpY2F0aW9ucy9BZHZha2thZCBQT1MgQXBwbGljYXRpb24vc3JjL2FwcC9hcGkvcGF5cm9sbC9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpayroll%2Froute&page=%2Fapi%2Fpayroll%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpayroll%2Froute.ts&appDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/payroll/route.ts":
/*!**************************************!*\
  !*** ./src/app/api/payroll/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_1__.PrismaClient();\nasync function GET() {\n    try {\n        const payrolls = await prisma.payroll.findMany({\n            include: {\n                staff: {\n                    select: {\n                        name: true,\n                        employeeId: true\n                    }\n                }\n            },\n            orderBy: {\n                payDate: 'desc'\n            }\n        });\n        const mapped = payrolls.map((p)=>({\n                ...p,\n                staffName: p.staff.name\n            }));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(mapped);\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to fetch payroll'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const data = await request.json();\n        const { staffId, periodStart, periodEnd, bonuses, deductions } = data;\n        const staff = await prisma.staff.findUnique({\n            where: {\n                id: staffId\n            }\n        });\n        if (!staff) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Staff not found'\n            }, {\n                status: 404\n            });\n        }\n        const basicSalary = staff.salary; // Assuming monthly salary\n        const netSalary = basicSalary + (bonuses || 0) - (deductions || 0);\n        const payroll = await prisma.payroll.create({\n            data: {\n                staffId,\n                payPeriodStart: new Date(periodStart),\n                payPeriodEnd: new Date(periodEnd),\n                payDate: new Date(),\n                basicSalary,\n                bonuses: bonuses || 0,\n                deductions: deductions || 0,\n                netSalary,\n                status: 'pending' // Default status\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(payroll);\n    } catch (error) {\n        console.error(error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to run payroll'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9wYXlyb2xsL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQTJDO0FBQ0c7QUFFOUMsTUFBTUUsU0FBUyxJQUFJRCx3REFBWUE7QUFFeEIsZUFBZUU7SUFDcEIsSUFBSTtRQUNGLE1BQU1DLFdBQVcsTUFBTUYsT0FBT0csT0FBTyxDQUFDQyxRQUFRLENBQUM7WUFDN0NDLFNBQVM7Z0JBQ1BDLE9BQU87b0JBQ0xDLFFBQVE7d0JBQUVDLE1BQU07d0JBQU1DLFlBQVk7b0JBQUs7Z0JBQ3pDO1lBQ0Y7WUFDQUMsU0FBUztnQkFDUEMsU0FBUztZQUNYO1FBQ0Y7UUFFQSxNQUFNQyxTQUFTVixTQUFTVyxHQUFHLENBQUNDLENBQUFBLElBQU07Z0JBQzlCLEdBQUdBLENBQUM7Z0JBQ0pDLFdBQVdELEVBQUVSLEtBQUssQ0FBQ0UsSUFBSTtZQUMzQjtRQUVBLE9BQU9WLHFEQUFZQSxDQUFDa0IsSUFBSSxDQUFDSjtJQUMzQixFQUFFLE9BQU9LLE9BQU87UUFDZCxPQUFPbkIscURBQVlBLENBQUNrQixJQUFJLENBQUM7WUFBRUMsT0FBTztRQUEwQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUMvRTtBQUNGO0FBRU8sZUFBZUMsS0FBS0MsT0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU1DLE9BQU8sTUFBTUQsUUFBUUosSUFBSTtRQUMvQixNQUFNLEVBQUVNLE9BQU8sRUFBRUMsV0FBVyxFQUFFQyxTQUFTLEVBQUVDLE9BQU8sRUFBRUMsVUFBVSxFQUFFLEdBQUdMO1FBRWpFLE1BQU1mLFFBQVEsTUFBTU4sT0FBT00sS0FBSyxDQUFDcUIsVUFBVSxDQUFDO1lBQUVDLE9BQU87Z0JBQUVDLElBQUlQO1lBQVE7UUFBRTtRQUNyRSxJQUFJLENBQUNoQixPQUFPO1lBQ1IsT0FBT1IscURBQVlBLENBQUNrQixJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBa0IsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3pFO1FBRUEsTUFBTVksY0FBY3hCLE1BQU15QixNQUFNLEVBQUUsMEJBQTBCO1FBQzVELE1BQU1DLFlBQVlGLGNBQWVMLENBQUFBLFdBQVcsS0FBTUMsQ0FBQUEsY0FBYztRQUVoRSxNQUFNdkIsVUFBVSxNQUFNSCxPQUFPRyxPQUFPLENBQUM4QixNQUFNLENBQUM7WUFDMUNaLE1BQU07Z0JBQ0pDO2dCQUNBWSxnQkFBZ0IsSUFBSUMsS0FBS1o7Z0JBQ3pCYSxjQUFjLElBQUlELEtBQUtYO2dCQUN2QmIsU0FBUyxJQUFJd0I7Z0JBQ2JMO2dCQUNBTCxTQUFTQSxXQUFXO2dCQUNwQkMsWUFBWUEsY0FBYztnQkFDMUJNO2dCQUNBZCxRQUFRLFVBQVUsaUJBQWlCO1lBQ3JDO1FBQ0Y7UUFFQSxPQUFPcEIscURBQVlBLENBQUNrQixJQUFJLENBQUNiO0lBQzNCLEVBQUUsT0FBT2MsT0FBTztRQUNkb0IsUUFBUXBCLEtBQUssQ0FBQ0E7UUFDZCxPQUFPbkIscURBQVlBLENBQUNrQixJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF3QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUM3RTtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvcmFrenptL0RvY3VtZW50cy9BcHBsaWNhdGlvbnMvQWR2YWtrYWQgUE9TIEFwcGxpY2F0aW9uL3NyYy9hcHAvYXBpL3BheXJvbGwvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xuXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcGF5cm9sbHMgPSBhd2FpdCBwcmlzbWEucGF5cm9sbC5maW5kTWFueSh7XG4gICAgICBpbmNsdWRlOiB7XG4gICAgICAgIHN0YWZmOiB7XG4gICAgICAgICAgc2VsZWN0OiB7IG5hbWU6IHRydWUsIGVtcGxveWVlSWQ6IHRydWUgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb3JkZXJCeToge1xuICAgICAgICBwYXlEYXRlOiAnZGVzYycsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IG1hcHBlZCA9IHBheXJvbGxzLm1hcChwID0+ICh7XG4gICAgICAgIC4uLnAsXG4gICAgICAgIHN0YWZmTmFtZTogcC5zdGFmZi5uYW1lXG4gICAgfSkpO1xuICAgIFxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihtYXBwZWQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIHBheXJvbGwnIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcbiAgICBjb25zdCB7IHN0YWZmSWQsIHBlcmlvZFN0YXJ0LCBwZXJpb2RFbmQsIGJvbnVzZXMsIGRlZHVjdGlvbnMgfSA9IGRhdGE7XG4gICAgXG4gICAgY29uc3Qgc3RhZmYgPSBhd2FpdCBwcmlzbWEuc3RhZmYuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiBzdGFmZklkIH0gfSk7XG4gICAgaWYgKCFzdGFmZikge1xuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1N0YWZmIG5vdCBmb3VuZCcgfSwgeyBzdGF0dXM6IDQwNCB9KTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgYmFzaWNTYWxhcnkgPSBzdGFmZi5zYWxhcnk7IC8vIEFzc3VtaW5nIG1vbnRobHkgc2FsYXJ5XG4gICAgY29uc3QgbmV0U2FsYXJ5ID0gYmFzaWNTYWxhcnkgKyAoYm9udXNlcyB8fCAwKSAtIChkZWR1Y3Rpb25zIHx8IDApO1xuICAgIFxuICAgIGNvbnN0IHBheXJvbGwgPSBhd2FpdCBwcmlzbWEucGF5cm9sbC5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBzdGFmZklkLFxuICAgICAgICBwYXlQZXJpb2RTdGFydDogbmV3IERhdGUocGVyaW9kU3RhcnQpLFxuICAgICAgICBwYXlQZXJpb2RFbmQ6IG5ldyBEYXRlKHBlcmlvZEVuZCksXG4gICAgICAgIHBheURhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgIGJhc2ljU2FsYXJ5LFxuICAgICAgICBib251c2VzOiBib251c2VzIHx8IDAsXG4gICAgICAgIGRlZHVjdGlvbnM6IGRlZHVjdGlvbnMgfHwgMCxcbiAgICAgICAgbmV0U2FsYXJ5LFxuICAgICAgICBzdGF0dXM6ICdwZW5kaW5nJyAvLyBEZWZhdWx0IHN0YXR1c1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihwYXlyb2xsKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ZhaWxlZCB0byBydW4gcGF5cm9sbCcgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIlByaXNtYUNsaWVudCIsInByaXNtYSIsIkdFVCIsInBheXJvbGxzIiwicGF5cm9sbCIsImZpbmRNYW55IiwiaW5jbHVkZSIsInN0YWZmIiwic2VsZWN0IiwibmFtZSIsImVtcGxveWVlSWQiLCJvcmRlckJ5IiwicGF5RGF0ZSIsIm1hcHBlZCIsIm1hcCIsInAiLCJzdGFmZk5hbWUiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJQT1NUIiwicmVxdWVzdCIsImRhdGEiLCJzdGFmZklkIiwicGVyaW9kU3RhcnQiLCJwZXJpb2RFbmQiLCJib251c2VzIiwiZGVkdWN0aW9ucyIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlkIiwiYmFzaWNTYWxhcnkiLCJzYWxhcnkiLCJuZXRTYWxhcnkiLCJjcmVhdGUiLCJwYXlQZXJpb2RTdGFydCIsIkRhdGUiLCJwYXlQZXJpb2RFbmQiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/payroll/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpayroll%2Froute&page=%2Fapi%2Fpayroll%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpayroll%2Froute.ts&appDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();