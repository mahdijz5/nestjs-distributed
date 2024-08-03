import { AbstractRepository } from "@app/common/database";
 import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./models/user.schema";

export class UserRepository extends AbstractRepository<User> {
    protected readonly logger = new Logger(UserRepository.name)

    constructor(@InjectModel(User.name) private readonly userRepository: Model<User>) {
        super(userRepository)
    }
} 