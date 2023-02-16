export interface TeamMember {
  id: number;
  name: string;
  role: string | undefined;
  color: string;
  pictureUrl: string;
}

export class TeamMemberDataSource{
  data: TeamMember[] = [
    {id: 1, name: "Shiba Inu", role: "dog", color: "red", pictureUrl: "https://material.angular.io/assets/img/examples/shiba1.jpg"},
    {id: 2, name: "Calm Cat", role: "cat", color: "blue", pictureUrl: "https://http.cat/420"},
    {id: 3, name: "Tobi", role: "dunno", color: "gold", pictureUrl: "https://http.cat/103"},
    {id: 4, name: "Potatoes", role: "carrots", color: "green", pictureUrl: "https://http.cat/207"},
    {id: 5, name: "Test", role: "test 123", color: "magenta", pictureUrl: "https://http.cat/500"},
    {id: 5, name: "something", role: "once upon a time", color: "purple", pictureUrl: "https://http.cat/500"},
    {id: 5, name: "aaaa", role: "♥♦♣♠", color: "black", pictureUrl: "https://http.cat/500"}
  ];
}