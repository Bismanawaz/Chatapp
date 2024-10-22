import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WsJwtGuard } from 'src/guards/ws-jwt.gaurd';
import { UserSignupDto } from 'src/dto/user-signup.dto';
import { UserLoginDto } from 'src/dto/user-login.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.gaurd';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  

  @Post('signup')
  async signup(@Body() userSignupDto: UserSignupDto): Promise<any> {
    try {
      
      const result = await this.authService.signup(userSignupDto);
      return { success: true, data: result };
    } catch (error) {
      console.error('Signup Error:', error);
      return { success: false, message: 'Failed to signup' };
    }
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })

  async login(@Body() userloginDto: UserLoginDto): Promise<any> {
    return this.authService.login(userloginDto);
  }

}
