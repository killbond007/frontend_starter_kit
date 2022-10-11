import styled from '@xstyled/styled-components'

export const Root = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 32px;
	.ant-form {
		width: 400px;
		text-align: center;
		.ant-btn-primary {
			width: 100%;
		}
		.ant-form-item-explain-error,
		.ant-select-selector {
			text-align: left;
		}
	}
`
