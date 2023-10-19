import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { Hook } from 'src/core/@generated/hook/hook.model';
import { AbilityGuard } from 'src/guards/ability.guard';
import { CheckAbilities } from 'src/decorators/check-abilities.decorator';
import {
  CreateHookAbilityHandler,
  DeleteHookAbilityHandler,
} from 'src/ability/handlers/hook.ability-handler';
import { CreateOneHookArgs } from 'src/core/@generated/hook/create-one-hook.args';
import { PrismaService } from 'src/database/prisma.service';
import { AuthWorkspace } from 'src/decorators/auth-workspace.decorator';
import { Workspace } from 'src/core/@generated/workspace/workspace.model';
import { DeleteOneHookArgs } from 'src/core/@generated/hook/delete-one-hook.args';

@UseGuards(JwtAuthGuard)
@Resolver(() => Hook)
export class HookResolver {
  constructor(private readonly prismaService: PrismaService) {}
  @Mutation(() => Hook)
  @UseGuards(AbilityGuard)
  @CheckAbilities(CreateHookAbilityHandler)
  async createOneHook(
    @Args() args: CreateOneHookArgs,
    @AuthWorkspace() { id: workspaceId }: Workspace,
  ): Promise<Hook> {
    return this.prismaService.client.hook.create({
      data: {
        ...args.data,
        ...{ workspace: { connect: { id: workspaceId } } },
      },
    });
  }

  @Mutation(() => Hook, { nullable: false })
  @UseGuards(AbilityGuard)
  @CheckAbilities(DeleteHookAbilityHandler)
  async deleteOneHook(@Args() args: DeleteOneHookArgs): Promise<Hook> {
    const hookToDelete = this.prismaService.client.hook.findUnique({
      where: args.where,
    });
    if (!hookToDelete) {
      throw new NotFoundException();
    }
    return await this.prismaService.client.hook.delete({
      where: args.where,
    });
  }
}
