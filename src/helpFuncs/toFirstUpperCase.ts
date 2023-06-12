interface IToFirstUpperCaseProps {
    string: string,
}

const toFirstUpperCase = (payload: IToFirstUpperCaseProps) => {
    if (payload.string !== undefined) return payload.string.charAt(0).toUpperCase() + payload.string.slice(1)
}

export default toFirstUpperCase;