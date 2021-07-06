import { Entity, Column, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "todolist" }) //name refers to table name(model)
export class TodoList {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Index({ unique: false })
  @Column("varchar", { nullable: false })
  title: string = "";

  
  @Column("varchar", { nullable: false })
  description: string = "";
}
