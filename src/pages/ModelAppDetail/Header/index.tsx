import { ClockCircleOutlined, StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { AntdIconInfoCircleOutlined } from '@tenx-ui/icon-materials';
import {
  Col,
  Divider,
  Dropdown,
  Image,
  Row,
  Space,
  Status,
  Tooltip,
  Typography,
  notification,
} from '@tenx-ui/materials';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';
import { Card } from 'antd';
import React, { useState } from 'react';

import I18N from '@/utils/kiwiI18N';

import utils from '../../../utils/__utils';
import { useModalAppDetailContext } from '../index';
import Delete from './Delete';
import Edit from './Edit';
import MetaData from './MetaData';
import Publish from './Publish';
import styles from './index.less';

const getChatLinkLocale = () => {
  const LOCALE_KEY = 'intl_locale';
  let locale = window.localStorage.getItem(LOCALE_KEY);
  if (!locale) {
    locale =
      typeof navigator === 'object' && typeof navigator.language === 'string'
        ? navigator.language
        : 'zh-CN';
  }
  locale = locale.startsWith('en') ? 'en-US' : 'zh-CN';
  return {
    'en-US': 'en',
    'zh-CN': 'zh',
  }[locale];
};

interface HeaderProps {}

const Header: React.FC<HeaderProps> = props => {
  const { refresh, data, loading } = useModalAppDetailContext();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'publish' | 'edit' | 'delete' | 'metadata'>();
  const history = getUnifiedHistory();

  const { data: gptData } = utils.bff.useGetGptStore();
  const gptUrl = gptData?.GPT?.getGPTStore?.url || '';

  const handlePublish = () => {
    setModalOpen(true);
    setModalType('publish');
  };
  const handleEdit = () => {
    setModalOpen(true);
    setModalType('edit');
  };
  const handleDelete = () => {
    setModalOpen(true);
    setModalType('delete');
  };
  const handleMetadata = () => {
    setModalOpen(true);
    setModalType('metadata');
  };

  const recommendedDom = () => {
    const isRecommended = data?.metadata?.isRecommended;
    const handleRecommend = async () => {
      try {
        await utils.bff.updateApplication({
          input: {
            name: data?.metadata?.name,
            namespace: data?.metadata?.namespace,
            displayName: data?.metadata?.displayName,
            description: data?.metadata?.description,
            icon: data?.metadata?.icon,
            isPublic: data?.metadata?.isPublic,
            category: data?.metadata?.annotations?.['arcadia.kubeagi.k8s.com.cn/app-category'],
            isRecommended: !isRecommended,
          },
        });
        refresh && refresh();
        notification.success({
          message: isRecommended ? '取消推荐成功' : '推荐成功',
        });
      } catch (error) {
        notification.warnings({
          message: isRecommended ? '取消推荐失败' : '推荐失败',
          errors: error?.response?.errors,
        });
      }
    };
    return (
      <span className={styles.recommended}>
        {isRecommended ? (
          <Tooltip title="取消推荐">
            <StarFilled className={styles.recommendedIcon} onClick={handleRecommend} />
          </Tooltip>
        ) : (
          <Tooltip title="推荐">
            <StarOutlined className={styles.noRecommendedIcon} onClick={handleRecommend} />
          </Tooltip>
        )}
      </span>
    );
  };
  return (
    <Card bordered={false} className={styles.header} loading={loading}>
      <Publish
        data={data}
        open={modalOpen && modalType === 'publish'}
        refresh={refresh}
        setOpen={setModalOpen}
        type={modalType}
      />
      <Edit
        data={data?.metadata}
        open={modalOpen && modalType === 'edit'}
        refresh={refresh}
        setOpen={setModalOpen}
        type={modalType}
      />
      <Delete
        data={data?.metadata}
        open={modalOpen && modalType === 'delete'}
        refresh={refresh}
        setOpen={setModalOpen}
        type={modalType}
      />
      <MetaData
        data={data?.metadata}
        open={modalOpen && modalType === 'metadata'}
        refresh={refresh}
        setOpen={setModalOpen}
        type={modalType}
      />
      <Row wrap={false}>
        <Col flex="auto">
          <Row wrap={false}>
            <Col flex="84px" style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                fallback=""
                height={64}
                preview={false}
                src={data?.metadata?.icon}
                style={{ marginRight: '20px' }}
                width={64}
              />
            </Col>
            <Col flex="auto">
              <Row gutter={['', 8]} wrap={true}>
                <Col span={24}>
                  <Typography.Title bold={true} ellipsis={true} level={1}>
                    {utils.getFullName(data?.metadata)}
                    {recommendedDom()}
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Text>
                    <Status
                      __component_name="Status"
                      id={data?.metadata?.isPublic + ''}
                      types={[
                        {
                          children: '未发布',
                          id: 'false',
                          type: 'disabled',
                        },
                        {
                          children: '已发布',
                          id: 'true',
                          type: 'success',
                        },
                      ]}
                    />
                    <Tooltip __component_name="Tooltip" title={data?.metadata?.message || '-'}>
                      {data?.metadata?.isPublic === 'error' && (
                        <AntdIconInfoCircleOutlined
                          __component_name="AntdIconInfoCircleOutlined"
                          style={{ marginLeft: '20px' }}
                        />
                      )}
                    </Tooltip>
                  </Typography.Text>

                  <Divider dashed={false} mode="default" type="vertical" />
                  <Tooltip title="创建者">
                    <UserOutlined className={styles.icon} />
                  </Tooltip>
                  <Typography.Text ellipsis={true} strong={false}>
                    {data?.metadata?.creator || '-'}
                  </Typography.Text>

                  <Divider dashed={false} mode="default" type="vertical" />
                  <Tooltip title="更新时间">
                    <ClockCircleOutlined className={styles.icon} />
                  </Tooltip>
                  <Typography.Time
                    format=""
                    relativeTime={false}
                    time={data?.metadata?.updateTimestamp}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col flex={data?.metadata?.isPublic ? '130px' : '140px'} style={{ display: 'flex' }}>
          <Space align="center" direction="horizontal">
            <Dropdown.Button
              destroyPopupOnHide={true}
              menu={{
                items: [
                  data?.metadata?.isPublic
                    ? {
                        key: 'dialog',
                        label: I18N.ModelApp.duiHua,
                      }
                    : null,
                  {
                    key: 'assessment',
                    label: I18N.ModelApp.zhiNengTiPingGu,
                  },
                  {
                    key: 'edit',
                    label: I18N.ModelApp.bianJi,
                    disabled: data?.metadata?.isPublic,
                  },
                  {
                    key: 'metadata',
                    label: '基本信息',
                  },
                  {
                    key: 'delete',
                    label: I18N.DataHandle.shanChu,
                  },
                ].filter(Boolean),
                onClick: ({ key }) => {
                  switch (key) {
                    case 'edit': {
                      handleEdit();

                      break;
                    }
                    case 'delete': {
                      handleDelete();

                      break;
                    }
                    case 'assessment': {
                      history.push(
                        `/ai-agent-assessment?appNamespace=${data?.metadata?.namespace}&appName=${data?.metadata?.name}`
                      );

                      break;
                    }

                    case 'publish': {
                      handlePublish();
                      break;
                    }

                    case 'metadata': {
                      handleMetadata();
                      break;
                    }

                    case 'dialog': {
                      window.open(
                        `${gptUrl}/${getChatLinkLocale()}/chat/new?appNamespace=${data?.metadata?.namespace}&appName=${data?.metadata?.name}`
                      );
                      break;
                    }
                    // No default
                  }
                },
              }}
              onClick={() => {
                handlePublish();
              }}
              overlayStyle={{
                width: data?.metadata?.isPublic ? '110px' : '120px',
              }}
            >
              {data?.metadata?.isPublic ? I18N.ModelApp.cheXiaoFaBu : I18N.ModelApp.faBuZhiNengTi}
            </Dropdown.Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default Header;
