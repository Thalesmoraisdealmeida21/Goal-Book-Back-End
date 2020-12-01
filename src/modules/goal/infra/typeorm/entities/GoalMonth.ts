import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('monthGoals')
class GoalMonth {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  pages: number;

  @Column()
  image: string;

  @Column()
  idGoogle: string;

  @Column()
  month: string;

  @Column()
  status: boolean;

  @Column()
  goalId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default GoalMonth;
