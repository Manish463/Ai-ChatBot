export interface Message {
  user: string;
  ai: string;
}

export interface Chat {
  _id: string;
  name: string;
  data: Message[];
}