// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Component,
  FormilyForm,
  Divider,
  Typography,
  FormilyInput,
  FormilyTextArea,
  FormilyFormItem,
  Row,
  Col,
  FormilyUpload,
  Flex,
  FormilyNumberPicker,
  FormilyPassword,
  FormilyRadio,
  Space,
  Tooltip,
  Button,
} from '@tenx-ui/materials';

import LccComponentC6ipk from 'SelectCard';

import {
  AntdIconPlusOutlined,
  AntdIconCloseCircleFilled,
  AntdIconCheckCircleFilled,
} from '@tenx-ui/icon-materials';

import { DataProvider } from 'shared-components';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from './utils/__utils';

import * as __$$i18n from './i18n';

import __$$constants from './__constants';

import './index.css';

class CreateDataSource$$Component extends React.Component {
  get history() {
    return this.props.self?.history;
  }
  get appHelper() {
    return this.props.self?.appHelper;
  }

  _context = this;

  get constants() {
    return __$$constants || {};
  }

  constructor(props, context) {
    super(props);

    this.utils = utils;

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = { checked: undefined, timer: undefined, type: undefined };
  }

  $ = refName => {
    return this._refsManager.get(refName);
  };

  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  componentWillUnmount() {}

  form(name) {
    return this.$(name || 'formily_create')?.formRef?.current?.form;
  }

