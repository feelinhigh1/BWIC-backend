import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  tableName: "contact_messages",
  timestamps: true,
})
export class ContactMessage extends Model<ContactMessage> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  investmentRange!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  propertyType!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  message?: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
