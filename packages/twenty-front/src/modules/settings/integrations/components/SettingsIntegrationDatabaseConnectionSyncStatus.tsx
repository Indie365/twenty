import { useGetDatabaseConnectionTables } from '@/databases/hooks/useGetDatabaseConnectionTables';
import { Status } from '@/ui/display/status/components/Status';
import { RemoteTableStatus } from '~/generated-metadata/graphql';

type SettingsIntegrationDatabaseConnectionSyncStatusProps = {
  connectionId: string;
  skip?: boolean;
};

export const SettingsIntegrationDatabaseConnectionSyncStatus = ({
  connectionId,
  skip,
}: SettingsIntegrationDatabaseConnectionSyncStatusProps) => {
  const { tables } = useGetDatabaseConnectionTables({
    connectionId,
    skip,
  });

  const syncedTables = tables.filter(
    (table) => table.status === RemoteTableStatus.Synced,
  );

  return (
    <Status
      color="green"
      text={
        syncedTables.length === 1
          ? `1 tracked table`
          : `${syncedTables.length} tracked tables`
      }
    />
  );
};
