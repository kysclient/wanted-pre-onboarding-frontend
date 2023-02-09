

export const emailRegex = (email: string) : boolean => {
    return emailExpression.test(email);
}

export const passwordRegex = (password: string) : boolean => {
    return password.length >= 8
}

const emailExpression: RegExp = /@/;

