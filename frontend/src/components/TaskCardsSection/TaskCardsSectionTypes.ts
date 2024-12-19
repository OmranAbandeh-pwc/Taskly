export interface TaskCardProps {
  id: number;
  date?: string;
  title: string;
  subTitle: string;
  importance: string;
}

export interface TaskCardsSectionProps {
  cards: TaskCardProps[];
}
