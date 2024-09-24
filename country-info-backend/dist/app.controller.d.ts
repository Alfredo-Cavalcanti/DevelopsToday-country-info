import { HttpService } from '@nestjs/axios';
export declare class AppController {
    private readonly httpService;
    constructor(httpService: HttpService);
    getCountries(): import("rxjs").Observable<any>;
    getCountryInfo(code: string): import("rxjs").Observable<{
        borderCountries: any;
        populationData: any;
        flagUrl: any;
    }>;
}
