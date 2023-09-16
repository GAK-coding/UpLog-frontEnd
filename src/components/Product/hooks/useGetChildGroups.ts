import { ChildGroup } from '@/typings/project.ts';
import { getChildGroups } from '@/api/Project/Version.ts';
import { useQuery } from 'react-query';

export function useGetChildGroups(
  parentId: number,
  enabled = true,
  onSuccess?: (data: { childTeamInfoDTOList: ChildGroup[] } | 'fail getProjectTeams') => void
) {
  const { data, refetch } = useQuery(['childGroup', parentId], () => getChildGroups(parentId), {
    enabled: enabled,
    onSuccess: (data) => onSuccess && onSuccess(data),
  });

  return [data, refetch];
}
