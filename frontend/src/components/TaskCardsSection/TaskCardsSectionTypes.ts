export interface TaskCardProps {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  subTitle: string;
  importance: string;
<<<<<<< HEAD
  imageName?: string;
  imageUrl?:string
=======
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
}

export interface TaskCardsSectionProps {
  cards: TaskCardProps[];
  isLoading: boolean;
  noTasksFoundText: string;
}
