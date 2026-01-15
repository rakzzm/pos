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
exports.id = "app/api/staff/route";
exports.ids = ["app/api/staff/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstaff%2Froute&page=%2Fapi%2Fstaff%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstaff%2Froute.ts&appDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstaff%2Froute&page=%2Fapi%2Fstaff%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstaff%2Froute.ts&appDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_rakzzm_Documents_Applications_Advakkad_POS_Application_src_app_api_staff_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/staff/route.ts */ \"(rsc)/./src/app/api/staff/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"standalone\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/staff/route\",\n        pathname: \"/api/staff\",\n        filename: \"route\",\n        bundlePath: \"app/api/staff/route\"\n    },\n    resolvedPagePath: \"/Users/rakzzm/Documents/Applications/Advakkad POS Application/src/app/api/staff/route.ts\",\n    nextConfigOutput,\n    userland: _Users_rakzzm_Documents_Applications_Advakkad_POS_Application_src_app_api_staff_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzdGFmZiUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGc3RhZmYlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZzdGFmZiUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnJha3p6bSUyRkRvY3VtZW50cyUyRkFwcGxpY2F0aW9ucyUyRkFkdmFra2FkJTIwUE9TJTIwQXBwbGljYXRpb24lMkZzcmMlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGcmFrenptJTJGRG9jdW1lbnRzJTJGQXBwbGljYXRpb25zJTJGQWR2YWtrYWQlMjBQT1MlMjBBcHBsaWNhdGlvbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD1zdGFuZGFsb25lJnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3dDO0FBQ3JIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvcmFrenptL0RvY3VtZW50cy9BcHBsaWNhdGlvbnMvQWR2YWtrYWQgUE9TIEFwcGxpY2F0aW9uL3NyYy9hcHAvYXBpL3N0YWZmL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcInN0YW5kYWxvbmVcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvc3RhZmYvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9zdGFmZlwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvc3RhZmYvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvcmFrenptL0RvY3VtZW50cy9BcHBsaWNhdGlvbnMvQWR2YWtrYWQgUE9TIEFwcGxpY2F0aW9uL3NyYy9hcHAvYXBpL3N0YWZmL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstaff%2Froute&page=%2Fapi%2Fstaff%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstaff%2Froute.ts&appDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "(rsc)/./src/app/api/staff/route.ts":
/*!************************************!*\
  !*** ./src/app/api/staff/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_1__.PrismaClient();\nasync function GET() {\n    try {\n        const staff = await prisma.staff.findMany({\n            include: {\n                leaveRequests: true,\n                payrollRecords: true\n            },\n            orderBy: {\n                createdAt: 'desc'\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(staff);\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to fetch staff'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const data = await request.json();\n        // Auto-generate employee ID\n        const count = await prisma.staff.count();\n        const employeeId = `EMP${String(count + 1).padStart(3, '0')}`;\n        const staff = await prisma.staff.create({\n            data: {\n                employeeId,\n                name: data.name,\n                email: data.email,\n                phone: data.phone,\n                position: data.position,\n                department: data.department || 'General',\n                hireDate: new Date(data.hireDate),\n                salary: parseFloat(data.salary),\n                status: data.status || 'active',\n                leaveBalanceAnnual: 14,\n                leaveBalanceSick: 14,\n                leaveBalancePersonal: 7,\n                performanceRating: 0,\n                lastReview: undefined\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(staff);\n    } catch (error) {\n        console.error(error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to create staff'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9zdGFmZi9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEyQztBQUNHO0FBRTlDLE1BQU1FLFNBQVMsSUFBSUQsd0RBQVlBO0FBRXhCLGVBQWVFO0lBQ3BCLElBQUk7UUFDRixNQUFNQyxRQUFRLE1BQU1GLE9BQU9FLEtBQUssQ0FBQ0MsUUFBUSxDQUFDO1lBQ3hDQyxTQUFTO2dCQUNQQyxlQUFlO2dCQUNmQyxnQkFBZ0I7WUFDbEI7WUFDQUMsU0FBUztnQkFDUEMsV0FBVztZQUNiO1FBQ0Y7UUFDQSxPQUFPVixxREFBWUEsQ0FBQ1csSUFBSSxDQUFDUDtJQUMzQixFQUFFLE9BQU9RLE9BQU87UUFDZCxPQUFPWixxREFBWUEsQ0FBQ1csSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBd0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDN0U7QUFDRjtBQUVPLGVBQWVDLEtBQUtDLE9BQWdCO0lBQ3pDLElBQUk7UUFDRixNQUFNQyxPQUFPLE1BQU1ELFFBQVFKLElBQUk7UUFFL0IsNEJBQTRCO1FBQzVCLE1BQU1NLFFBQVEsTUFBTWYsT0FBT0UsS0FBSyxDQUFDYSxLQUFLO1FBQ3RDLE1BQU1DLGFBQWEsQ0FBQyxHQUFHLEVBQUVDLE9BQU9GLFFBQVEsR0FBR0csUUFBUSxDQUFDLEdBQUcsTUFBTTtRQUU3RCxNQUFNaEIsUUFBUSxNQUFNRixPQUFPRSxLQUFLLENBQUNpQixNQUFNLENBQUM7WUFDdENMLE1BQU07Z0JBQ0pFO2dCQUNBSSxNQUFNTixLQUFLTSxJQUFJO2dCQUNmQyxPQUFPUCxLQUFLTyxLQUFLO2dCQUNqQkMsT0FBT1IsS0FBS1EsS0FBSztnQkFDakJDLFVBQVVULEtBQUtTLFFBQVE7Z0JBQ3ZCQyxZQUFZVixLQUFLVSxVQUFVLElBQUk7Z0JBQy9CQyxVQUFVLElBQUlDLEtBQUtaLEtBQUtXLFFBQVE7Z0JBQ2hDRSxRQUFRQyxXQUFXZCxLQUFLYSxNQUFNO2dCQUM5QmhCLFFBQVFHLEtBQUtILE1BQU0sSUFBSTtnQkFDdkJrQixvQkFBb0I7Z0JBQ3BCQyxrQkFBa0I7Z0JBQ2xCQyxzQkFBc0I7Z0JBQ3RCQyxtQkFBbUI7Z0JBQ25CQyxZQUFZQztZQUNkO1FBQ0Y7UUFDQSxPQUFPcEMscURBQVlBLENBQUNXLElBQUksQ0FBQ1A7SUFDM0IsRUFBRSxPQUFPUSxPQUFPO1FBQ2R5QixRQUFRekIsS0FBSyxDQUFDQTtRQUNkLE9BQU9aLHFEQUFZQSxDQUFDVyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF5QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUM5RTtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvcmFrenptL0RvY3VtZW50cy9BcHBsaWNhdGlvbnMvQWR2YWtrYWQgUE9TIEFwcGxpY2F0aW9uL3NyYy9hcHAvYXBpL3N0YWZmL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcblxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHN0YWZmID0gYXdhaXQgcHJpc21hLnN0YWZmLmZpbmRNYW55KHtcbiAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgbGVhdmVSZXF1ZXN0czogdHJ1ZSxcbiAgICAgICAgcGF5cm9sbFJlY29yZHM6IHRydWVcbiAgICAgIH0sXG4gICAgICBvcmRlckJ5OiB7XG4gICAgICAgIGNyZWF0ZWRBdDogJ2Rlc2MnLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oc3RhZmYpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIHN0YWZmJyB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XG4gICAgXG4gICAgLy8gQXV0by1nZW5lcmF0ZSBlbXBsb3llZSBJRFxuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgcHJpc21hLnN0YWZmLmNvdW50KCk7XG4gICAgY29uc3QgZW1wbG95ZWVJZCA9IGBFTVAke1N0cmluZyhjb3VudCArIDEpLnBhZFN0YXJ0KDMsICcwJyl9YDtcbiAgICBcbiAgICBjb25zdCBzdGFmZiA9IGF3YWl0IHByaXNtYS5zdGFmZi5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBlbXBsb3llZUlkLFxuICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgIGVtYWlsOiBkYXRhLmVtYWlsLFxuICAgICAgICBwaG9uZTogZGF0YS5waG9uZSxcbiAgICAgICAgcG9zaXRpb246IGRhdGEucG9zaXRpb24sXG4gICAgICAgIGRlcGFydG1lbnQ6IGRhdGEuZGVwYXJ0bWVudCB8fCAnR2VuZXJhbCcsXG4gICAgICAgIGhpcmVEYXRlOiBuZXcgRGF0ZShkYXRhLmhpcmVEYXRlKSxcbiAgICAgICAgc2FsYXJ5OiBwYXJzZUZsb2F0KGRhdGEuc2FsYXJ5KSxcbiAgICAgICAgc3RhdHVzOiBkYXRhLnN0YXR1cyB8fCAnYWN0aXZlJyxcbiAgICAgICAgbGVhdmVCYWxhbmNlQW5udWFsOiAxNCxcbiAgICAgICAgbGVhdmVCYWxhbmNlU2ljazogMTQsXG4gICAgICAgIGxlYXZlQmFsYW5jZVBlcnNvbmFsOiA3LFxuICAgICAgICBwZXJmb3JtYW5jZVJhdGluZzogMCxcbiAgICAgICAgbGFzdFJldmlldzogdW5kZWZpbmVkXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihzdGFmZik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gY3JlYXRlIHN0YWZmJyB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiUHJpc21hQ2xpZW50IiwicHJpc21hIiwiR0VUIiwic3RhZmYiLCJmaW5kTWFueSIsImluY2x1ZGUiLCJsZWF2ZVJlcXVlc3RzIiwicGF5cm9sbFJlY29yZHMiLCJvcmRlckJ5IiwiY3JlYXRlZEF0IiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiUE9TVCIsInJlcXVlc3QiLCJkYXRhIiwiY291bnQiLCJlbXBsb3llZUlkIiwiU3RyaW5nIiwicGFkU3RhcnQiLCJjcmVhdGUiLCJuYW1lIiwiZW1haWwiLCJwaG9uZSIsInBvc2l0aW9uIiwiZGVwYXJ0bWVudCIsImhpcmVEYXRlIiwiRGF0ZSIsInNhbGFyeSIsInBhcnNlRmxvYXQiLCJsZWF2ZUJhbGFuY2VBbm51YWwiLCJsZWF2ZUJhbGFuY2VTaWNrIiwibGVhdmVCYWxhbmNlUGVyc29uYWwiLCJwZXJmb3JtYW5jZVJhdGluZyIsImxhc3RSZXZpZXciLCJ1bmRlZmluZWQiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/staff/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstaff%2Froute&page=%2Fapi%2Fstaff%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstaff%2Froute.ts&appDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();