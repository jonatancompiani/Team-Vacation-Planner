export interface TeamMember {
  id: number;
  name: string;
  color: string;
  pictureUrl: string;
  vacations: Date[]
}

const COLORS = [
  "#E6B0AAAA",
  "#D7BDE2AA",
  "#AED6F1",
  "#D1F2EB",
  "#FCF3CF",
  "#FDEBD0",
  "#D7BDE2",
  "#D4E6F1",
  "#A2D9CE"
];

export class TeamMemberDataSource{
  data: TeamMember[] = [
    { id: 1, name: "Tsubasa",  color: COLORS[0], pictureUrl: "https://http.cat/404", vacations: [new Date(2023,0,1), new Date(2023,5,5), new Date(2023,5,6), new Date(2023,5,7), new Date(2023,5,9)] },
    { id: 2, name: "Calm Cat", color: COLORS[1], pictureUrl: "https://http.cat/420", vacations: [new Date(2023,7,14), new Date(2023,10,2), new Date(2023,10,3)] },
    { id: 3, name: "Alphonse", color: COLORS[2], pictureUrl: "https://http.cat/103", vacations: [new Date(2023,5,9), new Date(2023,5,12), new Date(2023,5,13), new Date(2023,5,14), new Date(2023,5,15 ), new Date(2023,5,16 )] },
    { id: 4, name: "Sakura",   color: COLORS[3], pictureUrl: "https://http.cat/207", vacations: [new Date(2023,7,14), new Date(2023,7,16)] },
    { id: 5, name: "Rick",     color: COLORS[4], pictureUrl: "https://http.cat/500", vacations: [new Date(2023,7,17), new Date(2023,7,18)] },
    { id: 6, name: "Lelouch",  color: COLORS[5], pictureUrl: "https://http.cat/500", vacations: [new Date(2023,3,24), new Date(2023,9,23), new Date(2023,9,24), new Date(2023,9,25), new Date(2023,9,26), new Date(2023,9,27) ]},
    { id: 7, name: "Batman",   color: COLORS[6], pictureUrl: "https://http.cat/500", vacations: [new Date(2023,3,24), new Date(2023,3,26), new Date(2023,3,27), new Date(2023,3,28)] },
    { id: 8, name: "Naruto",   color: COLORS[7], pictureUrl: "https://http.cat/500", vacations: [new Date(2023,11,26), new Date(2023,11,27), new Date(2023,11,28), new Date(2023,11,29)] },
    { id: 9, name: "Goku",     color: COLORS[8], pictureUrl: "https://http.cat/500", vacations: [new Date(2023,9,1), new Date(2023,9,23), new Date(2023,9,24), new Date(2023,9,25), new Date(2023,9,26), new Date(2023,9,27)] }
  ];
}