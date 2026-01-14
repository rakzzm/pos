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
exports.id = "app/api/orders/route";
exports.ids = ["app/api/orders/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Forders%2Froute&page=%2Fapi%2Forders%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Forders%2Froute.ts&appDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Forders%2Froute&page=%2Fapi%2Forders%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Forders%2Froute.ts&appDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_rakzzm_Documents_Applications_Advakkad_POS_Application_src_app_api_orders_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/orders/route.ts */ \"(rsc)/./src/app/api/orders/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"standalone\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/orders/route\",\n        pathname: \"/api/orders\",\n        filename: \"route\",\n        bundlePath: \"app/api/orders/route\"\n    },\n    resolvedPagePath: \"/Users/rakzzm/Documents/Applications/Advakkad POS Application/src/app/api/orders/route.ts\",\n    nextConfigOutput,\n    userland: _Users_rakzzm_Documents_Applications_Advakkad_POS_Application_src_app_api_orders_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZvcmRlcnMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRm9yZGVycyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRm9yZGVycyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnJha3p6bSUyRkRvY3VtZW50cyUyRkFwcGxpY2F0aW9ucyUyRkFkdmFra2FkJTIwUE9TJTIwQXBwbGljYXRpb24lMkZzcmMlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGcmFrenptJTJGRG9jdW1lbnRzJTJGQXBwbGljYXRpb25zJTJGQWR2YWtrYWQlMjBQT1MlMjBBcHBsaWNhdGlvbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD1zdGFuZGFsb25lJnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3lDO0FBQ3RIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvcmFrenptL0RvY3VtZW50cy9BcHBsaWNhdGlvbnMvQWR2YWtrYWQgUE9TIEFwcGxpY2F0aW9uL3NyYy9hcHAvYXBpL29yZGVycy9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJzdGFuZGFsb25lXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL29yZGVycy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL29yZGVyc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvb3JkZXJzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL3Jha3p6bS9Eb2N1bWVudHMvQXBwbGljYXRpb25zL0FkdmFra2FkIFBPUyBBcHBsaWNhdGlvbi9zcmMvYXBwL2FwaS9vcmRlcnMvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Forders%2Froute&page=%2Fapi%2Forders%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Forders%2Froute.ts&appDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "(rsc)/./src/app/api/orders/route.ts":
/*!*************************************!*\
  !*** ./src/app/api/orders/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n\n\nasync function GET() {\n    try {\n        const orders = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.order.findMany({\n            include: {\n                items: true\n            },\n            orderBy: {\n                createdAt: 'desc'\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(orders);\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to fetch orders'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        // Create order with transaction to ensure items are created\n        const order = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.order.create({\n            data: {\n                orderNumber: body.orderNumber,\n                customerName: body.customerName,\n                memberId: body.memberId,\n                total: parseFloat(body.total),\n                subtotal: parseFloat(body.subtotal),\n                discount: parseFloat(body.discount || 0),\n                serviceTax: parseFloat(body.serviceTax || 0),\n                status: body.status || 'pending',\n                paymentMethod: body.paymentMethod,\n                date: new Date(),\n                couponCode: body.couponCode,\n                source: body.source || 'POS',\n                items: {\n                    create: body.items.map((item)=>({\n                            productId: item.productId || item.id,\n                            name: item.name,\n                            price: parseFloat(item.price),\n                            quantity: parseInt(item.quantity)\n                        }))\n                }\n            },\n            include: {\n                items: true\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(order);\n    } catch (error) {\n        console.error('Error creating order:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to create order'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9vcmRlcnMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUMyQztBQUNFO0FBRXRDLGVBQWVFO0lBQ3BCLElBQUk7UUFDRixNQUFNQyxTQUFTLE1BQU1GLCtDQUFNQSxDQUFDRyxLQUFLLENBQUNDLFFBQVEsQ0FBQztZQUN6Q0MsU0FBUztnQkFDUEMsT0FBTztZQUNUO1lBQ0FDLFNBQVM7Z0JBQUVDLFdBQVc7WUFBTztRQUMvQjtRQUNBLE9BQU9ULHFEQUFZQSxDQUFDVSxJQUFJLENBQUNQO0lBQzNCLEVBQUUsT0FBT1EsT0FBTztRQUNkLE9BQU9YLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF5QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUM5RTtBQUNGO0FBRU8sZUFBZUMsS0FBS0MsT0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU1DLE9BQU8sTUFBTUQsUUFBUUosSUFBSTtRQUUvQiw0REFBNEQ7UUFDNUQsTUFBTU4sUUFBUSxNQUFNSCwrQ0FBTUEsQ0FBQ0csS0FBSyxDQUFDWSxNQUFNLENBQUM7WUFDdENDLE1BQU07Z0JBQ0pDLGFBQWFILEtBQUtHLFdBQVc7Z0JBQzdCQyxjQUFjSixLQUFLSSxZQUFZO2dCQUMvQkMsVUFBVUwsS0FBS0ssUUFBUTtnQkFDdkJDLE9BQU9DLFdBQVdQLEtBQUtNLEtBQUs7Z0JBQzVCRSxVQUFVRCxXQUFXUCxLQUFLUSxRQUFRO2dCQUNsQ0MsVUFBVUYsV0FBV1AsS0FBS1MsUUFBUSxJQUFJO2dCQUN0Q0MsWUFBWUgsV0FBV1AsS0FBS1UsVUFBVSxJQUFJO2dCQUMxQ2IsUUFBUUcsS0FBS0gsTUFBTSxJQUFJO2dCQUN2QmMsZUFBZVgsS0FBS1csYUFBYTtnQkFDakNDLE1BQU0sSUFBSUM7Z0JBQ1ZDLFlBQVlkLEtBQUtjLFVBQVU7Z0JBQzNCQyxRQUFRZixLQUFLZSxNQUFNLElBQUk7Z0JBQ3ZCdkIsT0FBTztvQkFDTFMsUUFBUUQsS0FBS1IsS0FBSyxDQUFDd0IsR0FBRyxDQUFDLENBQUNDLE9BQWU7NEJBQ3JDQyxXQUFXRCxLQUFLQyxTQUFTLElBQUlELEtBQUtFLEVBQUU7NEJBQ3BDQyxNQUFNSCxLQUFLRyxJQUFJOzRCQUNmQyxPQUFPZCxXQUFXVSxLQUFLSSxLQUFLOzRCQUM1QkMsVUFBVUMsU0FBU04sS0FBS0ssUUFBUTt3QkFDbEM7Z0JBQ0Y7WUFDRjtZQUNBL0IsU0FBUztnQkFDUEMsT0FBTztZQUNUO1FBQ0Y7UUFFQSxPQUFPUCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDTjtJQUMzQixFQUFFLE9BQU9PLE9BQU87UUFDZDRCLFFBQVE1QixLQUFLLENBQUMseUJBQXlCQTtRQUN2QyxPQUFPWCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBeUIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDOUU7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL3Jha3p6bS9Eb2N1bWVudHMvQXBwbGljYXRpb25zL0FkdmFra2FkIFBPUyBBcHBsaWNhdGlvbi9zcmMvYXBwL2FwaS9vcmRlcnMvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tICcuLi8uLi8uLi9saWIvcHJpc21hJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBvcmRlcnMgPSBhd2FpdCBwcmlzbWEub3JkZXIuZmluZE1hbnkoe1xuICAgICAgaW5jbHVkZToge1xuICAgICAgICBpdGVtczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogJ2Rlc2MnIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKG9yZGVycyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gZmV0Y2ggb3JkZXJzJyB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XG4gICAgXG4gICAgLy8gQ3JlYXRlIG9yZGVyIHdpdGggdHJhbnNhY3Rpb24gdG8gZW5zdXJlIGl0ZW1zIGFyZSBjcmVhdGVkXG4gICAgY29uc3Qgb3JkZXIgPSBhd2FpdCBwcmlzbWEub3JkZXIuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgb3JkZXJOdW1iZXI6IGJvZHkub3JkZXJOdW1iZXIsXG4gICAgICAgIGN1c3RvbWVyTmFtZTogYm9keS5jdXN0b21lck5hbWUsXG4gICAgICAgIG1lbWJlcklkOiBib2R5Lm1lbWJlcklkLFxuICAgICAgICB0b3RhbDogcGFyc2VGbG9hdChib2R5LnRvdGFsKSxcbiAgICAgICAgc3VidG90YWw6IHBhcnNlRmxvYXQoYm9keS5zdWJ0b3RhbCksXG4gICAgICAgIGRpc2NvdW50OiBwYXJzZUZsb2F0KGJvZHkuZGlzY291bnQgfHwgMCksXG4gICAgICAgIHNlcnZpY2VUYXg6IHBhcnNlRmxvYXQoYm9keS5zZXJ2aWNlVGF4IHx8IDApLFxuICAgICAgICBzdGF0dXM6IGJvZHkuc3RhdHVzIHx8ICdwZW5kaW5nJyxcbiAgICAgICAgcGF5bWVudE1ldGhvZDogYm9keS5wYXltZW50TWV0aG9kLFxuICAgICAgICBkYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICBjb3Vwb25Db2RlOiBib2R5LmNvdXBvbkNvZGUsXG4gICAgICAgIHNvdXJjZTogYm9keS5zb3VyY2UgfHwgJ1BPUycsXG4gICAgICAgIGl0ZW1zOiB7XG4gICAgICAgICAgY3JlYXRlOiBib2R5Lml0ZW1zLm1hcCgoaXRlbTogYW55KSA9PiAoe1xuICAgICAgICAgICAgcHJvZHVjdElkOiBpdGVtLnByb2R1Y3RJZCB8fCBpdGVtLmlkLCAvLyBIYW5kbGUgcG90ZW50aWFsIElEIG1pc21hdGNoXG4gICAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXG4gICAgICAgICAgICBwcmljZTogcGFyc2VGbG9hdChpdGVtLnByaWNlKSxcbiAgICAgICAgICAgIHF1YW50aXR5OiBwYXJzZUludChpdGVtLnF1YW50aXR5KVxuICAgICAgICAgIH0pKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW5jbHVkZToge1xuICAgICAgICBpdGVtczogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKG9yZGVyKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjcmVhdGluZyBvcmRlcjonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gY3JlYXRlIG9yZGVyJyB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicHJpc21hIiwiR0VUIiwib3JkZXJzIiwib3JkZXIiLCJmaW5kTWFueSIsImluY2x1ZGUiLCJpdGVtcyIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJQT1NUIiwicmVxdWVzdCIsImJvZHkiLCJjcmVhdGUiLCJkYXRhIiwib3JkZXJOdW1iZXIiLCJjdXN0b21lck5hbWUiLCJtZW1iZXJJZCIsInRvdGFsIiwicGFyc2VGbG9hdCIsInN1YnRvdGFsIiwiZGlzY291bnQiLCJzZXJ2aWNlVGF4IiwicGF5bWVudE1ldGhvZCIsImRhdGUiLCJEYXRlIiwiY291cG9uQ29kZSIsInNvdXJjZSIsIm1hcCIsIml0ZW0iLCJwcm9kdWN0SWQiLCJpZCIsIm5hbWUiLCJwcmljZSIsInF1YW50aXR5IiwicGFyc2VJbnQiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/orders/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\n// Prevent multiple instances of Prisma Client in development\nconsole.log(\"Initializing Prisma Client with URL:\", process.env.DATABASE_URL);\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFDOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUV4Qiw2REFBNkQ7QUFDN0RDLFFBQVFDLEdBQUcsQ0FBQyx3Q0FBd0NDLFFBQVFDLEdBQUcsQ0FBQ0MsWUFBWTtBQUNyRSxNQUFNQyxTQUFTUCxnQkFBZ0JPLE1BQU0sSUFBSSxJQUFJUix3REFBWUEsR0FBRztBQUVuRSxJQUFJSyxJQUFxQyxFQUFFSixnQkFBZ0JPLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy9yYWt6em0vRG9jdW1lbnRzL0FwcGxpY2F0aW9ucy9BZHZha2thZCBQT1MgQXBwbGljYXRpb24vc3JjL2xpYi9wcmlzbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7IHByaXNtYTogUHJpc21hQ2xpZW50IH07XG5cbi8vIFByZXZlbnQgbXVsdGlwbGUgaW5zdGFuY2VzIG9mIFByaXNtYSBDbGllbnQgaW4gZGV2ZWxvcG1lbnRcbmNvbnNvbGUubG9nKFwiSW5pdGlhbGl6aW5nIFByaXNtYSBDbGllbnQgd2l0aCBVUkw6XCIsIHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCk7XG5leHBvcnQgY29uc3QgcHJpc21hID0gZ2xvYmFsRm9yUHJpc21hLnByaXNtYSB8fCBuZXcgUHJpc21hQ2xpZW50KCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsImVudiIsIkRBVEFCQVNFX1VSTCIsInByaXNtYSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Forders%2Froute&page=%2Fapi%2Forders%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Forders%2Froute.ts&appDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();