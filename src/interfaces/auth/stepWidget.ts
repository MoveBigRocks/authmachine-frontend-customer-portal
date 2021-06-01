interface StepSwitcherProps {
    first: boolean,
    second: boolean,
    third: boolean,
    step: number
}

interface StepProps {
    step: number,
    description: string,
    valid: boolean,
    current: boolean
}

export type {StepSwitcherProps, StepProps};
