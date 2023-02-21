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
];

export class TeamMemberDataSource{
  data: TeamMember[] = [
    { id: 1, name: "Tsubasa",  color: COLORS[0], pictureUrl: "https://http.cat/404", vacations: [new Date(2023,0,1 )] },
    { id: 2, name: "Calm Cat", color: COLORS[1], pictureUrl: "https://http.cat/420", vacations: [new Date(2023,2,8 )] },
    { id: 3, name: "Alphonse", color: COLORS[2], pictureUrl: "https://http.cat/103", vacations: [new Date(2023,2,8 )] },
    { id: 4, name: "Sakura",   color: COLORS[3], pictureUrl: "https://http.cat/207", vacations: [new Date(2023,2,9 )] },
    { id: 5, name: "Rick",     color: COLORS[4], pictureUrl: "https://http.cat/500", vacations: [new Date(2023,2,10)] },
    { id: 6, name: "Lelouch",  color: COLORS[5], pictureUrl: "https://http.cat/500", vacations: [new Date(2023,2,13)] },
    { id: 7, name: "Batman",   color: COLORS[6], pictureUrl: "https://http.cat/500", vacations: [new Date(2023,2,14)] },
    { id: 8, name: "Naruto",   color: COLORS[7], pictureUrl: "https://http.cat/500", vacations: [new Date(2023,2,15)] },
    { id: 9, name: "Goku",     color: COLORS[8], pictureUrl: "https://http.cat/500", vacations: [new Date(2023,9,1), new Date(2023,2,8 )] }
  ];
}