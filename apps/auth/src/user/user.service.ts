import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserReqDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from "bcryptjs"
import { GetUserDto } from './dto/get-user.dto';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { } 

    async create(createUserDto: CreateUserReqDto) {
        await this.validateCreateUserDto(createUserDto)
        return await this.userRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10)
        })
    }
    
    async validateCreateUserDto(createUserDto: CreateUserReqDto) {
      try {
          await this.userRepository.findOne({email :createUserDto.email})
      } catch (error) {
        return {}
      }
      throw new UnprocessableEntityException("Email already exists.")
    }

    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findOne({ email })
        const passwordIsValid = await bcrypt.compare(password, user.password)
        if (!passwordIsValid) throw new UnauthorizedException("Credential is not valid")
        return user 
    }

    async getUser( getUserDto : GetUserDto) {
        return await this.userRepository.findOne(getUserDto)
    }
}
