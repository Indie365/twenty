import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { HideField } from '@nestjs/graphql';
import { CompanyOrderByWithRelationInput } from '../company/company-order-by-with-relation.input';
import { WorkspaceOrderByWithRelationInput } from '../workspace/workspace-order-by-with-relation.input';

@InputType()
export class PersonOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    firstName?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    lastName?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    email?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    phone?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    city?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    companyId?: SortOrderInput;

    @HideField()
    workspaceId?: keyof typeof SortOrder;

    @HideField()
    deletedAt?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => CompanyOrderByWithRelationInput, {nullable:true})
    company?: CompanyOrderByWithRelationInput;

    @HideField()
    workspace?: WorkspaceOrderByWithRelationInput;
}