  getDataSourceTypes(pageThis, labelKey = 'children') {
    const valueKey = 'value';
    return [
      {
        [valueKey]: 'onLine',
        [labelKey]: '在线数据',
        forms: ['serverAddress-onLine'],
        icon: 'data:image/image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAABxCAYAAADifkzQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAFDVJREFUeNrsXQl0HMWZ/ufQYT+CZOSHDQRLxtgchmiMAwsJ2MojeSE8EovsvhAeu2spByEOYAEO4QhrmYQQQgjCBJIQJxJh8e7bl8TyhiPOZTkLSzBgjyA2lx1LNo69+Br5kmTNTG39Nd0zfVRVV1+jGcn/ezXd0zNT3VNf//df1RFCCJQ7LX+aJOimlv6TBBCoxWPa30rQDXtPj/fR/T7Q3tDPU3QnSVvqtoXRZDn//0g5gfjoSgYIAtZEL5tuGXj1JIcL5Dck/9a8nwOv8M6836+BmqSHe+iB5O1fiKWOgxgA/fA/KDcRaKa72BqJASkeeIaNASQzeMbPTEAaDmj99dLXbrrffccXY8njILoEjm5aNPDqzSARO8dZwCtwnxg8E5BW8Ix9Fr6DnNpNd7ru/HJpAVoyIFLgajVua2McZ+Mwwuc4b6LTsC8AT9g3e+2lP+tAUO++Pp4a9yBS8BqQ6zTwahzEmzOQquBpB0Tg2cUysfVBDw3Qtwhm1ze/Eu8bdyBqnIcDsJA/wGp6T0V0Sm8ML2LZdNPku3uSbtr+7Ybic2bRQdTAa9M5z66b3Oq9gkgMQO/xRGehPz54xmvIcSYVtUsXVaTGJIgUwGaN++pVwAtM76mKThF4qn2bjaC29kUV3WMGRI37umhb4Fl0SsBz4TJ40Xscl4XfN+cmWY36ftnXwuXK0EHUuK+Lb7TYB67E9Z6rG0PrY4C+ttx7Y2V32YEoMlykolOi91REp1TvyV0GN3pPCJiDWH4SRey3bqpMlQWImtvQbfT3bCKrBPWekuiUgScRy9o+RoCav31zZV9Jg6hFW3potzWlpvdy/Qeu96RimfMfBjD2e9/iysCiPtGAAcRQ2UYdQKL/idyLaSC0Q0A4HII3lnUgCEfkEu0Dax/cvjUAjX0Vjjv0TfiSwtq3EUDTeczvqW1ANt7VMdxScpyoAdgZtt7zESpT03t8l0FV7zmIfGIdh9b7b6nqKgkQH13JwmadKnqvKKEyv3pPSXR6BM/ed+t3b/UHpG8QdQCLnCJy744E5zKo6D0hePybGFof8AGkLxARQIIcWIahMil4imJZmubSfqTWN3vX+r3bqruKCuLyldSJJ7CqxFJEfkJlYek9wTgYbuTC8asfXFLdXRQQKYAJegU9zNIKSe+NYqhMWe95FJ2yvpn78f2vVydDBXH50xiJIXiS+jEcKlMWnVLwuDcXcbrR+ulL4qHbq5UjOx78RII1J/XE0ScDX/6eEUAnn4zn7xXOw/f3VPo2Nu5/MOg90TgUro8Uvi/0TdlOvRbtCsfZf+Rp0k5PNF8+wAWHXQSelUN44BErkJwBzvcH/L6JBDwrJ4j6FoFHCAHncTBwn/RGM3Iw63v+rQ8MtgcuTh/5d1YeuLHUUkS1H4jAiScAVFcBTK2LmMTp1Do8njs2NExg917zte3aQ9jxA4doGyDF0nucTI6w7zkP3zHBUT/GlYUoppNCqipT0XvVlQBTJkeg/pQITKFg1XwA2NaF+oezp8u/sXsvBfMgYeBu20ng7+9nKchqGQziTu+ZEJe4I+hyJALhxI6nCLL20mKniBCwmQ0F4EaDdlFgt+3IwqubM7DrfeIaPH4aTimSo+8ve+TOCe2+QKQANtBvbCtWimgKFYEXnReFWRS8qkooKUKu3LQ1Ay++loGde4hddDrGZD2L5enL75rY51mckhxLhx4qO39WhIIXgZNHieNUCPXu3HNjrKHIfYGC+cqmtLLo9OGOIAZNnjjx4adIE+1gbZh6D8G7bG4Uak6AsiTUob/73zS8+teMkuj0qlMpfezRuyf2uOZErco5lFAZctwnLonAtFMiUM406cQIXHNFBXx4dgxW/ykNO6kx5EHvqYjlDpGRI+TEH/yCtNCfd4ah9z5Eue+q+VEYi/Sfz43AK5QrvbojDmK59bF7JnYpO/sU3DauuCTiaIvxIkTRkU9T8MYqgEifv7KCNecKBnEkxz7GeaBblCM2Dz2ZRSXa6ClUJimNQABRB451uvC8GFx7ZaU0kuMiDGeMEM1fdO+RJlVObBOGyiRxTqtSN4azLjxvfACYB/L8GMy7MM4PwxGHMBzYwDMC2+YIIuXCBvrFBULR6RDnJJxY5IknRGDe3CiMN7ri0jhMqonwRacw3ms2cOzHYcENy440SEGkX26R6T2VqjJrIBn9v1Jz3ItBE6oi0ES50aPolI1xiyOIjnoPwFWK6KyG8ceFOp0/KyYUnSLwrFasTafKQHywM2tYyCC4FBEGq8crnVQT8aL3OGNsEsn11y89nOCCSNg8eWKuP5GaynbwwALklLoIjHfyoPdsBWd5kcwRqVHL2ZqDrqYej7pQEIMWi04iFZ1W8PR3zTYQH/h5BrMV9YGWRtiiuuOXE2WiUwiexCCirf5L9xxuMHMigSa3eg8cSiNMkZxxD6RE74EAPMcxzmU2ogZ2b3Kr94gDeMeZ0AAgOLhlfL3n5I4wEONGTgyjmvo4jpyx4sVQHaoCzH3kv1QA8f4VGZzVWx/KLKLjKHLcCg544FxQRSxAoA3TetehWp0TE2FVUx/HkDN+FvB8VgUkotoPExDEBExBfaeVfv37NAwdG3tgDQ4T+MXqYS6KxgSCS73n5I4kNMOGNIRXTW2nDW9m4bGVI6wscKzQu/0ZuO8ng/BSMs3nRGKZQONQSCyM5NjdkYZ4gRPDmUXEs1Dx2P4BAit+OQLnzIjAVfPiUHtieUZ28H/815ph6H0zYx4XjnWqLDqN1fOcMbeI5UQ8CL1ntWhtfXD1RO4Hm7cQ2LTlmFZFFoXpH4yWDech1+mcR5z/sO9qONH8zrj22XxVl8HrLCIjTZ2MJfTm/l7dlGENy/IvvSAGs8+MsiKkUuO63rfS8MeXR2DfAX5F3+lTo0LrlGepWsETW7F2o0jra37cfhJ/s2dl+zrddF0lvLgxA394KU2NAXN/WAL4m7Vp+O+1BE49OQqzZ0RhxulROOP06Khx3Dt9Weh9Ow3v7c4KB3hiNVULTRVw+cUVUjfDwWVwqIzjuyNxruj0t+COIycifXROrgj3hQ05DkTwwPLndv5fljW9PwQTgT315AhL8cwIGNh3+7OwbyDLwML2Tl/GcYDraiPwkQSCF4cJ1RElP9GV6FTwJeM87gtgwR3DhYrRxIrqj18SY+01TZxu3ZEV6o8t9LMt27O2QZgxLcr2EdhJNVGBPjJfx74UYU3nNrcDPLMhRsGLwyUJ5zlJQeg9WdV93I/olFeEE6met9Lc2THWkCP/uiULr7yRYbOSrNdnHAj9+Jb+rOFaM54nudjEm2VMTp8ShYspaImz44wD3Xj7PvWehBMJxJc9PtLkxmVwDhERm/PvhtCYuYwaNthwAgtyHnLnVrp97/1MUNXUolikqe8PTsWJPTGYVU9bQ1QoLlUD4H70Hn8/JxHj+Qd+hLTgjh93HsXteTOjrOmEgKKeREvxPbodHAK2BQfuk/lkCBYaJqdRTkMOQwtzJgUu8NCbB73Hl3xmnz3evqiir/2xkWIsuCMlFKMIDNNrEtcCjRmRQYPzIBBUkfgx0oRqymlTimPxqmYw3IJHLH5iuAvuONAmqgN/vuoY+wGW+bV+tsKT5XnayaUZKAhC78miZdF8eMzrwgOy+hAVX4PSulfT+R8cHc7CmhdGxl4mQ5C5l60uYgWQW31Y8BOJZ70nFJ35G8PZGBgaMveNiyWMNQD96j2ZtNM5cR0vYC1a8oNftm/MgpgLfJxoweXUUa7M1WcigFj+PrZQNItO+do+JF9J6JwlYj9aFw9M70l8MidC/bektYoZNqdNiYw9TlS08m2STuqOFPhatwSSUr0HTnrPecEdI3VSIwbXjzH5hxhGmxYtawAHhwgsf2qQrw+Jk94jUr1XwIHkF1nS3vbocqsv1AV3LPTGOxnm2119eQX1AWNjgts2bE7D088Mw579GG+dIHc1POg9K/cZxjili9Okm5ielwV3rH9mf4rAil8dgzMp911xaQXbliO9tS0Dq/4wDG9tzQgrGdy6DDLRyQkZJjU/kST96j3RqhE8JI39Yebg3f5hBiJOA2OziMqE89a8eMwGHiHgACRRzBI5gqdTDsTvLK5K3dkxjEs01vuKRfKCycSu486khsy7282hMswkYMNoTeNZMfiHD8VZGKyUaMeuLPzPayPwGgVw7/4sF7xzzogLACTqWSIBePaQIfT/anltylg83EPwaTLeV3bg6lTenXnjdVWw/o0MPP/nEZa/M/aNFuqfXk6zhnFM5EwMQM/EAHSRjR40VN78W4aJzA2b0rDnQNYe0NZ2J0+Kwmc/UQWXza3gW6dKWSKh3rNncnIHegDMSeEe+rIwpIXmbHTR+THW1r+ehmcpmPsH7AnpvQcIrGWAjuSzChjvxC0GqetqoyzWGgTtS2XZ+bbvysD2v2ehH7e7so6hMhl4IADMg94TiWULiNoB050W0EJzMrqIik1sr1OL9S+9aXj97YwwRbRjd5aJNOt5ENAclxKYNT1mOy/hDOpb23KhvqNDhIHlNkU0d3Yc5n24Ei44121S2IXoFIFX+D3DzLQY0TceGkYrtTHIhebQYLmJik9lETaMxUgZVtOCW9EghFRNbRlgc98I2NzZFQzAiS5yi9feNuAqc897GAzHou1d9eikhIkTta+hSG1Uk8lqBVX7U+4yishRFzfGWUPqfTvDal126DUvoscyBJC5t3Lf2WfEYNqpUWasqHCcEyd61HuiMc5LzrjFiuqim8UqolPVHdk34K/KGy1VbDphARMCujeVE61ofKDhoRrO4g3q2VQEI2dNOzUGk2sjDLhppwTn6rh0GRzdEcOCtnYQH1xSnVzy4BA+SrVeJYOh6o7oyV4ZsUw9BQeNFtl3mXEzNSq0Jrfvzirp4mmneC+3cEPMovWh9wTj3d/92KQkF0SNuuiXl4LPMJzxMzRYrpwntt7QP/zBk0P5H9zw+WoT9ymLYgrKWQ2lFSxYt/6YQomIBDyL/tc2XcZz8Nax6QLVRwYYwZPML1+7Ps0MFhE90zNi6vuPL42NpDBavs+uGxaunmHWe8T5sQz540QO4kO3V/fR7larZu4dFgdg748OEvjlmhGp4udmR8qculYNwuGjRAieLHNPCG8BKJbBWL368ZP6pCBqZ+yQruxg4D4AtYXmXkqOMLHKo899spJZpawcvgoXgS3/dVN6qBhd+/IxrugUcZ8IPOMzPgD0hYQLJFy09pbvDvZYJ9oEEYZbuKAq7z5YjRK0OpnjXl3eSeHnqAjtpFzo0mUQHDe5I+t+86OTmqzni0tEXHth/W8IrJq6q3sY3qb+HuM+A1i4P6uhvHOLqAM7fz1IbYBjAn/UWwzV0Ec777zShdwX3z+IDuX8IKqprReKwe2W5qqyB06nzVvS8MOVR+H9fVmnUJlDPFXojnC5UMqJWq/ttMu1Ut/G4hfK4oVGS2sv9Z++3znI5jVc86kqd3MbSoj27M8yA+blN0bUXAZpKkoQyZFwoSMnIt1831F8StuCMGKRxj/0kTkVtMVLzs+TcR6KTb7o9K73TFKtcHD1Mz8+qVl0LSoPN8HlihcEEYuU6dQXN4ywhobNRy+ogDnnxFiqqaS4jkqPV14fYcBt25nxEipTSz/Zqw/bZNel9KyoG799FFl5adAzXJ3EMobG5pxbwWKbZ00fHQ7dvDUNmyjXrafg9e3MKIXKfOg9Xj3Osmd/UtfuG0Skr33rKMbqGl2u7MAVnV7FMoKJgWkEF5OxmGUIGjDUcQgWNgQvwFCZit4zvGcHeimAjk9tc/HoPdJCXzY66j0IL0WEpRJvGgqT8HsTJ+BT3XJgYvbBmucTVd0dGSR5zsItvg8oReRV7/H6blHBxtUzhRfde6SNfvthlRmuQbojrsSyz2pq0Y3mVu95FJ3G897y3BN1HYGDiPTVZUdy1qpkgENYcEcZvJCqyjy5DMLMvRw8Zo1SAJtVMXGdrsZ1woEVG+urMhanNCLIWURS3VRUvcftuxdATYx65kSkr7QfSdDfYTSnxrPeUxSdfiZg+i8JDCRUJgSPo/+xGKfp+Z/WJUMHEen6pYebTLFVr5GcMPUe+CyNCMdlkI3Dx37707oet1h49qafWHYCZjla9YvjLvNIvD0yILBZRNpJLbOI+JLCY4oIRH3b9kn+xhDM72z1AqAvTtTpS/ccRvndGfaCO2HpvSBcBg96z9p3629X1HV5xcA3iEhf/KYOZPH1XhAuQ+h6Tz4OvgAMDESkL9x9iAEZtN4LYRbRaOs943la1/gEMFAQkVoRyNxziGu8LDTnR3T6rKb2kyJyBs82DtQKBWgLAsDAQURquesQxvqwkrwmyAV3AppFVIxQmeRG09wIIE1rVkxOBjXmgYOItPDOQ7UakI2lovdCShGp6j19v5f+qGnNzyanghzvUEDU6V/vOIiidXHRQmWlqff0N49Q7msLY5xDBRHpX75xEGOAXUxP+nQZfOs9CCxFpKL39IMYhWmh3Ncd1hiHDiLSP99+sFYDckH4obJw9R4nVCZeG5bAaow1/y5g8TkqIOp03dcPNtEhw2kC9aHpvSKIToWbrl8Dr6cY41pUEHW6dslAO5rYaMG61nsBuAw+UkROeg9FZwcVne3FHM9RAZEBedtArVaE1WZ2R0o2ReSk93DqQ0fYorOkQNTpmlsHanNAEqwaqCmZUJma3htV8EoGRCN97pZUi1ae11jCobKcvwekg7oMXaUwbiUFok7/1JZqgByYzUQzgkYjVGaZG4gzqLs18PpKabxKEkQj/ePNBxL4qFw6iuhvzi9qighgHf0e+nc9a1bUJUt1jEoeRCtdfeMBfGwuxmcT+OxAut8YUKisV6sdQrCSXhO0x0H0SJ9ZtL+BbrDV6o8RVBCdCBYu0NL3/BN1feX8//9fgAEAcaGbBxbnlNAAAAAASUVORK5CYII=',
      },
      // {
      //   [valueKey]: "localUpload",
      //   [labelKey]: pageThis.i18n('i18n-9odw2n6l'),
      //   forms: ['upload'],
      //   icon: 'data:image/png;base64,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',
      // },
      // {
      //   [valueKey]: "fileStorage",
      //   [labelKey]: pageThis.i18n('i18n-tjlmmaei'),
      //   forms: ['serverAddress', 'path']
      // },
      {
        [valueKey]: 'objectStorage',
        [labelKey]: pageThis.i18n('i18n-8cjf8cxq'),
        forms: ['serverAddress', 'username', 'password', 'bucket', 'object'],
        icon: 'data:image/png;base64,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',
      },
      // {
      //   [valueKey]: "mysql",
      //   [labelKey]: pageThis.i18n('i18n-sanitrjl'),
      //   forms: ['serverAddress', 'username', 'password']
      // },
      // {
      //   [valueKey]: "mongodb",
      //   [labelKey]: pageThis.i18n('i18n-kktx1hle'),
      //   forms: ['serverAddress', 'username', 'password']
      // },
      // {
      //   [valueKey]: "api",
      //   [labelKey]: pageThis.i18n('i18n-4bisav57'),
      //   forms: ['apiAddress', 'token'],
      //   icon: 'data:image/png;base64,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',
      // },
      {
        [valueKey]: 'postgresql',
        [labelKey]: 'postgresql',
        forms: ['serverAddress', 'username', 'password'],
        icon: 'data:image/image/png;base64,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',
      },
    ];
  }

