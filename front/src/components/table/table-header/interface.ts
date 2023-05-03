import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  Companies_Bool_Exp,
  People_Bool_Exp,
  Users_Bool_Exp,
} from '../../../generated/graphql';
import { DocumentNode } from 'graphql';

export type SortType<SortKey = string> = {
  label: string;
  key: SortKey;
  icon?: IconProp;
};

export type SelectedSortType<SortField = string> = SortType<SortField> & {
  order: 'asc' | 'desc';
};

export type FilterType<WhereTemplate> = {
  label: string;
  key: string;
  icon: IconProp;
  whereTemplate: (...args: any[]) => WhereTemplate;
  searchQuery: DocumentNode;
  searchTemplate: People_Bool_Exp | Companies_Bool_Exp | Users_Bool_Exp;
};

export type FilterOperandType = {
  label: string;
  id: string;
  keyWord: 'ilike' | 'not_ilike';
};

export type SelectedFilterType<WhereTemplate> = FilterType<WhereTemplate> & {
  value: string;
  operand: FilterOperandType;
  where: WhereTemplate;
};
