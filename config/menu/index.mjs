import generateMenuFile from '../../shared/menu-generator/index.mjs';
import constants from '../constants.json' assert { type: 'json' };

const { basename } = constants;

generateMenuFile({
  basename, // portal 的 basename
  filePathName: `../../dist/${basename}-public/menu.json`, // 文件生成位置，相对当前文件的相对路径，包含文件名
  dataPathName: './data.mjs',
  metaUrl: import.meta.url,
  dataFileChangeDelay: 1 * 1000, // 非必填，
});
