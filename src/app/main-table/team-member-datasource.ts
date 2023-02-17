export interface TeamMember {
  id: number;
  name: string;
  color: string;
  pictureUrl: string;
  vacations: Date[]
}

const COLORS = [
"#fdfd96",
"#ff9688",
"#77dd77",
"#84b6f4",
"#c7f7f7",
"#d8af97",
"#fdcae1",
"#c0a0c3",
"#cfffca"
]

export class TeamMemberDataSource{
  data: TeamMember[] = [
    {id: 1, name: "Shiba Inu",  color: COLORS[0], vacations: [new Date(2023,0,1 )], pictureUrl: "https://material.angular.io/assets/img/examples/shiba1.jpg"},
    {id: 2, name: "Calm Cat",   color: COLORS[1], vacations: [new Date(2023,2,7 )], pictureUrl: "https://http.cat/420"},
    {id: 3, name: "Tobi",       color: COLORS[2], vacations: [new Date(2023,2,8 )], pictureUrl: "https://http.cat/103"},
    {id: 4, name: "Potatoes",   color: COLORS[3], vacations: [new Date(2023,2,9 )], pictureUrl: "https://http.cat/207"},
    {id: 5, name: "Test",       color: COLORS[4], vacations: [new Date(2023,2,10)], pictureUrl: "https://http.cat/500"},
    {id: 5, name: "something",  color: COLORS[5], vacations: [new Date(2023,2,13)], pictureUrl: "https://http.cat/500"},
    {id: 5, name: "aaaa",       color: COLORS[6], vacations: [new Date(2023,2,14)], pictureUrl: "https://http.cat/500"},
    {id: 5, name: "aaaa",       color: COLORS[7], vacations: [new Date(2023,2,15)], pictureUrl: "https://http.cat/500"},
    {id: 5, name: "aaaa",       color: COLORS[8], vacations: [new Date(2023,2,16)], pictureUrl: "https://http.cat/500"}
  ];
}