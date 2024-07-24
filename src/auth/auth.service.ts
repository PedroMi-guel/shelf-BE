import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async logIn(email: string, pass: string): Promise<any> {

    email = email.toLowerCase().trim();

    const user = await this.usersService.findByEmail(email);

    if (!await compare(pass, user.password)) {
      throw new UnauthorizedException();
    }
    
    const { password, ...result } = user;
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: result
    };
  }
}
