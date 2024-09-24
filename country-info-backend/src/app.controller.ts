import { Controller, Get, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { forkJoin, map, of, switchMap } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get('countries')
  getCountries() {
    return this.httpService
      .get(process.env.COUNTRIES_API)
      .pipe(map((response) => response.data));
  }

  @Get('countries/:code')
  getCountryInfo(@Param('code') code: string) {
    const borderCountries$ = this.httpService
      .get(`${process.env.COUNTRY_INFO_API}/${code}`)
      .pipe(map((response) => response.data));

    const flagUrl$ = this.httpService
      .get(process.env.FLAG_URL_API)
      .pipe(
        map((response) => {
          const countryFlag = response.data.data.find(
            (country) => country.iso2 === code,
          );
          return countryFlag
            ? { flag: countryFlag.flag, iso3: countryFlag.iso3 }
            : null;
        }),
      );

    const populationData$ = flagUrl$.pipe(
      switchMap((flagData) => {
        if (!flagData) return of(null);
        const iso3 = flagData.iso3;
        return this.httpService
          .get(process.env.POPULATION_DATA_API)
          .pipe(
            map((response) => {
              const countryData = response.data.data.find(
                (country) => country.code === iso3,
              );
              return countryData ? countryData.populationCounts : null;
            }),
          );
      }),
    );

    return forkJoin([borderCountries$, populationData$, flagUrl$]).pipe(
      map(([borderCountries, populationData, flagData]) => ({
        borderCountries,
        populationData,
        flagUrl: flagData ? flagData.flag : null,
      })),
    );
  }
}
