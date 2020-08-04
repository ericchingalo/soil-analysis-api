import * as _ from 'lodash';

export function idMapper(permissions: string[]): Array<{ permission: string }> {
  const sanitizedPermissions: any[] = _.map(
    permissions,
    (permission: string) => {
      return { id: permission };
    },
  );

  return sanitizedPermissions;
}
