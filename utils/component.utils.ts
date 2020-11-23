// 组件的通用函数
import compDefaultProps from '../config/component.defaultProps.config'
const prefix = 'ts';
// 获取组件的props
export const getComponentProps = (compName: keyof typeof compDefaultProps, compProps?: any): any => {
    const defaultProps = compDefaultProps[compName];
    return Object.assign({}, defaultProps, compProps || {})
}

// 获取组件样式前缀
export const getCompPrefix = (suffix?:string) => {
    return suffix ? `${prefix}-${suffix}`: prefix
}

export const getFontClass = () => prefix;