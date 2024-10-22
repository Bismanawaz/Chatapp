import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { MessageEntity } from "./message.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([MessageEntity]),
  ],

  exports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([MessageEntity]),
  ],
})
export class EntityModule { }