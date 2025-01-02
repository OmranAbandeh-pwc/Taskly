export interface TaskCardProps {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  subTitle: string;
  importance: string;
  imageName?: string;
  imageUrl?:string
}

export interface TaskCardsSectionProps {
  cards: TaskCardProps[];
  isLoading: boolean;
  noTasksFoundText: string;
}
