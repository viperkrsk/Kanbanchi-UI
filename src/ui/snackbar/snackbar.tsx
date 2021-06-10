import * as React from 'react';
import { ISnackbarDefaultIcons, ISnackbarInheritedProps } from './types';
import { ClassNames } from '../utils';
import { Button, ButtonsGroup, Icon } from '../../ui';
import '../../../src/ui/snackbar/snackbar.module.scss';
import { TButtonVariant } from '../button/types';

// accessibility ok

export const Snackbar: React.SFC<ISnackbarInheritedProps> =
(props) => {

    let {
        className,
        buttons,
        icon,
        text,
        timer,
        title,
        variant,
        onTimer,
        ...attributes
    } = props;

    let xlink = (icon === null && variant !== 'timer') ? ISnackbarDefaultIcons[variant] : icon;

    if (variant === 'timer' && timer === null) timer = 10;

    let buttonsGroup = [],
        buttonsGroupDiv = null;

    if (buttons) {
        buttonsGroup = buttons.map((item, key) => {
            let {
                isPrimary,
                text,
                icon,
                ...attributes
            } = item;

            const buttonClassName = ClassNames(
                'kui-snackbar__button',
                (isPrimary) ? 'kui-snackbar__button--primary' : null
            );

            const variant: TButtonVariant = icon ? 'icon' : 'primary';
            const children = icon
                ? <Icon
                    size={16}
                    xlink={icon}
                />
                : text
            return (
                <Button
                    className={buttonClassName}
                    color={!icon ? 'white' : null}
                    key={key}
                    variant={variant}
                    {...attributes}
                >
                    {children}
                </Button>
            );
        });
        buttonsGroupDiv = (
            <ButtonsGroup className="kui-snackbar__buttons">
                {buttonsGroup}
            </ButtonsGroup>
        );
    }

    const refSnackbar = React.useRef(null);

    const [timerHook, setTimerHook] = React.useState(timer);
    const [timeoutHook, setTimeoutHook] = React.useState(null);
    const [s] = React.useState<any>({});
    const [getTimerHook] = React.useState(() => () => s.timerHook);
    s.timerHook = timerHook;

    React.useEffect(() => {
        if (attributes.onBlur) {
            refSnackbar.current.focus();
        }

        let unmounted = false;
        if (timerHook === null) return;
        setTimeoutHook(setInterval(() => {
            if (unmounted) return;
            if (getTimerHook() < 1) {
                if (onTimer) onTimer();
                clearInterval(timeoutHook);
            } else {
                setTimerHook(getTimerHook() - 1);
            }
        }, 1000));

        return () => {
            unmounted = true;
            clearInterval(timeoutHook);
        }
    }, []);

    className = ClassNames(
        'kui-snackbar',
        'kui-snackbar--variant_' + variant,
        (!title) ? 'kui-snackbar--notitle' : null,
        (variant === 'timer' && timerHook < 3) ? 'kui-snackbar--fadeout' : null,
        (variant === 'timer' && timerHook <= 0) ? 'hidden' : null,
        className
    );

    return (
        <div className="kui-snackbar__container">
            <div
                className={className}
                ref={refSnackbar}
                tabIndex={0}
                aria-live={timer === timerHook ? 'assertive' : 'off'} // при смене таймера скрин ридеру нужен только таймер
                role={'alert'}
                {...attributes}
            >
                {xlink &&
                    <Icon xlink={xlink} size={24} className="kui-snackbar__icon" />
                }
                <div className="kui-snackbar__body">
                    {title &&
                        <div className="kui-snackbar__title" dangerouslySetInnerHTML={{ __html: title }}></div>
                    }
                    {text &&
                        <div className="kui-snackbar__text" dangerouslySetInnerHTML={{ __html: text }}></div>
                    }
                </div>
                {buttonsGroupDiv}
            </div>
        </div>
    );
};

Snackbar.defaultProps = {
    buttons: null,
    icon: null,
    text: null,
    timer: null,
    title: null,
    variant: 'info',
    onBlur: null,
    onTimer: () => undefined,
};

Snackbar.displayName = 'Snackbar';
