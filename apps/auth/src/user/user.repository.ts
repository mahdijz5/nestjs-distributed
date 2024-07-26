import { AbstractRepository } from "@app/common/database";
 import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "./models/user.schema";

export class UserRepository extends AbstractRepository<UserDocument> {
    protected readonly logger = new Logger(UserRepository.name)

    constructor(@InjectModel(UserDocument.name) private readonly userRepository: Model<UserDocument>) {
        super(userRepository)
    }
} 