import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { UserEntity } from 'src/entities/user.entity';
import { UserSignupDto } from 'src/dto/user-signup.dto';
import { UserLoginDto } from 'src/dto/user-login.dto';
dotenv.config();

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
    ) { }

    
    async signup(userSignupDto: UserSignupDto): Promise<any> {
        const { username, password } = userSignupDto;

        
        const usernameInUse = await this.userRepository.findOne({
            where: { username },
        });

        if (usernameInUse) {
            throw new BadRequestException('Username is already in use');
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = this.userRepository.create({
            username,
            password: hashedPassword,
        });
        try {
            await this.userRepository.save(newUser);
            return {
                message: 'User successfully registered',
                user: {
                    username: newUser.username,
                },
            };
        } catch (error) {
            throw new InternalServerErrorException('Error saving user');
        }
    }
    async login(userloginDto: UserLoginDto): Promise<any> {
        const { username, password } = userloginDto;

       
        const user = await this.userRepository.findOne({
            where: { username },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid password');
        }

        
        const payload = { username: user.username, userId: user.userId };
        const access_token = this.jwtService.sign(payload);

       
        return {
            userId: user.userId,
            username: user.username,
            access_token,
        };
    }

    
    async getAllUser(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { userId } });
    
        if (!user) {
          throw new NotFoundException(`User with ID ${userId} not found`);
        }
    
        return user;
      }
}
