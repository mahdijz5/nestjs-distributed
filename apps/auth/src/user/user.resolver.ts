import { Args, Mutation, Query, Resolver, ResolveReference } from "@nestjs/graphql";

import { UserService } from "./user.service";
import { CreateUserReqDto } from "./dto/create-user.dto";
import { User } from "./models/user.schema";

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Mutation(() => User)
    async createUser(
        @Args("createUser") createUserInput: CreateUserReqDto
    ) {
        return this.userService.create(createUserInput)
    }


    @Query(() => User, { name: "user" })
    async getUser(@Args("id", { type: () => String }) id: string) {
        return this.userService.getUser({ _id: id })
    }


    @ResolveReference()
    resolveReference(reference: { __typename: string; id: string }) {
         return this.userService.getUser({ _id: reference.id });
    }
}
