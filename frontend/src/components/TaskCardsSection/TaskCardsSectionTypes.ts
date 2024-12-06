export interface TaskCardProps {
  id: number;
  date: string;
  title: string;
  description: string;
  dotColor: string;
}

export interface TaskCardsSectionProps {
  cards: TaskCardProps[];
}
