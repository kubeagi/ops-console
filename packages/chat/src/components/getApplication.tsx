/**
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2024 TenxCloud. All Rights Reserved.
 */

/**
 * useGetApplication
 * @author songsz
 * @date 2024-04-07
 */
import { sdk } from '@yuntijs/arcadia-bff-sdk';
import React, { FC, useContext, useEffect } from 'react';

import { RootContext } from '../index';

type IGetApplication = {
  setApp: (application: any) => any;
};

export const GetApplication: FC<IGetApplication> = props => {
  const { appName, appNamespace } = useContext(RootContext);
  const application = sdk.useGetApplication({
    name: appName,
    namespace: appNamespace,
  });
  const app = application?.data?.Application?.getApplication;
  useEffect(() => {
    props.setApp(app);
  }, [app, props.setApp]);
  useEffect(() => {
    application.mutate();
  }, []);
  return <></>;
};

export const GetGpts: FC<IGetApplication> = props => {
  const { appName, appNamespace } = useContext(RootContext);
  const gpt = sdk.useGetGpt({
    name: `${appNamespace}/${appName}`,
  });
  const app = gpt?.data?.GPT?.getGPT;
  useEffect(() => {
    if (!app?.name) return;
    props.setApp({
      ...app,
      metadata: {
        namespace: app.name.split('/')[0],
        name: app.name.split('/')[1],
        displayName: app.displayName,
        description: app.description,
        icon: app.icon,
      },
    });
  }, [app, props.setApp]);
  useEffect(() => {
    gpt.mutate();
  }, []);
  return <></>;
};
