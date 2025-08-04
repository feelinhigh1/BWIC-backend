import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  HasMany,
} from "sequelize-typescript";
import { Property } from "@models/properties.model";

@Table({ tableName: "categories", timestamps: false })
export class Category extends Model<Category> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @AllowNull(false)
  @Unique
  @Column
  name!: string;

  @HasMany(() => Property)
  properties!: Property[];
}
