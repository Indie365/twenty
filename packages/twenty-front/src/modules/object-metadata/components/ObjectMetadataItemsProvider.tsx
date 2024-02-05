import { useRecoilValue } from 'recoil';

import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { ObjectMetadataItemsLoadEffect } from '@/object-metadata/components/ObjectMetadataItemsLoadEffect';
import { objectMetadataItemsState } from '@/object-metadata/states/objectMetadataItemsState';
import { RelationPickerScope } from '@/object-record/relation-picker/scopes/RelationPickerScope';

export const ObjectMetadataItemsProvider = ({
  children,
}: React.PropsWithChildren) => {
  const objectMetadataItems = useRecoilValue(objectMetadataItemsState);
  const currentWorkspaceMember = useRecoilValue(currentWorkspaceMemberState);

  return (
    <>
      <ObjectMetadataItemsLoadEffect />
      {(!currentWorkspaceMember || !!objectMetadataItems.length) && (
        <RelationPickerScope relationPickerScopeId="relation-picker">
          {children}
        </RelationPickerScope>
      )}
    </>
  );
};
