import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as React from 'react';
import { UploadChangeParam } from 'antd/lib/upload';

interface props {
	action: (file: UploadChangeParam) => void;
	label: string;
}

const InputFile = ({ action, label }: props) => {
	return (
		<Upload onChange={action}>
			<Button icon={<UploadOutlined />}>{label}</Button>
		</Upload>
	);
};

export default InputFile;
