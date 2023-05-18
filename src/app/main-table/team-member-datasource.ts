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
  "#E6CEAA",
  "#FCF3CF",
  "#FDEBD0",
  "#D7BDE2",
  "#D4E6F1",
  "#A2D9CE"
];

export class TeamMemberDataSource{
  data: TeamMember[] = [
    { 
      id: 1, 
      name: "Murilo",  
      color: COLORS[0], 
      pictureUrl: "https://http.cat/200", 
      vacations: 
      [
        new Date(2023,7,23), 
        new Date(2023,7,24), 
        new Date(2023,7,25), 
        new Date(2023,7,28), 
        new Date(2023,7,29), 
        new Date(2023,7,30), 
        new Date(2023,7,31), 
        new Date(2023,8,1), 
        new Date(2023,8,4), 
        new Date(2023,8,5), 
      ] 
    },
    
    { 
      id: 2, 
      name: "Jonatan", 
      color: COLORS[1], 
      pictureUrl: "https://http.cat/200", 
      vacations: 
      [
        new Date(2023,7,28), 
        new Date(2023,7,29), 
        new Date(2023,7,30), 
        new Date(2023,7,31), 
        new Date(2023,8,1), 
        new Date(2023,8,4), 
        new Date(2023,8,5), 
        new Date(2023,8,6), 
        new Date(2023,8,7), 
        new Date(2023,8,8), 
      ] 
    },

    { 
      id: 3, 
      name: "Luis",
      color: COLORS[2], 
      pictureUrl: "https://http.cat/200", 
      vacations: 
      [
        new Date(2023,5,19), 
        new Date(2023,5,20), 
        new Date(2023,5,21), 
        new Date(2023,5,22), 
        new Date(2023,5,23), 
        new Date(2023,5,26), 
        new Date(2023,5,27), 
        new Date(2023,5,28), 
        new Date(2023,5,29), 
        new Date(2023,5,30), 

        new Date(2023,7,17), 
        new Date(2023,7,18), 

        new Date(2023,9,6), 

        new Date(2023,11,26), 
        new Date(2023,11,27), 
        new Date(2023,11,28), 
        new Date(2023,11,29)
      ] 
    },

    { 
      id: 4, 
      name: "Cesar",   
      color: COLORS[3], 
      pictureUrl: "https://http.cat/200", 
      vacations: 
      [
        new Date(2023,8,1),

        new Date(2023,9,25),
        new Date(2023,9,26),
        new Date(2023,9,27),
        new Date(2023,9,30),
        new Date(2023,9,31),
        
        new Date(2023,10,2),
        new Date(2023,10,3),
        new Date(2023,10,6),
        new Date(2023,10,7),
        new Date(2023,10,8),
      ] 
    },
    
    { 
      id: 5, 
      name: "Vasco",
      color: COLORS[4],
      pictureUrl: "https://http.cat/200",
      vacations:
      [
        new Date(2023,3,24), // 24/04

        new Date(2023,5,9), // 09/06

        new Date(2023,6,3), // 03/07 a 07/07
        new Date(2023,6,3), 
        new Date(2023,6,4), 
        new Date(2023,6,5), 
        new Date(2023,6,6), 
        new Date(2023,6,7), 

        new Date(2023,7,28), // 28/08 a 08/09
        new Date(2023,7,29), 
        new Date(2023,7,30), 
        new Date(2023,7,31), 
        new Date(2023,8,1), 
        
        new Date(2023,8,4), 
        new Date(2023,8,5), 
        new Date(2023,8,6), 
        new Date(2023,8,7), 
        new Date(2023,8,8), 

        new Date(2023,9,6), // 06/10
        
        new Date(2023,9,26), // 26/10 e 27/10
        new Date(2023,9,27), 
        
        new Date(2023,11,26), // 26/12 e 29/12
        new Date(2023,11,29),
      ]},

    { 
      id: 6, 
      name: "André",   
      color: COLORS[8], 
      pictureUrl: "https://http.cat/200", 
      vacations: 
      [
        new Date(2023,5,5),
        new Date(2023,5,6),
        new Date(2023,5,7),
        new Date(2023,5,9),
        new Date(2023,5,12),
        new Date(2023,5,13),
        new Date(2023,5,14),
        new Date(2023,5,15),
        new Date(2023,5,16),
        new Date(2023,5,19)
      ] 
    }
  ];
}