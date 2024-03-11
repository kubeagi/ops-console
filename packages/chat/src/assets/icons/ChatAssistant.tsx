import { SvgProps } from '@lobehub/ui';
import React, { memo } from 'react';

const ChatAssistant = memo<SvgProps | any>(({ ...rest }) => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    fillRule="evenodd"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 1024 1024"
    {...rest}
  >
    <path d="M384 528a48 48 0 1096 0 48 48 0 10-96 0zM544 528a48 48 0 1096 0 48 48 0 10-96 0z"></path>
    <path d="M512 64C265.6 64 64 265.6 64 512s201.6 448 448 448 448-201.6 448-448S758.4 64 512 64zm-64 224h128v64H448v-64zm320 320v64H256v-64h-64V448h64v-64h512v64h64v160h-64z"></path>
  </svg>
));

export default ChatAssistant;