  getType() {
    return (
      this.props?.data?.type ||
      this.state.type ||
      this.getDataSourceTypes(this, 'label')?.[0]?.value
    );
  }

  getTypeForms() {
    return this.getDataSourceTypes(this, 'label')?.find(item => item.value === this.getType())
      ?.forms;
  }

  handelCancel() {
    this.props.handelCancel && this.props.handelCancel();
  }

  handleCheck() {
    this.submit(async v => {
      const params = {
        input: {
          name: v?.name,
          displayName: v?.displayName,
          namespace: this.props?.project,
          description: v?.description,
          ossinput: {
            bucket: v?.bucket,
            object: v?.object,
          },
          endpointinput: {
            url: v?.serverAddress,
            insecure: v?.insecure === 'https' ? false : true,
            auth: {
              rootUser: v?.username,
              rootPassword: v?.password,
            },
          },
          webinput: {
            recommendIntervalTime: v?.recommendIntervalTime || 1000,
          },
        },
      };
      try {
        const res = await this.props?.bff?.checkDatasource(params);
        if (res?.Datasource?.checkDatasource?.status === 'True') {
          this.setState({
            checked: true,
          });
        } else {
          this.setState({
            checked: false,
          });
        }
      } catch (error) {
        this.setState({
          checked: false,
          checkedMessage: error?.response?.errors?.[0]?.message,
        });
      }
    });
  }

