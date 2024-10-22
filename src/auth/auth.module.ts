import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModules } from 'src/passport/passport.module';
import * as dotenv from 'dotenv';
import { EntityModule } from 'src/entities/entity.module';
import { UserEntity } from 'src/entities/user.entity';


dotenv.config();

@Module({
    imports: [
        EntityModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '100d',
            },
        }),
        TypeOrmModule.forFeature([UserEntity]),
        PassportModules,
        AuthModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService,TypeOrmModule],
})
export class AuthModule { }



