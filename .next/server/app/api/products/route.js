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
exports.id = "app/api/products/route";
exports.ids = ["app/api/products/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproducts%2Froute&page=%2Fapi%2Fproducts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2Froute.ts&appDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproducts%2Froute&page=%2Fapi%2Fproducts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2Froute.ts&appDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_rakzzm_Documents_Applications_Advakkad_POS_Application_src_app_api_products_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/products/route.ts */ \"(rsc)/./src/app/api/products/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"standalone\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/products/route\",\n        pathname: \"/api/products\",\n        filename: \"route\",\n        bundlePath: \"app/api/products/route\"\n    },\n    resolvedPagePath: \"/Users/rakzzm/Documents/Applications/Advakkad POS Application/src/app/api/products/route.ts\",\n    nextConfigOutput,\n    userland: _Users_rakzzm_Documents_Applications_Advakkad_POS_Application_src_app_api_products_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwcm9kdWN0cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcHJvZHVjdHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZwcm9kdWN0cyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnJha3p6bSUyRkRvY3VtZW50cyUyRkFwcGxpY2F0aW9ucyUyRkFkdmFra2FkJTIwUE9TJTIwQXBwbGljYXRpb24lMkZzcmMlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGcmFrenptJTJGRG9jdW1lbnRzJTJGQXBwbGljYXRpb25zJTJGQWR2YWtrYWQlMjBQT1MlMjBBcHBsaWNhdGlvbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD1zdGFuZGFsb25lJnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzJDO0FBQ3hIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvcmFrenptL0RvY3VtZW50cy9BcHBsaWNhdGlvbnMvQWR2YWtrYWQgUE9TIEFwcGxpY2F0aW9uL3NyYy9hcHAvYXBpL3Byb2R1Y3RzL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcInN0YW5kYWxvbmVcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcHJvZHVjdHMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9wcm9kdWN0c1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvcHJvZHVjdHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvcmFrenptL0RvY3VtZW50cy9BcHBsaWNhdGlvbnMvQWR2YWtrYWQgUE9TIEFwcGxpY2F0aW9uL3NyYy9hcHAvYXBpL3Byb2R1Y3RzL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproducts%2Froute&page=%2Fapi%2Fproducts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2Froute.ts&appDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "(rsc)/./src/app/api/products/route.ts":
/*!***************************************!*\
  !*** ./src/app/api/products/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n\n\nasync function GET() {\n    try {\n        const products = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.product.findMany({\n            orderBy: {\n                createdAt: 'desc'\n            }\n        });\n        // Map tags string to array for frontend compatibility\n        const productsWithTags = products.map((product)=>({\n                ...product,\n                tags: product.tags ? product.tags.split(',') : []\n            }));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(productsWithTags);\n    } catch (error) {\n        console.error('Error fetching products:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to fetch products'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        const product = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.product.create({\n            data: {\n                name: body.name,\n                description: body.description,\n                price: parseFloat(body.price),\n                category: body.category,\n                stock: parseInt(body.stock),\n                imageUrl: body.imageUrl || body.image_url,\n                sku: body.sku,\n                costPrice: body.cost_price ? parseFloat(body.cost_price) : undefined,\n                profitMargin: body.profit_margin ? parseFloat(body.profit_margin) : undefined,\n                tags: Array.isArray(body.tags) ? body.tags.join(',') : body.tags,\n                isFeatured: body.is_featured,\n                isAvailable: body.is_available\n            }\n        });\n        // Return with tags as array\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            ...product,\n            tags: product.tags ? product.tags.split(',') : []\n        });\n    } catch (error) {\n        console.error('Error creating product:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to create product'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9wcm9kdWN0cy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQzJDO0FBQ0U7QUFFdEMsZUFBZUU7SUFDcEIsSUFBSTtRQUNGLE1BQU1DLFdBQVcsTUFBTUYsK0NBQU1BLENBQUNHLE9BQU8sQ0FBQ0MsUUFBUSxDQUFDO1lBQzdDQyxTQUFTO2dCQUFFQyxXQUFXO1lBQU87UUFDL0I7UUFFQSxzREFBc0Q7UUFDdEQsTUFBTUMsbUJBQW1CTCxTQUFTTSxHQUFHLENBQUNMLENBQUFBLFVBQVk7Z0JBQ2hELEdBQUdBLE9BQU87Z0JBQ1ZNLE1BQU1OLFFBQVFNLElBQUksR0FBR04sUUFBUU0sSUFBSSxDQUFDQyxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ25EO1FBRUEsT0FBT1gscURBQVlBLENBQUNZLElBQUksQ0FBQ0o7SUFDM0IsRUFBRSxPQUFPSyxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyw0QkFBNEJBO1FBQzFDLE9BQU9iLHFEQUFZQSxDQUFDWSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUEyQixHQUFHO1lBQUVFLFFBQVE7UUFBSTtJQUNoRjtBQUNGO0FBRU8sZUFBZUMsS0FBS0MsT0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU1DLE9BQU8sTUFBTUQsUUFBUUwsSUFBSTtRQUMvQixNQUFNUixVQUFVLE1BQU1ILCtDQUFNQSxDQUFDRyxPQUFPLENBQUNlLE1BQU0sQ0FBQztZQUMxQ0MsTUFBTTtnQkFDSkMsTUFBTUgsS0FBS0csSUFBSTtnQkFDZkMsYUFBYUosS0FBS0ksV0FBVztnQkFDN0JDLE9BQU9DLFdBQVdOLEtBQUtLLEtBQUs7Z0JBQzVCRSxVQUFVUCxLQUFLTyxRQUFRO2dCQUN2QkMsT0FBT0MsU0FBU1QsS0FBS1EsS0FBSztnQkFDMUJFLFVBQVVWLEtBQUtVLFFBQVEsSUFBSVYsS0FBS1csU0FBUztnQkFDekNDLEtBQUtaLEtBQUtZLEdBQUc7Z0JBQ2JDLFdBQVdiLEtBQUtjLFVBQVUsR0FBR1IsV0FBV04sS0FBS2MsVUFBVSxJQUFJQztnQkFDM0RDLGNBQWNoQixLQUFLaUIsYUFBYSxHQUFHWCxXQUFXTixLQUFLaUIsYUFBYSxJQUFJRjtnQkFDcEV2QixNQUFNMEIsTUFBTUMsT0FBTyxDQUFDbkIsS0FBS1IsSUFBSSxJQUFJUSxLQUFLUixJQUFJLENBQUM0QixJQUFJLENBQUMsT0FBT3BCLEtBQUtSLElBQUk7Z0JBQ2hFNkIsWUFBWXJCLEtBQUtzQixXQUFXO2dCQUM1QkMsYUFBYXZCLEtBQUt3QixZQUFZO1lBQ2hDO1FBQ0Y7UUFFQSw0QkFBNEI7UUFDNUIsT0FBTzFDLHFEQUFZQSxDQUFDWSxJQUFJLENBQUM7WUFDdkIsR0FBR1IsT0FBTztZQUNWTSxNQUFNTixRQUFRTSxJQUFJLEdBQUdOLFFBQVFNLElBQUksQ0FBQ0MsS0FBSyxDQUFDLE9BQU8sRUFBRTtRQUNuRDtJQUNGLEVBQUUsT0FBT0UsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsMkJBQTJCQTtRQUN6QyxPQUFPYixxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBMkIsR0FBRztZQUFFRSxRQUFRO1FBQUk7SUFDaEY7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL3Jha3p6bS9Eb2N1bWVudHMvQXBwbGljYXRpb25zL0FkdmFra2FkIFBPUyBBcHBsaWNhdGlvbi9zcmMvYXBwL2FwaS9wcm9kdWN0cy9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJy4uLy4uLy4uL2xpYi9wcmlzbWEnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHByb2R1Y3RzID0gYXdhaXQgcHJpc21hLnByb2R1Y3QuZmluZE1hbnkoe1xuICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9XG4gICAgfSk7XG4gICAgXG4gICAgLy8gTWFwIHRhZ3Mgc3RyaW5nIHRvIGFycmF5IGZvciBmcm9udGVuZCBjb21wYXRpYmlsaXR5XG4gICAgY29uc3QgcHJvZHVjdHNXaXRoVGFncyA9IHByb2R1Y3RzLm1hcChwcm9kdWN0ID0+ICh7XG4gICAgICAuLi5wcm9kdWN0LFxuICAgICAgdGFnczogcHJvZHVjdC50YWdzID8gcHJvZHVjdC50YWdzLnNwbGl0KCcsJykgOiBbXVxuICAgIH0pKTtcbiAgICBcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24ocHJvZHVjdHNXaXRoVGFncyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgcHJvZHVjdHM6JywgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIHByb2R1Y3RzJyB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XG4gICAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IHByaXNtYS5wcm9kdWN0LmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIG5hbWU6IGJvZHkubmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGJvZHkuZGVzY3JpcHRpb24sXG4gICAgICAgIHByaWNlOiBwYXJzZUZsb2F0KGJvZHkucHJpY2UpLFxuICAgICAgICBjYXRlZ29yeTogYm9keS5jYXRlZ29yeSxcbiAgICAgICAgc3RvY2s6IHBhcnNlSW50KGJvZHkuc3RvY2spLFxuICAgICAgICBpbWFnZVVybDogYm9keS5pbWFnZVVybCB8fCBib2R5LmltYWdlX3VybCwgLy8gSGFuZGxlIGV4aXN0aW5nIHNuYWtlX2Nhc2UgdXNhZ2VcbiAgICAgICAgc2t1OiBib2R5LnNrdSxcbiAgICAgICAgY29zdFByaWNlOiBib2R5LmNvc3RfcHJpY2UgPyBwYXJzZUZsb2F0KGJvZHkuY29zdF9wcmljZSkgOiB1bmRlZmluZWQsXG4gICAgICAgIHByb2ZpdE1hcmdpbjogYm9keS5wcm9maXRfbWFyZ2luID8gcGFyc2VGbG9hdChib2R5LnByb2ZpdF9tYXJnaW4pIDogdW5kZWZpbmVkLFxuICAgICAgICB0YWdzOiBBcnJheS5pc0FycmF5KGJvZHkudGFncykgPyBib2R5LnRhZ3Muam9pbignLCcpIDogYm9keS50YWdzLFxuICAgICAgICBpc0ZlYXR1cmVkOiBib2R5LmlzX2ZlYXR1cmVkLFxuICAgICAgICBpc0F2YWlsYWJsZTogYm9keS5pc19hdmFpbGFibGVcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvLyBSZXR1cm4gd2l0aCB0YWdzIGFzIGFycmF5XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIC4uLnByb2R1Y3QsXG4gICAgICB0YWdzOiBwcm9kdWN0LnRhZ3MgPyBwcm9kdWN0LnRhZ3Muc3BsaXQoJywnKSA6IFtdXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgY3JlYXRpbmcgcHJvZHVjdDonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gY3JlYXRlIHByb2R1Y3QnIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJHRVQiLCJwcm9kdWN0cyIsInByb2R1Y3QiLCJmaW5kTWFueSIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJwcm9kdWN0c1dpdGhUYWdzIiwibWFwIiwidGFncyIsInNwbGl0IiwianNvbiIsImVycm9yIiwiY29uc29sZSIsInN0YXR1cyIsIlBPU1QiLCJyZXF1ZXN0IiwiYm9keSIsImNyZWF0ZSIsImRhdGEiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJwcmljZSIsInBhcnNlRmxvYXQiLCJjYXRlZ29yeSIsInN0b2NrIiwicGFyc2VJbnQiLCJpbWFnZVVybCIsImltYWdlX3VybCIsInNrdSIsImNvc3RQcmljZSIsImNvc3RfcHJpY2UiLCJ1bmRlZmluZWQiLCJwcm9maXRNYXJnaW4iLCJwcm9maXRfbWFyZ2luIiwiQXJyYXkiLCJpc0FycmF5Iiwiam9pbiIsImlzRmVhdHVyZWQiLCJpc19mZWF0dXJlZCIsImlzQXZhaWxhYmxlIiwiaXNfYXZhaWxhYmxlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/products/route.ts\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproducts%2Froute&page=%2Fapi%2Fproducts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2Froute.ts&appDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Frakzzm%2FDocuments%2FApplications%2FAdvakkad%20POS%20Application&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();