  handleResetChecked() {
    this.setState({
      checked: undefined,
    });
  }

  async handleSave() {
    this.submit(async v => {
      if (this.getType() === 'onLine') {
        v['serverAddress'] = v['serverAddress-onLine'];
      }
      this.props.handleSave && this.props.handleSave(v);
    });
  }

  initEditForm(values) {
    if (this.getType() === 'onLine') {
      values['serverAddress-onLine'] = values['serverAddress'];
    }
    if (!this.form()) {
      this.state.timer && clearTimeout(this.state.timer);
      this.setState({
        timer: setTimeout(() => {
          this.initEditForm(values);
        }, 200),
      });
      return;
    }
    this.form()?.setValues(values || {});
  }

  onItemClick(item) {
    this.form()?.setValues({
      type: item.value,
    });
    this.setState({
      type: item.value,
    });
  }

  async submit(callback) {
    const arr = [];
    await Promise.all(
      this.getTypeForms()
        .concat(['name', 'displayName', 'description'])
        .map(async key => {
          await this.form()
            .validate([key])
            .catch(errors => {
              const err = errors?.find(err => err.address === key);
              err && arr.push(err);
            });
        })
    );
    if (!arr?.length) {
      const values = this.form()?.values;
      callback(values);
    }
  }

  async validatorName(v) {
    if (v && !this.props.data) {
      try {
        const res = await this.props?.bff?.getDatasource({
          name: v,
          namespace: this.props.project,
        });
        if (res?.Datasource?.getDatasource?.name) {
          return '数据源名称重复';
        }
      } catch (error) {}
    }
  }

