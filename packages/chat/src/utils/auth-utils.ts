export enum removeEnum {
  removeTenant = 1,
  removeProject = 2,
  removeCluster = 3,
}

interface ParsedToken {
  alg: string;
  kid: string;
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  at_hash: string;
  c_hash: string;
  email: string;
  email_verified: boolean;
  groups: string[];
  name: string;
  preferred_username: string;
}

function parseToken(token: string): ParsedToken {
  return token
    .split('.')
    .map(str => {
      try {
        return JSON.parse(atob(str));
      } catch {
        // do sth
      }
      return {};
    })
    .reduce(
      (pr, cu) => ({
        ...pr,
        ...cu,
      }),
      {}
    );
}

export interface Tenant {
  id: string;
  name: string;
  admins?: any[];
  custom_navigation?: boolean;
  detail?: string;
  category?: string;
  describe?: string;
  updateTime?: string;
  last_operation_time?: string;
  isLoginUserAdmin?: boolean;
}
// 原先的 JwtToken
export interface JwtToken {
  token: string;
  expiresIn: number;
  issuedAt: string;
  userID: number;
}

interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
}
export interface AuthData {
  jwtToken?: JwtToken;
  token?: Token;
  project?: string;
  projectID?: string;
  cluster?: string;
  harbor?: string[];
  clusterName?: string;
  federationCluster?: {
    clusterId: string;
    clusterName?: string;
    hostId?: string;
    createTime?: string;
    description?: string;
    memberId?: string;
    status?: number;
  };
  tenant?: Tenant;
  // ---
  onbehalfuser?: string;
  onbehalfuserid?: string;
  billingenabled?: string;
  ftpEnabled?: string;
  emailEnabled?: string;
  watchToken?: string;
  ocpToken?: any;
  /** 当租户进入平台管理（即全局租户时）将租户、项目、集群等信息保存下来，以便后续进入单组户菜单时恢复 */
  _authDataBak?: AuthData;
}

export const AUTH_DATA = 'authData';
/**
 * get auth data
 *
 * @return {(AuthData | undefined)}
 */
export const getAuthData = (): AuthData => {
  try {
    const authDataLocal: AuthData = JSON.parse(window.localStorage.getItem(AUTH_DATA) || '{}');
    // 如果 localStorage 中没有 authData 说明用户已经退出登录了，这里不能再使用 sessionStorage 中的 authData
    if (Object.keys(authDataLocal).length === 0) {
      return authDataLocal;
    }
    const authDataSession: AuthData = JSON.parse(window.sessionStorage.getItem(AUTH_DATA) || '{}');
    return Object.assign(authDataLocal, authDataSession);
  } catch (error) {
    console.warn('getAuthData failed', error);
    return {};
  }
};

/**
 * set auth data
 *
 * @param {AuthData} authData
 */
export const setAuthData = (authData: AuthData): void => {
  const rmTPC = authData?.removeTenantProjectCluster;
  delete authData?.removeTenantProjectCluster;
  authData = Object.assign({}, getAuthData(), authData);
  const delAuthDataProp = (() => {
    if (!rmTPC) return {};
    const _authDataBak = {
      tenant: authData.tenant,
      project: authData.project,
      projectID: authData.projectID,
      cluster: authData.cluster,
      clusterName: authData.clusterName,
      harbor: authData.harbor,
      federationCluster: authData.federationCluster,
    };
    if (rmTPC === removeEnum.removeCluster) {
      return {
        cluster: undefined,
        clusterName: undefined,
        _authDataBak,
      };
    }
    if (rmTPC === removeEnum.removeProject) {
      return {
        project: undefined,
        projectID: undefined,
        cluster: undefined,
        clusterName: undefined,
        harbor: undefined,
        federationCluster: undefined,
        _authDataBak,
      };
    }
    if (rmTPC === removeEnum.removeTenant) {
      return {
        tenant: undefined,
        project: undefined,
        projectID: undefined,
        cluster: undefined,
        clusterName: undefined,
        harbor: undefined,
        federationCluster: undefined,
        _authDataBak,
      };
    }
    return {};
  })();
  authData = Object.assign({}, authData, delAuthDataProp);
  if (!rmTPC) {
    delete authData._authDataBak;
  }
  window.localStorage.setItem(AUTH_DATA, JSON.stringify(authData));
  delete authData.jwtToken;
  delete authData._authDataBak?.jwtToken;
  delete authData.token;
  delete authData._authDataBak?.token;
  window.sessionStorage.setItem(AUTH_DATA, JSON.stringify(authData));
};

/**
 * remove auth data
 *
 */
export const removeAuthData = (): void => {
  window.localStorage.removeItem(AUTH_DATA);
  window.sessionStorage.removeItem(AUTH_DATA);
};

export function isTokenExpired(token?: string): boolean {
  token = token || getAuthData()?.token?.id_token;
  if (!token) {
    return true;
  }
  const expiredTimestampInMs = parseToken(token).exp * 1000;
  return Date.now() >= expiredTimestampInMs;
}
