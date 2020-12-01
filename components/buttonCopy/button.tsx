// button组件主要实现代码
import React, { FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { Size, Shape, Type } from './button.config';
import { getComponentProps, getCompPrefix, getFontClass } from '../../utils/component.utils';
export interface ButtonProps {
    type?: Type,
    size?: Size,
    shape?: Shape,
    loading?: boolean,
    disabled?: boolean,
    className?: string,
    icon?: React.ReactNode,
    children?: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLElement>
}

const InterButton = (props: ButtonProps, ref: unknown): FunctionComponentElement <ButtonProps> => {
    const buttonProps = getComponentProps('Button', props);
    const { type, size, shape, loading, className, disabled, icon, children, onClick } = buttonProps;
    const buttonRef = (ref as any) || React.createRef<HTMLElement>(); // ref
    const btnPrefixClass = getCompPrefix('btn');
    const btnClass = classNames(btnPrefixClass, className, {
        [`${btnPrefixClass}-type-${type}`]: type,
        [`${btnPrefixClass}-size-${size}`]: size,
        [`${btnPrefixClass}-shape-${shape}`]: shape,
        [`${btnPrefixClass}-loading`]: loading,
        [`${btnPrefixClass}-disabled`]: disabled,
    })
    const fontClass = getFontClass();
    const iconNode = icon 
        ? <i className={icon}></i>
        : loading
            ? <i className={classNames(fontClass, `${fontClass}-loading`)}></i>
            : null
    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
        if (loading) return
        onClick && onClick(e)
    }
    return <button ref={buttonRef} className={btnClass} onClick={handleClick}>
        {iconNode}
        {children}
    </button>
}
const Button = React.forwardRef<unknown, ButtonProps>(InterButton);
Button.displayName = 'Button';
export default Button