import * as _ from 'lodash';

export function idMapper(permissions: string[]): Array<{ id: string }> {
  const sanitizedPermissions: any[] = _.map(
    permissions,
    (permission: string) => {
      return { id: permission };
    },
  );

  return sanitizedPermissions;
}

export function nameMapper(permissions: string[]): Array<{ name: string }> {
  const sanitizedPermissions: any[] = _.map(
    permissions,
    (permission: string) => {
      return { name: permission };
    },
  );

  return sanitizedPermissions;
}
