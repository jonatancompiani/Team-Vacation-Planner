export interface Holiday {
  date: Date;
  description: string;
  country: string;
}

export class HolidayDataSource{
  data: Holiday[] = [
    {country: "PT", date: new Date(2023, 0,  1 ), description: "New Year"},
    {country: "PT", date: new Date(2023, 3,  7 ), description: "Good Friday"},
    {country: "PT", date: new Date(2023, 3,  9 ), description: "Easter Sunday"},
    {country: "PT", date: new Date(2023, 3,  25), description: "Liberty Day"},
    {country: "PT", date: new Date(2023, 4,  1 ), description: "Labor Day"},
    {country: "PT", date: new Date(2023, 5,  8 ), description: "Corpus Christi"},
    {country: "PT", date: new Date(2023, 5,  10), description: "Portugal Day"},
    {country: "PT", date: new Date(2023, 7,  15), description: "Assumption of Mary"},
    {country: "PT", date: new Date(2023, 9,  5 ), description: "Republic Day"},
    {country: "PT", date: new Date(2023, 10, 1 ), description: "All Saints' Day"},
    {country: "PT", date: new Date(2023, 11, 1 ), description: "Restoration of Independence"},
    {country: "PT", date: new Date(2023, 11, 8 ), description: "Feast of the Immaculate Conception"},
    {country: "PT", date: new Date(2023, 11, 25), description: "Christmas Day"}
  ];
}