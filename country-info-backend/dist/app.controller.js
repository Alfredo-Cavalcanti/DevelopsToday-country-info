"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let AppController = class AppController {
    constructor(httpService) {
        this.httpService = httpService;
    }
    getCountries() {
        return this.httpService
            .get(process.env.COUNTRIES_API)
            .pipe((0, rxjs_1.map)((response) => response.data));
    }
    getCountryInfo(code) {
        const borderCountries$ = this.httpService
            .get(`${process.env.COUNTRY_INFO_API}/${code}`)
            .pipe((0, rxjs_1.map)((response) => response.data));
        const flagUrl$ = this.httpService
            .get(process.env.FLAG_URL_API)
            .pipe((0, rxjs_1.map)((response) => {
            const countryFlag = response.data.data.find((country) => country.iso2 === code);
            return countryFlag
                ? { flag: countryFlag.flag, iso3: countryFlag.iso3 }
                : null;
        }));
        const populationData$ = flagUrl$.pipe((0, rxjs_1.switchMap)((flagData) => {
            if (!flagData)
                return (0, rxjs_1.of)(null);
            const iso3 = flagData.iso3;
            return this.httpService
                .get(process.env.POPULATION_DATA_API)
                .pipe((0, rxjs_1.map)((response) => {
                const countryData = response.data.data.find((country) => country.code === iso3);
                return countryData ? countryData.populationCounts : null;
            }));
        }));
        return (0, rxjs_1.forkJoin)([borderCountries$, populationData$, flagUrl$]).pipe((0, rxjs_1.map)(([borderCountries, populationData, flagData]) => ({
            borderCountries,
            populationData,
            flagUrl: flagData ? flagData.flag : null,
        })));
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('countries'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCountries", null);
__decorate([
    (0, common_1.Get)('countries/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCountryInfo", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppController);
//# sourceMappingURL=app.controller.js.map