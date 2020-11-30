// button组件主要实现代码
import React from 'react';
import classNames from 'classnames';
import { getComponentProps, getCompPrefix, getFontClass } from '../../utils/component.utils';
const InterButton = (props, ref) => {
    const buttonProps = getComponentProps('Button', props);
    const { type, size, shape, loading, className, disabled, icon, children, onClick } = buttonProps;
    const buttonRef = ref || React.createRef(); // ref
    const btnPrefixClass = getCompPrefix('btn');
    const btnClass = classNames(btnPrefixClass, className, {
        [`${btnPrefixClass}-type-${type}`]: type,
        [`${btnPrefixClass}-size-${size}`]: size,
        [`${btnPrefixClass}-shape-${shape}`]: shape,
        [`${btnPrefixClass}-loading`]: loading,
        [`${btnPrefixClass}-disabled`]: disabled,
    });
    const fontClass = getFontClass();
    const iconNode = icon
        ? React.createElement("i", { className: icon })
        : loading
            ? React.createElement("i", { className: classNames(fontClass, `${fontClass}-loading`) })
            : null;
    const handleClick = (e) => {
        if (loading)
            return;
        onClick && onClick(e);
    };
    return React.createElement("button", { ref: buttonRef, className: btnClass, onClick: handleClick },
        iconNode,
        children);
};
const Button = React.forwardRef(InterButton);
Button.displayName = 'Button';
export default Button;
