export interface ISnackbarButtonStateProps {
    progress?: number; // percentage 0..100
    text: string;
}

export interface ISnackbarButtonDispatchProps {
    onClick?: () => void;
}

export interface ISnackbarButtonOwnProps {
    isPrimary?: boolean;
}

export interface ISnackbarButtonProps extends
    ISnackbarButtonStateProps,
    ISnackbarButtonDispatchProps,
    ISnackbarButtonOwnProps
{}

export enum ISnackbarDefaultIcons {
    error = 'error',
    info = 'info',
    promt = 'help',
    success = 'done',
    timer = 'error'
}

export interface ISnackbarStateProps {
    buttons?: Array<ISnackbarButtonProps>;
    text?: string;
    title?: string;
}

export interface ISnackbarDispatchProps {
    onBlur?: () => void;
    onTimer?: () => void;
}

export type SnackbarVariant =
    'error' |
    'info' |
    'promt' |
    'success' |
    'timer';

export interface ISnackbarOwnProps {
    icon?: string;
    key: string;
    timer?: number;
    variant?: SnackbarVariant;
}

export interface ISnackbarProps extends
    ISnackbarStateProps,
    ISnackbarDispatchProps,
    ISnackbarOwnProps
{}

export type IConflictFreeHTMLAttributes<E> =
    Pick<React.HTMLAttributes<E>, Exclude<keyof React.HTMLAttributes<E>,
        'onBlur'
    >>;

export interface ISnackbarInheritedProps extends
    IConflictFreeHTMLAttributes<HTMLElement>,
    ISnackbarProps
{}