  componentDidMount() {
    this.props.setThis && this.props.setThis(this);
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Component>
        <FormilyForm
          __component_name="FormilyForm"
          componentProps={{
            colon: false,
            labelAlign: 'left',
            labelWidth: '120px',
            layout: 'horizontal',
            wrapperWidth: __$$eval(() => this.props.colWidth || '600px'),
          }}
          formHelper={{ autoFocus: true }}
          ref={this._refsManager.linkRef('formily_create')}
        >
          {!!__$$eval(() => this.props.data) && (
            <Divider
              __component_name="Divider"
              content={[null]}
              dashed={true}
              defaultOpen={true}
              mode="default"
              orientation="left"
              orientationMargin={0}
            >
              <Typography.Title
                __component_name="Typography.Title"
                bold={true}
                bordered={false}
                ellipsis={true}
                level={2}
              >
                基本信息
              </Typography.Title>
            </Divider>
          )}
          <FormilyInput
            __component_name="FormilyInput"
            componentProps={{
              'x-component-props': {
                disabled: __$$eval(() => this.props.data),
                onChange: function () {
                  return this.handleResetChecked.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this),
                placeholder: this.i18n('i18n-u4ayeyas') /* 请输入数据源名称 */,
              },
            }}
            decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
            fieldProps={{
              'name': 'name',
              'required': true,
              'title': this.i18n('i18n-k8ddthex') /* 数据源名称 */,
              'x-validator': [
                {
                  children: '未知',
                  id: 'disabled',
                  message: '数据源名称由 0~ 50 个字符组成',
                  pattern: '^.{0,50}$',
                  type: 'disabled',
                },
                {
                  children: '未知',
                  id: 'disabled',
                  triggerType: 'onBlur',
                  type: 'disabled',
                  validator: function () {
                    return this.validatorName.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                },
              ],
            }}
          />
          <FormilyInput
            __component_name="FormilyInput"
            componentProps={{
              'x-component-props': {
                placeholder: this.i18n('i18n-aioalozj') /* 请输入数据源别名 */,
              },
            }}
            decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
            fieldProps={{
              'name': 'displayName',
              'required': false,
              'title': this.i18n('i18n-fr3ipxlc') /* 数据源别名 */,
              'x-validator': [
                {
                  children: '未知',
                  id: 'disabled',
                  message: '数据源别名由 0~ 50 个字符组成',
                  pattern: '^.{0,50}$',
                  type: 'disabled',
                },
              ],
            }}
          />
          <FormilyTextArea
            __component_name="FormilyTextArea"
            componentProps={{
              'x-component-props': { placeholder: this.i18n('i18n-eictbzlm') /* 请输入描述 */ },
            }}
            decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
            fieldProps={{
              'name': 'description',
              'title': this.i18n('i18n-7p3f51an') /* 描述 */,
              'x-component': 'Input.TextArea',
              'x-validator': [
                {
                  children: '未知',
                  id: 'disabled',
                  message: '描述由0 ~ 200 字符组成',
                  pattern: __$$eval(() => this.constants.DESCRIPTION_LENGTH_REG),
                  type: 'disabled',
                },
              ],
            }}
          />
          {!!__$$eval(() => !this.props.data) && (
            <Divider
              __component_name="Divider"
              content={[null]}
              dashed={true}
              defaultOpen={true}
              mode="default"
              orientation="left"
              orientationMargin={0}
            >
              <Typography.Title
                __component_name="Typography.Title"
                bold={true}
                bordered={false}
                ellipsis={true}
                level={2}
              >
                数据接入
              </Typography.Title>
            </Divider>
          )}
          {!!__$$eval(() => this.props.data && !this.getTypeForms()?.includes('upload')) && (
            <Divider
              __component_name="Divider"
              content={[null]}
              dashed={true}
              defaultOpen={true}
              mode="default"
              orientation="left"
              orientationMargin={0}
            >
              <Typography.Title
                __component_name="Typography.Title"
                bold={true}
                bordered={false}
                ellipsis={true}
                level={2}
              >
                数据来源
              </Typography.Title>
            </Divider>
          )}
          {!!__$$eval(() => !this.props.data) && (
            <FormilyFormItem
              __component_name="FormilyFormItem"
              decoratorProps={{ 'x-decorator-props': { asterisk: true, labelEllipsis: true } }}
              fieldProps={{
                'name': 'type',
                'required': false,
                'title': this.i18n('i18n-5am4k7to') /* 数据源 */,
                'type': 'object',
                'x-component': 'FormilyFormItem',
                'x-validator': [],
              }}
              style={{ marginBottom: '-20px' }}
            />
          )}
          {!!__$$eval(() => !this.props.data) && (
            <Row __component_name="Row" style={{ marginBottom: '22px' }} wrap={true}>
              <Col __component_name="Col" flex="120px" />
              <Col __component_name="Col" span={20} style={{ marginTop: '-30px' }}>
                <LccComponentC6ipk
                  __component_name="LccComponentC6ipk"
                  dataSource={__$$eval(() => this.getDataSourceTypes(this, 'label'))}
                  defaultValue=""
                  onItemClick={function () {
                    return this.onItemClick.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  value={__$$eval(() => this.getType())}
                />
              </Col>
            </Row>
          )}
          {!!__$$eval(() => this.getTypeForms()?.includes('upload') && !this.props.data) && (
            <FormilyUpload
              __component_name="FormilyUpload"
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                'name': 'upload',
                'required': true,
                'title': this.i18n('i18n-p1xi725y') /* 选择文件 */,
                'x-component': 'FormilyUpload',
                'x-display': 'visible',
                'x-validator': [],
              }}
            >
              <Flex
                __component_name="Flex"
                align="center"
                justify="center"
                style={__$$eval(() => ({
                  'width': this.props.colWidth || '600px',
                  'border': '1px dashed #4461EB',
                  'height': '100px',
                  'border-radius': '4px',
                }))}
                vertical={true}
              >
                <AntdIconPlusOutlined
                  __component_name="AntdIconPlusOutlined"
                  style={{ color: '#4461EB', fontSize: '16px' }}
                />
                <Typography.Text
                  __component_name="Typography.Text"
                  disabled={false}
                  ellipsis={true}
                  strong={false}
                  style={{ fontSize: '', paddingBottom: '16px', paddingTop: '16px' }}
                  type="colorTextSecondary"
                >
                  {this.i18n('i18n-23jovmbg') /* 点击 / 拖拽文件到此区域上传 */}
                </Typography.Text>
                <Flex __component_name="Flex">
                  <Typography.Text
                    __component_name="Typography.Text"
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{ fontSize: '' }}
                    type="colorTextSecondary"
                  >
                    {this.i18n('i18n-1gfbnspc') /* 仅支持 .txt,.doc,.docx,.pdf,.md 文件； */}
                  </Typography.Text>
                  <Typography.Text
                    __component_name="Typography.Text"
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{ fontSize: '' }}
                    type="colorTextSecondary"
                  >
                    {this.i18n('i18n-h0lq7h8f') /* 单文件大小  */}
                  </Typography.Text>
                  <Typography.Text
                    __component_name="Typography.Text"
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{ fontSize: '', paddingLeft: '6px' }}
                    type="warning"
                  >
                    不超过 2G，
                  </Typography.Text>
                  <Typography.Text
                    __component_name="Typography.Text"
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{ fontSize: '' }}
                    type="colorTextSecondary"
                  >
                    {this.i18n('i18n-vuolk538') /* 单次上传文件数量 */}
                  </Typography.Text>
                  <Typography.Text
                    __component_name="Typography.Text"
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{ fontSize: '', paddingLeft: '6px' }}
                    type="warning"
                  >
                    不超过 20个
                  </Typography.Text>
                </Flex>
                <Typography.Text
                  __component_name="Typography.Text"
                  children=""
                  disabled={false}
                  ellipsis={true}
                  strong={false}
                  style={{ fontSize: '' }}
                />
              </Flex>
            </FormilyUpload>
          )}
          {!!__$$eval(() => this.getType() === 'onLine') && (
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  onChange: function () {
                    return this.handleResetChecked.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  placeholder: '请输入URL',
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                '_unsafe_MixedSetter_description_select': 'VariableSetter',
                'description': __$$eval(
                  () =>
                    this.getType() === 'onLine' && '网站数据源将会获取网站内容, 内容不超过 100 页。'
                ),
                'name': 'serverAddress-onLine',
                'required': true,
                'title': 'URL',
                'x-validator': [],
              }}
            />
          )}
          {!!false && (
            <FormilyNumberPicker
              __component_name="FormilyNumberPicker"
              componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
              decoratorProps={{
                'x-decorator-props': {
                  addonAfter: '毫秒',
                  labelEllipsis: true,
                  wrapperWidth: '100px',
                },
              }}
              fieldProps={{
                'default': '1000',
                'name': 'recommendIntervalTime ',
                'required': true,
                'title': '抓取时间间隔',
                'x-validator': [],
              }}
              style={{ width: '100px' }}
            />
          )}
          {!!__$$eval(
            () => this.getTypeForms()?.includes('serverAddress') && this.getType() !== 'onLine'
          ) && (
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  onChange: function () {
                    return this.handleResetChecked.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  placeholder: this.i18n('i18n-6spbbojn') /* 请输入服务地址 */,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                'name': 'serverAddress',
                'required': true,
                'title': this.i18n('i18n-wg1t5zxg') /* 服务地址 */,
                'x-validator': [],
              }}
            />
          )}
          {!!__$$eval(() => this.getTypeForms()?.includes('path')) && (
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': { placeholder: this.i18n('i18n-h18e958l') /* 请输入路径 */ },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                'name': 'lujing',
                'required': true,
                'title': this.i18n('i18n-tw87ecqw') /* 路径 */,
                'x-validator': [],
              }}
            />
          )}
          {!!__$$eval(() => this.getTypeForms()?.includes('username')) && (
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  onChange: function () {
                    return this.handleResetChecked.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  placeholder: this.i18n('i18n-tnfvqdxl') /* 请输入用户名 */,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                'name': 'username',
                'required': true,
                'title': this.i18n('i18n-ifb9v7p6') /* 用户名 */,
                'x-validator': [],
              }}
            />
          )}
          {!!__$$eval(() => this.getTypeForms()?.includes('apiAddress')) && (
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  placeholder: this.i18n('i18n-232nz66x') /* 请输入 API 地址 */,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                'name': 'api',
                'required': true,
                'title': this.i18n('i18n-6y63riyn') /* API 地址 */,
                'x-validator': [],
              }}
            />
          )}
          {!!__$$eval(() => this.getTypeForms()?.includes('token')) && (
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': { placeholder: this.i18n('i18n-l88g15y8') /* 请输入 Token */ },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                'name': 'token',
                'required': true,
                'title': this.i18n('i18n-af2ovuoj') /* Token */,
                'x-validator': [],
              }}
            />
          )}
          {!!__$$eval(() => this.getTypeForms()?.includes('password')) && (
            <FormilyPassword
              __component_name="FormilyPassword"
              componentProps={{
                'x-component-props': {
                  onChange: function () {
                    return this.handleResetChecked.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  placeholder: this.i18n('i18n-yzicgjma') /* 请输入密码 */,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                'name': 'password',
                'required': true,
                'title': this.i18n('i18n-mtolrn4c') /* 密码 */,
                'x-validator': [],
              }}
            />
          )}
          {!!__$$eval(() => this.getTypeForms()?.includes('bucket')) && (
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  onChange: function () {
                    return this.handleResetChecked.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  placeholder: this.i18n('i18n-9vkabv9j') /* 请输入 Bucket */,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                'name': 'bucket',
                'required': true,
                'title': this.i18n('i18n-a17g4buw') /* Bucket */,
                'x-validator': [],
              }}
            />
          )}
          {!!__$$eval(() => this.getTypeForms()?.includes('object')) && (
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  onChange: function () {
                    return this.handleResetChecked.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  placeholder: this.i18n('i18n-iazmtrsp') /* 请输入 Object */,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                'name': 'object',
                'required': false,
                'title': this.i18n('i18n-147ypkac') /* Object */,
                'x-validator': [],
              }}
            />
          )}
          {!!__$$eval(() => this.getType() !== 'onLine') && (
            <FormilyRadio
              __component_name="FormilyRadio"
              componentProps={{
                'x-component-props': {
                  _sdkSwrGetFunc: {},
                  buttonStyle: 'outline',
                  disabled: false,
                  onChange: function () {
                    return this.handleResetChecked.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  size: 'middle',
                },
              }}
              decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
              fieldProps={{
                'default': 'https',
                'enum': [
                  { label: 'HTTPS', value: 'https' },
                  { label: 'HTTP', value: 'http' },
                ],
                'name': 'insecure',
                'title': this.i18n('i18n-oe4qfho1') /* 协议类型 */,
                'x-validator': [],
              }}
            />
          )}
          {!!__$$eval(
            () => !this.getTypeForms()?.includes('upload') && this.getType() !== 'onLine'
          ) && (
            <Row __component_name="Row" wrap={true}>
              <Col __component_name="Col" flex="120px" span={4} style={{}} />
              <Col __component_name="Col" span={20} style={{ marginBottom: '20px' }}>
                <Space __component_name="Space" align="center" direction="horizontal" size={5}>
                  {!!__$$eval(() => this.state.checked === undefined) && (
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      onClick={function () {
                        return this.handleCheck.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      strong={false}
                      style={{ cursor: 'pointer', fontSize: '' }}
                      type="colorPrimary"
                    >
                      {this.i18n('i18n-z7scyw9j') /* 测试连接 */}
                    </Typography.Text>
                  )}
                  <Tooltip
                    __component_name="Tooltip"
                    title={__$$eval(() => this.state.checkedMessage)}
                  >
                    {!!__$$eval(() => this.state.checked === false) && (
                      <Space
                        __component_name="Space"
                        align="center"
                        direction="horizontal"
                        size={5}
                      >
                        <AntdIconCloseCircleFilled
                          __component_name="AntdIconCloseCircleFilled"
                          style={{ color: '#ff4d4f' }}
                        />
                        <Typography.Text
                          __component_name="Typography.Text"
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ cursor: 'pointer', fontSize: '' }}
                          type="danger"
                        >
                          连接异常
                        </Typography.Text>
                      </Space>
                    )}
                  </Tooltip>
                  {!!__$$eval(() => this.state.checked === true) && (
                    <AntdIconCheckCircleFilled
                      __component_name="AntdIconCheckCircleFilled"
                      style={{ color: '#7ed321' }}
                    />
                  )}
                  {!!__$$eval(() => this.state.checked === true) && (
                    <Typography.Text
                      __component_name="Typography.Text"
                      disabled={false}
                      ellipsis={true}
                      strong={false}
                      style={{ cursor: 'pointer', fontSize: '' }}
                      type="success"
                    >
                      连接成功
                    </Typography.Text>
                  )}
                </Space>
              </Col>
            </Row>
          )}
          {!!__$$eval(() => !this.props.data) && (
            <Divider
              __component_name="Divider"
              dashed={false}
              defaultOpen={false}
              mode="line"
              style={{ marginLeft: '-24px', width: 'calc(100% + 48px)' }}
            />
          )}
          <Row __component_name="Row" wrap={true}>
            <Col __component_name="Col" flex="120px" style={{}} />
            <Col __component_name="Col" span={20}>
              <Space
                __component_name="Space"
                align="center"
                direction="horizontal"
                size="middle"
                style={__$$eval(
                  () =>
                    this.props.data && {
                      'position': 'fixed',
                      'right': 0,
                      'z-index': 1,
                      'bottom': '8px',
                      'right': '24px',
                    }
                )}
              >
                <Button
                  __component_name="Button"
                  block={false}
                  danger={false}
                  disabled={false}
                  ghost={false}
                  onClick={function () {
                    return this.handelCancel.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  shape="default"
                >
                  {this.i18n('i18n-0ujub8i3') /* 取消 */}
                </Button>
                <Tooltip
                  __component_name="Tooltip"
                  title={__$$eval(
                    () =>
                      !this.state.checked &&
                      !this.getTypeForms()?.includes('upload') &&
                      this.getType() !== 'onLine' &&
                      '请先测试连接并通过'
                  )}
                >
                  <Button
                    __component_name="Button"
                    block={false}
                    danger={false}
                    disabled={__$$eval(
                      () =>
                        !this.state.checked &&
                        !this.getTypeForms()?.includes('upload') &&
                        this.getType() !== 'onLine'
                    )}
                    ghost={false}
                    onClick={function () {
                      return this.handleSave.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    shape="default"
                    type="primary"
                  >
                    {this.i18n('i18n-cz31s8vq') /* 确定 */}
                  </Button>
                </Tooltip>
              </Space>
            </Col>
          </Row>
        </FormilyForm>
      </Component>
    );
  }
}

const ComponentWrapper = React.forwardRef((props = {}, ref) => {
  const history = getUnifiedHistory();
  const appHelper = {
    utils,
    constants: __$$constants,
    history,
  };
  const self = {
    appHelper,
    ...appHelper,
  };
  return (
    <DataProvider
      self={self}
      sdkInitFunc={{
        enabled: undefined,
        params: undefined,
      }}
      sdkSwrFuncs={[]}
      render={dataProps => (
        <CreateDataSource$$Component
          ref={ref}
          {...props}
          {...dataProps}
          self={self}
          appHelper={appHelper}
        />
      )}
    />
  );
});
export default ComponentWrapper;

function __$$eval(expr) {
  try {
    return expr();
  } catch (error) {}
}

function __$$evalArray(expr) {
  const res = __$$eval(expr);
  return Array.isArray(res) ? res : [];
}

function __$$createChildContext(oldContext, ext) {
  const childContext = {
    ...oldContext,
    ...ext,
    // 重写 state getter，保证 state 的指向不变，这样才能从 context 中拿到最新的 state
    get state() {
      return oldContext.state;
    },
    // 重写 props getter，保证 props 的指向不变，这样才能从 context 中拿到最新的 props
    get props() {
      return oldContext.props;
    },
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
