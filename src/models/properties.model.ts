import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

import { Category } from "./category.model";

@Table({ tableName: "properties" })
export class Property extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id?: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  categoryId!: number;

  @BelongsTo(() => Category)
  category!: Category;

  @Column({ type: DataType.STRING, allowNull: false })
  location!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  price!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  roi!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  status!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  area!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  areaNepali?: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  distanceFromHighway?: number;

  @Column({ type: DataType.JSON, allowNull: false, defaultValue: [] })
  images!: string[];

  @Column({ type: DataType.TEXT, allowNull: false })
  description!: string;
}
